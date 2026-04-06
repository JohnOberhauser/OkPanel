"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemMenuQuickActionsArrayField = exports.SYSTEM_MENU_QUICK_ACTIONS_VALUES = exports.SystemMenuQuickActions = exports.SYSTEM_MENU_WIDGET_VALUES = exports.SystemMenuWidget = void 0;
exports.systemMenuWidgetsSchema = systemMenuWidgetsSchema;
var SystemMenuWidget;
(function (SystemMenuWidget) {
    SystemMenuWidget["AUDIO_IN"] = "audioIn";
    SystemMenuWidget["AUDIO_OUT"] = "audioOut";
    SystemMenuWidget["BLUETOOTH"] = "bluetooth";
    SystemMenuWidget["CLOCK"] = "clock";
    SystemMenuWidget["LOOK_AND_FEEL"] = "lookAndFeel";
    SystemMenuWidget["MPRIS_PLAYERS"] = "mprisPlayers";
    SystemMenuWidget["NETWORK"] = "network";
    SystemMenuWidget["NOTIFICATION_HISTORY"] = "notificationHistory";
    SystemMenuWidget["POWER_PROFILE"] = "powerProfile";
    SystemMenuWidget["QUICK_ACTIONS_1"] = "quickActions1";
    SystemMenuWidget["QUICK_ACTIONS_2"] = "quickActions2";
})(SystemMenuWidget || (exports.SystemMenuWidget = SystemMenuWidget = {}));
exports.SYSTEM_MENU_WIDGET_VALUES = Object.values(SystemMenuWidget);
var SystemMenuQuickActions;
(function (SystemMenuQuickActions) {
    SystemMenuQuickActions["AIRPLANE_MODE_TOGGLE"] = "airplaneModeToggle";
    SystemMenuQuickActions["APP_LAUNCHER_TOGGLE"] = "appLauncherToggle";
    SystemMenuQuickActions["BLUETOOTH_TOGGLE"] = "bluetoothToggle";
    SystemMenuQuickActions["CLIPBOARD_MANAGER_TOGGLE"] = "clipboardManagerToggle";
    SystemMenuQuickActions["COLOR_PICKER"] = "colorPicker";
    SystemMenuQuickActions["DO_NOT_DISTURB_TOGGLE"] = "doNotDisturbToggle";
    SystemMenuQuickActions["LOCK"] = "lock";
    SystemMenuQuickActions["LOGOUT"] = "logout";
    SystemMenuQuickActions["NIGHTLIGHT_TOGGLE"] = "nightlightToggle";
    SystemMenuQuickActions["RESTART"] = "restart";
    SystemMenuQuickActions["SCREENSHOT_TOGGLE"] = "screenshotToggle";
    SystemMenuQuickActions["SHUTDOWN"] = "shutdown";
})(SystemMenuQuickActions || (exports.SystemMenuQuickActions = SystemMenuQuickActions = {}));
exports.SYSTEM_MENU_QUICK_ACTIONS_VALUES = Object.values(SystemMenuQuickActions);
const systemMenuQuickActionsArrayField = (//preserve the literal key
name, description, defaults) => ({
    name,
    type: "array",
    description,
    default: defaults,
    item: {
        name: "widget",
        type: "enum",
        enumValues: exports.SYSTEM_MENU_QUICK_ACTIONS_VALUES,
    },
});
exports.systemMenuQuickActionsArrayField = systemMenuQuickActionsArrayField;
function quickActionsCommons() {
    return [
        {
            name: 'maxPerRow',
            type: 'number',
            default: 4,
            transformation: (value) => {
                if (value > 5) {
                    return 5;
                }
                else if (value < 1) {
                    return 1;
                }
                else {
                    return value;
                }
            },
            description: 'Max number of actions per row.  1-5',
        },
    ];
}
function systemMenuWidgetsSchema() {
    return [
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
                    default: { from: "theme.font" },
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
                (0, exports.systemMenuQuickActionsArrayField)('actions', 'Actions inside the group', [
                    SystemMenuQuickActions.BLUETOOTH_TOGGLE,
                    SystemMenuQuickActions.AIRPLANE_MODE_TOGGLE,
                    SystemMenuQuickActions.NIGHTLIGHT_TOGGLE,
                    SystemMenuQuickActions.DO_NOT_DISTURB_TOGGLE,
                ]),
                ...quickActionsCommons(),
            ]
        },
        {
            name: SystemMenuWidget.QUICK_ACTIONS_2,
            type: 'object',
            description: 'Configurations for quick actions.',
            children: [
                (0, exports.systemMenuQuickActionsArrayField)('actions', 'Actions inside the group', [
                    SystemMenuQuickActions.LOGOUT,
                    SystemMenuQuickActions.LOCK,
                    SystemMenuQuickActions.RESTART,
                    SystemMenuQuickActions.SHUTDOWN,
                ]),
                ...quickActionsCommons(),
            ]
        },
    ];
}
