import {config, selectedConfig} from "./config";
import {execAsync} from "ags/process";
import {projectDir} from "../app";
import {BarWidget} from "./schema/definitions/barWidgets";
import App from "ags/gtk4/app"
import {frameWindowNamePrefix} from "../widget/frame/Frame";

export function setTheme(onFinished: () => void) {
    execAsync(`bash -c '
set -euo pipefail

# compile the scss in /tmp
${compileThemeBashScript()}

# if the set config script exists
if [[ -f "${config.configUpdateScript}" ]]; then
    # call the external update theme/config
    ${config.configUpdateScript} ${config.theme.name} ${selectedConfig.peek()?.fileName}
fi
    '`).catch((error) => {
        console.log("setTheme error")
        console.error(error)
    }).finally(() => {
        App.apply_css("/tmp/OkPanel/style.css", true)
        App.get_windows().forEach((window) => {
            if (window.name.startsWith(frameWindowNamePrefix)) {
                window.add_css_class("__style")
                window.remove_css_class("__style")
            }
        })
        console.log(`Theme applied: ${config.theme.name}`)
        onFinished()
    })
}

/**
 * Sets the theme for ags.  Does not call user's external scripts
 */
export function setThemeBasic() {
    execAsync(`bash -c '
${compileThemeBashScript()}
    '`).catch((error) => {
        console.error(error)
    }).finally(() => {
        App.apply_css("/tmp/OkPanel/style.css", true)
        App.get_windows().forEach((window) => {
            if (window.name.startsWith(frameWindowNamePrefix)) {
                window.add_css_class("__style")
                window.remove_css_class("__style")
            }
        })
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
            `\\$bar${pascal}Foreground: ${config.barWidgets[widget].foreground};`,
            `\\$bar${pascal}Background: ${config.barWidgets[widget].background};`,
            `\\$bar${pascal}BorderRadius: ${config.barWidgets[widget].borderRadius}px;`,
            `\\$bar${pascal}BorderWidth: ${config.barWidgets[widget].borderWidth}px;`,
            `\\$bar${pascal}BorderColor: ${config.barWidgets[widget].borderColor};`,
        ].join("\n");
    }).join("\n");

    return `
set -euo pipefail

SOURCE_DIR="${projectDir}/scss"
PUBLISH_DIR="/tmp/OkPanel"
LOCKFILE="$PUBLISH_DIR/.sass.lock"

mkdir -p "$PUBLISH_DIR"

exec 9>"$LOCKFILE"
flock 9

BUILD_DIR="$(mktemp -d "$PUBLISH_DIR/build.XXXXXX")"
OUT_TMP="$PUBLISH_DIR/style.css.tmp"
OUT_CSS="$PUBLISH_DIR/style.css"

cp -r "$SOURCE_DIR"/. "$BUILD_DIR/"

cat > "$BUILD_DIR/variables.scss" <<EOFVARS
\\$font: "${config.theme.font}";
\\$systemMenuClockDayFont: "${config.systemMenu.clock.dayFont}";

\\$gaps: ${config.theme.windows.gaps}px;
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

\\$windowBorder: ${config.theme.windows.borderColor};
\\$windowBackgroundColor: ${config.theme.windows.backgroundColor};
\\$frameBackgroundColor: ${config.frame.backgroundColor};

\\$barWorkspacesInactiveForeground: ${config.barWidgets.workspaces.inactiveForeground};
\\$barNotificationHistoryIndicatorForeground: ${config.barWidgets.notificationHistory.indicatorForeground};

\\$topBarBorderRadius: ${config.topBar.borderRadius}px;
\\$topBarBorderWidth: ${config.topBar.borderWidth}px;
\\$topBarBorder: ${config.topBar.borderColor};
\\$topBarBackgroundColor: ${config.topBar.backgroundColor};

\\$bottomBarBorderRadius: ${config.bottomBar.borderRadius}px;
\\$bottomBarBorderWidth: ${config.bottomBar.borderWidth}px;
\\$bottomBarBorder: ${config.bottomBar.borderColor};
\\$bottomBarBackgroundColor: ${config.bottomBar.backgroundColor};

\\$frameLeftGroupBackgroundColor: ${config.leftBar.backgroundColor};
\\$frameLeftGroupBorderColor: ${config.leftBar.borderColor};
\\$frameLeftGroupBorderRadius: ${config.leftBar.borderRadius}px;
\\$frameLeftGroupBorderWidth: ${config.leftBar.borderWidth}px;

\\$frameRightGroupBackgroundColor: ${config.rightBar.backgroundColor};
\\$frameRightGroupBorderColor: ${config.rightBar.borderColor};
\\$frameRightGroupBorderRadius: ${config.rightBar.borderRadius}px;
\\$frameRightGroupBorderWidth: ${config.rightBar.borderWidth}px;

\\$barDockSelectedColor: ${config.barWidgets.dock.selectedBackground};

${widgetLines}

EOFVARS

sass --load-path "$BUILD_DIR" "$BUILD_DIR/main.scss" "$OUT_TMP" --no-source-map --quiet-deps
mv -f "$OUT_TMP" "$OUT_CSS"
rm -rf "$BUILD_DIR"
`; }
