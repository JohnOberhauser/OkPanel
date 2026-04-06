"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wallpaperSchema = exports.WALLPAPER_TRANSITION_VALUES = exports.WallpaperTransitionType = void 0;
var WallpaperTransitionType;
(function (WallpaperTransitionType) {
    WallpaperTransitionType["None"] = "none";
    WallpaperTransitionType["Crossfade"] = "crossfade";
    WallpaperTransitionType["SlideRight"] = "slideRight";
    WallpaperTransitionType["SlideLeft"] = "slideLeft";
    WallpaperTransitionType["SlideUp"] = "slideUp";
    WallpaperTransitionType["SlideDown"] = "slideDown";
    WallpaperTransitionType["SlideLeftRight"] = "slideLeftRight";
    WallpaperTransitionType["SlideUpDown"] = "slideUpDown";
    WallpaperTransitionType["OverUp"] = "overUp";
    WallpaperTransitionType["OverDown"] = "overDown";
    WallpaperTransitionType["OverLeft"] = "overLeft";
    WallpaperTransitionType["OverRight"] = "overRight";
    WallpaperTransitionType["UnderUp"] = "underUp";
    WallpaperTransitionType["UnderDown"] = "underDown";
    WallpaperTransitionType["UnderLeft"] = "underLeft";
    WallpaperTransitionType["UnderRight"] = "underRight";
    WallpaperTransitionType["OverUpDown"] = "overUpDown";
    WallpaperTransitionType["OverDownUp"] = "overDownUp";
    WallpaperTransitionType["OverLeftRight"] = "overLeftRight";
    WallpaperTransitionType["OverRightLeft"] = "overRightLeft";
    WallpaperTransitionType["RotateLeft"] = "rotateLeft";
    WallpaperTransitionType["RotateRight"] = "rotateRight";
    WallpaperTransitionType["RotateLeftRight"] = "rotateLeftRight";
})(WallpaperTransitionType || (exports.WallpaperTransitionType = WallpaperTransitionType = {}));
exports.WALLPAPER_TRANSITION_VALUES = Object.values(WallpaperTransitionType);
exports.wallpaperSchema = {
    name: 'wallpaper',
    type: 'object',
    description: 'Wallpaper configs.',
    children: [
        {
            name: 'showWallpaper',
            type: 'boolean',
            default: 'true',
            description: 'Show the wallpaper in OkPanel.  Set to false if you want to use another wallpaper program',
        },
        {
            name: 'wallpaperUpdateScript',
            type: 'string',
            description: 'Absolute path to the script run when the wallpaper changes.  Wallpaper path is sent as an argument to the script.',
            required: false,
        },
        {
            name: 'wallpaperDir',
            type: 'string',
            default: '',
            description: 'Directory containing theme wallpapers (may be empty).',
        },
        {
            name: 'transitionType',
            type: 'enum',
            enumValues: exports.WALLPAPER_TRANSITION_VALUES,
            default: WallpaperTransitionType.Crossfade,
            description: 'The type of transition animation when switching wallpapers.'
        },
        {
            name: 'transitionDuration',
            type: 'number',
            default: 200,
            description: 'The duration of the transition animation when switching wallpapers in milliseconds.'
        },
    ]
};
