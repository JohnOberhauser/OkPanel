import {variableConfig} from "../../config/config";
import {Bar} from "../../config/bar";
import {BarWidget} from "../../config/schema/definitions/barWidgets";
import {OkButtonHorizontalPadding, OkButtonVerticalPadding} from "../common/OkButton";
import MenuButton from "./MenuButton";
import Workspaces from "./Workspaces";
import Clock from "./Clock";
import AudioOut from "./AudioOut";
import AudioIn from "./AudioIn";
import BluetoothIndicator from "./BluetoothIndicator";
import NetworkIndicator from "./NetworkIndicator";
import BatteryIndicator from "./BatteryIndicator";
import Tray from "./Tray";
import AppLauncherButton from "./AppLauncherButton";
import ScreenshotButton from "./ScreenshotButton";
import ClipboardManagerButton from "./ClipboardManagerButton";
import PowerProfileIndicator from "./PowerProfileIndicator";
import LockButton from "./LockButton";
import LogoutButton from "./LogoutButton";
import RestartButton from "./RestartButton";
import ShutdownButton from "./ShutdownButton";
import CavaBars from "./CavaBars";
import VpnIndicator from "./VpnIndicator";
import ScreenRecordingStopButton from "./ScreenRecordingStopButton";
import MprisControls from "./MprisControls";
import MprisTrackInfoBarWidget from "./MprisTrackInfoBarWidget";
import MprisPrimaryPlayerSwitcher from "./MprisPrimaryPlayerSwitcher";
import NotificationButton from "./NotificationButton";
import ColorPickerButton from "./ColorPickerButton";
import TimerInBar from "./TimerInBar";
import CustomWidget from "./CustomWidget";
import Dock from "./Dock";

export function getHPadding(bar: Bar) {
    switch (bar) {
        case Bar.TOP:
        case Bar.BOTTOM:
            return OkButtonHorizontalPadding.THIN
        case Bar.LEFT:
            return variableConfig.leftBar.compact.asAccessor().as((c) =>
                c ? OkButtonHorizontalPadding.THIN : OkButtonHorizontalPadding.STANDARD)
        case Bar.RIGHT:
            return variableConfig.rightBar.compact.asAccessor().as((c) =>
                c ? OkButtonHorizontalPadding.THIN : OkButtonHorizontalPadding.STANDARD)
    }
}

export function getVPadding(bar: Bar) {
    switch (bar) {
        case Bar.TOP:
            return variableConfig.topBar.compact.asAccessor().as((c) =>
                c ? OkButtonVerticalPadding.THIN : OkButtonVerticalPadding.STANDARD)
        case Bar.BOTTOM:
            return variableConfig.bottomBar.compact.asAccessor().as((c) =>
                c ? OkButtonVerticalPadding.THIN : OkButtonVerticalPadding.STANDARD)
        case Bar.LEFT:
        case Bar.RIGHT:
            return OkButtonVerticalPadding.STANDARD
    }
}

export function addWidgets(widgets: BarWidget[], bar: Bar) {
    let isVertical
    switch (bar) {
        case Bar.TOP:
            isVertical = false
            break
        case Bar.BOTTOM:
            isVertical = false
            break
        case Bar.LEFT:
            isVertical = true
            break
        case Bar.RIGHT:
            isVertical = true
            break
    }
    return widgets.map((widget) => {
        return <box
            marginTop={variableConfig.barWidgets[widget].marginTop.asAccessor()}
            marginBottom={variableConfig.barWidgets[widget].marginBottom.asAccessor()}
            marginStart={variableConfig.barWidgets[widget].marginStart.asAccessor()}
            marginEnd={variableConfig.barWidgets[widget].marginEnd.asAccessor()}>
            {getWidget(widget, isVertical, bar)}
        </box>
    })
}

function getWidget(widget: BarWidget, isVertical: boolean, bar: Bar) {
    switch (widget) {
        case BarWidget.MENU:
            return <MenuButton bar={bar}/>
        case BarWidget.WORKSPACES:
            return <Workspaces bar={bar} vertical={isVertical}/>
        case BarWidget.CLOCK:
            return <Clock bar={bar} vertical={isVertical}/>
        case BarWidget.AUDIO_OUT:
            return <AudioOut bar={bar}/>
        case BarWidget.AUDIO_IN:
            return <AudioIn bar={bar}/>
        case BarWidget.BLUETOOTH:
            return <BluetoothIndicator bar={bar}/>
        case BarWidget.NETWORK:
            return <NetworkIndicator bar={bar}/>
        case BarWidget.BATTERY:
            return <BatteryIndicator bar={bar}/>
        case BarWidget.TRAY:
            return <Tray bar={bar} vertical={isVertical}/>
        case BarWidget.APP_LAUNCHER:
            return <AppLauncherButton bar={bar}/>
        case BarWidget.SCREENSHOT:
            return <ScreenshotButton bar={bar}/>
        case BarWidget.CLIPBOARD_MANAGER:
            return <ClipboardManagerButton bar={bar}/>
        case BarWidget.POWER_PROFILE:
            return <PowerProfileIndicator bar={bar}/>
        case BarWidget.LOCK:
            return <LockButton bar={bar}/>
        case BarWidget.LOGOUT:
            return <LogoutButton bar={bar}/>
        case BarWidget.RESTART:
            return <RestartButton bar={bar}/>
        case BarWidget.SHUTDOWN:
            return <ShutdownButton bar={bar}/>
        case BarWidget.CAVA_WAVEFORM:
            return <CavaBars bar={bar} vertical={isVertical}/>
        case BarWidget.VPN_INDICATOR:
            return <VpnIndicator bar={bar}/>
        case BarWidget.RECORDING_INDICATOR:
            return <ScreenRecordingStopButton bar={bar}/>
        case BarWidget.MPRIS_CONTROLS:
            return <MprisControls vertical={isVertical} bar={bar}/>
        case BarWidget.MPRIS_TRACK_INFO:
            return <MprisTrackInfoBarWidget bar={bar} vertical={isVertical}/>
        case BarWidget.MPRIS_PRIMARY_PLAYER_SWITCHER:
            return <MprisPrimaryPlayerSwitcher bar={bar}/>
        case BarWidget.NOTIFICATION_HISTORY:
            return <NotificationButton bar={bar}/>
        case BarWidget.COLOR_PICKER:
            return <ColorPickerButton bar={bar}/>
        case BarWidget.TIMER:
            return <TimerInBar vertical={isVertical} bar={bar}/>
        case BarWidget.DOCK:
            return <Dock vertical={isVertical} bar={bar}/>

        case BarWidget.CUSTOM1:
            return <CustomWidget customNumber={1} bar={bar}/>
        case BarWidget.CUSTOM2:
            return <CustomWidget customNumber={2} bar={bar}/>
        case BarWidget.CUSTOM3:
            return <CustomWidget customNumber={3} bar={bar}/>
        case BarWidget.CUSTOM4:
            return <CustomWidget customNumber={4} bar={bar}/>
        case BarWidget.CUSTOM5:
            return <CustomWidget customNumber={5} bar={bar}/>
        case BarWidget.CUSTOM6:
            return <CustomWidget customNumber={6} bar={bar}/>
        case BarWidget.CUSTOM7:
            return <CustomWidget customNumber={7} bar={bar}/>
        case BarWidget.CUSTOM8:
            return <CustomWidget customNumber={8} bar={bar}/>
        case BarWidget.CUSTOM9:
            return <CustomWidget customNumber={9} bar={bar}/>
        case BarWidget.CUSTOM10:
            return <CustomWidget customNumber={10} bar={bar}/>
        case BarWidget.CUSTOM11:
            return <CustomWidget customNumber={11} bar={bar}/>
        case BarWidget.CUSTOM12:
            return <CustomWidget customNumber={12} bar={bar}/>
        case BarWidget.CUSTOM13:
            return <CustomWidget customNumber={13} bar={bar}/>
        case BarWidget.CUSTOM14:
            return <CustomWidget customNumber={14} bar={bar}/>
        case BarWidget.CUSTOM15:
            return <CustomWidget customNumber={15} bar={bar}/>
        case BarWidget.CUSTOM16:
            return <CustomWidget customNumber={16} bar={bar}/>
        case BarWidget.CUSTOM17:
            return <CustomWidget customNumber={17} bar={bar}/>
        case BarWidget.CUSTOM18:
            return <CustomWidget customNumber={18} bar={bar}/>
        case BarWidget.CUSTOM19:
            return <CustomWidget customNumber={19} bar={bar}/>
        case BarWidget.CUSTOM20:
            return <CustomWidget customNumber={20} bar={bar}/>
    }
}
