import {Astal, Gtk} from "ags/gtk4";
import {createState, onCleanup} from "ags";
import AppLauncher from "./AppLauncher";

export const integratedAppLauncherWidth = 500

export const [integratedAppLauncherRevealed, integratedAppLauncherRevealedSetting] = createState(false)

export function toggleIntegratedAppLauncher() {
    integratedAppLauncherRevealedSetting(!integratedAppLauncherRevealed.peek())
}

export function closeIntegratedAppLauncher() {
    integratedAppLauncherRevealedSetting(false)
}

export default function (
    {
        frameWindow
    }: {
        frameWindow: Astal.Window,
    }
) {
    const unsub = integratedAppLauncherRevealed.subscribe(() => {
        if (integratedAppLauncherRevealed.peek()) {
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