import {Mpris} from "../utils/mpris";
import {Bar} from "../../config/bar";
import {With} from "ags";
import {variableConfig} from "../../config/config";
import MprisTrackInfo from "../common/mpris/MprisTrackInfo";

export default function ({vertical, bar}: { vertical: boolean, bar: Bar }) {
    const mpris = Mpris.get_default()
    return <box
        cssClasses={["barMprisTrackInfoBackground", "radiusSmall"]}>
        <With value={mpris.players[0]}>
            {(players) => {
                const player = players.find((player) => player.isPrimaryPlayer)

                if (player === undefined) {
                    return <box/>
                }
                let flipped

                switch (bar) {
                    case Bar.TOP:
                        flipped = false
                        break
                    case Bar.BOTTOM:
                        flipped = false
                        break
                    case Bar.LEFT:
                        flipped = false
                        break
                    case Bar.RIGHT:
                        flipped = true
                        break
                }

                return <MprisTrackInfo
                    player={player}
                    vertical={vertical}
                    isFlipped={flipped}
                    textLength={variableConfig.barWidgets.mprisTrackInfo.textLength.asAccessor()}
                    textAlignment={variableConfig.barWidgets.mprisTrackInfo.textAlignment.asAccessor()}
                    minimumLength={variableConfig.barWidgets.mprisTrackInfo.minimumLength.asAccessor()}/>
            }}
        </With>
    </box>
}