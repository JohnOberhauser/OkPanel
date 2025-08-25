import App from "ags/gtk4/app"
import SystemMenuWindow from "./widget/systemMenu/SystemMenuWindow";
import {VolumeAlert, BrightnessAlert, ChargingAlertSound} from "./widget/alerts/Alerts";
import NotificationPopups from "./widget/notification/NotificationPopups";
import AppLauncher, {AppLauncherWindowName} from "./widget/appLauncher/AppLauncher";
import Screenshot, {ScreenshotWindowName} from "./widget/screenshot/Screenshot";
import Screenshare, {ScreenshareWindowName, updateResponse, updateWindows} from "./widget/screenshare/Screenshare";
import HorizontalBar from "./widget/bar/HorizontalBar";
import {decreaseVolume, increaseVolume, muteVolume} from "./widget/utils/audio";
import Scrim from "./widget/common/Scrim";
import {toggleWindow} from "./widget/utils/windows";
import Hyprland from "gi://AstalHyprland"
import ClipboardManager from "./widget/clipboardManager/ClipboardManager";
import NotificationHistoryWindow from "./widget/notification/NotificationHistoryWindow";
import {setThemeBasic} from "./config/theme";
import {restoreBar} from "./config/bar";
import Frame from "./widget/bar/frame/Frame";
import FrameRight from "./widget/bar/frame/FrameRight";
import FrameLeft from "./widget/bar/frame/FrameLeft";
import FrameBottom from "./widget/bar/frame/FrameBottom";
import FrameTop from "./widget/bar/frame/FrameTop";

export let projectDir = ""

App.start({
    instanceName: "OkPanel",
    css: "/tmp/OkPanel/style.css",
    main(...args: Array<string>) {
        projectDir = args[0]
        setThemeBasic()
        restoreBar()

        const hyprland = Hyprland.get_default()

        Frame()

        HorizontalBar()

        FrameRight()
        FrameLeft()
        FrameBottom()
        FrameTop()

        SystemMenuWindow()
        ChargingAlertSound()
        AppLauncher()
        Screenshot()
        Screenshare()
        ClipboardManager()
        NotificationHistoryWindow()

        hyprland.monitors.map((monitor) => {
            VolumeAlert(monitor)
            BrightnessAlert(monitor)
            NotificationPopups(monitor)
            Scrim(monitor)
        })

        hyprland.connect("monitor-added", (_, monitor) => {
            App.add_window(VolumeAlert(monitor))
            App.add_window(BrightnessAlert(monitor))
            App.add_window(NotificationPopups(monitor))
            App.add_window(Scrim(monitor))
        })
    },
    requestHandler(request: string, res: (response: any) => void) {
        if (request.startsWith("volume-up")) {
            increaseVolume()
            res("volume up")
        } else if (request.startsWith("volume-down")) {
            decreaseVolume()
            res("volume down")
        } else if (request.startsWith("mute")) {
            muteVolume()
            res("mute")
        } else if (request === "appLauncher") {
            toggleWindow(AppLauncherWindowName)
            res("app launcher toggled")
        } else if (request.startsWith("screenshare")) {
            updateWindows(request)
            updateResponse(res)
            toggleWindow(ScreenshareWindowName)
        } else if (request === "screenshot") {
            toggleWindow(ScreenshotWindowName)
            res("screenshot toggled")
        } else {
            res("command not found")
        }
    }
})
