import App from "ags/gtk4/app"
import Scrim, {scrimsVisibleSetter} from "../common/Scrim";
import Astal from "gi://Astal?version=4.0";
import {createRoot} from "ags";
import Wallpaper from "../wallpaper/Wallpaper";
import {BrightnessAlert, VolumeAlert} from "../alerts/Alerts";
import NotificationPopups from "../notification/NotificationPopups";
import AstalHyprland from "gi://AstalHyprland?version=0.1";

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

const windowsByMonitor = new Map<string, Astal.Window[]>();

// Create all per-monitor windows and register them
export function spawnMonitorWindows(monitor: AstalHyprland.Monitor) {
    createRoot(() => {
        const windows = [
            Wallpaper(monitor),
            VolumeAlert(monitor),
            BrightnessAlert(monitor),
            NotificationPopups(monitor),
            Scrim(monitor),
        ]

        windows.forEach((window) => {
            App.add_window(window)
        })

        windowsByMonitor.set(monitor.name, windows)
    })
}

// Close & remove all windows for a monitor
export function killOldMonitorWindows() {
    const hyprland = AstalHyprland.get_default()
    const activeNames = new Set(hyprland.monitors.map(m => m.name))
    const orphanedWindows: Astal.Window[] = [...windowsByMonitor.entries()]
        .filter(([name]) => !activeNames.has(name))
        .flatMap(([_, wins]) => wins)

    orphanedWindows.forEach((window: Astal.Window) => {
        window.close?.()
    })

    // Remove all stale entries from the map
    for (const name of windowsByMonitor.keys()) {
        if (!activeNames.has(name)) {
            windowsByMonitor.delete(name)
        }
    }
}