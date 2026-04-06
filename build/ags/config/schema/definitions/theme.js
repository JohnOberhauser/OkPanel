"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeSchema = void 0;
const themeWindows_1 = require("./themeWindows");
const themeColors_1 = require("./themeColors");
exports.themeSchema = {
    name: 'theme',
    type: 'object',
    description: 'Global theme definitions.',
    children: [
        {
            name: 'name',
            type: 'string',
            default: 'myTheme',
            description: 'Theme name.  Passed as the first argument to the configUpdateScript when changing configs.',
            reactive: false,
        },
        {
            name: 'buttonBorderRadius',
            type: 'number',
            default: 8,
            description: 'Border radius (px) used by regular buttons.',
            reactive: false,
        },
        {
            name: 'largeButtonBorderRadius',
            type: 'number',
            default: 16,
            description: 'Border radius (px) used by large buttons.',
            reactive: false,
        },
        {
            name: 'font',
            type: 'string',
            default: 'JetBrainsMono NF',
            description: 'Default font family used across the panel widgets.',
        },
        {
            name: 'nightLightTemperature',
            type: 'number',
            default: 5000,
            description: 'The temperature of the night light.',
            reactive: false,
        },
        themeColors_1.themeColorsSchema,
        themeWindows_1.themeWindowsSchema,
    ],
};
