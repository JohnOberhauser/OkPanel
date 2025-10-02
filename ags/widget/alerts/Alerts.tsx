import App from "ags/gtk4/app"
import {Accessor, createBinding, createComputed, onCleanup} from "ags"
import Wp from "gi://AstalWp"
import {getVolumeIcon, playPowerPlug, playPowerUnplug} from "../utils/audio";
import Brightness from "../utils/connectables/brightness";
import {getBrightnessIcon} from "../utils/brightness";
import Battery from "gi://AstalBattery"
import GLib from "gi://GLib?version=2.0";
import Astal from "gi://Astal?version=4.0";
import Gtk from "gi://Gtk?version=4.0";
import {variableConfig} from "../../config/config";

const VolumeAlertName = "volumeAlert"
const BrightnessAlertName = "brightnessAlert"

export function AlertWindow(
    {
        enabled,
        iconLabel,
        sliderValue,
        windowName,
        showVariable,
        monitorId
    }: {
        enabled: Accessor<boolean>,
        iconLabel: Accessor<string>,
        sliderValue: Accessor<number>,
        windowName: string,
        showVariable: Accessor<any>
        monitorId: number
    }
): Astal.Window {
    let windowVisibilityTimeout: GLib.Source | null = null

    return <window
        namespace={"okpanel-alerts"}
        monitor={monitorId}
        name={windowName}
        application={App}
        anchor={Astal.WindowAnchor.BOTTOM}
        exclusivity={Astal.Exclusivity.NORMAL}
        layer={Astal.Layer.OVERLAY}
        cssClasses={["window"]}
        margin_bottom={100}
        visible={false}
        $={(self: Astal.Window) => {
            let canShow = false
            let unsub = showVariable.subscribe(() => {
                if (!canShow) {
                    // for some reason, getting the variable here prevents it from being needlessly
                    // emitted a second time on startup
                    showVariable.get()
                    canShow = true
                    return
                }
                if (!enabled.get()) return
                if (windowVisibilityTimeout != null) {
                    windowVisibilityTimeout.destroy()
                }
                self.visible = true
                windowVisibilityTimeout = setTimeout(() => {
                    self.visible = false
                    windowVisibilityTimeout?.destroy()
                    windowVisibilityTimeout = null
                }, 1_000)
            })
            onCleanup(unsub)
        }}>
        <box
            orientation={Gtk.Orientation.HORIZONTAL}
            marginBottom={10}
            marginTop={10}
            marginStart={5}
            marginEnd={5}
            halign={Gtk.Align.CENTER}>
            <label
                marginStart={20}
                marginEnd={15}
                cssClasses={["alertIcon"]}
                label={iconLabel}/>
            <slider
                marginStart={26}
                marginTop={2}
                marginEnd={20}
                cssClasses={["alertProgress"]}
                hexpand={true}
                value={sliderValue}/>
        </box>
    </window> as Astal.Window
}

export function VolumeAlert(monitorId: number): Astal.Window {
    const defaultSpeaker = Wp.get_default()!.audio.default_speaker

    const speakerVar = createComputed([
        createBinding(defaultSpeaker, "description"),
        createBinding(defaultSpeaker, "volume"),
        createBinding(defaultSpeaker, "mute")
    ])

    const showVariable = createComputed([
        createBinding(defaultSpeaker, "volume"),
        createBinding(defaultSpeaker, "mute")
    ])

    return <AlertWindow
        enabled={variableConfig.osd.soundOSDEnabled.asAccessor()}
        iconLabel={speakerVar(() => getVolumeIcon(defaultSpeaker))}
        sliderValue={createBinding(defaultSpeaker, "volume")}
        windowName={VolumeAlertName}
        showVariable={showVariable}
        monitorId={monitorId}/> as Astal.Window
}

export function BrightnessAlert(monitorId: number): Astal.Window {
    const brightness = Brightness.get_default()

    const showVariable = createComputed([
        createBinding(brightness, "screen")
    ])

    return <AlertWindow
        enabled={variableConfig.osd.brightnessOSDEnabled.asAccessor()}
        iconLabel={createBinding(brightness, "screen").as(() => {
            return getBrightnessIcon(brightness)
        })}
        sliderValue={createBinding(brightness, "screen")}
        windowName={BrightnessAlertName}
        showVariable={showVariable}
        monitorId={monitorId}/> as  Astal.Window
}

export function ChargingAlertSound() {
    const linePowerDevice = Battery
        .UPower
        .new()
        .devices
        .filter(d => d.deviceType === Battery.Type.LINE_POWER)

    if (linePowerDevice !== null && linePowerDevice !== undefined) {
        const pluggedIn = createComputed(
            linePowerDevice.map((d) => createBinding(d, "online")),
            (...args) => {
                return args.find((online) => online === true) ?? false
            }
        )
        const unsub = pluggedIn.subscribe(() => {
            if (pluggedIn.get()) {
                playPowerPlug()
            } else {
                playPowerUnplug()
            }
        })
        onCleanup(unsub)
    }
}