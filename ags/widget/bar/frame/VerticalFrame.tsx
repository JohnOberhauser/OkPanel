import {Astal, Gtk} from "ags/gtk4";
import App from "ags/gtk4/app";
import Cairo from 'gi://cairo';
import {variableConfig} from "../../../config/config";
import {createComputed} from "ags";
import {Bar, selectedBar} from "../../../config/bar";
import {integratedMenuRevealed, integratedMenuWidth} from "../IntegratedMenu";

export enum Side {
    LEFT,
    RIGHT
}

export default function (
    {
        side,
    }: {
        side: Side,
    }
): Astal.Window {
    const thisSideBar = side === Side.LEFT ? Bar.LEFT : Bar.RIGHT
    const oppositeSideBar = side === Side.LEFT ? Bar.RIGHT : Bar.LEFT
    const anchor = side === Side.LEFT ?
        Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT :
        Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT

    const visible = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, enabledVert, enabledHor) => {
        if (bar === thisSideBar) return true
        if (bar === oppositeSideBar) {
            return enabledVert
        }
        return enabledHor
    })

    const size = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.theme.bars.frameThickness.asAccessor(),
        variableConfig.verticalBar.marginOuter.asAccessor(),
        variableConfig.verticalBar.marginInner.asAccessor(),
        variableConfig.verticalBar.compact.asAccessor(),
        variableConfig.theme.bars.borderWidth.asAccessor(),
    ], (
        bar,
        enableFrame,
        frameThickness,
        marginOuter,
        marginInner,
        compact,
        borderWidth,
    ) => {
        if (bar === thisSideBar) {
            let barWidth: number
            if (compact) {
                barWidth = 38
            } else {
                barWidth = 46
            }
            let margin: number
            if (enableFrame) {
                margin = marginInner + borderWidth
            } else {
                margin = marginOuter + marginInner + (borderWidth * 2)
            }
            return margin + barWidth
        }
        return enableFrame ? frameThickness + borderWidth : 0
    })

    return <window
        defaultWidth={1} // necessary or resizing doesn't work
        cssClasses={["mostlyTransparentBackground"]}
        layer={Astal.Layer.BACKGROUND}
        namespace={"okpanel-frame"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={anchor}
        visible={visible}
        application={App}
        canTarget={false}
        canFocus={false}
        $={(self) => {
            self.get_native()?.get_surface()?.set_input_region(new Cairo.Region())
        }}>
        <box
            vexpand={true}
            hexpand={true}>
            {/*Represents the bar*/}
            <box
                widthRequest={size}/>
            {/*Represents integrated menu*/}
            <revealer
                visible={selectedBar.asAccessor().as((bar) => {
                    return bar === thisSideBar
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
                revealChild={integratedMenuRevealed}>
                <box
                    widthRequest={integratedMenuWidth}/>
            </revealer>
        </box>
    </window> as Astal.Window
}