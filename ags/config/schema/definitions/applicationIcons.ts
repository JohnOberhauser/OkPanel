import {Field} from "../primitiveDefinitions";

export const applicationIcons = {
    name: "applicationIcons",
    type: "object",
    description: "Configuration for app icons.",
    children: [
        {
            name: 'glyphOverride',
            type: 'array',
            default: [],
            item: {
                name: 'value',
                type: 'object',
                children: [
                    {
                        name: 'appName',
                        type: 'string',
                        default: '',
                        description: 'The name of the application for which to override the glyph. An exact match is not require.  For example, if you enter "Android Studio", but the real app name is "Android Studio Otter", it will match and the glyph will be overriden.',
                    },
                    {
                        name: 'glyph',
                        type: 'icon',
                        default: '󰘔',
                        description: 'The glyph to override with.',
                    },
                    {
                        name: 'offset',
                        type: 'number',
                        default: 0,
                        description: 'The pixel offset of the glyph.',
                    }
                ]
            },
            description: 'A list of glyph overrides when using glyphs instead of icons.'
        }
    ],
} as const satisfies Field