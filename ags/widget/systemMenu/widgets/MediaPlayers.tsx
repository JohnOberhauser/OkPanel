import {Gtk} from "ags/gtk4"
import Pango from "gi://Pango?version=1.0";
import {Mpris, Player} from "../../utils/mpris"
import MprisControlButtons from "../../mpris/MprisControlButtons";
import {For} from "ags";
import {OkButtonHorizontalPadding, OkButtonVerticalPadding} from "../../common/OkButton";

const mpris = Mpris.get_default()
const STREAMING_TRACK_LENGTH = 9999999999

function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? "0" : ""
    return `${min}:${sec0}${sec}`
}

function MediaPlayer({ player }: { player: Player }) {
    const { START, END, CENTER } = Gtk.Align

    const title = player.title[0](t =>
        t || "Unknown Track")

    const artist = player.artist[0](a =>
        a || "Unknown Artist")

    const program = player.identity[0](p =>
        p || "")

    return <box
        cssClasses={["mediaPlayer"]}
        orientation={Gtk.Orientation.VERTICAL}>
        <label
            visible={player.title[0]((t) => t !== null)}
            cssClasses={["labelSmallBold"]}
            ellipsize={Pango.EllipsizeMode.END}
            halign={CENTER}
            label={title}/>
        <label
            visible={player.artist[0]((a) => a !== null)}
            cssClasses={["labelSmall"]}
            ellipsize={Pango.EllipsizeMode.END}
            halign={CENTER}
            label={artist}/>
        <box
            marginTop={10}
            marginBottom={10}
            visible={player.trackLength[0](l => l > 0)}
            orientation={Gtk.Orientation.HORIZONTAL}>
            <label
                cssClasses={["labelSmall"]}
                halign={START}
                label={player.position[0](lengthStr)}
            />
            <slider
                canFocus={false}
                focusOnClick={false}
                cssClasses={["seek"]}
                hexpand={true}
                onChangeValue={({value}) => {
                    if (player.trackLength[0].peek() > STREAMING_TRACK_LENGTH) {
                        return
                    }
                    player.setPosition(value * player.trackLength[0].peek())
                }}
                value={player.position[0]((position) => {
                    return player.trackLength[0].peek() > 0 ? position / player.trackLength[0].peek() : 0
                })}
            />
            <label
                cssClasses={["labelSmall"]}
                halign={END}
                label={player.trackLength[0]((l) => {
                    if (l > STREAMING_TRACK_LENGTH) {
                        return " "
                    } else if (l > 0) {
                        return lengthStr(l)
                    } else {
                        return "0:00"
                    }
                })}
            />
        </box>
        <box
            orientation={Gtk.Orientation.VERTICAL}
            spacing={10}>
            <MprisControlButtons
                hpadding={OkButtonHorizontalPadding.STANDARD}
                vpadding={OkButtonVerticalPadding.STANDARD}
                player={player}
                vertical={false}/>
            <label
                visible={player.identity[0]((i) => i !== null)}
                cssClasses={["labelSmall"]}
                ellipsize={Pango.EllipsizeMode.END}
                halign={CENTER}
                label={program}/>
        </box>
    </box>
}

export default function () {
    return <box
        orientation={Gtk.Orientation.VERTICAL}>
        <For each={mpris.players[0]} id={(it) => it.busName}>
            {(player) => (
                <MediaPlayer player={player}/>
            )}
        </For>
    </box>
}