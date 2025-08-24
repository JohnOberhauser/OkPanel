import {config, selectedConfig} from "./config";
import {execAsync} from "ags/process";
import {projectDir} from "../app";
import {BarWidget} from "./schema/definitions/barWidgets";
import GLib from "gi://GLib?version=2.0";
import App from "ags/gtk4/app"

export function setTheme(onFinished: () => void) {
    execAsync(`bash -c '

# compile the scss in /tmp
${compileThemeBashScript()}

# if the set config script exists
if [[ -f "${config.configUpdateScript}" ]]; then
    # call the external update theme/config
    ${config.configUpdateScript} ${config.theme.name} ${selectedConfig.get()?.fileName}
fi

# if the update wallpaper script exists
if [[ -f "${config.wallpaperUpdateScript}" ]]; then
    # if there is a cached wallpaper for this theme, then set it
    WALLPAPER_CACHE_PATH="${GLib.get_home_dir()}/.cache/OkPanel/wallpaper/${selectedConfig.get()?.fileName}"
    # Check if the file exists and is non-empty
    if [[ -s "$WALLPAPER_CACHE_PATH" ]]; then
        # Read the wallpaper path from the file
        potentialWallpaper="$(< "$WALLPAPER_CACHE_PATH")"
        
        # Check if that file actually exists
        if [[ -f "$potentialWallpaper" ]]; then
          WALLPAPER="$potentialWallpaper"
        else
          # Fallback: pick the first .jpg or .png in the wallpaper dir
          WALLPAPER="$(
            ls -1 "${config.wallpaperDir}"/*.jpg "${config.wallpaperDir}"/*.png 2>/dev/null | head -n1
          )"
        fi
    else
    # If there is no cached wallpaper path, do the same fallback
    WALLPAPER="$(
      ls -1 "${config.wallpaperDir}"/*.jpg "${config.wallpaperDir}"/*.png 2>/dev/null | head -n1
    )"
    fi
    
    ${config.wallpaperUpdateScript} $WALLPAPER
fi

    '`).catch((error) => {
        console.error(error)
    }).finally(() => {
        App.apply_css("/tmp/OkPanel/style.css")
        console.log(`Theme applied: ${config.theme.name}`)
        onFinished()
    })
}

/**
 * Sets the theme for ags.  Does not call user's external scripts
 */
export function setThemeBasic() {
    execAsync(`bash -c '
# compile the scss in /tmp
${compileThemeBashScript()}
    '`).catch((error) => {
        console.error(error)
    }).finally(() => {
        App.apply_css("/tmp/OkPanel/style.css")
    })
}

function toPascalCase(input: string): string {
    return input
        .split("_")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}

function compileThemeBashScript() {
    const widgets = Object.values(BarWidget);

    const widgetLines = widgets.map(widget => {
        const pascal = toPascalCase(widget);
        return [
            `\\$bar${pascal}Foreground: ${config.theme.bars[widget].foreground};`,
            `\\$bar${pascal}Background: ${config.theme.bars[widget].background};`,
            `\\$bar${pascal}BorderRadius: ${config.theme.bars[widget].borderRadius}px;`,
            `\\$bar${pascal}BorderWidth: ${config.theme.bars[widget].borderWidth}px;`,
            `\\$bar${pascal}BorderColor: ${config.theme.bars[widget].borderColor};`,
        ].join("\n");
    }).join("\n");

    return `
SOURCE_DIR="${projectDir}/scss"
TARGET_DIR="/tmp/OkPanel/scss"

# Remove existing target if it exists
if [ -d "$TARGET_DIR" ]; then
    rm -rf "$TARGET_DIR"
fi
mkdir -p /tmp/OkPanel
cp -r "$SOURCE_DIR" "$TARGET_DIR"

cat > "$TARGET_DIR/variables.scss" <<EOF
\\$font: "${config.theme.font}";
\\$systemMenuClockDayFont: "${config.theme.systemMenu.clock.dayFont}";

\\$gaps: ${config.theme.windows.gaps}px;
\\$barBorderRadius: ${config.theme.bars.borderRadius}px;
\\$barBorderWidth: ${config.theme.bars.borderWidth}px;
\\$buttonBorderRadius: ${config.theme.buttonBorderRadius}px;
\\$windowBorderRadius: ${config.theme.windows.borderRadius}px;
\\$windowBorderWidth: ${config.theme.windows.borderWidth}px;
\\$largeButtonBorderRadius: ${config.theme.largeButtonBorderRadius}px;

\\$bg: ${config.theme.colors.background};
\\$fg: ${config.theme.colors.foreground};
\\$primary: ${config.theme.colors.primary};
\\$buttonPrimary: ${config.theme.colors.buttonPrimary};
\\$warning: ${config.theme.colors.warning};
\\$alertBorder: ${config.theme.colors.alertBorder};
\\$scrimColor: ${config.theme.colors.scrimColor};

\\$barBorder: ${config.theme.bars.borderColor};
\\$barBackgroundColor: ${config.theme.bars.backgroundColor};
\\$windowBorder: ${config.theme.windows.borderColor};
\\$windowBackgroundColor: ${config.theme.windows.backgroundColor};

\\$barWorkspacesInactiveForeground: ${config.theme.bars.workspaces.inactiveForeground};
\\$barNotificationHistoryIndicatorForeground: ${config.theme.bars.notification_history.indicatorForeground};

${widgetLines}
EOF

sass $TARGET_DIR/main.scss /tmp/OkPanel/style.css
`
}

export function setWallpaper(path: string) {
    execAsync(`bash -c '

# if the wallpaper update script exists
if [[ -f "${config.wallpaperUpdateScript}" ]]; then
    # call the wallpaper script
    ${config.wallpaperUpdateScript} ${path}
    
    # cache the name of the selected wallpaper
    mkdir -p ${GLib.get_home_dir()}/.cache/OkPanel/wallpaper
    echo "${path}" > ${GLib.get_home_dir()}/.cache/OkPanel/wallpaper/${selectedConfig.get()?.fileName}
fi

    '`).catch((error) => {
        console.error(error)
    })
}