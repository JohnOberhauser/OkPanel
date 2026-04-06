"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.systemMenuSchema = exports.systemMenuWidgetsArrayField = void 0;
const systemMenuWidgets_1 = require("./systemMenuWidgets");
const systemMenuWidgetsArrayField = (//preserve the literal key
name, description, defaults) => ({
    name,
    type: "array",
    description,
    default: defaults,
    item: {
        name: "widget",
        type: "enum",
        enumValues: systemMenuWidgets_1.SYSTEM_MENU_WIDGET_VALUES,
    },
});
exports.systemMenuWidgetsArrayField = systemMenuWidgetsArrayField;
exports.systemMenuSchema = {
    name: 'systemMenu',
    type: 'object',
    description: 'System menu configurations.',
    children: [
        (0, exports.systemMenuWidgetsArrayField)('widgets', 'Widgets inside the system menu', [
            systemMenuWidgets_1.SystemMenuWidget.CLOCK,
            systemMenuWidgets_1.SystemMenuWidget.QUICK_ACTIONS_1,
            systemMenuWidgets_1.SystemMenuWidget.NETWORK,
            systemMenuWidgets_1.SystemMenuWidget.BLUETOOTH,
            systemMenuWidgets_1.SystemMenuWidget.AUDIO_OUT,
            systemMenuWidgets_1.SystemMenuWidget.AUDIO_IN,
            systemMenuWidgets_1.SystemMenuWidget.LOOK_AND_FEEL,
            systemMenuWidgets_1.SystemMenuWidget.MPRIS_PLAYERS,
            systemMenuWidgets_1.SystemMenuWidget.QUICK_ACTIONS_2,
            systemMenuWidgets_1.SystemMenuWidget.NOTIFICATION_HISTORY
        ]),
        ...(0, systemMenuWidgets_1.systemMenuWidgetsSchema)()
    ],
};
