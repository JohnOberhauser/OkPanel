import {Field} from "../primitiveDefinitions";

export const appLauncherSchema = {
    name: "appLauncher",
    type: "object",
    description: "Configuration for the app launcher.",
    children: [
        {
            name: "showAppIcons",
            type: "boolean",
            default: false,
            description: "Whether to display the app icons for each app.",
        },
    ],
} as const satisfies Field