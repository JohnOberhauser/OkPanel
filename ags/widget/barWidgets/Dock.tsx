import Apps from "gi://AstalApps"
import {Bar} from "../../config/bar";
import {Gdk, Gtk} from "ags/gtk4";
import AstalHyprland from "gi://AstalHyprland";
import {Accessor, createBinding, createComputed, createRoot, createState, For, onCleanup} from "ags";
import OkButton from "../common/OkButton";
import {getHPadding, getVPadding} from "./BarWidgets";
import {readFile} from "ags/file";
import {projectDir} from "../../app";
import {fuzzyQuery, StringObject} from "../utils/query";
import {timeout, Timer} from "ags/time";
import {launchApp, launchDesktopApp} from "../utils/launch";
import Gio from "gi://Gio?version=2.0";
import GLib from "gi://GLib?version=2.0";
import {uniqueBy} from "../utils/filter";
import {variableConfig} from "../../config/config";

const hyprland = AstalHyprland.get_default()

type Indicator = {
    visible: boolean
    size: number
};

function getIndicatorHAlign(bar: Bar) {
    switch (bar) {
        case Bar.LEFT:
            return Gtk.Align.START
        case Bar.RIGHT:
            return Gtk.Align.END
        case Bar.TOP:
        case Bar.BOTTOM:
            return Gtk.Align.CENTER
    }
}

function getIndicatorVAlign(bar: Bar) {
    switch (bar) {
        case Bar.LEFT:
        case Bar.RIGHT:
            return Gtk.Align.CENTER
        case Bar.TOP:
            return Gtk.Align.START
        case Bar.BOTTOM:
            return Gtk.Align.END
    }
}

function getIndicatorOrientation(bar: Bar) {
    switch (bar) {
        case Bar.LEFT:
        case Bar.RIGHT:
            return Gtk.Orientation.VERTICAL
        case Bar.TOP:
        case Bar.BOTTOM:
            return Gtk.Orientation.HORIZONTAL
    }
}

function addLaunchToMenu(
    menu: Gio.Menu,
    actionGroup: Gio.SimpleActionGroup,
    pop: Gtk.PopoverMenu,
    app: Apps.Application,
) {
    const newWindowAction = new Gio.SimpleAction({ name: "launch" });
    newWindowAction.connect("activate", () => {
        pop.popdown()
        launchDesktopApp(app)
    });
    actionGroup.add_action(newWindowAction)

    menu.append("Launch", "main.launch")
}

function addMoveFocusedClientToMenu(
    menu: Gio.Menu,
    actionGroup: Gio.SimpleActionGroup,
    pop: Gtk.PopoverMenu,
    clazz: string
) {
    const focusedClient = hyprland.get_focused_client()
    if (focusedClient !== null && focusedClient.class === clazz) {
        const moveFocusedAction = new Gio.SimpleAction({
            name: "move-focused",
            parameterType: new GLib.VariantType("i"),
        })
        moveFocusedAction.connect("activate", (_action, param) => {
            pop.popdown()
            const targetWorkspace = param?.get_int32()
            if (typeof  targetWorkspace === "number") {
                const workspace = hyprland.workspaces.find((it) => it.id === targetWorkspace)
                if (workspace !== undefined) {
                    focusedClient.move_to(workspace)
                    workspace.focus()
                    focusedClient.focus()
                }
            }
        })
        actionGroup.add_action(moveFocusedAction)

        const chooseWorkspaceSubmenu = new Gio.Menu();
        const focused = hyprland.get_focused_client();
        const currentWs = focused?.workspace?.id;

        hyprland.workspaces
            .map(w => w.id)
            .sort((a, b) => a - b)
            .forEach(id => {
                if (id === currentWs) return; // optional: don't list current
                // Each item triggers main.move-focused(<id>) with an int parameter
                chooseWorkspaceSubmenu.append(`Workspace ${id}`, `main.move-focused(${id})`);
            });

        const moveFocusedMenuItem = Gio.MenuItem.new("Move focused", null)
        moveFocusedMenuItem.set_submenu(chooseWorkspaceSubmenu);

        menu.append_item(moveFocusedMenuItem)
    }
}

function addCloseFocusedToMenu(
    menu: Gio.Menu,
    actionGroup: Gio.SimpleActionGroup,
    pop: Gtk.PopoverMenu,
    clazz: string
) {
    const focusedClient = hyprland.get_focused_client()
    if (focusedClient !== null && focusedClient.class === clazz) {
        const action = new Gio.SimpleAction({name: "close-focused"})
        action.connect("activate", () => {
            pop.popdown()
            focusedClient.kill()
        })
        actionGroup.add_action(action)

        menu.append("Close Focused", "main.close-focused")
    }
}

function addQuitToMenu(
    menu: Gio.Menu,
    actionGroup: Gio.SimpleActionGroup,
    pop: Gtk.PopoverMenu,
    clazz: string
) {
    const quitAction = new Gio.SimpleAction({name: "quit"})
    quitAction.connect("activate", () => {
        pop.popdown()
        hyprland.clients.filter((it) => it.class === clazz).forEach((it) => it.kill())
    })
    actionGroup.add_action(quitAction)

    menu.append("Quit", "main.quit")
}

function getApp(clientClass: string) {
    const apps = new Apps.Apps().fuzzy_query(clientClass)
    if (apps.length > 0) {
        return apps[0]
    } else {
        return null
    }
}

function getAppGlyph(
    nerdFontMap: StringObject,
    clientClass: string,
) {
    const apps = new Apps.Apps().fuzzy_query(clientClass)
    let appName: string = ""
    let appDescription: string = ""
    if (apps.length > 0) {
        if (apps[0].name !== null) {
            appName = apps[0].name
        }
        if (apps[0].description !== null) {
            appDescription = apps[0].description
        }
    }

    const result = fuzzyQuery(
        nerdFontMap,
        {
            primary: [clientClass, appName],
            secondary: [appDescription],
        }
    )

    if (result.length === 0) return "󰘔"
    const cleaned = result[0].value.trim().replace(/^0x/i, "").replace(/^u\+/i, "");
    const codePoint = Number.parseInt(cleaned, 16);
    return String.fromCodePoint(codePoint)
}

function IndicatorDot(
    {
        visible,
        bar,
    }: {
        visible: Accessor<boolean>,
        bar: Bar,
    }
) {
    return <box
        canTarget={false}
        canFocus={false}
        hexpand={false}
        vexpand={false}
        visible={visible}
        cssClasses={[`barDockIndicator`]}
        halign={getIndicatorHAlign(bar)}
        valign={getIndicatorVAlign(bar)}
        widthRequest={4}
        heightRequest={4}
        marginStart={1}
        marginBottom={1}
        marginEnd={1}
        marginTop={1}
    />
}

function IndicatorLine(
    {
        visible,
        bar,
    }: {
        visible: Accessor<boolean>,
        bar: Bar,
    }
) {
    let width = 0
    let height = 0
    switch (bar) {
        case Bar.RIGHT:
        case Bar.LEFT:
            width = 4
            height = 16
            break
        case Bar.BOTTOM:
        case Bar.TOP:
            width = 16
            height = 4
            break
    }
    return <box
        canTarget={false}
        canFocus={false}
        hexpand={false}
        vexpand={false}
        visible={visible}
        cssClasses={[`barDockIndicator`]}
        halign={getIndicatorHAlign(bar)}
        valign={getIndicatorVAlign(bar)}
        widthRequest={width}
        heightRequest={height}
        marginStart={1}
        marginBottom={1}
        marginEnd={1}
        marginTop={1}
    />
}

export default function ({vertical, bar}: { vertical: boolean, bar: Bar }) {
    const nerdFontMap = JSON.parse(readFile(`${projectDir}/assets/nerd_font_map.json`))

    const openedClients = createBinding(hyprland, "clients")
    const pinnedAppsAccessor = variableConfig.barWidgets.dock.pinnedApps.asAccessor()

    const classes = createComputed(() => {
        // @ts-ignore
        const pinnedApps: string[] = pinnedAppsAccessor()
        const openedClasses = openedClients().flatMap((it) => it.class)
        const combinedClasses = [...pinnedApps, ...openedClasses.reverse()]
        return uniqueBy(combinedClasses, (it) => it)
    })

    return <box
        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
        <For each={classes} id={(it) => it}>
            {(clazz, index) => {
                const app = getApp(clazz)

                const indicator: Accessor<Indicator> = createBinding(hyprland, "clients").as(() => {
                    const clients = hyprland.clients.filter((it) => it.class === clazz)
                    return {
                        visible: clients.length > 0,
                        size: clients.length === 1 ? 4 : 8
                    }
                })

                const indicatorCount = createBinding(hyprland, "clients").as(() => {
                    const clients = hyprland.clients.filter((it) => it.class === clazz)
                    return clients.length
                })

                const [selected, selectedSet] = createState(hyprland.focusedClient?.class === clazz)

                // Delay setting the selected value because the focused client might not have a class name just yet
                let selectedDebounceTimer: Timer | null = null;

                let dispose1 = createBinding(hyprland, "focusedClient").subscribe(() => {
                    if (selectedDebounceTimer !== null) {
                        selectedDebounceTimer.cancel()
                    }
                    selectedDebounceTimer = timeout(100, () => {
                        selectedSet(hyprland.focusedClient?.class === clazz)
                        selectedDebounceTimer = null
                    })
                })

                onCleanup(dispose1)

                return <overlay
                    $={(self) => {
                        self.add_overlay(
                            <box
                                orientation={getIndicatorOrientation(bar)}
                                canTarget={false}
                                canFocus={false}
                                hexpand={true}
                                vexpand={true}
                                halign={getIndicatorHAlign(bar)}
                                valign={getIndicatorVAlign(bar)}
                                marginStart={6}
                                marginBottom={4}
                                marginEnd={6}
                                marginTop={4}>
                                <IndicatorDot
                                    visible={indicatorCount.as((it) => it > 0 && it <= 3)}
                                    bar={bar}/>
                                <IndicatorDot
                                    visible={indicatorCount.as((it) => it > 1 && it <= 3)}
                                    bar={bar}/>
                                <IndicatorDot
                                    visible={indicatorCount.as((it) => it > 2 && it <= 3)}
                                    bar={bar}/>
                                <IndicatorLine
                                    visible={indicatorCount.as((it) => it > 3)}
                                    bar={bar}/>
                            </box> as Gtk.Box
                        )
                    }}>
                    <OkButton
                        hpadding={getHPadding(bar)}
                        vpadding={getVPadding(bar)}
                        selected={selected}
                        selectedCss={[`barDockSelected`]}
                        labelCss={[`barDockForeground`]}
                        backgroundCss={[`barDockBackground`]}
                        label={variableConfig.barWidgets.dock.glyphOverride.asAccessor().as((overrideList) => {
                            let glyph: string | null = null
                            overrideList.forEach((overrideItem) => {
                                // @ts-ignore
                                const overrideString: string = overrideItem
                                if (overrideString.includes("|")) {
                                    const overrideClass = overrideString.split("|")[0]
                                    const overrideGlyph = overrideString.split("|")[1]
                                    if (overrideClass === clazz) {
                                        glyph = overrideGlyph
                                        return
                                    }
                                }
                            })
                            if (glyph !== null) {
                                return glyph
                            }
                            return getAppGlyph(nerdFontMap, clazz)
                        })}
                        clickHandlers={{
                            onLeftClick: () => {
                                let clients = hyprland
                                    .clients
                                    .filter((it) => it.class === clazz)
                                    .sort((a, b) => a.focusHistoryId - b.focusHistoryId)

                                if (clients.length === 0) {
                                    if (app !== null) {
                                        launchDesktopApp(app)
                                    }
                                } else {
                                    const currentFocusedClient = hyprland.get_focused_client()
                                    const focusedWorkspace = hyprland.get_focused_workspace()

                                    // If we are already focused on the class, focus the next client
                                    if (currentFocusedClient !== null && currentFocusedClient.class === clazz) {
                                        const nextClients = clients
                                            .filter((it) => it.focusHistoryId > currentFocusedClient.focusHistoryId)

                                        const clientToFocus = nextClients.length === 0 ? clients[0] : nextClients[0]
                                        const clientToFocusWorkspace = clientToFocus.workspace
                                        if (clientToFocusWorkspace.id !== focusedWorkspace.id) {
                                            clientToFocus.workspace.focus()
                                        }
                                        clientToFocus.focus()
                                        return
                                    }

                                    // Focus on a client in this workspace if one exists, otherwise a client elsewhere
                                    const clientsOnFocusedWorkspace = clients.filter((it) => it.workspace === focusedWorkspace)
                                    const clientToFocus = clientsOnFocusedWorkspace.length === 0 ? clients[0] : clientsOnFocusedWorkspace[0]
                                    const clientToFocusWorkspace = clientToFocus.workspace
                                    if (clientToFocusWorkspace.id !== focusedWorkspace.id) {
                                        clientToFocus.workspace.focus()
                                    }
                                    clientToFocus.focus()
                                }
                            },
                            onMiddleClick: () => {
                                if (app !== null) {
                                    launchDesktopApp(app)
                                }
                            },
                            onRightClick: ({self, x, y}) => {
                                createRoot((dispose) => {
                                    let clients = hyprland
                                        .clients
                                        .filter((it) => it.class === clazz)

                                    const pop = new Gtk.PopoverMenu()
                                    pop.set_has_arrow(false)
                                    pop.add_css_class("ok-popover")

                                    const actionGroup = new Gio.SimpleActionGroup()
                                    const menu = new Gio.Menu()

                                    if (clients.length === 0) {
                                        if (app !== null) {
                                            addLaunchToMenu(menu, actionGroup, pop, app)
                                        }
                                    } else {
                                        addMoveFocusedClientToMenu(menu, actionGroup, pop, clazz)
                                        addCloseFocusedToMenu(menu, actionGroup, pop, clazz)
                                        addQuitToMenu(menu, actionGroup, pop, clazz)
                                    }

                                    pop.set_menu_model(menu)
                                    pop.insert_action_group?.("main", actionGroup)

                                    pop.set_parent(self)

                                    const rect = new Gdk.Rectangle({ x: Math.round(x), y: Math.round(y), width: 1, height: 1 })
                                    pop.set_pointing_to?.(rect)

                                    pop.connect("closed", () => {
                                        dispose()
                                    })

                                    pop.popup()
                                });
                            }
                        }}
                    />
                </overlay>
            }}
        </For>
    </box>
}