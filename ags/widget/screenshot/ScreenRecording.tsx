import {Gtk} from "ags/gtk4"
import {execAsync} from "ags/process"
import Pango from "gi://Pango?version=1.0";
import RevealerRow from "../common/RevealerRow";
import OkButton from "../common/OkButton";
import {projectDir} from "../../app";
import {createState, Setter, For, onCleanup} from "ags";
import GLib from "gi://GLib?version=2.0";
import {integratedScreenshotRevealed, toggleIntegratedScreenshot} from "./IntegratedScreenshot";
import {truncateString} from "../utils/strings";
import {
    audioOptions,
    AudioSource,
    codecs, crfQualityValues,
    getCrfQualityIcon,
    getEncodingPresetIcon,
    h264EncodingPresets, screenRecordingDir, showScreenRecordingNotification
} from "./utils";
import ScreenshotButton from "./ScreenshotButton";

export const [isRecording, isRecordingSetter] = createState(false)

const [selectedAudio, selectedAudioSetter] = createState<AudioSource | null>(null)
const [selectedCodec, selectedCodecSetter] = createState(codecs[0])
const [selectedEncodingPreset, selectedEncodingPresetSetter] = createState("medium")
const [selectedCrfQuality, selectedCrfQualitySetter] = createState(20)

export default function() {
    let audioRevealedSetter: Setter<boolean> | null = null
    let codecRevealedSetter: Setter<boolean> | null = null
    let encodingRevealedSetter: Setter<boolean> | null = null
    let crfRevealedSetter: Setter<boolean> | null = null

    const unsub = integratedScreenshotRevealed.subscribe(() => {
        if (integratedScreenshotRevealed.peek()) {
            selectedAudioSetter(null)
            selectedCodecSetter(codecs[0])
            selectedEncodingPresetSetter("medium")
            selectedCrfQualitySetter(20)
        }
    })
    onCleanup(unsub)

    return <box
        orientation={Gtk.Orientation.VERTICAL}>
        <label
            cssClasses={["labelLargeBold"]}
            marginBottom={8}
            label="Screen Record"/>
        <RevealerRow
            icon={selectedAudio.as((value) => {
                if (value === null) {
                    return "󰝟"
                } else {
                    return value.isMonitor ? "󰕾" : ""
                }
            })}
            iconOffset={0}
            setup={(revealed) => {
                audioRevealedSetter = revealed[1]
                const unsub = integratedScreenshotRevealed.subscribe(() => {
                    if (audioRevealedSetter !== null) audioRevealedSetter(false)
                })
                onCleanup(unsub)
            }}
            content={
                <label
                    cssClasses={["labelMediumBold"]}
                    halign={Gtk.Align.START}
                    hexpand={true}
                    ellipsize={Pango.EllipsizeMode.END}
                    label={selectedAudio.as((value) => {
                        if (value === null) {
                            return "No Audio"
                        } else {
                            return value.description
                        }
                    })}/>
            }
            revealedContent={
                <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    <OkButton
                        hexpand={true}
                        labelHalign={Gtk.Align.START}
                        ellipsize={Pango.EllipsizeMode.END}
                        label={`󰝟  No Audio`}
                        onClicked={() => {
                            selectedAudioSetter(null)
                            if (audioRevealedSetter !== null) {
                                audioRevealedSetter(false)
                            }
                        }}/>
                    <For each={audioOptions}>
                        {(option) => {
                            return <OkButton
                                hexpand={true}
                                labelHalign={Gtk.Align.START}
                                ellipsize={Pango.EllipsizeMode.END}
                                label={`${option.isMonitor ? "󰕾" : ""}  ${truncateString(option.description, 34)}`}
                                onClicked={() => {
                                    selectedAudioSetter(option)
                                    if (audioRevealedSetter !== null) {
                                        audioRevealedSetter(false)
                                    }
                                }}/>
                        }}
                    </For>
                </box>
            }
        />
        <RevealerRow
            icon="󰕧"
            iconOffset={0}
            setup={(revealed) => {
                codecRevealedSetter = revealed[1]
                const unsub = integratedScreenshotRevealed.subscribe(() => {
                    if (codecRevealedSetter !== null) codecRevealedSetter(false)
                })
                onCleanup(unsub)
            }}
            content={
                <label
                    cssClasses={["labelMediumBold"]}
                    halign={Gtk.Align.START}
                    hexpand={true}
                    ellipsize={Pango.EllipsizeMode.END}
                    label={selectedCodec.as((value) => {
                        return `${value.display} codec`
                    })}/>
            }
            revealedContent={
                <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    {codecs.map((value) => {
                        return <OkButton
                            hexpand={true}
                            labelHalign={Gtk.Align.START}
                            ellipsize={Pango.EllipsizeMode.END}
                            label={`󰕧  ${value.display}`}
                            onClicked={() => {
                                selectedCodecSetter(value)
                                if (codecRevealedSetter !== null) {
                                    codecRevealedSetter(false)
                                }
                            }}/>
                    })}
                </box>
            }
        />
        <RevealerRow
            icon={selectedEncodingPreset.as((value) => {
                return getEncodingPresetIcon(value)
            })}
            iconOffset={0}
            setup={(revealed) => {
                encodingRevealedSetter = revealed[1]
                const unsub = integratedScreenshotRevealed.subscribe(() => {
                    if (encodingRevealedSetter !== null) encodingRevealedSetter(false)
                })
                onCleanup(unsub)
            }}
            content={
                <label
                    cssClasses={["labelMediumBold"]}
                    halign={Gtk.Align.START}
                    hexpand={true}
                    ellipsize={Pango.EllipsizeMode.END}
                    label={selectedEncodingPreset.as((value) => {
                        return `${value.charAt(0).toUpperCase() + value.slice(1)} encoding speed`
                    })}/>
            }
            revealedContent={
                <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    {h264EncodingPresets.map((value) => {
                        return <OkButton
                            hexpand={true}
                            labelHalign={Gtk.Align.START}
                            ellipsize={Pango.EllipsizeMode.END}
                            label={`${getEncodingPresetIcon(value)}  ${value.charAt(0).toUpperCase() + value.slice(1)}`}
                            onClicked={() => {
                                selectedEncodingPresetSetter(value)
                                if (encodingRevealedSetter !== null) {
                                    encodingRevealedSetter(false)
                                }
                            }}/>
                    })}
                </box>
            }
        />
        <RevealerRow
            icon={selectedCrfQuality.as((value) => {
                return getCrfQualityIcon(value)
            })}
            iconOffset={0}
            setup={(revealed) => {
                crfRevealedSetter = revealed[1]
                const unsub = integratedScreenshotRevealed.subscribe(() => {
                    if (crfRevealedSetter !== null) crfRevealedSetter(false)
                })
                onCleanup(unsub)
            }}
            content={
                <label
                    cssClasses={["labelMediumBold"]}
                    halign={Gtk.Align.START}
                    hexpand={true}
                    ellipsize={Pango.EllipsizeMode.END}
                    label={selectedCrfQuality.as((value) => {
                        return `${value} CRF`
                    })}/>
            }
            revealedContent={
                <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    {crfQualityValues.map((value) => {
                        return <OkButton
                            hexpand={true}
                            labelHalign={Gtk.Align.START}
                            ellipsize={Pango.EllipsizeMode.END}
                            label={`${getCrfQualityIcon(value)}  ${value}`}
                            onClicked={() => {
                                selectedCrfQualitySetter(value)
                                if (crfRevealedSetter !== null) {
                                    crfRevealedSetter(false)
                                }
                            }}/>
                    })}
                </box>
            }
        />
        <box
            marginTop={8}
            halign={Gtk.Align.CENTER}
            orientation={Gtk.Orientation.VERTICAL}
            spacing={16}>
            <box
                spacing={32}
                orientation={Gtk.Orientation.HORIZONTAL}>
                <ScreenshotButton
                    sensitive={isRecording.as((r) => !r)}
                    icon={""}
                    label={"All"}
                    onClicked={() => {
                        isRecordingSetter(true)
                        const time = GLib.DateTime.new_now_local().format("%Y_%m_%d_%H_%M_%S")!
                        const path = `${screenRecordingDir}/${time}_record.mp4`
                        const audioParam = selectedAudio.peek() !== null ? `--audio=${selectedAudio.peek()!.name}` : ""
                        const command = `wf-recorder --file=${path} ${audioParam} -p preset=${selectedEncodingPreset.peek()} -p crf=${selectedCrfQuality.peek()} -c ${selectedCodec.peek().lib}`
                        console.log(command)
                        toggleIntegratedScreenshot()
                        execAsync(
                            [
                                "bash",
                                "-c",
                                `
                                sleep 0.7
                                ${command}
                                `
                            ]
                        ).catch((error) => {
                            console.error(error)
                        }).finally(() => {
                            isRecordingSetter(false)
                            showScreenRecordingNotification(path)
                        })
                    }}/>
                <ScreenshotButton
                    sensitive={isRecording.as((r) => !r)}
                    icon={"󰹑"}
                    label={"Monitor"}
                    onClicked={() => {
                        isRecordingSetter(true)
                        const time = GLib.DateTime.new_now_local().format("%Y_%m_%d_%H_%M_%S")!
                        const path = `${screenRecordingDir}/${time}_record.mp4`
                        const audioParam = selectedAudio.peek() !== null ? `--audio=${selectedAudio.peek()!.name}` : ""
                        const command = `wf-recorder --file=${path} -g "$(slurp -o)" ${audioParam} -p preset=${selectedEncodingPreset.peek()} -p crf=${selectedCrfQuality.peek()} -c ${selectedCodec.peek().lib}`
                        console.log(command)
                        toggleIntegratedScreenshot()
                        execAsync(
                            [
                                "bash",
                                "-c",
                                `
                                ${command}
                                `
                            ]
                        ).catch((error) => {
                            console.error(error)
                        }).finally(() => {
                            isRecordingSetter(false)
                            showScreenRecordingNotification(path)
                        })
                    }}/>
            </box>
            <box
                spacing={32}
                orientation={Gtk.Orientation.HORIZONTAL}>
                <ScreenshotButton
                    sensitive={isRecording.as((r) => !r)}
                    icon={""}
                    label={"Window"}
                    onClicked={() => {
                        isRecordingSetter(true)
                        const time = GLib.DateTime.new_now_local().format("%Y_%m_%d_%H_%M_%S")!
                        const path = `${screenRecordingDir}/${time}_record.mp4`
                        const audioParam = selectedAudio.peek() !== null ? `--audio=${selectedAudio.peek()!.name}` : ""
                        const command = `wf-recorder --file=${path} -g "$(${projectDir}/shellScripts/grabWindow)" ${audioParam} -p preset=${selectedEncodingPreset.peek()} -p crf=${selectedCrfQuality.peek()} -c ${selectedCodec.peek().lib}`
                        console.log(command)
                        toggleIntegratedScreenshot()
                        execAsync(
                            [
                                "bash",
                                "-c",
                                `
                                ${command}
                                `
                            ]
                        ).catch((error) => {
                            console.error(error)
                        }).finally(() => {
                            isRecordingSetter(false)
                            showScreenRecordingNotification(path)
                        })
                    }}/>
                <ScreenshotButton
                    sensitive={isRecording.as((r) => !r)}
                    icon={""}
                    label={"Area"}
                    onClicked={() => {
                        isRecordingSetter(true)
                        const time = GLib.DateTime.new_now_local().format("%Y_%m_%d_%H_%M_%S")!
                        const path = `${screenRecordingDir}/${time}_record.mp4`
                        const audioParam = selectedAudio.peek() !== null ? `--audio=${selectedAudio.peek()!.name}` : ""
                        const command = `wf-recorder --file=${path} -g "$(slurp)" ${audioParam} -p preset=${selectedEncodingPreset.peek()} -p crf=${selectedCrfQuality.peek()} -c ${selectedCodec.peek().lib}`
                        console.log(command)
                        toggleIntegratedScreenshot()
                        execAsync(
                            [
                                "bash",
                                "-c",
                                `
                                ${command}
                                `
                            ]
                        ).catch((error) => {
                            console.error(error)
                        }).finally(() => {
                            isRecordingSetter(false)
                            showScreenRecordingNotification(path)
                        })
                    }}/>
            </box>
        </box>
    </box>
}