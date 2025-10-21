import {Astal, Gtk} from "ags/gtk4";
import {createState, onCleanup} from "ags";
import AppLauncher from "./AppLauncher";
import {frameWindow} from "../frame/Frame";

export const integratedAppLauncherWidth = 500

export const [integratedAppLauncherRevealed, integratedAppLauncherRevealedSetting] = createState(false)

export function toggleIntegratedAppLauncher() {
    integratedAppLauncherRevealedSetting(!integratedAppLauncherRevealed.get())
}

export function closeIntegratedAppLauncher() {
    integratedAppLauncherRevealedSetting(false)
}

export default function () {
    const unsub = integratedAppLauncherRevealed.subscribe(() => {
        if (integratedAppLauncherRevealed.get()) {
            frameWindow.keymode = Astal.Keymode.EXCLUSIVE
        } else {
            frameWindow.keymode = Astal.Keymode.NONE
        }
    })
    onCleanup(unsub)

    return <revealer
        hexpand={false}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        revealChild={integratedAppLauncherRevealed}>
        <AppLauncher/>
    </revealer>
}