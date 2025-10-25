import {Field} from "../primitiveDefinitions";
import {soundsSchema} from "./sounds";
import {notificationsSchema} from "./notifications";
import {
    bottomBarSchema,
    leftBarSchema,
    rightBarSchema,
    topBarSchema,
} from "./bars";
import {systemMenuSchema} from "./systemMenu";
import {systemCommandsSchema} from "./systemCommands";
import {themeSchema} from "./theme";
import {frameSchema} from "./frame";
import {weatherSchema} from "./weather";
import {barWidgetsSchema} from "./barWidgets";
import {wallpaperSchema} from "./wallpaper";
import {osdSchema} from "./osd";
import {appLauncherSchema} from "./appLauncher";

export const CONFIG_SCHEMA = [
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
        name: 'mainMonitor',
        type: 'number',
        default: 0,
        description: 'Index of the primary monitor (0‑based as reported by Hyprland).',
    },
    {
        name: "clockFormat24h",
        type: 'boolean',
        default: false,
        description: "If true, use 24-hour format. If false, use 12-hour format with AM/PM",
    },
    soundsSchema,
    osdSchema,
    weatherSchema,
    notificationsSchema,
    systemCommandsSchema,
    frameSchema,
    systemMenuSchema,
    barWidgetsSchema,
    themeSchema,
    topBarSchema,
    bottomBarSchema,
    leftBarSchema,
    rightBarSchema,
    wallpaperSchema,
    appLauncherSchema,
] as const satisfies Field[]