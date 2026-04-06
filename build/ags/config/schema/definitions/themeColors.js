"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeColorsSchema = void 0;
exports.themeColorsSchema = {
    name: 'colors',
    type: 'object',
    description: 'Palette used by widgets & windows.',
    children: [
        {
            name: 'background',
            type: 'color',
            default: '#1F2932',
            description: 'Background color',
            reactive: false,
        },
        {
            name: 'foreground',
            type: 'color',
            default: '#AFB3BD',
            description: 'Foreground color',
        },
        {
            name: 'primary',
            type: 'color',
            default: '#7C545F',
            description: 'Primary / accent color',
        },
        {
            name: 'buttonPrimary',
            type: 'color',
            default: '#7C545F',
            description: 'Button color',
            reactive: false,
        },
        {
            name: 'warning',
            type: 'color',
            default: '#7C7C54',
            description: 'Warning color',
            reactive: false,
        },
        {
            name: 'alertBorder',
            type: 'color',
            default: '#7C545F',
            description: 'Color of alert borders (OSD)',
            reactive: false,
        },
        {
            name: 'scrimColor',
            type: 'color',
            default: '#00000001',
            description: 'Color used for translucent overlays (RGBA hex).',
            transformation: (value) => {
                if (value === "#00000000" || value === "#000000") {
                    return "#00000001";
                }
                else {
                    return value;
                }
            },
            reactive: false,
        },
    ],
};
