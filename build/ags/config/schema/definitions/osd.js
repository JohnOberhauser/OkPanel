"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.osdSchema = void 0;
exports.osdSchema = {
    name: "osd",
    type: "object",
    description: "Configuration for on screen displays.",
    children: [
        {
            name: "soundOSDEnabled",
            type: "boolean",
            default: true,
            description: "Enables the sound OSD.",
        },
        {
            name: "brightnessOSDEnabled",
            type: "boolean",
            default: true,
            description: "Enables the brightness OSD.",
        },
    ],
};
