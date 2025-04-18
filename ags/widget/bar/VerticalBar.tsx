import {App, Astal, Gtk} from "astal/gtk4"
import {addWidgets} from "./BarWidgets";
import {selectedBar, Bar} from "./Bar";
import {config} from "../utils/config/config";

export default function () {
    return <window
        heightRequest={config.verticalBar.minimumHeight}
        cssClasses={["transparentBackground"]}
        monitor={config.mainMonitor}
        visible={selectedBar((bar) => {
            return bar === Bar.LEFT || bar === Bar.RIGHT
        })}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        margin={config.windows.gaps}
        anchor={selectedBar((bar) => {
            if (bar === Bar.LEFT) {
                if (!config.verticalBar.expanded) {
                    return Astal.WindowAnchor.LEFT
                }
                return Astal.WindowAnchor.TOP
                    | Astal.WindowAnchor.LEFT
                    | Astal.WindowAnchor.BOTTOM
            } else {
                if (!config.verticalBar.expanded) {
                    return Astal.WindowAnchor.RIGHT
                }
                return Astal.WindowAnchor.TOP
                    | Astal.WindowAnchor.RIGHT
                    | Astal.WindowAnchor.BOTTOM
            }
        })}
        application={App}>
        <centerbox
            orientation={Gtk.Orientation.VERTICAL}
            cssClasses={config.verticalBar.splitSections ? ["sideBar"] : ["barWindow", "sidebar"]}>
            <box
                visible={config.verticalBar.topWidgets.length > 0}
                vertical={true}
                cssClasses={config.verticalBar.splitSections ? ["barWindow"] : []}>
                <box
                    vertical={true}
                    marginTop={config.verticalBar.sectionPadding}
                    marginBottom={config.verticalBar.sectionPadding}
                    spacing={config.verticalBar.widgetSpacing}>
                    {addWidgets(config.verticalBar.topWidgets, true)}
                </box>
            </box>
            <box
                visible={config.verticalBar.centerWidgets.length > 0}
                vertical={true}
                cssClasses={config.verticalBar.splitSections ? ["barWindow"] : []}>
                <box
                    vertical={true}
                    marginTop={config.verticalBar.sectionPadding}
                    marginBottom={config.verticalBar.sectionPadding}
                    spacing={config.verticalBar.widgetSpacing}>
                    {addWidgets(config.verticalBar.centerWidgets, true)}
                </box>
            </box>
            <box
                visible={config.verticalBar.bottomWidgets.length > 0}
                vertical={true}
                valign={Gtk.Align.END}
                cssClasses={config.verticalBar.splitSections ? ["barWindow"] : []}>
                <box
                    vertical={true}
                    marginTop={config.verticalBar.sectionPadding}
                    marginBottom={config.verticalBar.sectionPadding}
                    spacing={config.verticalBar.widgetSpacing}>
                    {addWidgets(config.verticalBar.bottomWidgets, true)}
                </box>
            </box>
        </centerbox>
    </window>
}
