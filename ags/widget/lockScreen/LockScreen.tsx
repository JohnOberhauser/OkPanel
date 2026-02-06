import {Astal, Gdk, Gtk} from "ags/gtk4";
import Gtk4SessionLock from "gi://Gtk4SessionLock";
import {createRoot, createState, onCleanup} from "ags";
import AstalAuth from "gi://AstalAuth?version=0.1";
import {createPoll, timeout} from "ags/time";
import {resolveWallpaper} from "../wallpaper/getWallpaper";
import {createScaledTexture} from "../utils/images";
import {variableConfig} from "../../config/config";
import GLib from "gi://GLib?version=2.0";
import OkButton, {OkButtonSize} from "../common/OkButton";
import CircularInfiniteSpinner from "../common/CircularInfiniteSpinner";

const animationDuration = 400

export default function () {
    const pam = new AstalAuth.Pam()

    createRoot((dispose) => {
        const windows = new Map<Gdk.Monitor, Gtk.Window>();

        const textBuffer = new Gtk.EntryBuffer()
        const [entryCharactersVisible, entryCharactersVisibleSetter] = createState(false)
        const [screenRevealed, screenRevealedSetter] = createState(false)
        const [isAttemptingLogin, isAttemptingLoginSetter] = createState(false)

        const wallpaperPath = resolveWallpaper()

        const time = createPoll("", 1000, () => {
            const use24h = variableConfig.clockFormat24h.peek()
            let format: string

            format = use24h ? "%H:%M" : "%I:%M"

            return GLib.DateTime.new_now_local().format(format)!
        })

        const date = createPoll("", 1000, () => {
            let format = "%A, %B %-d"

            return GLib.DateTime.new_now_local().format(format)!
        })

        function LockScreen(
            monitor: Gdk.Monitor,
        ): Gtk.Window {
            return <window
                cssClasses={["lockScreenWindow"]}
                gdkmonitor={monitor}
                hexpand={true}
                vexpand={true}
                anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM |Astal.WindowAnchor.LEFT |Astal.WindowAnchor.RIGHT}
                exclusivity={Astal.Exclusivity.IGNORE}
                layer={Astal.Layer.OVERLAY}
                visible={false}
                keymode={Astal.Keymode.ON_DEMAND}>
                <box
                    hexpand={true}
                    vexpand={true}>
                    <revealer
                        hexpand={true}
                        vexpand={true}
                        transitionDuration={animationDuration}
                        transitionType={Gtk.RevealerTransitionType.CROSSFADE}
                        revealChild={screenRevealed}>
                        <overlay
                            $={(self) => {
                                self.add_overlay(
                                    <box
                                        halign={Gtk.Align.CENTER}
                                        hexpand={false}
                                        vexpand={true}
                                        marginTop={200}
                                        marginBottom={300}
                                        orientation={Gtk.Orientation.VERTICAL}>
                                        <label
                                            cssClasses={["lockScreenDate"]}
                                            label={date}/>
                                        <label
                                            cssClasses={["lockScreenClock"]}
                                            label={time}/>
                                        <box
                                            vexpand={true}/>
                                        <box
                                            visible={isAttemptingLogin.as((it) => !it)}
                                            cssClasses={["lockScreenEntryWrapper"]}
                                            orientation={Gtk.Orientation.HORIZONTAL}>
                                            <entry
                                                widthRequest={500}
                                                visibility={entryCharactersVisible}
                                                cssClasses={["lockScreenEntry"]}
                                                onActivate={() => {
                                                    isAttemptingLoginSetter(true)
                                                    pam.supply_secret(textBuffer.text)
                                                }}
                                                hexpand={false}
                                                buffer={textBuffer}
                                                $={(self) => {
                                                    self.set_alignment(0.5)
                                                    timeout(200, () => {
                                                        self.grab_focus()
                                                    })
                                                    const dispose = isAttemptingLogin.subscribe(() => {
                                                        if (isAttemptingLogin.peek()) return
                                                        timeout(200, () => {
                                                            self.grab_focus()
                                                        })
                                                    })
                                                    onCleanup(dispose)
                                                }}/>
                                            <OkButton
                                                labelCss={["lockScreenVisibilityButton"]}
                                                size={OkButtonSize.MEDIUM}
                                                offset={2}
                                                label={entryCharactersVisible.as((visible) => {
                                                    if (visible) {
                                                        return ""
                                                    } else {
                                                        return ""
                                                    }
                                                })}
                                                onClicked={() => {
                                                    entryCharactersVisibleSetter(!entryCharactersVisible.peek())
                                                }}/>
                                        </box>
                                        <CircularInfiniteSpinner
                                            size={40}
                                            trackAlpha={0}
                                            color={variableConfig.lockScreen.entryForeground.peek()}
                                            visible={isAttemptingLogin}/>
                                    </box> as Gtk.Box
                                )
                            }}>
                            <Gtk.Picture
                                contentFit={Gtk.ContentFit.COVER}
                                $={(self) => {
                                    if (wallpaperPath !== null) {
                                        const geometry = monitor.geometry
                                        createScaledTexture(geometry.width, geometry.height, wallpaperPath).then((texture) => {
                                            self.set_paintable(texture)
                                        })
                                    }
                                }}/>
                        </overlay>
                    </revealer>
                </box>
            </window> as Astal.Window
        }

        const lock = Gtk4SessionLock.Instance.new()

        function spawnWindow(
            monitor: Gdk.Monitor,
        ) {
            const win = LockScreen(monitor)
            // Hide cursor maybe
            // const cursor = Gdk.Cursor.new_from_name("none", null)
            // win.set_cursor(cursor)
            windows.set(monitor, win);
        }

        function lockScreen() {
            const display = Gdk.Display.get_default();

            for (let m = 0; m < (display?.get_monitors().get_n_items() ?? 0); m++) {
                const monitor = display?.get_monitors().get_item(m) as Gdk.Monitor;

                if (monitor) {
                    spawnWindow(monitor)
                }
            }

            display?.get_monitors()?.connect('items-changed', () => {
                for (let m = 0; m < (display?.get_monitors().get_n_items() ?? 0); m++) {
                    const monitor = display?.get_monitors().get_item(m) as Gdk.Monitor;

                    if (monitor && !windows.has(monitor)) {
                        spawnWindow(monitor)
                    }
                }
            });

            lock.lock()
            windows.forEach((window, monitor) => {
                lock.assign_window_to_monitor(window, monitor)
                window.show()
            })
            timeout(250, () => {
                screenRevealedSetter(true)
            })
            console.log("locking")
        }

        pam.connect("auth-prompt-visible", (auth, msg) => {
            console.log(`visible: ${msg}`)
        })

        pam.connect("auth-prompt-hidden", (auth, msg) => {
            console.log(`hidden: ${msg}`)
        })

        pam.connect("success", () => {
            console.log("success")
            screenRevealedSetter(false)
            timeout(animationDuration, () => {
                dispose()
                lock.unlock()
            })
        })

        pam.connect("fail", (auth, msg) => {
            console.log(`fail: ${msg}`)
            textBuffer.set_text("", -1)
            isAttemptingLoginSetter(false)
            pam.start_authenticate()
        })

        pam.connect("auth-error", (auth, msg) => {
            console.log(`error: ${msg}`)
        })

        lockScreen()

        pam.start_authenticate()
    })
}