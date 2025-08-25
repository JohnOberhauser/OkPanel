import {readFile} from "ags/file";
import {Variable} from "./Variable";
import {execAsync} from "ags/process";
import {hideAllWindows} from "../widget/utils/windows";
import {variableConfig} from "./config";
import GLib from "gi://GLib?version=2.0";
import {integratedMenuRevealedSetting} from "../widget/bar/IntegratedMenu";

export enum Bar {
    LEFT = "left",
    RIGHT = "right",
    TOP = "top",
    BOTTOM = "bottom",
}

export const selectedBar = new Variable(Bar.LEFT)

export function setBarType(bar: Bar) {
    console.log(`Setting bar: ${bar}`)
    hideAllWindows()
    integratedMenuRevealedSetting(false)
    selectedBar.set(bar)
    saveBar()
    execAsync(`bash -c '
# if the set bar script exists
if [[ -f "${variableConfig.barUpdateScript.get()}" ]]; then
    # call the external update theme 
    ${variableConfig.barUpdateScript.get()} ${selectedBar.get()}
fi
    '`).catch((error) => {
        console.log(error)
    })
}

export function restoreBar() {
    const details = readFile(`${GLib.get_home_dir()}/.cache/OkPanel/savedBar`).trim()

    if (details.trim() === "") {
        return
    }
    switch (details) {
        case Bar.LEFT:
            selectedBar.set(Bar.LEFT)
            break;
        case Bar.TOP:
            selectedBar.set(Bar.TOP)
            break;
        case Bar.RIGHT:
            selectedBar.set(Bar.RIGHT)
            break;
        case Bar.BOTTOM:
            selectedBar.set(Bar.BOTTOM)
            break;
    }
}

function saveBar() {
    execAsync(`bash -c '
mkdir -p ${GLib.get_home_dir()}/.cache/OkPanel
echo "${selectedBar.get()}" > ${GLib.get_home_dir()}/.cache/OkPanel/savedBar
    '`).catch((error) => {
        console.error(error)
    })
}