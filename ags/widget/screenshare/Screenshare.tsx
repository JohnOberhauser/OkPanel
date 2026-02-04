import {Astal, Gtk} from "ags/gtk4"
import Hyprland from "gi://AstalHyprland"
import {execAsync} from "ags/process"
import Pango from "gi://Pango?version=1.0";
import RevealerRow from "../common/RevealerRow";
import OkButton, {OkButtonSize} from "../common/OkButton";
import {createBinding, createState, For, onCleanup} from "ags";
import {integratedScreenshareRevealed, toggleIntegratedScreenshare} from "./IntegratedScreenshare";
import {timeout} from "ags/time";
import {truncateString} from "../utils/strings";

let response: (response: any) => void = () => {}

export function updateResponse(res: (response: any) => void) {
    response = res
}

const [screenShareWindows, screenShareWindowsSetter] = createState<Program[]>([])

type ScreenShareWindow = {
    windowId: string;
    windowProgram: string;
    instanceTitle: string;
};

type Program = {
    name: string;
    windows: ScreenShareWindow[];
};

const maxCharacters = 34

function parseScreenShareString(input: string): ScreenShareWindow[] {
    // Remove the "screenshare" prefix
    const content = input.replace(/^screenshare/, "");

    // Split the string into parts based on "[HC>]"
    const parts = content.split("[HE>]").filter(part => part.trim() !== "");

    // Map each part to an object
    return parts.filter((part) => {
        return part.includes("[HC>]") && part.includes("[HT>]")
    }).map(part => {
        const [hc, htAndHe] = part.split("[HC>]");
        const [ht, he] = htAndHe.split("[HT>]");

        return {
            windowId: hc.trim(),
            windowProgram: ht?.trim() || "",
            instanceTitle: he?.trim() || "",
        };
    });
}

function groupByWindowProgram(windows: ScreenShareWindow[]): Program[] {
    const grouped: Program[] = [];

    windows.forEach(window => {
        // Find an existing group for this windowProgram
        let group = grouped.find(g => g.name === window.windowProgram);

        // If no group exists, create one
        if (!group) {
            group = { name: window.windowProgram, windows: [] };
            grouped.push(group);
        }

        // Add the window to the group
        group.windows.push(window);
    });

    return grouped.sort((a, b) => {
        if (a.name > b.name) {
            return 1
        } else {
            return -1
        }
    });
}

export function updateWindows(input: string) {
    screenShareWindowsSetter(groupByWindowProgram(parseScreenShareString(input)))
}

function Monitors() {
    const hyprland = Hyprland.get_default()

    return <RevealerRow
        icon={"󰍹"}
        iconOffset={0}
        content={
            <label
                hexpand={true}
                label="Monitors"
                halign={Gtk.Align.START}
                cssClasses={["labelLargeBold"]}/>
        }
        revealedContent={
            <box
                marginTop={8}
                marginBottom={8}
                orientation={Gtk.Orientation.VERTICAL}
                spacing={12}>
                <For each={createBinding(hyprland, "monitors")}>
                    {(monitor: Hyprland.Monitor) => {
                        return <OkButton
                            size={OkButtonSize.MEDIUM}
                            bold={true}
                            hexpand={true}
                            primary={true}
                            labelHalign={Gtk.Align.START}
                            label={truncateString(monitor.name, maxCharacters)}
                            onClicked={() => {
                                response(`[SELECTION]/screen:${monitor.name}`)
                                toggleIntegratedScreenshare()
                            }}/>
                    }}
                </For>
            </box>
        }
        setup={(revealed) => {
            const unsub = integratedScreenshareRevealed.subscribe(() => {
                if (revealed[1] !== null) revealed[1](false)
            })
            onCleanup(unsub)
        }}
    />
}

function Windows() {
    return <RevealerRow
        icon={""}
        iconOffset={0}
        content={
            <label
                hexpand={true}
                label="Windows"
                halign={Gtk.Align.START}
                cssClasses={["labelLargeBold"]}/>
        }
        revealedContent={
            <box
                marginTop={8}
                marginBottom={8}
                orientation={Gtk.Orientation.VERTICAL}
                spacing={12}>
                <For each={screenShareWindows}>
                    {(program) => {
                        return <box
                            orientation={Gtk.Orientation.VERTICAL}
                            spacing={6}>
                            <label
                                halign={Gtk.Align.CENTER}
                                cssClasses={["labelLargeBold"]}
                                label={truncateString(program.name, 30)}/>
                            {program.windows
                                .sort((a, b) => {
                                    if (a.instanceTitle > b.instanceTitle) {
                                        return 1
                                    } else {
                                        return -1
                                    }
                                })
                                .map((instance) => {
                                    return <OkButton
                                        size={OkButtonSize.MEDIUM}
                                        bold={true}
                                        primary={true}
                                        hexpand={true}
                                        labelHalign={Gtk.Align.START}
                                        label={truncateString(instance.instanceTitle, maxCharacters)}
                                        ellipsize={Pango.EllipsizeMode.END}
                                        onClicked={() => {
                                            toggleIntegratedScreenshare()
                                            timeout(400, () => {
                                                response(`[SELECTION]/window:${instance.windowId}`)
                                            })
                                        }}/>
                                })
                            }
                        </box>
                    }}
                </For>
            </box>
        }
        setup={(revealed) => {
            const unsub = integratedScreenshareRevealed.subscribe(() => {
                if (revealed[1] !== null) revealed[1](false)
            })
            onCleanup(unsub)
        }}
    />
}

function Region() {
    return <RevealerRow
        icon={""}
        iconOffset={0}
        content={
            <label
                hexpand={true}
                label="Other"
                halign={Gtk.Align.START}
                cssClasses={["labelLargeBold"]}/>
        }
        revealedContent={
            <box
                marginTop={8}
                marginBottom={8}>
                <OkButton
                    size={OkButtonSize.MEDIUM}
                    bold={true}
                    primary={true}
                    hexpand={true}
                    labelHalign={Gtk.Align.START}
                    label="Region"
                    onClicked={() => {
                        toggleIntegratedScreenshare()
                        execAsync("slurp -f \"%o %x %y %w %h\"")
                            .catch((error) => {
                                console.error(error)
                                response(`[SELECTION]/region:`)
                            })
                            .then((value) => {
                                if (typeof value === "string") {
                                    const [name, x, y, w, h] = value.split(" ")
                                    response(`[SELECTION]/region:${name}@${x},${y},${w},${h}`)
                                } else {
                                    response(`[SELECTION]/region:`)
                                }
                            })
                    }}/>
            </box>
        }
        setup={(revealed) => {
            const unsub = integratedScreenshareRevealed.subscribe(() => {
                if (revealed[1] !== null) revealed[1](false)
            })
            onCleanup(unsub)
        }}
    />
}

export default function (
    {
        frameWindow,
    }: {
        frameWindow: Astal.Window,
    }
) {
    return <box
        $={(self) => {
            const shortcutController = new Gtk.ShortcutController()
            shortcutController.set_scope(Gtk.ShortcutScope.GLOBAL)
            shortcutController.add_shortcut(new Gtk.Shortcut({
                trigger: Gtk.ShortcutTrigger.parse_string("Escape"),
                action: Gtk.CallbackAction.new(() => {
                    console.log("shortcut")
                    toggleIntegratedScreenshare()
                    response("")
                    return true
                }),
            }))

            const unsub = integratedScreenshareRevealed.subscribe(() => {
                if (integratedScreenshareRevealed.peek()) {
                    if (!shortcutController.get_widget()) {
                        console.log("adding")
                        self.add_controller(shortcutController)
                    }
                    // make exclusive so users can hit escape to exit picker, and prevent them from closing the
                    // program that is asking for sharing
                    frameWindow.keymode = Astal.Keymode.EXCLUSIVE
                } else {
                    console.log("removing")
                    self.remove_controller(shortcutController)
                    frameWindow.keymode = Astal.Keymode.NONE
                }
            })
            onCleanup(unsub)
        }}
        orientation={Gtk.Orientation.VERTICAL}
        marginStart={10}
        marginBottom={10}
        marginTop={20}
        marginEnd={10}
        spacing={8}>
        <Monitors/>
        <Windows/>
        <Region/>
    </box>
}