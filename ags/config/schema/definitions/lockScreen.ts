import {Field} from "../primitiveDefinitions";

export const lockScreen = {
    name: "lockScreen",
    type: "object",
    description: "Configuration for the lock screen.",
    children: [
        {
            name: 'entryBackground',
            type: 'color',
            default: {from: 'theme.colors.background'},
            description: 'Background color of the lock screen text entry',
            reactive: false,
        },
        {
            name: 'entryForeground',
            type: 'color',
            default: {from: 'theme.colors.foreground'},
            description: 'Foreground color of the lock screen text entry',
        },
        {
            name: 'entryBorderRadius',
            type: 'number',
            default: 8,
            description: 'Corner radius (px) for the lock screen text entry.',
            reactive: false,
        },
        {
            name: 'entryBorderWidth',
            type: 'number',
            default: 0,
            description: 'Lock screen text entry border width (px).',
            reactive: false,
        },
        {
            name: 'entryBorderColor',
            type: 'color',
            default: {from: 'theme.colors.primary'},
            description: 'Color of the lock screen text entry.',
            reactive: false,
        },
    ],
} as const satisfies Field