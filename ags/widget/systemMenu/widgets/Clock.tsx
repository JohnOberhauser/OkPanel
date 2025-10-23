import {Gtk} from "ags/gtk4";
import {variableConfig} from "../../../config/config";
import {createPoll} from "ags/time";
import GLib from "gi://GLib?version=2.0";

export default function () {
    const weekday = createPoll("", 1000, () => {
        const text = GLib.DateTime.new_now_local().format("%A")! // Full weekday name
        if (variableConfig.systemMenu.clock.dayAllCaps.get()) {
            return text.toUpperCase()
        }
        return text
    });

    const date = createPoll("", 1000, () =>
            GLib.DateTime.new_now_local().format("%m/%d/%Y")!
    );

    const time = createPoll("", 1000, () => {
        if (variableConfig.clockFormat24h.get()) {
            return GLib.DateTime.new_now_local().format("%H:%M")!
        } else {
            return GLib.DateTime.new_now_local().format("%-I:%M %p")!
        }
    });

    return <box
        orientation={Gtk.Orientation.HORIZONTAL}>
        <label
            marginStart={20}
            halign={Gtk.Align.START}
            hexpand={true}
            cssClasses={["labelXXLBold", "systemMenuClockDayFont"]}
            label={weekday}/>
        <box
            halign={Gtk.Align.START}
            marginStart={20}
            hexpand={true}
            orientation={Gtk.Orientation.VERTICAL}>
            <label
                halign={Gtk.Align.START}
                cssClasses={["labelMediumBold"]}
                label={date}/>
            <label
                halign={Gtk.Align.START}
                cssClasses={["labelSmall"]}
                label={time}/>
        </box>
    </box>
}