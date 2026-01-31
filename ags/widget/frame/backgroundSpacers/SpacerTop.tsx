import {Astal} from "ags/gtk4";
import App from "ags/gtk4/app";
import Cairo from 'gi://cairo';
import {variableConfig} from "../../../config/config";
import {createComputed} from "ags";
import {topBarHeight} from "../bars/TopBar";

export default function (
    monitorId: number,
): Astal.Window {
    const size = createComputed([
        topBarHeight,
        variableConfig.frame.topThickness.asAccessor(),
        variableConfig.frame.borderWidth.asAccessor(),
        variableConfig.topBar.marginTop.asAccessor(),
        variableConfig.topBar.marginBottom.asAccessor(),
        variableConfig.topBar.borderWidth.asAccessor(),
        variableConfig.frame.margin.asAccessor(),
    ], (
        topBarHeight,
        topThickness,
        borderWidth,
        barMarginTop,
        barMarginBottom,
        topBarBorderWidth,
        frameMargin,
    ) => {
        return topThickness + topBarHeight + borderWidth + barMarginTop + barMarginBottom + (topBarBorderWidth * 2) + frameMargin
    })

    return <window
        defaultHeight={1} // necessary or resizing doesn't work
        cssClasses={["mostlyTransparentBackground"]}
        name={`SpacerTop_${monitorId}`}
        monitor={monitorId}
        layer={Astal.Layer.BACKGROUND}
        namespace={"okpanel-frame-spacer"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.LEFT}
        visible={variableConfig.frame.enableTopSpacer.asAccessor()}
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