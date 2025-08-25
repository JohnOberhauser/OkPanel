import Hyprland from "gi://AstalHyprland"
import Calendar, {CalendarWindowName} from "../calendar/Calendar"
import Wp from "gi://AstalWp"
import Battery from "gi://AstalBattery"
import {getMicrophoneIcon, getVolumeIcon, playBatteryWarning} from "../utils/audio"
import {getNetworkIconBinding} from "../utils/network"
import {getBatteryIcon} from "../utils/battery"
import {SystemMenuWindowName} from "../systemMenu/SystemMenuWindow";
import Bluetooth from "gi://AstalBluetooth"
import {activeVpnConnections} from "../systemMenu/widgets/NetworkControls";
import {isRecording, ScreenshotWindowName} from "../screenshot/Screenshot";
import Divider from "../common/Divider";
import {variableConfig} from "../../config/config";
import Tray from "gi://AstalTray"
import {addWindowOneOff, registerWindow, toggleWindow} from "../utils/windows";
import {AppLauncherWindowName} from "../appLauncher/AppLauncher";
import {ClipboardManagerWindowName, startCliphist} from "../clipboardManager/ClipboardManager";
import PowerProfiles from "gi://AstalPowerProfiles"
import {getPowerProfileIconBinding} from "../utils/powerProfile";
import CavaWaveform from "../cava/CavaWaveform";
import {getCavaFlipStartValue} from "../utils/cava";
import {Mpris} from "../utils/mpris";
import MprisControlButtons from "../mpris/MprisControlButtons";
import MprisTrackInfo from "../mpris/MprisTrackInfo";
import {Bar, selectedBar} from "../../config/bar";
import Notifd from "gi://AstalNotifd"
import {NotificationHistoryWindowName} from "../notification/NotificationHistoryWindow";
import {BarWidget} from "../../config/schema/definitions/barWidgets";
import Gtk from "gi://Gtk?version=4.0";
import OkButton, {OkButtonHorizontalPadding, OkButtonSize, OkButtonVerticalPadding} from "../common/OkButton";
import {createBinding, createComputed, createState, For, With, createRoot} from "ags";
import {createPoll} from "../../../../../../../usr/share/ags/js/lib/time";
import GLib from "gi://GLib?version=2.0";
import {runColorPicker} from "../utils/colorPicker";
import {lock, logout, restart, shutdown} from "../utils/powerOptions";
import {execAsync} from "ags/process";
import {integratedMenuRevealed, integratedMenuRevealedSetting} from "./IntegratedMenu";
import App from "ags/gtk4/app"

const tray = Tray.get_default()

export function getHPadding(vertical: boolean) {
    return vertical ?
        variableConfig.verticalBar.compact.asAccessor().as((c) => c ? OkButtonHorizontalPadding.THIN : OkButtonHorizontalPadding.STANDARD)
        : OkButtonHorizontalPadding.THIN
}

export function getVPadding(vertical: boolean) {
    return vertical ? OkButtonVerticalPadding.STANDARD :
        variableConfig.horizontalBar.compact.asAccessor().as((c) => c ? OkButtonVerticalPadding.THIN : OkButtonVerticalPadding.STANDARD)
}

function MenuButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barMenuForeground"]}
        backgroundCss={["barMenuBackground"]}
        offset={variableConfig.theme.bars.menu.iconOffset.asAccessor()}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label={variableConfig.theme.bars.menu.icon.asAccessor()}
        onClicked={() => {
            const barIsVertical = selectedBar.get() === Bar.LEFT || selectedBar.get() === Bar.RIGHT
            if (barIsVertical && variableConfig.verticalBar.integratedMenu.get()) {
                integratedMenuRevealedSetting(!integratedMenuRevealed.get())
            } else {
                toggleWindow(SystemMenuWindowName)
            }
        }}/>
}

function groupByProperty(
    array: Hyprland.Workspace[],
): Hyprland.Workspace[][] {
    const map = new Map<Hyprland.Monitor, Hyprland.Workspace[]>();

    array.forEach((item) => {
        const key = item.monitor;
        if (key === null) {
            return
        }
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.unshift(item);
    });

    return Array.from(map.values()).sort((a, b) => {
        return a[0].monitor.id - b[0].monitor.id
    });
}

function Workspaces({vertical}: { vertical: boolean }) {
    const hypr = Hyprland.get_default()
    const hyprlandWorkspaces = createBinding(hypr, "workspaces")
    return <box
        cssClasses={["barWorkspacesBackground", "radiusSmall"]}
        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
        <With value={hyprlandWorkspaces}>
            {(workspaces) => {
                const groupedWorkspaces = groupByProperty(workspaces)
                return <box>
                    {groupedWorkspaces.map((workspaceGroup, index) => {
                        return <box
                            orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
                            {index > 0 && index < groupedWorkspaces.length &&
                                <Divider
                                    thin={true}
                                    marginStart={4}
                                    marginEnd={4}/>
                            }
                            {workspaceGroup.sort((a, b) => {
                                return a.id - b.id
                            }).map((workspace: Hyprland.Workspace) => {
                                let labelCss = createComputed([
                                    createBinding(workspace.monitor, "activeWorkspace"),
                                ], (w: Hyprland.Workspace) => {
                                    const isActive = w?.id === workspace.id
                                    return isActive ? ["barWorkspacesForeground"] : ["barWorkspacesInactiveForeground"]
                                })

                                let offset = createComputed([
                                    createBinding(workspace.monitor, "activeWorkspace"),
                                    variableConfig.theme.bars.workspaces.activeOffset.asAccessor(),
                                    variableConfig.theme.bars.workspaces.inactiveOffset.asAccessor()
                                ], (w: Hyprland.Workspace, activeOffset, inactiveOffset) => {
                                    const isActive = w?.id === workspace.id
                                    return isActive ? activeOffset : inactiveOffset
                                })

                                let label = createComputed([
                                    createBinding(workspace.monitor, "activeWorkspace"),
                                    variableConfig.theme.bars.workspaces.activeIcon.asAccessor(),
                                    variableConfig.theme.bars.workspaces.inactiveIcon.asAccessor()
                                ], (w: Hyprland.Workspace, activeIcon, inactiveIcon) => {
                                    const isActive = w?.id === workspace.id
                                    return isActive ? activeIcon : inactiveIcon
                                })

                                let size = createComputed([
                                    createBinding(workspace.monitor, "activeWorkspace"),
                                    variableConfig.theme.bars.workspaces.largeActive.asAccessor()
                                ], (w: Hyprland.Workspace, isLarge) => {
                                    const isActive = w?.id === workspace.id
                                    return isActive && isLarge ? OkButtonSize.LARGE : OkButtonSize.SMALL
                                })

                                return <OkButton
                                    labelCss={labelCss.get()}
                                    backgroundCss={["barWorkspaceButtonBackground"]}
                                    offset={offset}
                                    hpadding={getHPadding(vertical)}
                                    vpadding={getVPadding(vertical)}
                                    label={label}
                                    size={size}
                                    onClicked={() => {
                                        hypr.dispatch("workspace", `${workspace.id}`)
                                    }}/>
                            })}
                        </box>
                    })}
                </box>
            }}
        </With>
    </box>
}

function Clock({vertical}: { vertical: boolean }) {
    let format: string

    if (vertical) {
        format = "%I\n%M"
    } else {
        format = "%I:%M"
    }

    const time = createPoll("", 1000, () =>
        GLib.DateTime.new_now_local().format(format)!)

    return <OkButton
        labelCss={["barClockForeground"]}
        backgroundCss={["barClockBackground"]}
        hexpand={vertical}
        hpadding={vertical ? OkButtonHorizontalPadding.NONE : OkButtonHorizontalPadding.THIN}
        vpadding={getVPadding(vertical)}
        label={time}
        onClicked={() => {
            addWindowOneOff(() => Calendar())
        }}/>
}

function VpnIndicator({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barVpnIndicatorForeground"]}
        backgroundCss={["barVpnIndicatorBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label="󰯄"
        visible={activeVpnConnections.as((connections) => {
            return connections.length !== 0
        })}/>
}

function ScreenRecordingStopButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barRecordingIndicatorForeground"]}
        backgroundCss={["barRecordingIndicatorBackground"]}
        offset={2}
        warning={true}
        label=""
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        visible={isRecording}
        onClicked={() => {
            execAsync("pkill wf-recorder")
                .catch((error) => {
                    console.error(error)
                })
        }}/>
}

function AudioOut({vertical}: { vertical: boolean }) {
    const defaultSpeaker = Wp.get_default()!.audio.default_speaker

    const speakerVar = createComputed([
        createBinding(defaultSpeaker, "description"),
        createBinding(defaultSpeaker, "volume"),
        createBinding(defaultSpeaker, "mute")
    ])

    return <OkButton
        labelCss={["barAudioOutForeground"]}
        backgroundCss={["barAudioOutBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label={speakerVar(() => getVolumeIcon(defaultSpeaker))}/>
}

function AudioIn({vertical}: { vertical: boolean }) {
    const {defaultMicrophone} = Wp.get_default()!.audio

    const micVar = createComputed([
        createBinding(defaultMicrophone, "description"),
        createBinding(defaultMicrophone, "volume"),
        createBinding(defaultMicrophone, "mute")
    ])

    return <OkButton
        labelCss={["barAudioInForeground"]}
        backgroundCss={["barAudioInBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label={micVar(() => getMicrophoneIcon(defaultMicrophone))}/>
}

function BluetoothIndicator({vertical}: { vertical: boolean }) {
    const bluetooth = Bluetooth.get_default()

    return <OkButton
        labelCss={["barBluetoothForeground"]}
        backgroundCss={["barBluetoothBackground"]}
        label="󰂯"
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        visible={createBinding(bluetooth, "isPowered").as((isPowered) => {
            return isPowered
        })}/>
}

function NetworkIndicator({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barNetworkForeground"]}
        backgroundCss={["barNetworkBackground"]}
        offset={1}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label={getNetworkIconBinding()}/>
}

function BatteryIndicator({vertical}: { vertical: boolean }) {
    const battery = Battery.get_default()

    let batteryWarningInterval: GLib.Source | null = null

    const batteryVar = createComputed([
        createBinding(battery, "percentage"),
        createBinding(battery, "state")
    ])

    return <OkButton
        labelCss={["barBatteryForeground"]}
        backgroundCss={["barBatteryBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        warning={batteryVar((value) => {
            if (value[0] > 0.04 || battery.state === Battery.State.CHARGING) {
                if (batteryWarningInterval != null) {
                    batteryWarningInterval.destroy()
                    batteryWarningInterval = null
                }
                return false
            } else {
                if (batteryWarningInterval === null && battery.isBattery) {
                    batteryWarningInterval = setInterval(() => {
                        playBatteryWarning()
                    }, 120_000)
                    playBatteryWarning()
                }
                return true
            }
        })}
        label={batteryVar(() => getBatteryIcon(battery))}
        visible={createBinding(battery, "isBattery")}/>
}

function IntegratedTray({vertical}: { vertical: boolean }) {
    const collapsable = createComputed([
        variableConfig.verticalBar.tray.collapsable.asAccessor(),
        variableConfig.horizontalBar.tray.collapsable.asAccessor(),
    ], (vCollapse, hCollapse) => {
        return ((vertical && vCollapse) ||
            (!vertical && hCollapse));
    })

    return <box>
        <With value={collapsable}>
            {(collapse) => {
                if (collapse) {
                    const [revealed, revealedSetter] = createState(false)
                    return <box
                        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
                        <revealer
                            revealChild={revealed}>
                            <TrayContent vertical={vertical}/>
                        </revealer>
                        <OkButton
                            labelCss={["barTrayForeground"]}
                            backgroundCss={["barTrayBackground"]}
                            hpadding={getHPadding(vertical)}
                            vpadding={getVPadding(vertical)}
                            offset={1}
                            visible={createBinding(tray, "items").as((items) => items.length > 0)}
                            label={"󱊔"}
                            onClicked={() => {
                                revealedSetter(!revealed.get())
                            }}/>
                    </box>
                } else {
                    return <TrayContent vertical={vertical}/>
                }
            }}
        </With>
    </box>
}

function TrayContent({vertical}: { vertical: boolean }) {
    return <box
        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}
        visible={createBinding(tray, "items").as((items) => items.length > 0)}>
        <For each={createBinding(tray, "items")}>
            {(item: Tray.TrayItem) => {
                if (item.id === null) {
                    return <box/>
                }
                let ag_handler: number;

                const menuButton = <menubutton
                    cssClasses={["trayMenuButton"]}
                    tooltipMarkup={createBinding(item, "tooltipMarkup")}
                    menuModel={createBinding(item, "menuModel")}
                    onDestroy={() => item.disconnect(ag_handler)}
                    $={self => {
                        ag_handler = item.connect("notify::action-group", () => {
                            self.insert_action_group("dbusmenu", item.get_action_group())
                        })
                    }}>
                    <image gicon={createBinding(item, "gicon")}/>
                </menubutton> as Gtk.MenuButton

                menuButton.insert_action_group("dbusmenu", item.get_action_group())

                return menuButton
            }}
        </For>
    </box>
}

function AppLauncherButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barAppLauncherForeground"]}
        backgroundCss={["barAppLauncherBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label="󰀻"
        onClicked={() => {
            toggleWindow(AppLauncherWindowName)
        }}/>
}

function ScreenshotButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barScreenshotForeground"]}
        backgroundCss={["barScreenshotBackground"]}
        offset={2}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label="󰹑"
        onClicked={() => {
            toggleWindow(ScreenshotWindowName)
        }}/>
}

function ClipboardManagerButton({vertical}: { vertical: boolean }) {
    startCliphist()
    return <OkButton
        labelCss={["barClipboardManagerForeground"]}
        backgroundCss={["barClipboardManagerBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label=""
        onClicked={() => {
            toggleWindow(ClipboardManagerWindowName)
        }}/>
}

function PowerProfileIndicator({vertical}: { vertical: boolean }) {
    const profiles = PowerProfiles.get_default().get_profiles()
    return <OkButton
        labelCss={["barPowerProfileForeground"]}
        backgroundCss={["barPowerProfileBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        visible={profiles.length !== 0}
        label={getPowerProfileIconBinding()}/>
}

function CavaBars({vertical}: { vertical: boolean }) {
    const mpris = Mpris.get_default()

    return <box
        vexpand={!vertical}
        hexpand={vertical}
        cssClasses={["barCavaWaveformBackground", "radiusSmall"]}>
        <With value={mpris.players[0]}>
            {(players => {
                if (players.length === 0) {
                    return <box/>
                }

                const compactFunction = (c: boolean) => {
                    if (c) {
                        return <CavaWaveform
                            color={variableConfig.theme.bars.cava_waveform.foreground.asAccessor()}
                            marginStart={vertical ? 0 : 20}
                            marginEnd={vertical ? 0 : 20}
                            marginTop={vertical ? 20 : 0}
                            marginBottom={vertical ? 20 : 0}
                            vertical={vertical}
                            flipStart={getCavaFlipStartValue(vertical)}
                            intensity={vertical ? variableConfig.verticalBar.cava_waveform.intensityMultiplier.asAccessor() : variableConfig.horizontalBar.cava_waveform.intensityMultiplier.asAccessor()}
                            expand={vertical ? variableConfig.verticalBar.cava_waveform.expanded.asAccessor() : variableConfig.horizontalBar.cava_waveform.expanded.asAccessor()}
                            length={vertical ? variableConfig.verticalBar.cava_waveform.length.asAccessor() : variableConfig.horizontalBar.cava_waveform.length.asAccessor()}
                            size={30}/>
                    } else {
                        return <CavaWaveform
                            color={variableConfig.theme.bars.cava_waveform.foreground.asAccessor()}
                            marginStart={vertical ? 0 : 20}
                            marginEnd={vertical ? 0 : 20}
                            marginTop={vertical ? 20 : 0}
                            marginBottom={vertical ? 20 : 0}
                            vertical={vertical}
                            flipStart={getCavaFlipStartValue(vertical)}
                            intensity={vertical ? variableConfig.verticalBar.cava_waveform.intensityMultiplier.asAccessor() : variableConfig.horizontalBar.cava_waveform.intensityMultiplier.asAccessor()}
                            expand={vertical ? variableConfig.verticalBar.cava_waveform.expanded.asAccessor() : variableConfig.horizontalBar.cava_waveform.expanded.asAccessor()}
                            length={vertical ? variableConfig.verticalBar.cava_waveform.length.asAccessor() : variableConfig.horizontalBar.cava_waveform.length.asAccessor()}
                            size={40}/>
                    }
                }

                return <box
                    vexpand={!vertical}
                    hexpand={vertical}>
                    {vertical ? <With value={variableConfig.verticalBar.compact.asAccessor()}>
                        {(c) => compactFunction(c)}
                    </With>
                    : <With value={variableConfig.horizontalBar.compact.asAccessor()}>
                            {(c) => compactFunction(c)}
                    </With>}
                </box>
            })}
        </With>
    </box>
}

function MprisControls({vertical}: { vertical: boolean }) {
    const mpris = Mpris.get_default()
    return <box
        cssClasses={["barMprisControlsBackground", "radiusSmall"]}>
        <With value={mpris.players[0]}>
            {(players) => {
                const player = players.find((player) => player.isPrimaryPlayer)

                if (player === undefined) {
                    return <box/>
                }

                return <MprisControlButtons
                    player={player}
                    vertical={vertical}
                    foregroundCss={["barMprisControlsForeground"]}
                    backgroundCss={["barMprisControlsButtonBackground"]}/>
            }}
        </With>
    </box>
}

function MprisTrackInfoBarWidget({vertical}: { vertical: boolean }) {
    const mpris = Mpris.get_default()
    return <box
        cssClasses={["barMprisTrackInfoBackground", "radiusSmall"]}>
        <With value={mpris.players[0]}>
            {(players) => {
                const player = players.find((player) => player.isPrimaryPlayer)

                if (player === undefined) {
                    return <box/>
                }

                return <MprisTrackInfo
                    compact={vertical ? variableConfig.verticalBar.compact.asAccessor() : variableConfig.horizontalBar.compact.asAccessor()}
                    player={player}
                    vertical={vertical}
                    flipped={selectedBar.asAccessor().as((bar) => {
                        return bar === Bar.RIGHT
                    })}/>
            }}
        </With>
    </box>
}

function MprisPrimaryPlayerSwitcher({vertical}: { vertical: boolean }) {
    const mpris = Mpris.get_default()

    return <box>
        <With value={mpris.players[0]}>
            {(players) => {
                if (players.length <= 1) {
                    return <box/>
                }

                return <OkButton
                    labelCss={["barMprisPrimaryPlayerSwitcherForeground"]}
                    backgroundCss={["barMprisPrimaryPlayerSwitcherBackground"]}
                    offset={2}
                    hpadding={getHPadding(vertical)}
                    vpadding={getVPadding(vertical)}
                    label=""
                    onClicked={() => {
                        mpris.rotatePrimaryPlayer()
                    }}/>
            }}
        </With>
    </box>
}

function NotificationButton({vertical}: { vertical: boolean }) {
    const notifications = Notifd.get_default()

    const notificationIcon = createComputed([
        createBinding(notifications, "dontDisturb")
    ], (doNotDisturb) => {
        if (doNotDisturb) {
            return "󰂛"
        } else{
            return "󰂚"
        }
    })

    const notificationIconOffset = createComputed([
        createBinding(notifications, "dontDisturb")
    ], (doNotDisturb) => {
        if (doNotDisturb) {
            return 2
        } else{
            return 1
        }
    })

    const visible = createComputed([
        createBinding(notifications, "notifications")
    ], (notificationsList) => {
        return notificationsList.length > 0
    })

    return <overlay
        $={(self) => {
            self.add_overlay(
                <box
                    canTarget={false}
                    canFocus={false}
                    hexpand={false}
                    vexpand={false}
                    visible={visible}
                    cssClasses={["notificationIndicator"]}
                    halign={Gtk.Align.CENTER}
                    valign={Gtk.Align.CENTER}
                    widthRequest={7}
                    heightRequest={7}
                    marginStart={6}
                    marginBottom={6}
                /> as Gtk.Box
            )
        }}>
        <OkButton
            labelCss={["barNotificationHistoryForeground"]}
            backgroundCss={["barNotificationHistoryBackground"]}
            offset={notificationIconOffset}
            hpadding={getHPadding(vertical)}
            vpadding={getVPadding(vertical)}
            label={notificationIcon}
            onClicked={() => {
                toggleWindow(NotificationHistoryWindowName)
            }}/>
    </overlay>
}

function ColorPickerButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barColorPickerForeground"]}
        backgroundCss={["barColorPickerBackground"]}
        offset={2}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label=""
        onClicked={() => {
            runColorPicker().catch((error) => console.log(error))
        }}/>
}

function LogoutButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barLogoutForeground"]}
        backgroundCss={["barLogoutBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label="󰍃"
        onClicked={() => {
            logout()
        }}/>
}

function LockButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barLockForeground"]}
        backgroundCss={["barLockBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label=""
        onClicked={() => {
            lock()
        }}/>
}

function RestartButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barRestartForeground"]}
        backgroundCss={["barRestartBackground"]}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label=""
        onClicked={() => {
            restart()
        }}/>
}

function ShutdownButton({vertical}: { vertical: boolean }) {
    return <OkButton
        labelCss={["barShutdownForeground"]}
        backgroundCss={["barShutdownBackground"]}
        offset={1}
        hpadding={getHPadding(vertical)}
        vpadding={getVPadding(vertical)}
        label="⏻"
        onClicked={() => {
            shutdown()
        }}/>
}

export function addWidgets(widgets: BarWidget[], isVertical: boolean) {
    const schema = isVertical ? variableConfig.verticalBar : variableConfig.horizontalBar
    return widgets.map((widget) => {
        return <box
            marginTop={schema[widget].marginTop.asAccessor()}
            marginBottom={schema[widget].marginBottom.asAccessor()}
            marginStart={schema[widget].marginStart.asAccessor()}
            marginEnd={schema[widget].marginEnd.asAccessor()}>
            {getWidget(widget, isVertical)}
        </box>
    })
}

function getWidget(widget: BarWidget, isVertical: boolean) {
    switch (widget) {
        case BarWidget.MENU:
            return <MenuButton vertical={isVertical}/>
        case BarWidget.WORKSPACES:
            return <Workspaces vertical={isVertical}/>
        case BarWidget.CLOCK:
            return <Clock vertical={isVertical}/>
        case BarWidget.AUDIO_OUT:
            return <AudioOut vertical={isVertical}/>
        case BarWidget.AUDIO_IN:
            return <AudioIn vertical={isVertical}/>
        case BarWidget.BLUETOOTH:
            return <BluetoothIndicator vertical={isVertical}/>
        case BarWidget.NETWORK:
            return <NetworkIndicator vertical={isVertical}/>
        case BarWidget.BATTERY:
            return <BatteryIndicator vertical={isVertical}/>
        case BarWidget.TRAY:
            return <IntegratedTray vertical={isVertical}/>
        case BarWidget.APP_LAUNCHER:
            return <AppLauncherButton vertical={isVertical}/>
        case BarWidget.SCREENSHOT:
            return <ScreenshotButton vertical={isVertical}/>
        case BarWidget.CLIPBOARD_MANAGER:
            return <ClipboardManagerButton vertical={isVertical}/>
        case BarWidget.POWER_PROFILE:
            return <PowerProfileIndicator vertical={isVertical}/>
        case BarWidget.LOCK:
            return <LockButton vertical={isVertical}/>
        case BarWidget.LOGOUT:
            return <LogoutButton vertical={isVertical}/>
        case BarWidget.RESTART:
            return <RestartButton vertical={isVertical}/>
        case BarWidget.SHUTDOWN:
            return <ShutdownButton vertical={isVertical}/>
        case BarWidget.CAVA_WAVEFORM:
            return <CavaBars vertical={isVertical}/>
        case BarWidget.VPN_INDICATOR:
            return <VpnIndicator vertical={isVertical}/>
        case BarWidget.RECORDING_INDICATOR:
            return <ScreenRecordingStopButton vertical={isVertical}/>
        case BarWidget.MPRIS_CONTROLS:
            return <MprisControls vertical={isVertical}/>
        case BarWidget.MPRIS_TRACK_INFO:
            return <MprisTrackInfoBarWidget vertical={isVertical}/>
        case BarWidget.MPRIS_PRIMARY_PLAYER_SWITCHER:
            return <MprisPrimaryPlayerSwitcher vertical={isVertical}/>
        case BarWidget.NOTIFICATION_HISTORY:
            return <NotificationButton vertical={isVertical}/>
        case BarWidget.COLOR_PICKER:
            return <ColorPickerButton vertical={isVertical}/>
    }
}
