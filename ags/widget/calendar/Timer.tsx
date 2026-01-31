import {Accessor, createComputed, createState, With} from "ags";
import {Astal, Gtk} from "ags/gtk4";
import GLib from "gi://GLib?version=2.0";
import OkButton, {OkButtonHorizontalPadding, OkButtonVerticalPadding} from "../common/OkButton";
import {interval, Timer} from "ags/time";
import {makeLoopingPlayer} from "./timerUpLoopPlayer";
import {variableConfig} from "../../config/config";
import {projectDir} from "../../app";
import CircularProgress from "../common/CircularProgress";
import {wireEntryFocus} from "../frame/keymodeUtils";

const [timerValue, timerValueSetter] = createState(0)
const [timerEntryVisible, timerEntryVisibleSetter] = createState(true)
const [timer, timerSetter] = createState<Timer | null>(null)
const player = makeLoopingPlayer()

export const timerText = createComputed([
    timerValue
], (value) => {
    return millisecondsToHMS(value)
})

export const timerTextVisible = createComputed([
    timerEntryVisible
], (entryVisible) => {
    return !entryVisible
})

let timerStartingValue = 0

const pad2 = (n: number) => n.toString().padStart(2, "0");

function digitsToHMS(digits: string) {
    const len = digits.length;
    const s = len >= 2 ? parseInt(digits.slice(-2), 10) : parseInt(digits || "0", 10);
    const m = len >= 4 ? parseInt(digits.slice(-4, -2), 10) : (len >= 3 ? parseInt(digits.slice(-3, -2), 10) : 0);
    const h = len > 4 ? parseInt(digits.slice(0, -4), 10) : 0;
    return { h, m, s, formatted: `${pad2(h)}:${pad2(m)}:${pad2(s)}` };
}

function attachTimerFormatter(entry: Gtk.Entry) {
    let suppress = false;
    let lastDigits = "";
    let lastFormatted = "";

    const applyTextDeferred = (text: string, pos: number) => {
        GLib.idle_add(GLib.PRIORITY_DEFAULT, () => {
            suppress = true;
            entry.set_text(text);
            entry.set_position(pos);
            suppress = false;
            return GLib.SOURCE_REMOVE;
        });
    };

    entry.connect("changed", (self) => {
        if (suppress) return;

        const raw = self.get_text();
        const digits = raw.replace(/\D/g, ""); // ignore non-digits entirely

        // If no digits, clear to keep placeholder visible
        if (digits.length === 0) {
            lastDigits = "";
            lastFormatted = "";
            applyTextDeferred("", 0);
            return;
        }

        // If digit content didn't change (e.g., user typed ":"), revert to last formatted
        if (digits === lastDigits) {
            if (raw !== lastFormatted) {
                applyTextDeferred(lastFormatted, lastFormatted.length);
            }
            return;
        }

        // New digit content -> format as [..h][mm][ss]
        const { formatted } = digitsToHMS(digits);
        lastDigits = digits;
        lastFormatted = formatted;
        applyTextDeferred(formatted, formatted.length); // simple caret: end
    });
}

export function millisecondsToHMS(totalMilliSeconds: number): string {
    if (!Number.isFinite(totalMilliSeconds)) totalMilliSeconds = 0;
    const ms = Math.max(0, Math.floor(totalMilliSeconds)); // clamp & integerize

    const hours   = Math.floor(ms / 3_600_000);              // 1000*60*60
    const minutes = Math.floor((ms % 3_600_000) / 60_000);   // 1000*60
    const seconds = Math.floor((ms % 60_000) / 1_000)

    const pad2 = (n: number) => n.toString().padStart(2, "0");
    return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

function getTimerSecondsFromEntry(entry: Gtk.Entry) {
    const digits = entry.get_text().replace(/\D/g, "");
    if (!digits) return timerValueSetter(0);
    const { h, m, s } = digitsToHMS(digits);
    const finalValue =  (h * 3600 + m * 60 + s) * 1000;
    timerValueSetter(finalValue)
    timerStartingValue = finalValue
}

function createTimer(): Timer {
    let skippedFirst = false
    return interval(100, () => {
        if (!skippedFirst && timerValue.get() !== 0) {
            skippedFirst = true
        } else if (timerValue.get() <= 100 && timerValue.get() !== 0) {
            timerValueSetter(timerValue.get() - 100)
            onTimerFinished()
        } else if (timerValue.get() <= 0) {
            onTimerFinished()
        } else {
            timerValueSetter(timerValue.get() - 100)
        }
    })
}

function onTimerFinished() {
    stopTimer()
    let path = variableConfig.sounds.timerSoundPath.get() !== ""
        ? variableConfig.sounds.timerSoundPath.get()
        : `${projectDir}/sounds/timer.ogg`
    player.start(path)
}

function stopTimer() {
    console.log("time done")
    timer.get()?.cancel()
    timerSetter(null)
}

function activateTimer(entry: Gtk.Entry) {
    getTimerSecondsFromEntry(entry)
    timerEntryVisibleSetter(false)
    timerSetter(createTimer())
}

function resumeTimer() {
    timerSetter(createTimer())
}

export function TimerPlayPauseStop(
    {
        hpadding,
        vpadding,
        foregroundCss = [],
        backgroundCss = [],
    }:
    {
        hpadding?: OkButtonHorizontalPadding | Accessor<OkButtonHorizontalPadding>,
        vpadding?: OkButtonVerticalPadding | Accessor<OkButtonVerticalPadding>,
        foregroundCss?: string[],
        backgroundCss?: string[],
    }
) {
    return <OkButton
        hpadding={hpadding}
        vpadding={vpadding}
        labelCss={foregroundCss}
        backgroundCss={backgroundCss}
        visible={timerTextVisible}
        onClicked={() => {
            if (player.isRunning.get()) {
                player.stop()
                timerValueSetter(timerStartingValue)
            } else if (timer.get() === null) {
                resumeTimer()
            } else {
                stopTimer()
            }
        }}
        label={createComputed([
            player.isRunning,
            timer
        ], (isRunning, timer) => {
            if (isRunning) {
                return ""
            } else if (timer === null) {
                return ""
            } else {
                return ""
            }
        })}/>
}

export function TimerDelete(
    {
        hpadding,
        vpadding,
        foregroundCss = [],
        backgroundCss = [],
    }:
    {
        hpadding?: OkButtonHorizontalPadding | Accessor<OkButtonHorizontalPadding>,
        vpadding?: OkButtonVerticalPadding | Accessor<OkButtonVerticalPadding>,
        foregroundCss?: string[],
        backgroundCss?: string[],
    }
) {
    return <OkButton
        hpadding={hpadding}
        vpadding={vpadding}
        labelCss={foregroundCss}
        backgroundCss={backgroundCss}
        visible={timerTextVisible}
        onClicked={() => {
            stopTimer()
            player.stop()
            timerEntryVisibleSetter(true)
            timerStartingValue = 0
            timerValueSetter(0)
        }}
        label={""}/>
}

export default function (
    {
        frameWindow,
    }: {
        frameWindow: Astal.Window,
    }
) {
    const entry = <entry
        marginTop={8}
        marginStart={30}
        cssClasses={["timerEntry", "labelXL"]}
        widthRequest={1}
        widthChars={8}
        hexpand={false}
        halign={Gtk.Align.CENTER}
        visible={timerEntryVisible}
        placeholderText="00:00:00"
        onActivate={() => {
            activateTimer(entry)
        }}
        inputPurpose={Gtk.InputPurpose.DIGITS}
        $={(self) => {
            attachTimerFormatter(self)
            wireEntryFocus(self, frameWindow)
        }}
    /> as Gtk.Entry

    timerEntryVisible.subscribe(() => {
        if (timerEntryVisible.peek()) {
            entry.set_text("")
        }
    })

    return <box
        hexpand={true}
        orientation={Gtk.Orientation.VERTICAL}
        halign={Gtk.Align.CENTER}
        spacing={10}>
        <label
            cssClasses={["labelLargeBold"]}
            label={"Timer"}/>
        <overlay
            $={(self) => {
                self.add_overlay(
                    <box
                        marginTop={70}
                        hexpand={true}
                        orientation={Gtk.Orientation.VERTICAL}
                        halign={Gtk.Align.CENTER}>
                        {entry}
                        <OkButton
                            labelCss={["labelXL"]}
                            visible={timerTextVisible}
                            label={timerText}
                        />
                        <box
                            orientation={Gtk.Orientation.HORIZONTAL}
                            halign={Gtk.Align.CENTER}
                            spacing={8}>
                            <TimerPlayPauseStop/>
                            <TimerDelete/>
                        </box>
                    </box> as Gtk.Widget
                )
            }}>
            <With value={variableConfig.theme.colors.foreground.asAccessor()}>
                {color =>
                    <CircularProgress
                        size={200}
                        color={color}
                        progress={timerValue.as(() => {
                            return timerValue.get() / timerStartingValue
                        })}/>
                }
            </With>
        </overlay>
    </box>
}