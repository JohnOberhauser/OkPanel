import App from "ags/gtk4/app"
import {ChargingAlertSound} from "./widget/alerts/Alerts";
import {updateResponse, updateWindows} from "./widget/screenshare/Screenshare";
import {decreaseVolume, increaseVolume, muteVolume} from "./widget/utils/audio";
import Hyprland from "gi://AstalHyprland"
import {setThemeBasic} from "./config/theme";
import {closeIntegratedScreenshot, toggleIntegratedScreenshot} from "./widget/screenshot/IntegratedScreenshot";
import {closeIntegratedAppLauncher, toggleIntegratedAppLauncher} from "./widget/appLauncher/IntegratedAppLauncher";
import {closeIntegratedScreenshare, toggleIntegratedScreenshare} from "./widget/screenshare/IntegratedScreenshare";
import {closeIntegratedMenu, toggleIntegratedMenu} from "./widget/systemMenu/IntegratedMenu";
import {closeIntegratedCalendar, toggleIntegratedCalendar} from "./widget/calendar/IntegratedCalendar";
import {
    closeIntegratedClipboardManager,
    toggleIntegratedClipboardManager
} from "./widget/clipboardManager/IntegratedClipboardManager";
import {
    closeIntegratedNotificationsHistory,
    toggleIntegratedNotificationHistory
} from "./widget/notification/IntegratedNotificationHistory";
import {customWidgetLabelSetters} from "./widget/barWidgets/CustomWidget";
import {setWallpaper} from "./widget/wallpaper/setWallpaper";
import {killOldMonitorWindows, recreateWindows, spawnMonitorWindows} from "./widget/utils/windows";
import {getHyprMonitorInfoById} from "./widget/utils/monitors";
import {variableConfig} from "./config/config";
import {populateGlyphCache} from "./widget/utils/applications";
import lockScreen, {isSessionLocked} from "./widget/lockScreen/LockScreen";

export let projectDir = ""

App.start({
    instanceName: "OkPanel",
    css: "/tmp/OkPanel/style.css",
    main(...args: Array<string>) {
        projectDir = args[0]
        populateGlyphCache()
        setThemeBasic()

        const hyprland = Hyprland.get_default()

        ChargingAlertSound()

        recreateWindows()

        hyprland.connect("monitor-added", (_: any, monitor: Hyprland.Monitor) => {
            if (monitor === undefined || monitor === null) return
            if (monitor.id === undefined || monitor.id === null) return

            getHyprMonitorInfoById(monitor.id)
                .then((hyprMonitorInfo) => {
                    if (hyprMonitorInfo === null) return
                    spawnMonitorWindows(hyprMonitorInfo)
                })
        });

        hyprland.connect("monitor-removed", () => {
            console.log(`Monitor removed`)
            killOldMonitorWindows();
        });

        variableConfig.framedMonitors.asAccessor().subscribe(() => {
            recreateWindows()
        })
    },
    requestHandler(request: string[], res: (response: any) => void) {
        const command = request[0] ?? ""
        if (command.startsWith("custom")) {
            const widgetNumber = Number(request[1])
            if (isNaN(widgetNumber)) {
                res("invalid number")
                return
            }
            const setter = customWidgetLabelSetters.get(widgetNumber)
            if (setter === undefined) {
                res("widget number not in use")
                return
            }
            setter(request[2])
            res("applied custom label")
        } if (command.startsWith("volume-up")) {
            increaseVolume()
            res("volume up")
        } else if (command.startsWith("volume-down")) {
            decreaseVolume()
            res("volume down")
        } else if (command.startsWith("mute")) {
            muteVolume()
            res("mute")
        } else if (command === "appLauncher") {
            toggleIntegratedAppLauncher()
            res("app launcher toggled")
        } else if (command.startsWith("screenshare")) {
            updateWindows(command)
            updateResponse(res)
            toggleIntegratedScreenshare()
        } else if (command === "screenshot") {
            toggleIntegratedScreenshot()
            res("screenshot toggled")
        } else if (command === "menu") {
            toggleIntegratedMenu()
            res("menu toggled")
        } else if (command === "calendar") {
            toggleIntegratedCalendar()
            res("calendar toggled")
        } else if (command === "clipboard") {
            toggleIntegratedClipboardManager()
            res("clipboard toggled")
        } else if (command === "notification") {
            toggleIntegratedNotificationHistory()
            res("notifications toggled")
        } else if (command === "closeAll") {
            closeIntegratedAppLauncher()
            closeIntegratedCalendar()
            closeIntegratedClipboardManager()
            closeIntegratedMenu()
            closeIntegratedScreenshare()
            closeIntegratedNotificationsHistory()
            closeIntegratedScreenshot()
        } else if (command.startsWith("wallpaper")) {
            const path = request[1]
            setWallpaper(path)
                .finally(() => {
                    res("wallpaper set")
                })
        } else if (command.startsWith("checkLock")) {
            if (isSessionLocked) {
                res("locked")
            } else {
                res("unlocked")
            }
        } else if (command.startsWith("lock")) {
            lockScreen()
            res("locked")
        } else {
            res("command not found")
        }
    }
})
