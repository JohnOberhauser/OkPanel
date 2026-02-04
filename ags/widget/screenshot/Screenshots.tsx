import {Gtk} from "ags/gtk4"
import {execAsync} from "ags/process"
import Pango from "gi://Pango?version=1.0";
import {playCameraShutter} from "../utils/audio";
import RevealerRow from "../common/RevealerRow";
import OkButton from "../common/OkButton";
import {projectDir} from "../../app";
import {createState, onCleanup, Setter} from "ags";
import {integratedScreenshotRevealed, toggleIntegratedScreenshot} from "./IntegratedScreenshot";
import {
    delayOptions,
    generateFileName,
    getSaveTypeIcon,
    getSaveTypeLabel,
    SaveType,
    saveTypeValues,
    screenshotDir,
    showScreenshotNotification
} from "./utils";
import ScreenshotButton from "./ScreenshotButton";

const [delay, delaySetter] = createState(0)
const [saveType, saveTypeSetter] = createState(SaveType.BOTH)

export default function () {
    let delayRevealedSetter: Setter<boolean> | null = null
    let saveTypeRevealedSetter: Setter<boolean> | null = null

    return <box
        orientation={Gtk.Orientation.VERTICAL}>
        <label
            cssClasses={["labelLargeBold"]}
            marginBottom={8}
            label="Screenshot"/>
        <RevealerRow
            icon={"󰔛"}
            iconOffset={0}
            setup={(revealed) => {
                delayRevealedSetter = revealed[1]
                const unsub = integratedScreenshotRevealed.subscribe(() => {
                    if (delayRevealedSetter !== null) delayRevealedSetter(false)
                })
                onCleanup(unsub)
            }}
            content={
                <label
                    cssClasses={["labelMediumBold"]}
                    halign={Gtk.Align.START}
                    hexpand={true}
                    ellipsize={Pango.EllipsizeMode.END}
                    label={delay.as((value) => {
                        if (value === 1) {
                            return `Delay: ${value} second`
                        }
                        return `Delay: ${value} seconds`
                    })}/>
            }
            revealedContent={
                <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    {delayOptions.map((value) => {
                        return <OkButton
                            hexpand={true}
                            labelHalign={Gtk.Align.START}
                            ellipsize={Pango.EllipsizeMode.END}
                            label={`󰔛  ${value} seconds`}
                            onClicked={() => {
                                delaySetter(value)
                                if (delayRevealedSetter !== null) {
                                    delayRevealedSetter(false)
                                }
                            }}/>
                    })}
                </box>
            }/>
        <RevealerRow
            icon={saveType.as((value) => {
                return getSaveTypeIcon(value)
            })}
            iconOffset={0}
            setup={(revealed) => {
                saveTypeRevealedSetter = revealed[1]
                const unsub = integratedScreenshotRevealed.subscribe(() => {
                    if (saveTypeRevealedSetter !== null) saveTypeRevealedSetter(false)
                })
                onCleanup(unsub)
            }}
            content={
                <label
                    cssClasses={["labelMediumBold"]}
                    halign={Gtk.Align.START}
                    hexpand={true}
                    ellipsize={Pango.EllipsizeMode.END}
                    label={saveType.as((value) => {
                        return getSaveTypeLabel(value)
                    })}/>
            }
            revealedContent={
                <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    {saveTypeValues.map((value) => {
                        let label = `${getSaveTypeIcon(value)}  ${getSaveTypeLabel(value)}`
                        return <OkButton
                            hexpand={true}
                            labelHalign={Gtk.Align.START}
                            ellipsize={Pango.EllipsizeMode.END}
                            label={label}
                            onClicked={() => {
                                saveTypeSetter(value)
                                if (saveTypeRevealedSetter !== null) {
                                    saveTypeRevealedSetter(false)
                                }
                            }}/>
                    })}
                </box>
            }/>
        <box
            marginTop={8}
            orientation={Gtk.Orientation.VERTICAL}
            halign={Gtk.Align.CENTER}
            spacing={16}>
            <box
                spacing={32}
                orientation={Gtk.Orientation.HORIZONTAL}>
                <ScreenshotButton
                    icon={""}
                    label={"All"}
                    onClicked={() => {
                        toggleIntegratedScreenshot()
                        const dir = screenshotDir
                        const fileName = generateFileName()
                        const path = `${dir}/${fileName}`
                        const allDelay = Math.max(1, delay.peek())
                        execAsync(
                            [
                                "bash",
                                "-c",
                                `
                                        ${projectDir}/shellScripts/hyprshot -m all -o ${dir} -f ${fileName} -D ${allDelay} --save-type ${saveType.peek()}
                                `
                            ]
                        ).catch((error) => {
                            console.error(error)
                        }).finally(() => {
                            playCameraShutter()
                            showScreenshotNotification(path, saveType.peek())
                        })
                    }}/>
                <ScreenshotButton
                    icon={"󰹑"}
                    label={"Monitor"}
                    onClicked={() => {
                        toggleIntegratedScreenshot()
                        const dir = screenshotDir
                        const fileName = generateFileName()
                        const path = `${dir}/${fileName}`
                        let canceled = false
                        execAsync(
                            [
                                "bash",
                                "-c",
                                `
                                        ${projectDir}/shellScripts/hyprshot -m output -o ${dir} -f ${fileName} -D ${delay.peek()} --save-type ${saveType.peek().valueOf()}
                                `
                            ]
                        ).catch((error) => {
                            const message = typeof error === "string" ? error : error?.toString?.() ?? "";
                            if (message.includes("selection cancelled")) {
                                canceled = true;
                            }
                            console.error(error)
                        }).finally(() => {
                            if (!canceled) {
                                playCameraShutter()
                                showScreenshotNotification(path, saveType.peek())
                            }
                        })
                    }}/>
            </box>
            <box
                spacing={32}
                orientation={Gtk.Orientation.HORIZONTAL}>
                <ScreenshotButton
                    icon={""}
                    label={"Window"}
                    onClicked={() => {
                        toggleIntegratedScreenshot()
                        const dir = screenshotDir
                        const fileName = generateFileName()
                        const path = `${dir}/${fileName}`
                        let canceled = false
                        execAsync(
                            [
                                "bash",
                                "-c",
                                `
                                        ${projectDir}/shellScripts/hyprshot -m window -o ${dir} -f ${fileName} -D ${delay.peek()} --save-type ${saveType.peek().valueOf()}
                                `
                            ]
                        ).catch((error) => {
                            const message = typeof error === "string" ? error : error?.toString?.() ?? "";
                            if (message.includes("selection cancelled")) {
                                canceled = true;
                            }
                            console.error(error)
                        }).finally(() => {
                            if (!canceled) {
                                playCameraShutter()
                                showScreenshotNotification(path, saveType.peek())
                            }
                        })
                    }}/>
                <ScreenshotButton
                    icon={""}
                    label={"Area"}
                    onClicked={() => {
                        toggleIntegratedScreenshot()
                        const dir = screenshotDir
                        const fileName = generateFileName()
                        const path = `${dir}/${fileName}`
                        let canceled = false
                        execAsync(
                            [
                                "bash",
                                "-c",
                                `
                                        ${projectDir}/shellScripts/hyprshot -m region -o ${dir} -f ${fileName} -D ${delay.peek()} --save-type ${saveType.peek().valueOf()}
                                `
                            ]
                        ).catch((error) => {
                            const message = typeof error === "string" ? error : error?.toString?.() ?? "";
                            if (message.includes("selection cancelled")) {
                                canceled = true;
                            }
                            console.error(error)
                        }).finally(() => {
                            if (!canceled) {
                                playCameraShutter()
                                showScreenshotNotification(path, saveType.peek())
                            }
                        })
                    }}/>
            </box>
        </box>
    </box>
}
