import {Astal, Gtk} from "ags/gtk4";
import App from "ags/gtk4/app";
import {variableConfig} from "../../config/config";
import {createComputed, createState, onCleanup, Setter} from "ags";
import LeftBar from "./bars/LeftBar";
import IntegratedMenu from "../systemMenu/IntegratedMenu";
import TopBar from "./bars/TopBar";
import RightBar from "./bars/RightBar";
import BottomBar from "./bars/BottomBar";
import IntegratedCalendar from "../calendar/IntegratedCalendar";
import IntegratedClipboardManager from "../clipboardManager/IntegratedClipboardManager";
import IntegratedNotificationHistory from "../notification/IntegratedNotificationHistory";
import {appendChildren, ghostWhenTooNarrow, removeAllChildren} from "../utils/widgets";
import {Position} from "../../config/schema/definitions/frame";
import IntegratedScreenshot from "../screenshot/IntegratedScreenshot";
import IntegratedAppLauncher from "../appLauncher/IntegratedAppLauncher";
import IntegratedScreenshare from "../screenshare/IntegratedScreenshare";
import FrameDrawing from "./FrameDrawing";
import {BoxWithResize} from "../common/BoxWithResize";

export const frameWindowName = "frame"

export let frameWindow: Astal.Window

function getLeftAndRightSides(
    leftBar: Gtk.Widget,
    rightBar: Gtk.Widget,
    integratedMenu: Gtk.Widget,
    integratedCalendar: Gtk.Widget,
    integratedClipboardManager: Gtk.Widget,
    integratedNotificationHistory: Gtk.Widget,
    integratedAppLauncher: Gtk.Widget,
    integratedScreenshare: Gtk.Widget,
    integratedScreenshotTool: Gtk.Widget,
) {
    const menuPosition = variableConfig.frame.menu.position.asAccessor()
    const calendarPosition = variableConfig.frame.calendar.position.asAccessor()
    const clipboardManagerPosition = variableConfig.frame.clipboardManager.position.asAccessor()
    const notificationHistoryPosition = variableConfig.frame.notifications.position.asAccessor()
    const screenshotPositon = variableConfig.frame.screenshotTool.position.asAccessor()
    const appLauncherPosition = variableConfig.frame.appLauncher.position.asAccessor()
    const screensharePosition = variableConfig.frame.screenshare.position.asAccessor()

    const leftSide = [leftBar]
    const rightSide = [rightBar]

    if (menuPosition.get() === Position.LEFT) {
        leftSide.push(integratedMenu)
    } else {
        rightSide.push(integratedMenu)
    }

    if (calendarPosition.get() === Position.LEFT) {
        leftSide.push(integratedCalendar)
    } else {
        rightSide.push(integratedCalendar)
    }

    if (clipboardManagerPosition.get() === Position.LEFT) {
        leftSide.push(integratedClipboardManager)
    } else {
        rightSide.push(integratedClipboardManager)
    }

    if (notificationHistoryPosition.get() === Position.LEFT) {
        leftSide.push(integratedNotificationHistory)
    } else {
        rightSide.push(integratedNotificationHistory)
    }

    if (screenshotPositon.get() === Position.LEFT) {
        leftSide.push(integratedScreenshotTool)
    } else {
        rightSide.push(integratedScreenshotTool)
    }

    if (appLauncherPosition.get() === Position.LEFT) {
        leftSide.push(integratedAppLauncher)
    } else {
        rightSide.push(integratedAppLauncher)
    }

    if (screensharePosition.get() === Position.LEFT) {
        leftSide.push(integratedScreenshare)
    } else {
        rightSide.push(integratedScreenshare)
    }

    rightSide.reverse()

    return [leftSide, rightSide]
}

function TopGroup() {
    return <box
        $={(self) => {
            ghostWhenTooNarrow(
                self,
                [
                    variableConfig.topBar.paddingBottom.asAccessor(),
                    variableConfig.topBar.paddingTop.asAccessor(),
                    variableConfig.topBar.marginBottom.asAccessor(),
                    variableConfig.topBar.marginTop.asAccessor(),
                    variableConfig.topBar.borderWidth.asAccessor(),
                ]
            )
        }}
        orientation={Gtk.Orientation.HORIZONTAL}>
        <box hexpand={variableConfig.topBar.expanded.asAccessor().as((e) => !e)}/>
        <TopBar/>
        <box hexpand={variableConfig.topBar.expanded.asAccessor().as((e) => !e)}/>
    </box>
}

function BottomGroup() {
    return <box
        $={(self) => {
            ghostWhenTooNarrow(
                self,
                [
                    variableConfig.bottomBar.paddingBottom.asAccessor(),
                    variableConfig.bottomBar.paddingTop.asAccessor(),
                    variableConfig.bottomBar.marginBottom.asAccessor(),
                    variableConfig.bottomBar.marginTop.asAccessor(),
                    variableConfig.bottomBar.borderWidth.asAccessor(),
                ]
            )
        }}
        orientation={Gtk.Orientation.HORIZONTAL}>
        <box hexpand={variableConfig.bottomBar.expanded.asAccessor().as((e) => !e)}/>
        <BottomBar/>
        <box hexpand={variableConfig.bottomBar.expanded.asAccessor().as((e) => !e)}/>
    </box>
}

function LeftGroup(
    {
        widgetContainer,
        leftGroupWidthSetter,
    }: {
        widgetContainer: Gtk.Box,
        leftGroupWidthSetter: Setter<number>
    }
) {
    return <box
        $={(self) => {
            ghostWhenTooNarrow(
                self,
                [
                    variableConfig.leftBar.paddingStart.asAccessor(),
                    variableConfig.leftBar.paddingEnd.asAccessor(),
                    variableConfig.leftBar.marginStart.asAccessor(),
                    variableConfig.leftBar.marginEnd.asAccessor(),
                    variableConfig.leftBar.borderWidth.asAccessor(),
                ]
            )
        }}
        orientation={Gtk.Orientation.VERTICAL}>
        <box vexpand={variableConfig.leftBar.expanded.asAccessor().as((e) => !e)}/>
        <BoxWithResize
            $={(self) => {
                self.connect("resized", (_, w, h) => {
                    leftGroupWidthSetter(w)
                })
                self.set_overflow(Gtk.Overflow.HIDDEN)
            }}
            vexpand={true}
            heightRequest={variableConfig.leftBar.minimumHeight.asAccessor()}
            marginStart={variableConfig.leftBar.marginStart.asAccessor()}
            marginEnd={variableConfig.leftBar.marginEnd.asAccessor()}
            marginTop={variableConfig.leftBar.marginTop.asAccessor()}
            marginBottom={variableConfig.leftBar.marginBottom.asAccessor()}
            cssClasses={["frameLeftGroup"]}>
            {widgetContainer}
        </BoxWithResize>
        <box vexpand={variableConfig.leftBar.expanded.asAccessor().as((e) => !e)}/>
    </box>
}

function RightGroup(
    {
        widgetContainer,
        rightGroupWidthSetter,
    }: {
        widgetContainer: Gtk.Box,
        rightGroupWidthSetter: Setter<number>
    }
) {
    return <box
        $={(self) => {
            ghostWhenTooNarrow(
                self,
                [
                    variableConfig.rightBar.paddingStart.asAccessor(),
                    variableConfig.rightBar.paddingEnd.asAccessor(),
                    variableConfig.rightBar.marginStart.asAccessor(),
                    variableConfig.rightBar.marginEnd.asAccessor(),
                    variableConfig.rightBar.borderWidth.asAccessor(),
                ]
            )
        }}
        halign={Gtk.Align.END}
        orientation={Gtk.Orientation.VERTICAL}>
        <box vexpand={variableConfig.rightBar.expanded.asAccessor().as((e) => !e)}/>
        <BoxWithResize
            $={(self) => {
                self.connect("resized", (_, w, h) => {
                    rightGroupWidthSetter(w)
                })
                self.set_overflow(Gtk.Overflow.HIDDEN)
            }}
            vexpand={true}
            heightRequest={variableConfig.rightBar.minimumHeight.asAccessor()}
            marginStart={variableConfig.rightBar.marginStart.asAccessor()}
            marginEnd={variableConfig.rightBar.marginEnd.asAccessor()}
            marginTop={variableConfig.rightBar.marginTop.asAccessor()}
            marginBottom={variableConfig.rightBar.marginBottom.asAccessor()}
            cssClasses={["frameRightGroup"]}>
            {widgetContainer}
        </BoxWithResize>
        <box vexpand={variableConfig.rightBar.expanded.asAccessor().as((e) => !e)}/>
    </box>
}

export default function (): Astal.Window {

    const menuPosition = variableConfig.frame.menu.position.asAccessor()
    const calendarPosition = variableConfig.frame.calendar.position.asAccessor()
    const clipboardManagerPosition = variableConfig.frame.clipboardManager.position.asAccessor()
    const notificationHistoryPosition = variableConfig.frame.notifications.position.asAccessor()
    const screenshotPositon = variableConfig.frame.screenshotTool.position.asAccessor()
    const appLauncherPosition = variableConfig.frame.appLauncher.position.asAccessor()
    const screensharePosition = variableConfig.frame.screenshare.position.asAccessor()

    const [leftGroupWidth, leftGroupWidthSetter] = createState(0)
    const [rightGroupWidth, rightGroupWidthSetter] = createState(0)

    let integratedMenu = <IntegratedMenu/> as Gtk.Widget
    let integratedCalendar = <IntegratedCalendar/> as Gtk.Widget
    let integratedClipboardManager = <IntegratedClipboardManager/> as Gtk.Widget
    let integratedNotificationHistory = <IntegratedNotificationHistory/> as Gtk.Widget
    let integratedScreenshotTool = <IntegratedScreenshot/> as Gtk.Widget
    let integratedAppLauncher = <IntegratedAppLauncher/> as Gtk.Widget
    let integratedScreenshare = <IntegratedScreenshare/> as Gtk.Widget
    let leftBar = <LeftBar/> as Gtk.Widget
    let rightBar = <RightBar/> as Gtk.Widget

    const unsub = createComputed([
        menuPosition,
        calendarPosition,
        clipboardManagerPosition,
        notificationHistoryPosition,
        screenshotPositon,
        appLauncherPosition,
        screensharePosition,
    ]).subscribe(() => {
        removeAllChildren(leftGroupWidgetContainer)
        removeAllChildren(rightGroupWidgetContainer)

        const [leftSideWidgets, rightSideWidgets] = getLeftAndRightSides(
            leftBar,
            rightBar,
            integratedMenu,
            integratedCalendar,
            integratedClipboardManager,
            integratedNotificationHistory,
            integratedAppLauncher,
            integratedScreenshare,
            integratedScreenshotTool,
        )

        appendChildren(leftGroupWidgetContainer, leftSideWidgets)
        appendChildren(rightGroupWidgetContainer, rightSideWidgets)
    })
    onCleanup(unsub)

    let leftGroupWidgetContainer = <box
        marginStart={variableConfig.leftBar.paddingStart.asAccessor()}
        marginEnd={variableConfig.leftBar.paddingEnd.asAccessor()}
        marginTop={variableConfig.leftBar.paddingTop.asAccessor()}
        marginBottom={variableConfig.leftBar.paddingBottom.asAccessor()}
        orientation={Gtk.Orientation.HORIZONTAL}
        $={(self) => {
            const [leftSideWidgets, _] = getLeftAndRightSides(
                leftBar,
                rightBar,
                integratedMenu,
                integratedCalendar,
                integratedClipboardManager,
                integratedNotificationHistory,
                integratedAppLauncher,
                integratedScreenshare,
                integratedScreenshotTool,
            )

            appendChildren(self, leftSideWidgets)
        }}/> as Gtk.Box

    let rightGroupWidgetContainer = <box
        marginStart={variableConfig.rightBar.paddingStart.asAccessor()}
        marginEnd={variableConfig.rightBar.paddingEnd.asAccessor()}
        marginTop={variableConfig.rightBar.paddingTop.asAccessor()}
        marginBottom={variableConfig.rightBar.paddingBottom.asAccessor()}
        orientation={Gtk.Orientation.HORIZONTAL}
        $={(self) => {
            const [_, rightSideWidgets] = getLeftAndRightSides(
                leftBar,
                rightBar,
                integratedMenu,
                integratedCalendar,
                integratedClipboardManager,
                integratedNotificationHistory,
                integratedAppLauncher,
                integratedScreenshare,
                integratedScreenshotTool,
            )

            appendChildren(self, rightSideWidgets)
        }}/> as Gtk.Box

    return <window
        $={(self) => {
            frameWindow = self
        }}
        name={frameWindowName}
        cssClasses={["transparentBackground"]}
        layer={Astal.Layer.TOP}
        namespace={"okpanel-frame"}
        exclusivity={Astal.Exclusivity.IGNORE}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        visible={true}
        application={App}>
        <overlay
            $={(overlay) => {
                overlay.add_overlay(
                    <box
                        vexpand={true}
                        hexpand={true}
                        orientation={Gtk.Orientation.VERTICAL}>
                        <TopGroup/>
                        <box
                            vexpand={true}
                            hexpand={true}
                            orientation={Gtk.Orientation.HORIZONTAL}>
                            <LeftGroup
                                widgetContainer={leftGroupWidgetContainer}
                                leftGroupWidthSetter={leftGroupWidthSetter}/>
                            <box hexpand/>
                            <RightGroup
                                widgetContainer={rightGroupWidgetContainer}
                                rightGroupWidthSetter={rightGroupWidthSetter}/>
                        </box>
                        <BottomGroup/>
                    </box> as Gtk.Box
                )
            }}>
            <FrameDrawing
                leftGroupWidth={leftGroupWidth}
                rightGroupWidth={rightGroupWidth}/>
        </overlay>
    </window> as Astal.Window
}