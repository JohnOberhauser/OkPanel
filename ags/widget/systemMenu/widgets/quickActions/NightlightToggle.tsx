import OkButton, {OkButtonSize} from "../../../common/OkButton";
import {createState} from "ags";
import {variableConfig} from "../../../../config/config";
import Gio from "gi://Gio?version=2.0";

export const [nightLightEnabled, nightLightEnabledSet] = createState(false)

let proc: Gio.Subprocess | null = null

export function enableNightLight() {
    if (proc)
        return;

    proc = Gio.Subprocess.new(
        ["bash", "-c", `hyprsunset --temperature ${variableConfig.theme.nightLightTemperature}`],
        Gio.SubprocessFlags.NONE
    );

    nightLightEnabledSet(true)

    proc.wait_async(null, (p, res) => {
        try {
            p?.wait_finish(res);
            log("Process exited");
        } catch (e) {
            logError(e);
        } finally {
            proc = null;
        }
    });
}

export function disableNightLight() {
    if (!proc)
        return;

    nightLightEnabledSet(false)
    log("Killing process");
    proc.force_exit();   // SIGKILL
    proc = null;
}

export default function () {
    return <OkButton
        size={OkButtonSize.XL}
        label="󱩌"
        offset={0}
        selected={nightLightEnabled}
        onClicked={() => {
            if (nightLightEnabled.peek()) {
                disableNightLight()
            } else {
                enableNightLight()
            }
        }}/>
}