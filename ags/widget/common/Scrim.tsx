import App from "ags/gtk4/app"
import {hideAllWindows} from "../utils/windows";
import {createState} from "ags";
import Astal from "gi://Astal?version=4.0";
import {Gtk} from "ags/gtk4";

export const [scrimsVisible, scrimsVisibleSetter] = createState(false)

export default function (monitorId: number): Astal.Window {
    return <window
        namespace={"okpanel-scrim"}
        monitor={monitorId}
        name={"Scrim"}
        anchor={Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP}
        exclusivity={Astal.Exclusivity.IGNORE}
        layer={Astal.Layer.OVERLAY}
        cssClasses={["scrimBackground"]}
        application={App}
        visible={scrimsVisible}
        $={(self) => {
            const gesture = new Gtk.GestureClick()
            gesture.connect('pressed', (_gesture, n_press, x, y) => {
                hideAllWindows()
            });
            self.add_controller(gesture)
        }}>
        <box
            hexpand={true}
            vexpand={true}/>
    </window> as Astal.Window
}