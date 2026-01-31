import {Astal, Gtk} from "ags/gtk4";
import {createState} from "ags";
import Screenshare from "./Screenshare";

export const integratedScreenshareWidth = 410

export const [integratedScreenshareRevealed, integratedScreenshareRevealedSetting] = createState(false)

export function toggleIntegratedScreenshare() {
    integratedScreenshareRevealedSetting(!integratedScreenshareRevealed.get())
}

export function closeIntegratedScreenshare() {
    integratedScreenshareRevealedSetting(false)
}

export default function (
    {
        frameWindow,
    }: {
        frameWindow: Astal.Window,
    }
) {
    return <revealer
        hexpand={false}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        revealChild={integratedScreenshareRevealed}>
        <Gtk.ScrolledWindow
            cssClasses={["scrollWindow"]}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            propagateNaturalHeight={true}
            widthRequest={integratedScreenshareWidth}>
            <Screenshare frameWindow={frameWindow}/>
        </Gtk.ScrolledWindow>
    </revealer>
}