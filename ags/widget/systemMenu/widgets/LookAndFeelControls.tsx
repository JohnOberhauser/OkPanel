import {Gtk} from "ags/gtk4"
import Pango from "gi://Pango?version=1.0";
import {createScaledTexture} from "../../utils/images";
import {
    availableConfigs, ConfigFile,
    selectedConfig,
    setNewConfig,
    variableConfig
} from "../../../config/config";
import RevealerRow from "../../common/RevealerRow";
import OkButton, {OkButtonSize} from "../../common/OkButton";
import {listFilenamesInDir} from "../../utils/files";
import {createComputed, createState, For, onCleanup, With} from "ags";
import GLib from "gi://GLib?version=2.0";
import {integratedMenuRevealed} from "../IntegratedMenu";
import {setWallpaper} from "../../wallpaper/setWallpaper";

const [files, filesSetter] = createState<string[][]>([])
const numberOfColumns = 2
let buttonsEnabled = true
let changingWallpaperBusy = false

function updateConfig(configFile: ConfigFile) {
    if (!buttonsEnabled) {
        return
    }
    buttonsEnabled = false
    setNewConfig(configFile, () => {
        buttonsEnabled = true
    })
}

function chunkIntoColumns<T>(arr: T[], numCols: number): T[][] {
    // Create numCols empty arrays
    const columns: T[][] = Array.from({ length: numCols }, () => []);

    // Distribute each item into the correct column
    arr.forEach((item, i) => {
        const colIndex = i % numCols;
        columns[colIndex].push(item);
    });

    return columns;
}

function updateFiles() {
    const dir = variableConfig.wallpaper.wallpaperDir.peek()
    if (dir === "") {
        return
    }

    filesSetter(
        chunkIntoColumns(
            listFilenamesInDir(dir)
                .filter((file) => file.includes("jpg") || file.includes("png"))
                .map((file) => `${dir}/${file}`),
            numberOfColumns
        )
    )
}

function updateFade(
    adjustment: Gtk.Adjustment,
    leftGradient: Gtk.Box,
    rightGradient: Gtk.Box,
) {
    let leftDistance = adjustment.get_value() * 2
    if (leftDistance > 100) {
        leftDistance = 100
    }
    leftGradient.opacity = leftDistance / 100

    const maxScroll = adjustment.get_upper() - adjustment.get_page_size();
    let rightDistance = (maxScroll - adjustment.get_value()) * 2
    if (rightDistance > 100) {
        rightDistance = 100
    }
    rightGradient.opacity = rightDistance / 100
}

let scrollAnimationId: number | null = null

function animateScroll(
    adjustment: Gtk.Adjustment,
    targetValue: number,
    leftGradient: Gtk.Box,
    rightGradient: Gtk.Box,
    duration = 150
) {
    // Cancel any previous animation
    if (scrollAnimationId !== null) {
        GLib.source_remove(scrollAnimationId);
        scrollAnimationId = null;
    }

    const start = adjustment.get_value();
    const delta = targetValue - start;
    const startTime = GLib.get_monotonic_time();

    scrollAnimationId = GLib.timeout_add(GLib.PRIORITY_DEFAULT, 1000 / 60, () => {
        const now = GLib.get_monotonic_time();
        const elapsed = (now - startTime) / 1000; // microseconds → milliseconds

        const progress = Math.min(elapsed / duration, 1);
        const eased = progress * (2 - progress); // easeOutQuad

        adjustment.set_value(start + delta * eased);

        updateFade(adjustment, leftGradient, rightGradient);

        if (progress < 1) {
            return GLib.SOURCE_CONTINUE;
        } else {
            scrollAnimationId = null;
            return GLib.SOURCE_REMOVE;
        }
    });
}

function ThemeButton({configFile}: {configFile: ConfigFile}) {
    return <OkButton
        size={OkButtonSize.XL}
        label={configFile.icon}
        offset={configFile.pixelOffset}
        selected={selectedConfig.asAccessor()((t) => t === configFile)}
        onClicked={() => {
            updateConfig(configFile)
        }}/>
}

function ThemeOptions() {
    let leftGradient: Gtk.Box
    let rightGradient: Gtk.Box
    const scrolledWindow = new Gtk.ScrolledWindow({
        hexpand: true,
        cssClasses: ["scrollWindow"],
        hscrollbar_policy: Gtk.PolicyType.AUTOMATIC,
        vscrollbar_policy: Gtk.PolicyType.NEVER,
        heightRequest: 50,
        child: <box
            marginStart={22}
            marginEnd={22}
            orientation={Gtk.Orientation.HORIZONTAL}
            spacing={10}>
            <For each={availableConfigs.asAccessor()} id={(it) => it.fileName}>
                {(config) => {
                    return <ThemeButton configFile={config}/>
                }}
            </For>
        </box> as Gtk.Widget
    })

    const scrollController = Gtk.EventControllerScroll.new(Gtk.EventControllerScrollFlags.BOTH_AXES)

    // Intercept vertical scrolling and translate to horizontal
    scrollController.connect('scroll', (controller, dx, dy) => {
        if (dy !== 0) {
            const hadj = scrolledWindow.get_hadjustment()
            const maxScroll = hadj.get_upper() - hadj.get_page_size();
            if (dy === 1 || dy === -1) {
                const newValue = hadj.get_value() + dy * 50;
                animateScroll(
                    hadj,
                    Math.max(0, Math.min(newValue, maxScroll)),
                    leftGradient,
                    rightGradient,
                );
            } else {
                const newValue = hadj.get_value() + dy * 5;
                hadj.set_value(newValue);
                updateFade(hadj, leftGradient, rightGradient);
            }
            return true
        }
        if (dx !== 0) {
            const hadj = scrolledWindow.get_hadjustment()
            const maxScroll = hadj.get_upper() - hadj.get_page_size();
            if (dx === 1 || dx === -1) {
                const newValue = hadj.get_value() + dx * 30;
                animateScroll(
                    hadj,
                    Math.max(0, Math.min(newValue, maxScroll)),
                    leftGradient,
                    rightGradient,
                );
            } else {
                const newValue = hadj.get_value() + dx * 5;
                hadj.set_value(newValue);
                updateFade(hadj, leftGradient, rightGradient);
            }
            return true

        }
        return false
    })

    scrolledWindow.add_controller(scrollController);

    const overlay = new Gtk.Overlay(
        {
            child: scrolledWindow
        }
    )

    overlay.add_overlay(
        <box
            canTarget={false}
            canFocus={false}
            opacity={0}
            widthRequest={50}
            halign={Gtk.Align.START}
            hexpand={false}
            cssClasses={["fadeLeft"]}
            $={(self) => {
                leftGradient = self
            }}/> as Gtk.Widget
    )

    overlay.add_overlay(
        <box
            canTarget={false}
            canFocus={false}
            widthRequest={50}
            halign={Gtk.Align.END}
            hexpand={false}
            cssClasses={["fadeRight"]}
            $={(self) => {
                rightGradient = self
            }}/> as Gtk.Widget
    )

    return <box
        hexpand={true}
        orientation={Gtk.Orientation.HORIZONTAL}>
        {overlay}
    </box>
}

function WallpaperColumn(
    {
        column
    }: {
        column: number,
    }
) {
    const filesListInColumn = createComputed([
        files
    ], (filesList) => {
        if (!filesList) {
            return []
        }
        if (column < 0 || column >= filesList.length) {
            return []
        }
        return filesList[column]
    })

    return <box
        hexpand={true}
        orientation={Gtk.Orientation.VERTICAL}>
        <For each={filesListInColumn}>
            {(file) => {
                return <button
                    $={(self) => {
                        // 140x70 is a magic number that scales well and doesn't cause unwanted expansion of the scroll window
                        createScaledTexture(140, 70, file).then((texture) => {
                            const picture = Gtk.Picture.new_for_paintable(texture)
                            picture.heightRequest = 90
                            picture.cssClasses = ["wallpaper"]
                            picture.contentFit = Gtk.ContentFit.COVER

                            self.set_child(picture)
                        })
                    }}
                    cssClasses={["wallpaperButton"]}
                    onClicked={() => {
                        if (changingWallpaperBusy) return
                        changingWallpaperBusy = true
                        setWallpaper(file)
                            .finally(() => {
                                changingWallpaperBusy = false
                                console.log("wallpaper set")
                            })
                    }}/>
            }}
        </For>
    </box>
}

export default function () {
    const unsub = selectedConfig.asAccessor().subscribe(() => {
        if (selectedConfig.peek() != undefined) {
            updateFiles()
        }
    })
    onCleanup(unsub)
    updateFiles()

    return <RevealerRow
        setup={(revealed) => {
            const unsub = integratedMenuRevealed.subscribe(() => {
                if (!integratedMenuRevealed.peek()) {
                    revealed[1](false)
                }
            })
            onCleanup(unsub)
        }}
        icon={variableConfig.icon.asAccessor()}
        iconOffset={variableConfig.iconOffset.asAccessor()}
        content={
            <label
                cssClasses={["labelMediumBold"]}
                halign={Gtk.Align.START}
                hexpand={true}
                ellipsize={Pango.EllipsizeMode.END}
                label="Look and Feel"/>
        }
        revealedContent={
            <box
                orientation={Gtk.Orientation.VERTICAL}>
                <box>
                    <With value={availableConfigs.asAccessor()}>
                        {(availConfigs) => {
                            if (availConfigs.length > 1) {
                                return <ThemeOptions/>
                            } else {
                                return <box/>
                            }
                        }}
                    </With>
                </box>
                <box marginTop={20}/>
                <box
                    orientation={Gtk.Orientation.HORIZONTAL}>
                    {Array.from({length: numberOfColumns}).map((_, index) => {
                        return <WallpaperColumn column={index}/>
                    })}
                </box>
            </box>
        }
    />
}