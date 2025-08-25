import {variableConfig} from "../../config/config";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {execAsync} from "ags/process";
import {integratedMenuRevealedSetting} from "../bar/IntegratedMenu";
import {Bar, selectedBar} from "../../config/bar";
import {addWindowOneOff} from "./windows";

export function logout() {
    if (variableConfig.systemCommands.logoutConfirmationEnabled.get()) {
        addWindowOneOff(() => ConfirmationDialog(
            "Are you sure you want to log out?",
            "Log out",
            "Cancel",
            () => {
                execAsync(variableConfig.systemCommands.logout.get())
                    .catch((error) => {
                        console.error(error)
                    })
            }
        ))
    } else {
        execAsync(variableConfig.systemCommands.logout.get())
            .catch((error) => {
                console.error(error)
            })
    }
}

export function lock() {
    if (variableConfig.systemCommands.lockConfirmationEnabled.get()) {
        integratedMenuRevealedSetting(false)
        addWindowOneOff(() => ConfirmationDialog(
            "Are you sure you want to lock the device?",
            "Lock",
            "Cancel",
            () => {
                execAsync(variableConfig.systemCommands.lock.get())
                    .catch((error) => {
                        console.error(error)
                    })
            }
        ))
    } else {
        const barIsVertical = selectedBar.get() === Bar.LEFT || selectedBar.get() === Bar.RIGHT
        if (barIsVertical && variableConfig.verticalBar.integratedMenu.get()) {
            // Hide the integrated menu before locking
            integratedMenuRevealedSetting(false)
            execAsync(['bash', '-c', `sleep 0.3 && ${variableConfig.systemCommands.lock.get()}`])
                .catch((error) => {
                    console.error(error)
                })
        } else {
            execAsync(variableConfig.systemCommands.lock.get())
                .catch((error) => {
                    console.error(error)
                })
        }
    }
}

export function restart() {
    if (variableConfig.systemCommands.restartConfirmationEnabled.get()) {
        addWindowOneOff(() => ConfirmationDialog(
            "Are you sure you want to restart?",
            "Restart",
            "Cancel",
            () => {
                execAsync(variableConfig.systemCommands.restart.get())
                    .catch((error) => {
                        console.error(error)
                    })
            }
        ))
    } else {
        execAsync(variableConfig.systemCommands.restart.get())
            .catch((error) => {
                console.error(error)
            })
    }
}

export function shutdown() {
    if (variableConfig.systemCommands.shutdownConfirmationEnabled.get()) {
        addWindowOneOff(() => ConfirmationDialog(
            "Are you sure you want to shut down?",
            "Shut down",
            "Cancel",
            () => {
                execAsync(variableConfig.systemCommands.shutdown.get())
                    .catch((error) => {
                        console.error(error)
                    })
            }
        ))
    } else {
        execAsync(variableConfig.systemCommands.shutdown.get())
            .catch((error) => {
                console.error(error)
            })
    }
}