import {Gtk} from "ags/gtk4";
import {createState} from "ags";
import ClipboardManager from "./ClipboardManager";

export const integratedClipboardManagerWidth = 500

export const [integratedClipboardManagerRevealed, integratedClipboardManagerRevealedSetting] = createState(false)

export function toggleIntegratedClipboardManager() {
    integratedClipboardManagerRevealedSetting(!integratedClipboardManagerRevealed.peek())
}

export function closeIntegratedClipboardManager() {
    integratedClipboardManagerRevealedSetting(false)
}

export default function () {
    return <revealer
        hexpand={false}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        revealChild={integratedClipboardManagerRevealed}>
        <Gtk.ScrolledWindow
            cssClasses={["scrollWindow"]}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            propagateNaturalHeight={true}
            widthRequest={integratedClipboardManagerWidth}>
            <ClipboardManager/>
        </Gtk.ScrolledWindow>
    </revealer>
}