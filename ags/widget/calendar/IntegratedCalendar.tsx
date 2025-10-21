import {Gtk} from "ags/gtk4";
import {createState, With} from "ags";
import Weather from "./Weather";
import Calendar from "./Calendar";
import Timer from "./Timer";

export const integratedCalendarWidth = 410

export const [integratedCalendarRevealed, integratedCalendarRevealedSetting] = createState(false)

export function toggleIntegratedCalendar() {
    integratedCalendarRevealedSetting(!integratedCalendarRevealed.get())
}

export function closeIntegratedCalendar() {
    integratedCalendarRevealedSetting(false)
}

export default function () {
    return <revealer
        hexpand={false}
        transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
        revealChild={integratedCalendarRevealed}>
        <Gtk.ScrolledWindow
            cssClasses={["scrollWindow"]}
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            propagateNaturalHeight={true}
            widthRequest={integratedCalendarWidth}>
            <box
                hexpand={false}
                orientation={Gtk.Orientation.VERTICAL}>
                <box
                    halign={Gtk.Align.CENTER}>
                    {/* Recreate the calendar on reveal via <With> tag.  Do this so the current day is always correct */}
                    <With value={integratedCalendarRevealed}>
                        {(_) => {
                            return <Calendar/>
                        }}
                    </With>
                </box>
                <Weather/>
                <box marginTop={40}/>
                <Timer/>
            </box>
        </Gtk.ScrolledWindow>
    </revealer>
}