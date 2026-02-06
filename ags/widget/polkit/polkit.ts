import Gio from "gi://Gio";
import Polkit from "gi://Polkit";
import {addWindowOneOff, hideAllWindows} from "../utils/windows";
import PolkitPopup from "./PolkitPopup";
import GLib from "gi://GLib?version=2.0";
import PolkitAgent from "gi://PolkitAgent?version=1.0";
import {Astal, Gtk} from "ags/gtk4";
import {createState} from "ags";

function startAgentSession(
    cookie: string,
    identity: Polkit.Identity,
    onRequest: (prompt: string, echo: boolean) => void,
    onInfo: (info: string) => void,
    onError: (error: string) => void,
    onCompleted: (success: boolean) => void,
) {
    const session = new PolkitAgent.Session({ identity, cookie });

    session.connect("request", (_s, prompt, echo) => {
        console.log(`[Polkit]: request: ${prompt}`)
        onRequest(prompt, echo);
    });

    session.connect("show-info", (_s, text) => {
        console.log("[Polkit] info:", text);
        onInfo(text)
    });

    session.connect("show-error", (_s, text) => {
        console.log("[Polkit] error:", text);
        onError(text)
    });

    session.connect("completed", (_s, success) => {
        console.log(`[Polkit] completed.  Success: ${success}`);
        onCompleted(success);
    });

    // Start the auth conversation (this is what ends up using the helper)
    session.initiate();
    return session;
}

function extractUid(value: unknown): number | null {
    if (value === null || value === undefined)
        return null;

    if (value instanceof GLib.Variant) {
        const unpacked = value.unpack();
        return typeof unpacked === "number" ? unpacked : null;
    }

    return null;
}

function pickUnixUserIdentity(
    identities: Array<[string, Record<string, any>]>
): Polkit.Identity | null {
    for (const [kind, props] of identities) {
        if (kind === "unix-user" && props?.uid !== undefined) {
            const uid = extractUid(props.uid);
            if (uid !== null)
                return Polkit.UnixUser.new(uid);
        }
    }

    return null;
}

const agentImpl = {
    BeginAuthentication(
        action_id: string,
        message: string,
        icon_name: string,
        details: Record<string, string>,
        cookie: string,
        identities: Array<[string, Record<string, any>]>
    ): void {
        console.log(`[Polkit] Action: ${action_id}`)
        console.log(`[Polkit] Message: ${message}`)
        console.log(`[Polkit] Cookie: ${cookie}`)
        console.log(`[Polkit] Details:`)
        Object.entries(details).forEach(([key, value]) => {
            console.log(`${key}: ${value}`)
        })
        console.log(`[Polkit] Identities:`)
        identities.forEach((identity) => {
            console.log("==========")
            identity.forEach((identityInfo) => {
                if (typeof identityInfo === "string") {
                    console.log(identityInfo)
                } else {
                    Object.entries(identityInfo).forEach(([key, value]) => {
                        console.log(`${key}: ${value}`)
                    })
                }
            })
        })
        console.log("==========")

        const identity: Polkit.Identity | null = pickUnixUserIdentity(identities)

        if (identity === null) {
            console.log("No identity")
            return
        }

        console.log(`Identity: ${identity.to_string()}`)

        const loop = GLib.MainLoop.new(null, false)
        let isCancelling = false

        const textBuffer = new Gtk.EntryBuffer()
        const [infoText, setInfoText] = createState("")
        const [errorText, setErrorText] = createState("")

        let lastInfoMessageTime = 0

        let session: PolkitAgent.Session

        function createSession() {
            session = startAgentSession(
                cookie,
                identity!!,
                (prompt, echo) => {

                },
                (info) => {
                    // multiple info messages can be sent in quick succession.  combine messages if sent within 1 second
                    const currentTime = Date.now()
                    if (currentTime - lastInfoMessageTime > 1000) {
                        setInfoText(info)
                    } else {
                        setInfoText(`${infoText.peek()}\n${info}`)
                    }
                    lastInfoMessageTime = currentTime
                },
                (error) => {
                    setErrorText(error)
                },
                (success) => {
                    if (success) {
                        loop.quit()
                    } else {
                        if (isCancelling) return
                        textBuffer.set_text("", -1)
                        setErrorText("Authentication failed.")
                        createSession()
                    }
                },
            )
        }

        createSession()

        // Show prompt and set UI message
        addWindowOneOff(() => {
            return PolkitPopup(
                textBuffer,
                infoText,
                errorText,
                message,
                () => {
                    console.log(`[Polkit] submitting password...`)
                    session.response(textBuffer.text)
                },
                () => {
                    console.log(`[Polkit] cancelling`)
                    isCancelling = true
                    loop.quit()
                    session.cancel()
                }
            ) as Astal.Window
        })

        // Block UI until done
        loop.run()
        hideAllWindows()

        console.log("[Polkit] done")
    },

    CancelAuthentication(cookie: string): void {
        console.log(`[Polkit] Cancelled cookie=${cookie}`)
    }
};

// --- Export and register agent ---
const AGENT_PATH = "/com/okpanel/PolkitAgent";
const agentInterfaceXML = `
<node>
  <interface name="org.freedesktop.PolicyKit1.AuthenticationAgent">
    <method name="BeginAuthentication">
      <arg type="s" name="action_id" direction="in"/>
      <arg type="s" name="message" direction="in"/>
      <arg type="s" name="icon_name" direction="in"/>
      <arg type="a{ss}" name="details" direction="in"/>
      <arg type="s" name="cookie" direction="in"/>
      <arg type="a(sa{sv})" name="identities" direction="in"/>
    </method>
    <method name="CancelAuthentication">
      <arg type="s" name="cookie" direction="in"/>
    </method>
  </interface>
</node>
`;

// Prevent GC of exported objects
const _exported: Gio.DBusExportedObject[] = [];

export function registerPolkitAgent(): void {
    const connection = Gio.DBus.system;

    // Determine session ID (omitted for brevity; assume sessId is set)
    const sessId = GLib.getenv("XDG_SESSION_ID") || "";

    // Export agent interface
    const exported = Gio.DBusExportedObject.wrapJSObject(agentInterfaceXML, agentImpl);
    exported.export(connection, AGENT_PATH);
    _exported.push(exported);

    // Register with Polkit
    const authority = Polkit.Authority.get_sync(null);
    try {
        authority.register_authentication_agent_sync(
            new Polkit.UnixSession({ session_id: sessId }),
            GLib.get_language_names()[0] || "C",
            AGENT_PATH,
            null
        );
        console.log("[Polkit] registered");
    } catch (e: any) {
        console.error("[Polkit] registration failed:", e.message);
    }
}
