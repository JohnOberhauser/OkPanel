import Notifd from "gi://AstalNotifd"
import Notification from "./Notification"
import {Gtk} from "ags/gtk4"
import OkButton from "../common/OkButton";
import {createBinding} from "ags";
import {integratedNotificationHistoryRevealedSetting} from "./IntegratedNotificationHistory";
import {AnimatedFor} from "../common/AnimatedFor";

export default function() {
    const notifications = Notifd.get_default()

    return <box
        orientation={Gtk.Orientation.VERTICAL}>
        <box
            orientation={Gtk.Orientation.HORIZONTAL}>
            <OkButton
                label={createBinding(notifications, "dontDisturb").as((dnd) => {
                    return dnd ? "󰂛" : "󰂚"
                })}
                offset={createBinding(notifications, "dontDisturb").as((dnd) => {
                    return dnd ? 1 : 0
                })}
                onClicked={() => {
                    notifications.set_dont_disturb(!notifications.dontDisturb)
                }}/>
            <label
                marginStart={4}
                cssClasses={["labelMediumBold"]}
                label="Notifications"/>
            <box hexpand={true}/>
            <OkButton
                label="Clear all"
                onClicked={() => {
                    notifications.notifications.forEach((notification) => {
                        notification.dismiss()
                    })
                    integratedNotificationHistoryRevealedSetting(false)
                }}/>
        </box>
        <AnimatedFor
            reverse={true}
            each={
                createBinding(notifications, "notifications")
                    .as((n) => {
                        return n.sort((a, b) => b.time - a.time)
                    })
            }
            emptyState={
                <label
                    cssClasses={["labelSmall"]}
                    marginTop={8}
                    marginBottom={20}
                    halign={Gtk.Align.CENTER}
                    label="All caught up"/>
            }
            id={(it) => it.id}
        >
            {(notification: Notifd.Notification) => {
                return <Notification
                    setup={() => {}}
                    notification={notification}
                    useHistoryCss={true}/>
            }}
        </AnimatedFor>
    </box>
}