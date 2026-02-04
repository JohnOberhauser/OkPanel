import {Bar} from "../../config/bar";
import {variableConfig} from "../../config/config";
import {createBinding, createState, For, With} from "ags";
import {Gtk} from "ags/gtk4";
import OkButton from "../common/OkButton";
import {getHPadding, getVPadding} from "./BarWidgets";
import AstalTray from "gi://AstalTray?version=0.1";

const tray = AstalTray.get_default()

export default function ({vertical, bar}: { vertical: boolean, bar: Bar }) {

    return <box>
        <With value={variableConfig.barWidgets.tray.collapsable.asAccessor()}>
            {(collapse) => {
                if (collapse) {
                    const [revealed, revealedSetter] = createState(false)
                    return <box
                        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
                        <revealer
                            revealChild={revealed}>
                            <TrayContent vertical={vertical}/>
                        </revealer>
                        <OkButton
                            labelCss={["barTrayForeground"]}
                            backgroundCss={["barTrayBackground"]}
                            hpadding={getHPadding(bar)}
                            vpadding={getVPadding(bar)}
                            offset={1}
                            visible={createBinding(tray, "items").as((items) => items.length > 0)}
                            label={"󱊔"}
                            onClicked={() => {
                                revealedSetter(!revealed.peek())
                            }}/>
                    </box>
                } else {
                    return <TrayContent vertical={vertical}/>
                }
            }}
        </With>
    </box>
}

function TrayContent({vertical}: { vertical: boolean }) {
    return <box
        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}
        visible={createBinding(tray, "items").as((items) => items.length > 0)}>
        <For each={createBinding(tray, "items")} id={(it) => it.id}>
            {(item: AstalTray.TrayItem) => {
                if (item.id === null) {
                    return <box/>
                }
                let ag_handler: number;

                const menuButton = <menubutton
                    cssClasses={["trayMenuButton"]}
                    tooltipMarkup={createBinding(item, "tooltipMarkup")}
                    menuModel={createBinding(item, "menuModel")}
                    onDestroy={() => item.disconnect(ag_handler)}
                    $={self => {
                        ag_handler = item.connect("notify::action-group", () => {
                            self.insert_action_group("dbusmenu", item.get_action_group())
                        })
                    }}>
                    <image gicon={createBinding(item, "gicon")}/>
                </menubutton> as Gtk.MenuButton

                menuButton.insert_action_group("dbusmenu", item.get_action_group())

                return menuButton
            }}
        </For>
    </box>
}