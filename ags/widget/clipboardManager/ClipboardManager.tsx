import {execAsync} from "ags/process";
import {Gtk} from "ags/gtk4";
import OkButton, {OkButtonHorizontalPadding} from "../common/OkButton";
import AsyncClipboardPicture from "./AsyncClipboardPicture";
import AsyncClipboardLabel from "./AsyncClipboardLabel";
import {projectDir} from "../../app";
import {createState} from "ags";
import GLib from "gi://GLib?version=2.0";
import Gio from "gi://Gio?version=2.0";
import {monitorFile} from "ags/file";
import {timeout, Timer} from "ags/time";
import {toggleIntegratedClipboardManager} from "./IntegratedClipboardManager";
import {AnimatedFor} from "../common/AnimatedFor";

let cliphistStarted = false

type Entry = {
    number: number;
    value: string;
};

const [clipboardEntries, clipboardEntriesSetting] = createState<Entry[]>([])

function getImageType(entry: Entry): string | null {
    const pattern = /^\[\[ binary data (\d+(?:\.\d+)?) ([A-Za-z]+) ([a-z0-9]+) (\d+)x(\d+) \]\]$/;

    const match = entry.value.match(pattern);

    if (match) {
        return match[3].toLowerCase()
    } else {
        return null
    }
}

// starts cliphist.  Defaults are from the ~/.config/cliphist/config file which is
// created by the okpanel run command.
export function startCliphist() {
    if (cliphistStarted) {
        return
    }
    cliphistStarted = true
    console.log("Starting cliphist...")

    // text
    execAsync(`${projectDir}/shellScripts/cliphistStore.sh`)
        .catch((error) => {
            console.error(error)
        })

    // images
    execAsync(["bash", "-c", `wl-paste --type image --watch cliphist store`])
        .catch((error) => {
            console.error(error)
        })

    watchForUpdates()
}

let monitor: Gio.FileMonitor | null = null

function watchForUpdates() {
    if (monitor !== null) return
    console.log("creating clipboard file monitor")
    const dbPath =
        GLib.getenv("CLIPHIST_DB_PATH") ||
        `${GLib.getenv("XDG_CACHE_HOME") ?? `${GLib.get_home_dir()}/.cache`}/cliphist/db`;

    let debounceTimer: Timer | null = null

    monitor = monitorFile(dbPath, (file, event) => {
        if (event === Gio.FileMonitorEvent.CHANGED) {
            if (debounceTimer) debounceTimer.cancel()

            debounceTimer = timeout(200, () => {
                debounceTimer = null
                updateClipboardEntries()
            })
        }
        // For some reason when wiping, cliphist "renames" the file.  Probably then deletes it and creates a new one.
        // Just reset to fix the issue
        if (event === Gio.FileMonitorEvent.RENAMED) {
            monitor?.cancel()
            monitor = null
            timeout(200, () => {
                watchForUpdates()
            })
        }
    })
}

export function updateClipboardEntries() {
    execAsync(["bash", "-c", `cliphist list`])
        .catch((error) => {
            console.error(`updateClipboardEntries error: ${error}`)
        })
        .then((value) => {
            if (typeof value !== "string") {
                return
            }

            if (value.trim() === "") {
                clipboardEntriesSetting([])
                return
            }

            const entries: Entry[] = value
                .split("\n")
                .map(line => {
                    const [numStr, ...textParts] = line.split("\t");
                    return {
                        number: parseInt(numStr, 10),
                        value: textParts.join("\t").trim()
                    };
                });

            clipboardEntriesSetting(entries)
    })
}

function copyEntry(entry: Entry) {
    const imageType = getImageType(entry)
    if (imageType !== null) {
        execAsync(["bash", "-c", `cliphist decode ${entry.number} | wl-copy --type image/${imageType}`])
            .catch((error) => {
                console.error(error)
            })
    } else {
        execAsync(["bash", "-c", `cliphist decode ${entry.number} | wl-copy`])
            .catch((error) => {
                console.error(error)
            })
    }
}

function deleteEntry(entry: Entry) {
    console.log(`deleting cliphist entry:\n${entry.number}\n${entry.value}`)
    execAsync(["bash", "-c", `echo ${entry.number} | cliphist delete`])
        .catch((error) => {
            console.error(error)
        })
}

function wipeHistory() {
    console.log("wiping cliphist")
    execAsync(`cliphist wipe`)
        .catch((error) => {
            console.error(error)
        })
}

export function ClipboardManagerContent() {
    return <box
        orientation={Gtk.Orientation.VERTICAL}>
        <box
            visible={clipboardEntries.as((e) => e.length !== 0)}
            marginBottom={16}>
            <OkButton
                hexpand={true}
                label="Delete all"
                primary={true}
                onClicked={() => {
                    wipeHistory()
                }}/>
        </box>
        <AnimatedFor
            spacing={10}
            each={clipboardEntries}
            id={(it) => it.number}
            reverse={true}
            emptyState={
                <label
                    visible={clipboardEntries.as((e) => e.length === 0)}
                    hexpand={true}
                    halign={Gtk.Align.CENTER}
                    label="Empty"
                    cssClasses={["labelMedium"]}/>
            }>
            {(entry) => {
                const imageType = getImageType(entry)
                const isImage = imageType !== null

                let content

                if (isImage) {
                    content = <AsyncClipboardPicture
                        cliphistId={entry.number}/>
                } else {
                    content = <AsyncClipboardLabel
                        cliphistId={entry.number}/>
                }

                return <overlay
                    $={(self) => {
                        self.add_overlay(
                            <OkButton
                                halign={Gtk.Align.END}
                                marginTop={8}
                                marginEnd={8}
                                hpadding={OkButtonHorizontalPadding.THIN}
                                valign={Gtk.Align.START}
                                label=""
                                onClicked={() => {
                                    deleteEntry(entry)
                                }}/> as Gtk.Widget
                        )
                    }}>
                    <button
                        cssClasses={["clipboardItemButtonWrapper"]}
                        onClicked={() => {
                            copyEntry(entry)
                            toggleIntegratedClipboardManager()
                        }}>
                        <box
                            cssClasses={["clipboardItem"]}
                            orientation={Gtk.Orientation.VERTICAL}
                            spacing={10}>
                            <label
                                marginTop={4}
                                halign={Gtk.Align.START}
                                hexpand={true}
                                cssClasses={["labelSmallBold", "colorPrimary"]}
                                label={`#${entry.number}`}/>
                            {content}
                        </box>
                    </button>
                </overlay>
            }}
        </AnimatedFor>
    </box>
}

export default function () {
    updateClipboardEntries()

    return <box
        cssClasses={["clipboardBox"]}
        orientation={Gtk.Orientation.VERTICAL}>
        <label
            marginBottom={16}
            cssClasses={["labelMedium"]}
            label="Clipboard History"/>
        <ClipboardManagerContent/>
    </box>
}