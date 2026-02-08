import {Mpris} from "../utils/mpris";
import {With} from "ags";
import {Bar} from "../../config/bar";
import {variableConfig} from "../../config/config";
import CavaWaveform from "../common/cava/CavaWaveform";
import {getCavaFlipStartValue} from "../utils/cava";

export default function ({vertical, bar}: { vertical: boolean, bar: Bar }) {
    const mpris = Mpris.get_default()

    return <box
        vexpand={!vertical}
        hexpand={vertical}
        cssClasses={["barCavaWaveformBackground", "radiusSmall"]}>
        <With value={mpris.players[0]}>
            {(players => {
                if (players.length === 0) {
                    return <box/>
                }

                return <box
                    vexpand={!vertical}
                    hexpand={vertical}>
                    <CavaWaveform
                        color={variableConfig.barWidgets.cavaWaveform.foreground.asAccessor()}
                        marginStart={vertical ? 0 : 20}
                        marginEnd={vertical ? 0 : 20}
                        marginTop={vertical ? 20 : 0}
                        marginBottom={vertical ? 20 : 0}
                        vertical={vertical}
                        flipStart={getCavaFlipStartValue(bar)}
                        intensity={variableConfig.barWidgets.cavaWaveform.intensityMultiplier.asAccessor()}
                        expand={variableConfig.barWidgets.cavaWaveform.expanded.asAccessor()}
                        length={variableConfig.barWidgets.cavaWaveform.length.asAccessor()}
                        size={30}/>
                </box>
            })}
        </With>
    </box>
}