import {Player} from "../../utils/mpris";
import VerticalLabel from "../VerticalLabel";
import {truncateString} from "../../utils/strings";
import {variableConfig} from "../../../config/config";
import {alignmentToGtk} from "../../utils/configHelper";
import {Gtk} from "ags/gtk4";
import {Accessor, createComputed} from "ags";
import {Alignment} from "../../../config/schema/definitions/barWidgets";

export default function (
    {
        player,
        vertical,
        isFlipped,
        textLength,
        textAlignment,
        minimumLength,
    }: {
        player: Player,
        vertical: boolean,
        isFlipped: boolean,
        textLength: Accessor<number>,
        textAlignment: Accessor<Alignment>,
        minimumLength: Accessor<number>,
    }
) {
    const title = createComputed([
        player.title[0],
        textLength,
    ], (title, textLength) => {
        return title ? truncateString(
            title,
            textLength
        ) : "Unknown Track"
    })

    const artist = createComputed([
        player.artist[0],
        textLength,
    ], (artist, textLength) => {
        return artist ?  truncateString(
            artist,
            textLength
        ) : "Unknown Artist"
    })

    const alignment = textAlignment.as((align) =>
        alignmentToGtk(align)
    )

    return <box>
        {vertical &&
            <box
                hexpand={true}>
                { isFlipped &&
                    <box
                        hexpand={true}
                        halign={Gtk.Align.CENTER}
                        orientation={Gtk.Orientation.HORIZONTAL}
                        heightRequest={minimumLength}>
                        <VerticalLabel
                            text={artist}
                            fontSize={14}
                            flipped={isFlipped}
                            bold={false}
                            alignment={alignment}
                            foregroundColor={variableConfig.barWidgets.mprisTrackInfo.foreground.asAccessor()}
                        />
                        <VerticalLabel
                            text={title}
                            fontSize={14}
                            flipped={isFlipped}
                            bold={true}
                            alignment={alignment}
                            foregroundColor={variableConfig.barWidgets.mprisTrackInfo.foreground.asAccessor()}
                        />
                    </box>
                }
                {!isFlipped && <box
                        hexpand={true}
                        halign={Gtk.Align.CENTER}
                        orientation={Gtk.Orientation.HORIZONTAL}
                        heightRequest={minimumLength}>
                        <VerticalLabel
                            text={title}
                            fontSize={14}
                            flipped={isFlipped}
                            bold={true}
                            alignment={alignment}
                            foregroundColor={variableConfig.barWidgets.mprisTrackInfo.foreground.asAccessor()}
                        />
                        <VerticalLabel
                            text={artist}
                            fontSize={14}
                            flipped={isFlipped}
                            bold={false}
                            alignment={alignment}
                            foregroundColor={variableConfig.barWidgets.mprisTrackInfo.foreground.asAccessor()}
                        />
                    </box>
                }
            </box>
        }
        {!vertical &&
            <box
                orientation={Gtk.Orientation.VERTICAL}
                valign={Gtk.Align.CENTER}
                widthRequest={minimumLength}>
                <label
                    marginStart={8}
                    cssClasses={["labelSmallBold", "barMprisTrackInfoForeground", "lineHeightCompact"]}
                    halign={textAlignment.as((a) => alignmentToGtk(a))}
                    label={title}/>
                <label
                    marginStart={8}
                    cssClasses={["labelSmall", "barMprisTrackInfoForeground", "lineHeightCompact"]}
                    halign={textAlignment.as((a) => alignmentToGtk(a))}
                    label={artist}/>
            </box>
        }
    </box>
}