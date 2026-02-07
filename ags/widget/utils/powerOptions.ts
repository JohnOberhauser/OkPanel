import {variableConfig} from "../../config/config";
import ConfirmationDialog from "../common/ConfirmationDialog";
import {execAsync} from "ags/process";
import {integratedMenuRevealedSetting} from "../systemMenu/IntegratedMenu";
import {addWindowOneOff} from "./windows";

export function logout() {
    if (variableConfig.systemCommands.logoutConfirmationEnabled.peek()) {
        addWindowOneOff(() => ConfirmationDialog(
            "Are you sure you want to log out?",
            "Log out",
            "Cancel",
            () => {
                execAsync(variableConfig.systemCommands.logout.peek())
                    .catch((error) => {
                        console.error(error)
                    })
            }
        ))
    } else {
        execAsync(variableConfig.systemCommands.logout.peek())
            .catch((error) => {
                console.error(error)
            })
    }
}

export function lock() {
    if (variableConfig.systemCommands.lockConfirmationEnabled.peek()) {
        integratedMenuRevealedSetting(false)
        addWindowOneOff(() => ConfirmationDialog(
            "Are you sure you want to lock the device?",
            "Lock",
            "Cancel",
            () => {
                execAsync(variableConfig.systemCommands.lock.peek())
                    .catch((error) => {
                        console.error(error)
                    })
            }
        ))
    } else {
        // Hide the integrated menu before locking
        integratedMenuRevealedSetting(false)
        execAsync(['bash', '-c', `sleep 0.25 && ${variableConfig.systemCommands.lock.peek()}`])
            .catch((error) => {
                console.error(error)
            })
    }
}

export function restart() {
    if (variableConfig.systemCommands.restartConfirmationEnabled.peek()) {
        addWindowOneOff(() => ConfirmationDialog(
            "Are you sure you want to restart?",
            "Restart",
            "Cancel",
            () => {
                execAsync(variableConfig.systemCommands.restart.peek())
                    .catch((error) => {
                        console.error(error)
                    })
            }
        ))
    } else {
        execAsync(variableConfig.systemCommands.restart.peek())
            .catch((error) => {
                console.error(error)
            })
    }
}

export function shutdown() {
    if (variableConfig.systemCommands.shutdownConfirmationEnabled.peek()) {
        addWindowOneOff(() => ConfirmationDialog(
            "Are you sure you want to shut down?",
            "Shut down",
            "Cancel",
            () => {
                execAsync(variableConfig.systemCommands.shutdown.peek())
                    .catch((error) => {
                        console.error(error)
                    })
            }
        ))
    } else {
        execAsync(variableConfig.systemCommands.shutdown.peek())
            .catch((error) => {
                console.error(error)
            })
    }
}