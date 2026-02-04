import OkButton, {OkButtonSize} from "../../../common/OkButton";
import {airplaneModeEnabled, disableAirplaneMode, enableAirplaneMode} from "../NetworkControls";

export default function () {
    return <OkButton
        size={OkButtonSize.XL}
        label="󰀝"
        offset={0}
        selected={airplaneModeEnabled}
        onClicked={() => {
            if (airplaneModeEnabled.peek()) {
                disableAirplaneMode()
            } else {
                enableAirplaneMode()
            }
        }}/>
}