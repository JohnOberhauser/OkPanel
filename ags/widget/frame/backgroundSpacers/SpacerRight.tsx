import {Astal, Gtk} from "ags/gtk4";
import App from "ags/gtk4/app";
import {variableConfig} from "../../../config/config";
import {createComputed} from "ags";
import {integratedMenuRevealed, integratedMenuWidth} from "../../systemMenu/IntegratedMenu";
import {rightBarWidth} from "../bars/RightBar";
import {integratedCalendarRevealed, integratedCalendarWidth} from "../../calendar/IntegratedCalendar";
import {
    integratedClipboardManagerRevealed,
    integratedClipboardManagerWidth
} from "../../clipboardManager/IntegratedClipboardManager";
import {
    integratedNotificationHistoryRevealed,
    integratedNotificationHistoryWidth
} from "../../notification/IntegratedNotificationHistory";
import {Position} from "../../../config/schema/definitions/frame";
import {integratedScreenshotRevealed, integratedScreenshotWidth} from "../../screenshot/IntegratedScreenshot";
import {integratedAppLauncherRevealed, integratedAppLauncherWidth} from "../../appLauncher/IntegratedAppLauncher";
import {integratedScreenshareRevealed, integratedScreenshareWidth} from "../../screenshare/IntegratedScreenshare";

export default function (): Astal.Window {
    const size = createComputed([
        rightBarWidth,
        variableConfig.frame.rightThickness.asAccessor(),
        variableConfig.frame.borderWidth.asAccessor(),
        variableConfig.rightBar.marginStart.asAccessor(),
        variableConfig.rightBar.marginEnd.asAccessor(),
        variableConfig.rightBar.paddingStart.asAccessor(),
        variableConfig.rightBar.paddingEnd.asAccessor(),
        variableConfig.rightBar.borderWidth.asAccessor(),
        variableConfig.frame.margin.asAccessor(),
    ], (
        rightBarWidth,
        rightThickness,
        borderWidth,
        barMarginStart,
        barMarginEnd,
        groupPaddingStart,
        groupPaddingEnd,
        groupBorderWidth,
        frameMargin,
    ) => {
        return rightThickness + rightBarWidth + borderWidth + barMarginStart +
            barMarginEnd + groupPaddingStart +
            groupPaddingEnd + (groupBorderWidth * 2) + frameMargin
    })

    return <window
        defaultWidth={1} // necessary or resizing doesn't work
        cssClasses={["mostlyTransparentBackground"]}
        name={"SpacerRight"}
        layer={Astal.Layer.BACKGROUND}
        namespace={"okpanel-frame-spacer"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT}
        visible={variableConfig.frame.enableRightSpacer.asAccessor()}
        application={App}
        canTarget={false}
        canFocus={false}>
        <box
            vexpand={true}
            hexpand={true}>
            {/*Represents the bar*/}
            <box
                widthRequest={size}/>
            {/*Represents integrated menu*/}
            <revealer
                visible={createComputed([
                    variableConfig.frame.menu.position.asAccessor(),
                    variableConfig.frame.menu.pushContent.asAccessor()
                ], (position, push) => {
                    return position === Position.RIGHT && push
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                revealChild={integratedMenuRevealed}>
                <box
                    widthRequest={integratedMenuWidth}/>
            </revealer>
            {/*Represents integrated calendar*/}
            <revealer
                visible={createComputed([
                    variableConfig.frame.calendar.position.asAccessor(),
                    variableConfig.frame.calendar.pushContent.asAccessor()
                ], (position, push) => {
                    return position === Position.RIGHT && push
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                revealChild={integratedCalendarRevealed}>
                <box
                    widthRequest={integratedCalendarWidth}/>
            </revealer>
            {/*Represents integrated clipboard manager*/}
            <revealer
                visible={createComputed([
                    variableConfig.frame.clipboardManager.position.asAccessor(),
                    variableConfig.frame.clipboardManager.pushContent.asAccessor()
                ], (position, push) => {
                    return position === Position.RIGHT && push
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                revealChild={integratedClipboardManagerRevealed}>
                <box
                    widthRequest={integratedClipboardManagerWidth}/>
            </revealer>
            {/*Represents integrated notification history*/}
            <revealer
                visible={createComputed([
                    variableConfig.frame.notifications.position.asAccessor(),
                    variableConfig.frame.notifications.pushContent.asAccessor()
                ], (position, push) => {
                    return position === Position.RIGHT && push
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                revealChild={integratedNotificationHistoryRevealed}>
                <box
                    widthRequest={integratedNotificationHistoryWidth}/>
            </revealer>
            {/*Represents integrated screenshot tool*/}
            <revealer
                visible={createComputed([
                    variableConfig.frame.screenshotTool.position.asAccessor(),
                    variableConfig.frame.screenshotTool.pushContent.asAccessor()
                ], (position, push) => {
                    return position === Position.RIGHT && push
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                revealChild={integratedScreenshotRevealed}>
                <box
                    widthRequest={integratedScreenshotWidth}/>
            </revealer>
            {/*Represents integrated app launcher*/}
            <revealer
                visible={createComputed([
                    variableConfig.frame.appLauncher.position.asAccessor(),
                    variableConfig.frame.appLauncher.pushContent.asAccessor()
                ], (position, push) => {
                    return position === Position.RIGHT && push
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                revealChild={integratedAppLauncherRevealed}>
                <box
                    widthRequest={integratedAppLauncherWidth}/>
            </revealer>
            {/*Represents integrated screen share*/}
            <revealer
                visible={createComputed([
                    variableConfig.frame.screenshare.position.asAccessor(),
                    variableConfig.frame.screenshare.pushContent.asAccessor()
                ], (position, push) => {
                    return position === Position.RIGHT && push
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_LEFT}
                revealChild={integratedScreenshareRevealed}>
                <box
                    widthRequest={integratedScreenshareWidth}/>
            </revealer>
        </box>
    </window> as Astal.Window
}