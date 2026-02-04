import OkButton, {OkButtonSize} from "../../../common/OkButton";
import {execAsync} from "ags/process";
import {createState} from "ags";
import {variableConfig} from "../../../../config/config";

export const [nightLightEnabled, nightLightEnabledSet] = createState(false)

export function enableNightLight() {
    execAsync(`hyprctl hyprsunset temperature ${variableConfig.theme.nightLightTemperature}`)
        .catch((error) => {
            console.error(error)
        }).then(() => {
        nightLightEnabledSet(true)
    })
}

export function disableNightLight() {
    execAsync("hyprctl hyprsunset identity")
        .catch((error) => {
            console.error(error)
        }).then(() => {
        nightLightEnabledSet(false)
    })
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