import { Gtk } from "ags/gtk4"
import Notifd from "gi://AstalNotifd"
import {insertNewlines} from "../utils/strings";
import Pango from "gi://Pango?version=1.0";
import OkButton from "../common/OkButton";
import GLib from "gi://GLib?version=2.0";

const time = (time: number, format = "%I:%M %p") => GLib.DateTime
    .new_from_unix_local(time)
    .format(format)!

const urgency = (n: Notifd.Notification) => {
    const { LOW, NORMAL, CRITICAL } = Notifd.Urgency
    // match operator when?
    switch (n.urgency) {
        case LOW: return "low"
        case CRITICAL: return "critical"
        case NORMAL:
        default: return "normal"
    }
}

type Props = {
    setup(self: Gtk.Box): void
    notification: Notifd.Notification
    useHistoryCss: boolean
}

export default function Notification(props: Props) {
    const { notification: n, setup, useHistoryCss } = props
    const { START, END } = Gtk.Align

    return <box
        orientation={Gtk.Orientation.VERTICAL}
        cssClasses={useHistoryCss ?
            ["notificationHistorical"] : urgency(n) === "critical"
                ? ["window", "notificationCritical"] : ["window", "notification"]}
        $={setup}>
        <box
            marginTop={2}
            orientation={Gtk.Orientation.HORIZONTAL}>
            <label
                cssClasses={["labelSmallBold", "notificationTitle"]}
                marginStart={8}
                halign={START}
                ellipsize={Pango.EllipsizeMode.END}
                label={n.appName || "Unknown"}/>
            <label
                cssClasses={["labelSmall"]}
                marginEnd={4}
                hexpand
                halign={END}
                label={time(n.time)}/>
            <OkButton
                onClicked={() => n.dismiss()}
                label=""/>
        </box>
        <box
            orientation={Gtk.Orientation.VERTICAL}
            marginTop={10}
            marginBottom={10}
            marginStart={10}
            marginEnd={10}>
            <label
                cssClasses={["labelMediumBold"]}
                halign={START}
                xalign={0}
                label={insertNewlines(n.summary, 33)} // wrap causes issues with scrollable height so split lines manually
            />
            {n.body && <label
                cssClasses={["labelSmall"]}
                halign={START}
                xalign={0}
                label={insertNewlines(n.body, 40)}
            />}
        </box>
        {n.get_actions().length > 0 &&
            <box
                orientation={Gtk.Orientation.VERTICAL}
                marginTop={4}
                marginEnd={8}
                marginBottom={8}
                marginStart={8}
                spacing={8}>
                {n.get_actions().map(({ label, id }) => (
                    <OkButton
                        primary={true}
                        hexpand={true}
                        onClicked={() => n.invoke(id)}
                        label={label}/>
                ))}
        </box>}
    </box>
}
