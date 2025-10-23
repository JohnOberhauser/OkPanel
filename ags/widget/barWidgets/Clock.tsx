import {createPoll} from "../../../../../../../usr/share/ags/js/lib/time";
import GLib from "gi://GLib?version=2.0";
import OkButton, {OkButtonHorizontalPadding} from "../common/OkButton";
import {Bar} from "../../config/bar";
import {getVPadding} from "./BarWidgets";
import {toggleIntegratedCalendar} from "../calendar/IntegratedCalendar";
import {variableConfig} from "../../config/config";

export default function ({vertical, bar}: { vertical: boolean, bar: Bar }) {
    const time = createPoll("", 1000, () => {
        const use24h = variableConfig.clockFormat24h.get()
        let format: string

        if (vertical) {
            format = use24h ? "%H\n%M" : "%I\n%M"
        } else {
            format = use24h ? "%H:%M" : "%I:%M"
        }

        return GLib.DateTime.new_now_local().format(format)!
    })

    return <OkButton
        labelCss={["barClockForeground"]}
        backgroundCss={["barClockBackground"]}
        hexpand={vertical}
        hpadding={vertical ? OkButtonHorizontalPadding.NONE : OkButtonHorizontalPadding.THIN}
        vpadding={getVPadding(bar)}
        label={time}
        onClicked={() => {
            toggleIntegratedCalendar()
        }}/>
}