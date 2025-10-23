import {Field} from "../primitiveDefinitions";

export enum BarWidget {
    APP_LAUNCHER = "appLauncher",
    AUDIO_IN = "audioIn",
    AUDIO_OUT = "audioOut",
    BATTERY = "battery",
    BLUETOOTH = "bluetooth",
    CAVA_WAVEFORM = "cavaWaveform",
    CLIPBOARD_MANAGER = "clipboardManager",
    CLOCK = "clock",
    COLOR_PICKER = "colorPicker",
    LOCK = "lock",
    LOGOUT = "logout",
    MENU = "menu",
    MPRIS_CONTROLS = "mprisControls",
    MPRIS_PRIMARY_PLAYER_SWITCHER = "mprisPrimaryPlayerSwitcher",
    MPRIS_TRACK_INFO = "mprisTrackInfo",
    NETWORK = "network",
    NOTIFICATION_HISTORY = "notificationHistory",
    POWER_PROFILE = "powerProfile",
    RECORDING_INDICATOR = "recordingIndicator",
    RESTART = "restart",
    SCREENSHOT = "screenshot",
    SHUTDOWN = "shutdown",
    TIMER = "timer",
    TRAY = "tray",
    VPN_INDICATOR = "vpnIndicator",
    WORKSPACES = "workspaces",

    CUSTOM1 = "custom1",
    CUSTOM2 = "custom2",
    CUSTOM3 = "custom3",
    CUSTOM4 = "custom4",
    CUSTOM5 = "custom5",
    CUSTOM6 = "custom6",
    CUSTOM7 = "custom7",
    CUSTOM8 = "custom8",
    CUSTOM9 = "custom9",
    CUSTOM10 = "custom10",
    CUSTOM11 = "custom11",
    CUSTOM12 = "custom12",
    CUSTOM13 = "custom13",
    CUSTOM14 = "custom14",
    CUSTOM15 = "custom15",
    CUSTOM16 = "custom16",
    CUSTOM17 = "custom17",
    CUSTOM18 = "custom18",
    CUSTOM19 = "custom19",
    CUSTOM20 = "custom20",

    SHORTCUT1 = "shortcut1",
    SHORTCUT2 = "shortcut2",
    SHORTCUT3 = "shortcut3",
    SHORTCUT4 = "shortcut4",
    SHORTCUT5 = "shortcut5",
    SHORTCUT6 = "shortcut6",
    SHORTCUT7 = "shortcut7",
    SHORTCUT8 = "shortcut8",
    SHORTCUT9 = "shortcut9",
    SHORTCUT10 = "shortcut10",
    SHORTCUT11 = "shortcut11",
    SHORTCUT12 = "shortcut12",
    SHORTCUT13 = "shortcut13",
    SHORTCUT14 = "shortcut14",
    SHORTCUT15 = "shortcut15",
    SHORTCUT16 = "shortcut16",
    SHORTCUT17 = "shortcut17",
    SHORTCUT18 = "shortcut18",
    SHORTCUT19 = "shortcut19",
    SHORTCUT20 = "shortcut20",
}
export const BAR_WIDGET_VALUES = Object.values(BarWidget) as readonly BarWidget[]

export enum WaveformPosition {
    INNER = "inner",
    OUTER = "outer",
    START = "start",
    END = "end",
}
export const WAVEFORM_POSITIONS = Object.values(WaveformPosition) as readonly WaveformPosition[]

export enum Alignment {
    START = "start",
    CENTER = "center",
    END = "end"
}
export const ALIGNMENT_VALUES = Object.values(Alignment) as readonly Alignment[]

function widgetCommons(
    reactiveForeground: boolean = false,
    reactiveBackground: boolean = false,
    reactiveBorderRadius: boolean = false,
    reactiveBorderWidth: boolean = false,
    reactiveBorderColor: boolean = false,
    foregroundDefault: string = 'barWidgets.widgetForeground',
) { return [
    {
        name: 'foreground',
        type: 'color',
        default: {from: foregroundDefault},
        description: 'Foreground color of the widget.',
        reactive: reactiveForeground,
    },
    {
        name: 'background',
        type: 'color',
        default: {from: 'barWidgets.widgetBackground'},
        description: 'Background color of the widget.',
        reactive: reactiveBackground,
    },
    {
        name: 'borderRadius',
        type: 'number',
        default: {from: 'barWidgets.widgetBorderRadius'},
        description: 'Corner radius (px) for the widget.',
        reactive: reactiveBorderRadius,
    },
    {
        name: 'borderWidth',
        type: 'number',
        default: {from: "barWidgets.widgetBorderWidth"},
        description: 'Widget border width (px).',
        reactive: reactiveBorderWidth,
    },
    {
        name: 'borderColor',
        type: 'color',
        default: {from: 'barWidgets.widgetBorderColor'},
        description: 'Color of the widget border',
        reactive: reactiveBorderColor,
    },
    {
        name: 'marginStart',
        type: 'number',
        default: {from: 'barWidgets.widgetMarginStart'},
        description: "Margin at the start of the widget.",
        withinConstraints: (value) => value >= 0,
        constraintDescription: 'Must be >= 0',
    },
    {
        name: 'marginEnd',
        type: 'number',
        default: {from: 'barWidgets.widgetMarginEnd'},
        description: "Margin at the end of the widget.",
        withinConstraints: (value) => value >= 0,
        constraintDescription: 'Must be >= 0',
    },
    {
        name: 'marginTop',
        type: 'number',
        default: {from: 'barWidgets.widgetMarginTop'},
        description: "Margin at the top of the widget.",
        withinConstraints: (value) => value >= 0,
        constraintDescription: 'Must be >= 0',
    },
    {
        name: 'marginBottom',
        type: 'number',
        default: {from: 'barWidgets.widgetMarginBottom'},
        description: "Margin at the bottom of the widget.",
        withinConstraints: (value) => value >= 0,
        constraintDescription: 'Must be >= 0',
    }
] as const satisfies Field[] }

function customWidgetCommons() { return [
    {
        name: 'label',
        type: 'string',
        default: '',
        description: 'The initial label for the custom widget.  This is not reactive, so you need to restart OkPanel or switch configs after changing this value.',
    },
    {
        name: 'execOnInit',
        type: 'string',
        default: '',
        description: 'The absolute path of the script to execute when the widget is created.  This is not reactive, so you need to restart OkPanel or switch configs after changing this value.',
    },
    {
        name: 'execOnClick',
        type: 'string',
        default: '',
        description: 'The absolute path of the script to execute when the widget is clicked.  This is not reactive, so you need to restart OkPanel or switch configs after changing this value.',
    },
    ...widgetCommons()
] as const satisfies Field[] }

function shortcutWidgetCommons() { return [
    {
        name: 'icon',
        type: 'icon',
        default: '󰘔',
        description: 'The icon for the shortcut widget.',
    },
    {
        name: 'iconOffset',
        type: 'number',
        default: 0,
        description: 'Offset for the icon.'
    },
    {
        name: 'launch',
        type: 'string',
        default: '',
        description: 'The command to execute when launching the program.',
    },
    {
        name: 'newWindow',
        type: 'string',
        default: '',
        description: 'The command to execute when launching a new window.',
    },
    {
        name: 'class',
        type: 'string',
        default: '',
        description: 'The window class of the program.  You can find this by running hyprctl clients',
    },
    {
        name: 'selectedBackground',
        type: 'color',
        default: {from: 'theme.colors.buttonPrimary'},
        description: 'Background color of the widget when selected.',
        reactive: false,
    },
    ...widgetCommons()
] as const satisfies Field[] }

export const barWidgetsSchema = {
    name: 'barWidgets',
    type: 'object',
    description: 'Theming configurations for the bars.',
    children: [
        {
            name: 'widgetForeground',
            type: 'color',
            default: {from: 'theme.colors.foreground'},
            description: 'Foreground color of the bar widgets.',
            reactive: false,
        },
        {
            name: 'widgetBackground',
            type: 'color',
            default: {from: 'theme.colors.background'},
            description: 'Background color of the bar widgets.',
            reactive: false,
        },
        {
            name: 'widgetBorderColor',
            type: 'color',
            default: {from: 'theme.colors.primary'},
            description: 'Color of the widget borders',
            reactive: false,
        },
        {
            name: 'widgetBorderRadius',
            type: 'number',
            default: 8,
            description: 'Corner radius (px) for bar widgets.',
            reactive: false,
        },
        {
            name: 'widgetBorderWidth',
            type: 'number',
            default: 0,
            description: 'Widget border width (px).',
            reactive: false,
        },
        {
            name: 'widgetMarginStart',
            type: 'number',
            default: 0,
            description: "Margin at the start of bar widgets.",
            withinConstraints: (value) => value >= 0,
            constraintDescription: 'Must be >= 0',
        },
        {
            name: 'widgetMarginEnd',
            type: 'number',
            default: 0,
            description: "Margin at the end of bar widgets.",
            withinConstraints: (value) => value >= 0,
            constraintDescription: 'Must be >= 0',
        },
        {
            name: 'widgetMarginTop',
            type: 'number',
            default: 0,
            description: "Margin at the top of bar widgets.",
            withinConstraints: (value) => value >= 0,
            constraintDescription: 'Must be >= 0',
        },
        {
            name: 'widgetMarginBottom',
            type: 'number',
            default: 0,
            description: "Margin at the bottom of bar widgets.",
            withinConstraints: (value) => value >= 0,
            constraintDescription: 'Must be >= 0',
        },
        {
            name: BarWidget.APP_LAUNCHER,
            type: "object",
            description: "Configuration for the app launcher bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.AUDIO_IN,
            type: "object",
            description: "Configuration for the audio in bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.AUDIO_OUT,
            type: "object",
            description: "Configuration for the audio out bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.BATTERY,
            type: "object",
            description: "Configuration for the battery bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.BLUETOOTH,
            type: "object",
            description: "Configuration for the bluetooth bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.CAVA_WAVEFORM,
            type: "object",
            description: "Configuration for the cava waveform bar widget.",
            children: [
                ...widgetCommons(true),
                {
                    name: 'length',
                    type: 'number',
                    default: 200,
                    description: 'Length of the cava waveform.  This has no effect on the full bar waveform.',
                    withinConstraints: value => value >= 100,
                    constraintDescription: 'Must be >= 100'
                },
                {
                    name: 'expanded',
                    type: 'boolean',
                    default: false,
                    description: 'Expands the waveform to fill the empty space.  This can expand beyond the set length.  This has no effect on the full bar waveform.'
                },
                {
                    name: 'position',
                    type: 'enum',
                    enumValues: WAVEFORM_POSITIONS,
                    default: WaveformPosition.OUTER,
                    description: 'The base position of the waveform'
                },
                {
                    name: 'intensityMultiplier',
                    type: 'number',
                    default: 1,
                    description: 'Makes the waves bigger or smaller.',
                    withinConstraints: value => value >= 0,
                    constraintDescription: 'Must be >= 0'
                },
            ],
        },
        {
            name: BarWidget.CLIPBOARD_MANAGER,
            type: "object",
            description: "Configuration for the clipboardManager bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.CLOCK,
            type: "object",
            description: "Configuration for the clock bar widget.",
            children: [
                ...widgetCommons(),
            ],
        },
        {
            name: BarWidget.COLOR_PICKER,
            type: "object",
            description: "Configuration for the color picker bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.LOCK,
            type: "object",
            description: "Configuration for the lock bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.LOGOUT,
            type: "object",
            description: "Configuration for the logout bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.MENU,
            type: "object",
            description: "Theme configuration for the menu bar widget.",
            children: [
                ...widgetCommons(),
                {
                    name: 'icon',
                    type: 'icon',
                    default: '',
                    description: 'Icon shown on the menu button (ex: Nerd Font glyph).',
                },
                {
                    name: 'iconOffset',
                    type: 'number',
                    default: 1,
                    description: 'Offset of the menu button icon.  Use this if the icon is not centered properly'
                },
            ],
        },
        {
            name: BarWidget.MPRIS_CONTROLS,
            type: "object",
            description: "Configuration for the mprisControls bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.MPRIS_PRIMARY_PLAYER_SWITCHER,
            type: "object",
            description: "Configuration for the mpris primary player switcher bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.MPRIS_TRACK_INFO,
            type: "object",
            description: "Configuration for the mpris track info bar widget.",
            children: [
                ...widgetCommons(
                    true,
                ),
                {
                    name: 'textLength',
                    type: 'number',
                    default: 30,
                    description: 'The max number of characters to display.'
                },
                {
                    name: 'textAlignment',
                    type: 'enum',
                    enumValues: ALIGNMENT_VALUES,
                    default: Alignment.CENTER,
                    description: 'How to align the text.'
                },
                {
                    name: 'minimumLength',
                    type: 'number',
                    default: 300,
                    description: 'The minimum length of the widget.'
                }
            ],
        },
        {
            name: BarWidget.NETWORK,
            type: "object",
            description: "Configuration for the network bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.NOTIFICATION_HISTORY,
            type: "object",
            description: "Configuration for the notification history bar widget.",
            children: [
                ...widgetCommons(),
                {
                    name: 'indicatorForeground',
                    type: 'color',
                    default: {from: 'theme.colors.warning'},
                    description: 'Foreground color of the unread notification indicator.',
                    reactive: false,
                },
            ],
        },
        {
            name: BarWidget.POWER_PROFILE,
            type: "object",
            description: "Configuration for the power profile bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.RECORDING_INDICATOR,
            type: "object",
            description: "Configuration for the recording indicator bar widget.",
            children: [...widgetCommons(
                false,
                false,
                false,
                false,
                false,
                'theme.colors.warning'
            )],
        },
        {
            name: BarWidget.RESTART,
            type: "object",
            description: "Configuration for the restart bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.SCREENSHOT,
            type: "object",
            description: "Configuration for the screenshot bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.SHUTDOWN,
            type: "object",
            description: "Configuration for the shutdown bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.TIMER,
            type: "object",
            description: "Configuration for the timer bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.TRAY,
            type: "object",
            description: "Configuration for the tray bar widget.",
            children: [
                ...widgetCommons(),
                {
                    name: 'collapsable',
                    type: 'boolean',
                    default: true,
                    description: 'If true, a tray icon will show and need to be clicked to reveal the tray apps.'
                }
            ],
        },
        {
            name: BarWidget.VPN_INDICATOR,
            type: "object",
            description: "Configuration for the vpn indicator bar widget.",
            children: [...widgetCommons()],
        },
        {
            name: BarWidget.WORKSPACES,
            type: "object",
            description: "Configuration for the workspaces bar widget.",
            children: [
                ...widgetCommons(),
                {
                    name: 'largeActive',
                    type: 'boolean',
                    default: false,
                    description: 'Make the active workspace icon larger'
                },
                {
                    name: 'activeIcon',
                    type: 'icon',
                    default: "",
                    description: 'Icon of the active workspace'
                },
                {
                    name: 'activeOffset',
                    type: 'number',
                    default: 1,
                    description: 'Offset of the active workspace icon.  Use this if the icon is not centered properly'
                },
                {
                    name: 'inactiveIcon',
                    type: 'icon',
                    default: "",
                    description: 'Icon of the inactive workspace'
                },
                {
                    name: 'inactiveOffset',
                    type: 'number',
                    default: 1,
                    description: 'Offset of the active workspace icon.  Use this if the icon is not centered properly'
                },
                {
                    name: 'inactiveForeground',
                    type: 'color',
                    default: {from: 'barWidgets.workspaces.foreground'},
                    description: 'Foreground color of inactive workspaces.',
                    reactive: false,
                },
                {
                    name: 'scrollUpCommand',
                    type: 'string',
                    default: "r-1",
                    description: 'The hyprland workspace argument to dispatch when scrolling up while hovering over the workspaces bar widget.  See all options here https://wiki.hypr.land/Configuring/Dispatchers/#workspaces'
                },
                {
                    name: 'scrollDownCommand',
                    type: 'string',
                    default: "r+1",
                    description: 'The hyprland workspace argument to dispatch when scrolling down while hovering over the workspaces bar widget.  See all options here https://wiki.hypr.land/Configuring/Dispatchers/#workspaces'
                },
            ],
        },
        {
            name: BarWidget.CUSTOM1,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM2,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM3,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM4,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM5,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM6,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM7,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM8,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM9,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM10,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM11,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM12,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM13,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM14,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM15,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM16,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM17,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM18,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM19,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.CUSTOM20,
            type: "object",
            description: "Configuration for the custom bar widget.",
            children: [...customWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT1,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT2,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT3,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT4,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT5,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT6,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT7,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT8,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT9,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT10,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT11,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT12,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT13,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT14,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT15,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT16,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT17,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT18,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT19,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
        {
            name: BarWidget.SHORTCUT20,
            type: "object",
            description: "Configuration for the shortcut bar widget.",
            children: [...shortcutWidgetCommons()],
        },
    ],
} as const satisfies Field