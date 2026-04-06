"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG_SCHEMA = void 0;
const sounds_1 = require("./sounds");
const notifications_1 = require("./notifications");
const bars_1 = require("./bars");
const systemMenu_1 = require("./systemMenu");
const systemCommands_1 = require("./systemCommands");
const theme_1 = require("./theme");
const frame_1 = require("./frame");
const weather_1 = require("./weather");
const barWidgets_1 = require("./barWidgets");
const wallpaper_1 = require("./wallpaper");
const osd_1 = require("./osd");
const applicationIcons_1 = require("./applicationIcons");
const lockScreen_1 = require("./lockScreen");
exports.CONFIG_SCHEMA = [
    {
        name: 'icon',
        type: 'icon',
        default: '',
        description: 'Icon (glyph) representing this config file.',
    },
    {
        name: 'iconOffset',
        type: 'number',
        default: 0,
        description: 'Icon offset (‑10 … 10).',
        withinConstraints: (value) => value >= -10 && value <= 10,
        constraintDescription: 'Must be between -10 and 10'
    },
    {
        name: 'configUpdateScript',
        type: 'string',
        description: 'Absolute path to the script run when the config changes where you can update the theme and configuration for the rest of your system.  Theme name and config file name are sent as arguments to the script.',
        required: false,
    },
    {
        name: 'barUpdateScript',
        type: 'string',
        description: 'Absolute path to the script run when the bar changes.  Bar type is sent as an argument to the script.',
        required: false,
    },
    {
        name: 'framedMonitors',
        type: 'array',
        default: ["0"],
        item: {
            name: 'value',
            type: 'string'
        },
        description: 'A list of monitors that should show the frame.  Values can be a monitor index, name, or description.  For example, "0" or "DP-1" or "LG Electronics LG ULTRAGEAR+ 303NTRL72662".'
    },
    {
        name: "clockFormat24h",
        type: 'boolean',
        default: false,
        description: "If true, use 24-hour format. If false, use 12-hour format with AM/PM",
    },
    {
        name: "enablePolkitAgent",
        type: "boolean",
        default: true,
        reactive: false,
        description: "If true, OkPanel will register as a polkit agent.  This field is non-reactive.  If you change it, you should restart OkPanel."
    },
    sounds_1.soundsSchema,
    osd_1.osdSchema,
    weather_1.weatherSchema,
    notifications_1.notificationsSchema,
    systemCommands_1.systemCommandsSchema,
    frame_1.frameSchema,
    systemMenu_1.systemMenuSchema,
    barWidgets_1.barWidgetsSchema,
    theme_1.themeSchema,
    bars_1.topBarSchema,
    bars_1.bottomBarSchema,
    bars_1.leftBarSchema,
    bars_1.rightBarSchema,
    wallpaper_1.wallpaperSchema,
    applicationIcons_1.applicationIcons,
    lockScreen_1.lockScreen,
];
