import {LoopStatus, PlaybackStatus, Player, ShuffleStatus} from "../../utils/mpris";
import {Gtk} from "ags/gtk4";
import OkButton, {OkButtonHorizontalPadding, OkButtonVerticalPadding} from "../OkButton";
import {Accessor} from "ags";

export default function (
    {
        player,
        vertical,
        hpadding,
        vpadding,
        foregroundCss = [],
        backgroundCss = [],
    }:
    {
        player: Player,
        vertical: boolean,
        hpadding: OkButtonHorizontalPadding | Accessor<OkButtonHorizontalPadding>,
        vpadding: OkButtonVerticalPadding | Accessor<OkButtonVerticalPadding>,
        foregroundCss?: string[],
        backgroundCss?: string[],
    }
) {
    const playIcon = player.playbackStatus[0](s =>
        s === PlaybackStatus.Playing
            ? ""
            : ""
    )

    return <box
        halign={Gtk.Align.CENTER}
        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
        <OkButton
            labelCss={foregroundCss}
            backgroundCss={backgroundCss}
            hpadding={hpadding}
            vpadding={vpadding}
            onClicked={() => {
                if (player.shuffleStatus[0].peek() === ShuffleStatus.Enabled) {
                    player.setShuffleStatus(ShuffleStatus.Disabled)
                } else {
                    player.setShuffleStatus(ShuffleStatus.Enabled)
                }
            }}
            visible={player.shuffleStatus[0]((shuffle) => shuffle !== ShuffleStatus.Unsupported)}
            label={player.shuffleStatus[0]((shuffle) => {
                if (shuffle === ShuffleStatus.Enabled) {
                    return ""
                } else {
                    return "󰒞"
                }
            })}/>
        <OkButton
            labelCss={foregroundCss}
            backgroundCss={backgroundCss}
            hpadding={hpadding}
            vpadding={vpadding}
            onClicked={() => {
                player.previousTrack()
            }}
            visible={player.canGoPrevious[0]}
            label=""/>
        <OkButton
            labelCss={foregroundCss}
            backgroundCss={backgroundCss}
            hpadding={hpadding}
            vpadding={vpadding}
            onClicked={() => {
                player.playPause()
            }}
            visible={player.canControl[0]}
            label={playIcon}/>
        <OkButton
            labelCss={foregroundCss}
            backgroundCss={backgroundCss}
            hpadding={hpadding}
            vpadding={vpadding}
            onClicked={() => {
                player.nextTrack()
            }}
            visible={player.canGoNext[0]}
            label=""/>
        <OkButton
            labelCss={foregroundCss}
            backgroundCss={backgroundCss}
            hpadding={hpadding}
            vpadding={vpadding}
            onClicked={() => {
                if (player.loopStatus[0].peek() === LoopStatus.None) {
                    player.setLoopStatus(LoopStatus.Playlist)
                } else if (player.loopStatus[0].peek() === LoopStatus.Playlist) {
                    player.setLoopStatus(LoopStatus.Track)
                } else {
                    player.setLoopStatus(LoopStatus.None)
                }
            }}
            visible={player.loopStatus[0]((status) => status !== LoopStatus.Unsupported)}
            label={player.loopStatus[0]((status) => {
                if (status === LoopStatus.None) {
                    return "󰑗"
                } else if (status === LoopStatus.Playlist) {
                    return "󰑖"
                } else {
                    return "󰑘"
                }
            })}/>
    </box>
}