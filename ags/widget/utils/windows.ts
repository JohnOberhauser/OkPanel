import App from "ags/gtk4/app"
import Scrim, {scrimsVisibleSetter} from "../common/Scrim";
import Astal from "gi://Astal?version=4.0";
import {createRoot} from "ags";
import Wallpaper from "../wallpaper/Wallpaper";
import {BrightnessAlert, VolumeAlert} from "../alerts/Alerts";
import NotificationPopups from "../notification/NotificationPopups";
import Frame from "../frame/Frame";
import SpacerBottom from "../frame/backgroundSpacers/SpacerBottom";
import SpacerTop from "../frame/backgroundSpacers/SpacerTop";
import SpacerRight from "../frame/backgroundSpacers/SpacerRight";
import SpacerLeft from "../frame/backgroundSpacers/SpacerLeft";
import {getHyprMonitorsInfo, HyprMonitorInfo} from "./monitors";
import {variableConfig} from "../../config/config";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import GLib from "gi://GLib?version=2.0";
import {getScope} from "gnim";

const openedOneOffWindows: Astal.Window[] = []

export function hideAllWindows() {
    openedOneOffWindows.forEach((window) => {
        window.close()
    })
    openedOneOffWindows.length = 0
    scrimsVisibleSetter(false)
}

export function registerWindow(window: Astal.Window) {
    openedOneOffWindows.push(window)
}

export function addWindowOneOff(createWindow: () => Astal.Window) {
    scrimsVisibleSetter(true)
    App.add_window(
        createRoot((dispose) => {
            const window = createWindow()
            registerWindow(window)
            window.connect("destroy", dispose)
            return window
        })
    )
}

// ========================== Permanent windows per monitor ================================

export const windowsByMonitor = new Map<string, Astal.Window[]>();
const disposeByMonitor = new Map<string, () => void>()

// Create all per-monitor windows and register them
export function spawnMonitorWindows(
    hyprMonitorInfo: HyprMonitorInfo,
) {
    if ([...windowsByMonitor.keys()].find((it) => it === hyprMonitorInfo.name) !== undefined) {
        console.log("Monitor already has windows")
        return
    }
    console.log(
        `Creating windows for monitor:\n` +
        `${hyprMonitorInfo.id}\n` +
        `${hyprMonitorInfo.name}\n` +
        `${hyprMonitorInfo.description}`
    )

    // Wallpaper gets created first
    // Then the frame
    // Then everything else
    createRoot((dispose) => {
        const scope = getScope()
        const windows: Astal.Window[] = []

        console.log("adding wallpaper")
        windows.push(Wallpaper(hyprMonitorInfo.id))

        GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
            const addFrame = framedWindowsContainsMonitor(hyprMonitorInfo)
            scope.run(() => {
                if (addFrame) {
                    console.log("adding frame")
                    windows.push(Frame(hyprMonitorInfo.id))
                }
                GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
                    scope.run(() => {
                        if (addFrame) {
                            console.log("adding spacer bottom")
                            windows.push(SpacerBottom(hyprMonitorInfo.id))
                            console.log("adding spacer top")
                            windows.push(SpacerTop(hyprMonitorInfo.id))
                            console.log("adding spacer right")
                            windows.push(SpacerRight(hyprMonitorInfo.id))
                            console.log("adding spacer left")
                            windows.push(SpacerLeft(hyprMonitorInfo.id))
                        }

                        console.log("adding volume OSD")
                        windows.push(VolumeAlert(hyprMonitorInfo.id))
                        console.log("adding brightness OSD")
                        windows.push(BrightnessAlert(hyprMonitorInfo.id))
                        console.log("adding notification popups")
                        windows.push(NotificationPopups(hyprMonitorInfo.id))
                        console.log("adding scrim")
                        windows.push(Scrim(hyprMonitorInfo.id))

                        windowsByMonitor.set(hyprMonitorInfo.name, windows)
                        disposeByMonitor.set(hyprMonitorInfo.name, dispose)

                        logOpenedWindows()
                    })
                    return GLib.SOURCE_REMOVE
                })
            })
            return GLib.SOURCE_REMOVE
        })
    })
}

// Close & remove all windows for a monitor
export function killOldMonitorWindows() {
    getHyprMonitorsInfo()
        .then((monitors) => {
            if (monitors === null) return
            const activeNames = new Set(monitors.map(m => m.name))
            const orphanedWindows: Astal.Window[] = [...windowsByMonitor.entries()]
                .filter(([name]) => !activeNames.has(name))
                .flatMap(([_, wins]) => wins)
            const disposeFunctions: (() => void)[] = [...disposeByMonitor.entries()]
                .filter(([name]) => !activeNames.has(name))
                .flatMap(([_, functions]) => functions)

            orphanedWindows.forEach((window: Astal.Window) => {
                console.log(`Closing window ${window.name}`)
                window.close()
                App.remove_window(window)
                window.destroy()
            })

            // Remove all stale entries from the map
            for (const name of windowsByMonitor.keys()) {
                if (!activeNames.has(name)) {
                    windowsByMonitor.delete(name)
                }
            }
            for (const name of disposeByMonitor.keys()) {
                if (!activeNames.has(name)) {
                    disposeByMonitor.delete(name)
                }
            }

            if (monitors.length === 0) {
                console.log("Closing all windows")
                App.get_windows().forEach((window) => {
                    console.log(`Closing window ${window.name}`)
                    window.close()
                    App.remove_window(window)
                    window.destroy()
                })
            }

            disposeFunctions.forEach((dispose) => {
                dispose()
            })

            logOpenedWindows()
        })
}

export function recreateWindows() {
    App.get_windows().forEach((window) => {
        console.log(`Closing window ${window.name}`)
        window.close()
        App.remove_window(window)
        window.destroy()
    })

    windowsByMonitor.clear()

    disposeByMonitor.forEach((dispose) => {
        dispose()
    })

    disposeByMonitor.clear()

    const hyprland = AstalHyprland.get_default()

    hyprland.monitors.forEach((monitor) => {
        spawnMonitorWindows({
            id: monitor.id,
            name: monitor.name,
            description: monitor.description,
            width: monitor.width,
            height: monitor.height,
        })
    })
}

function logOpenedWindows() {
    console.log(`All opened windows:\n${App.get_windows()
        .map(w => w.name ?? '(unnamed)')
        .join('\n')}`)
}

function framedWindowsContainsMonitor(hyprMonitorInfo: HyprMonitorInfo): boolean {
    // @ts-ignore
    const framedWindows: string[] = variableConfig.framedMonitors.asAccessor().peek();

    const id = hyprMonitorInfo.id.toString();
    const name = hyprMonitorInfo.name;
    const desc = hyprMonitorInfo.description;

    return framedWindows.some(framedWindow =>
        framedWindow === id ||
        framedWindow === name ||
        framedWindow === desc
    );
}