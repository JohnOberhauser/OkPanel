import {Field} from "../primitiveDefinitions";

export enum SystemMenuWidget {
    AUDIO_IN = "audioIn",
    AUDIO_OUT = "audioOut",
    BLUETOOTH = "bluetooth",
    CLOCK = "clock",
    LOOK_AND_FEEL = "lookAndFeel",
    MPRIS_PLAYERS = "mprisPlayers",
    NETWORK = "network",
    NOTIFICATION_HISTORY = "notificationHistory",
    POWER_PROFILE = "powerProfile",
    QUICK_ACTIONS_1 = "quickActions1",
    QUICK_ACTIONS_2 = "quickActions2",
}

export const SYSTEM_MENU_WIDGET_VALUES = Object.values(SystemMenuWidget) as readonly SystemMenuWidget[]

export enum SystemMenuQuickActions {
    AIRPLANE_MODE_TOGGLE = "airplaneModeToggle",
    APP_LAUNCHER_TOGGLE = "appLauncherToggle",
    BLUETOOTH_TOGGLE = "bluetoothToggle",
    CLIPBOARD_MANAGER_TOGGLE = "clipboardManagerToggle",
    COLOR_PICKER = "colorPicker",
    DO_NOT_DISTURB_TOGGLE = "doNotDisturbToggle",
    LOCK = "lock",
    LOGOUT = "logout",
    NIGHTLIGHT_TOGGLE = "nightlightToggle",
    RESTART = "restart",
    SCREENSHOT_TOGGLE = "screenshotToggle",
    SHUTDOWN = "shutdown",
}

export const SYSTEM_MENU_QUICK_ACTIONS_VALUES = Object.values(SystemMenuQuickActions) as readonly SystemMenuQuickActions[]

export const systemMenuQuickActionsArrayField = <N extends string>( //preserve the literal key
    name: N,
    description: string,
    defaults: readonly SystemMenuQuickActions[],
) =>
    ({
        name,
        type: "array",
        description,
        default: defaults,
        item: {
            name: "widget",
            type: "enum",
            enumValues: SYSTEM_MENU_QUICK_ACTIONS_VALUES,
        },
    } as const satisfies Field & { name: N })

function quickActionsCommons() { return [
    {
        name: 'maxPerRow',
        type: 'number',
        default: 4,
        transformation: (value: number) => {
            if (value > 5) {
                return 5
            } else if (value < 1) {
                return 1
            } else {
                return value
            }
        },
        description: 'Max number of actions per row.  1-5',
    },
] as const satisfies Field[] }

export function systemMenuWidgetsSchema() { return [
    {
        name: SystemMenuWidget.CLOCK,
        type: 'object',
        description: 'Configurations for the system menu clock.',
        children: [
            {
                name: "dayAllCaps",
                type: 'boolean',
                default: false,
                description: "If the week day name text should be in all caps",
            },
            {
                name: "dayFont",
                type: "string",
                default: {from: "theme.font"},
                description: "Font used for the week day name",
                reactive: false,
            },
        ]
    },
    {
        name: SystemMenuWidget.QUICK_ACTIONS_1,
        type: 'object',
        description: 'Configurations for quick actions.',
        children: [
            systemMenuQuickActionsArrayField(
                'actions',
                'Actions inside the group',
                [
                    SystemMenuQuickActions.BLUETOOTH_TOGGLE,
                    SystemMenuQuickActions.AIRPLANE_MODE_TOGGLE,
                    SystemMenuQuickActions.NIGHTLIGHT_TOGGLE,
                    SystemMenuQuickActions.DO_NOT_DISTURB_TOGGLE,
                ]
            ),
            ...quickActionsCommons(),
        ]
    },
    {
        name: SystemMenuWidget.QUICK_ACTIONS_2,
        type: 'object',
        description: 'Configurations for quick actions.',
        children: [
            systemMenuQuickActionsArrayField(
                'actions',
                'Actions inside the group',
                [
                    SystemMenuQuickActions.LOGOUT,
                    SystemMenuQuickActions.LOCK,
                    SystemMenuQuickActions.RESTART,
                    SystemMenuQuickActions.SHUTDOWN,
                ]
            ),
            ...quickActionsCommons(),
        ]
    },
] as const satisfies Field[] }
