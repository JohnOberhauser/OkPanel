import {Astal} from "ags/gtk4";
import App from "ags/gtk4/app";
import Cairo from 'gi://cairo';
import {variableConfig} from "../../../config/config";
import {createComputed} from "ags";
import {bottomBarHeight} from "../bars/BottomBar";

export default function (): Astal.Window {
    const size = createComputed([
        bottomBarHeight,
        variableConfig.frame.bottomThickness.asAccessor(),
        variableConfig.frame.borderWidth.asAccessor(),
        variableConfig.bottomBar.marginTop.asAccessor(),
        variableConfig.bottomBar.marginBottom.asAccessor(),
        variableConfig.bottomBar.borderWidth.asAccessor(),
        variableConfig.frame.margin.asAccessor()
    ], (
        bottomBarHeight,
        bottomThickness,
        borderWidth,
        barMarginTop,
        barMarginBottom,
        barBorderWidth,
        frameMargin,
    ) => {
        return bottomThickness + bottomBarHeight + borderWidth + barMarginTop + barMarginBottom + (barBorderWidth * 2) + frameMargin
    })

    return <window
        defaultHeight={1} // necessary or resizing doesn't work
        name={"SpacerBottom"}
        cssClasses={["mostlyTransparentBackground"]}
        layer={Astal.Layer.BACKGROUND}
        namespace={"okpanel-frame-spacer"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.LEFT}
        visible={variableConfig.frame.enableBottomSpacer.asAccessor()}
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
                heightRequest={size}/>
        </box>
    </window> as Astal.Window
}