"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.frameSchema = exports.POSITION_VALUES = exports.Position = void 0;
var Position;
(function (Position) {
    Position["LEFT"] = "left";
    Position["RIGHT"] = "right";
})(Position || (exports.Position = Position = {}));
exports.POSITION_VALUES = Object.values(Position);
function commonIntegrationSchema(pushContent = false) {
    return [
        {
            name: 'position',
            type: 'enum',
            enumValues: exports.POSITION_VALUES,
            default: Position.LEFT,
            description: 'What side of the frame the integration is on.'
        },
        {
            name: 'pushContent',
            type: 'boolean',
            default: pushContent,
            description: 'If the integration should push normal windows / content when expanded.'
        }
    ];
}
exports.frameSchema = {
    name: 'frame',
    type: 'object',
    description: 'Configuration for the frame.',
    children: [
        {
            name: 'drawFrame',
            type: 'boolean',
            default: true,
            description: 'Whether to draw the frame or not.'
        },
        {
            name: 'margin',
            type: 'number',
            default: 5,
            description: 'Margin (px) between the frame and other windows.'
        },
        {
            name: 'topThickness',
            type: 'number',
            default: 2,
            description: 'Thickness of the full screen frame.',
            reactive: true,
        },
        {
            name: 'bottomThickness',
            type: 'number',
            default: 2,
            description: 'Thickness of the full screen frame.',
            reactive: true,
        },
        {
            name: 'leftThickness',
            type: 'number',
            default: 2,
            description: 'Thickness of the full screen frame.',
            reactive: true,
        },
        {
            name: 'rightThickness',
            type: 'number',
            default: 2,
            description: 'Thickness of the full screen frame.',
            reactive: true,
        },
        {
            name: 'enableTopSpacer',
            type: 'boolean',
            default: true,
            description: 'Enables the top spacer.  The spacer pushes window content below the top of the frame.',
        },
        {
            name: 'enableBottomSpacer',
            type: 'boolean',
            default: true,
            description: 'Enables the bottom spacer.  The spacer pushes window content above the bottom of the frame.',
        },
        {
            name: 'enableLeftSpacer',
            type: 'boolean',
            default: true,
            description: 'Enables the left spacer.  The spacer pushes window content to the right of the left side of the frame.',
        },
        {
            name: 'enableRightSpacer',
            type: 'boolean',
            default: true,
            description: 'Enables the right spacer.  The spacer pushes window content to the left of the right side of the frame.',
        },
        {
            name: 'borderRadius',
            type: 'number',
            default: 8,
            description: 'Corner radius (px) for bars.',
            reactive: true,
        },
        {
            name: 'borderWidth',
            type: 'number',
            default: 2,
            description: 'Bar border width (px).',
            reactive: true,
        },
        {
            name: 'borderColor',
            type: 'color',
            default: { from: 'theme.colors.primary' },
            description: 'Color of the bar border',
            reactive: true,
        },
        {
            name: 'backgroundColor',
            type: 'color',
            default: { from: 'theme.colors.background' },
            description: 'Color of the bar background',
            reactive: true,
        },
        {
            name: 'menu',
            type: 'object',
            description: 'Configurations for the expandable menu integration.',
            children: [...commonIntegrationSchema()],
        },
        {
            name: 'notifications',
            type: 'object',
            description: 'Configurations for the expandable notifications integration.',
            children: [...commonIntegrationSchema()],
        },
        {
            name: 'calendar',
            type: 'object',
            description: 'Configurations for the expandable calendar integration.',
            children: [...commonIntegrationSchema()],
        },
        {
            name: 'clipboardManager',
            type: 'object',
            description: 'Configurations for the expandable clipboard manager integration.',
            children: [...commonIntegrationSchema()],
        },
        {
            name: 'screenshotTool',
            type: 'object',
            description: 'Configurations for the expandable screenshot tool integration.',
            children: [...commonIntegrationSchema()],
        },
        {
            name: 'appLauncher',
            type: 'object',
            description: 'Configurations for the expandable appLauncher integration.',
            children: [...commonIntegrationSchema()],
        },
        {
            name: 'screenshare',
            type: 'object',
            description: 'Configurations for the screen share menu integration.',
            children: [...commonIntegrationSchema()],
        },
    ],
};
