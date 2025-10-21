import {Gtk} from "ags/gtk4";
import {createState, onCleanup} from "ags";
import {setDirectories, updateScreenshotAudioOptions} from "./utils";
import Divider from "../common/Divider";
import ScreenRecording from "./ScreenRecording";
import ScreenRecordingIndicator from "./ScreenRecordingIndicator";
import Screenshots from "./Screenshots";

export const integratedScreenshotWidth = 410

export const [integratedScreenshotRevealed, integratedScreenshotRevealedSetting] = createState(false)

export function toggleIntegratedScreenshot() {
    integratedScreenshotRevealedSetting(!integratedScreenshotRevealed.get())
}

export function closeIntegratedScreenshot() {
    integratedScreenshotRevealedSetting(false)
}

export default function () {
    setDirectories()
    updateScreenshotAudioOptions()

    const unsub = integratedScreenshotRevealed.subscribe(() => {
        if (integratedScreenshotRevealed.get()) {
            updateScreenshotAudioOptions()
        }
    })
    onCleanup(unsub)

    return <revealer
        hexpand={false}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        revealChild={integratedScreenshotRevealed}>
        <Gtk.ScrolledWindow
            cssClasses={["scrollWindow"]}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            propagateNaturalHeight={true}
            widthRequest={integratedScreenshotWidth}>
            <box
                marginTop={20}
                marginBottom={20}
                marginStart={20}
                marginEnd={20}>
                <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    <Screenshots/>
                    <box marginTop={20}/>
                    <Divider/>
                    <box marginTop={10}/>
                    <ScreenRecording/>
                    <box marginTop={20}/>
                    <ScreenRecordingIndicator/>
                </box>
            </box>
        </Gtk.ScrolledWindow>
    </revealer>
}