import Apps from "gi://AstalApps"
import {Bar} from "../../config/bar";
import {Gdk, Gtk} from "ags/gtk4";
import AstalHyprland from "gi://AstalHyprland";
import {createBinding, createRoot, createState, For, onCleanup} from "ags";
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

const hyprland = AstalHyprland.get_default()

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

    result.slice(0, 10).forEach((res) => {
        console.log(`result: ${res.key}`)
        console.log(`result value: ${res.value}`)
    })

    if (result.length === 0) return "󰘔"
    const cleaned = result[0].value.trim().replace(/^0x/i, "").replace(/^u\+/i, "");
    const codePoint = Number.parseInt(cleaned, 16);
    return String.fromCodePoint(codePoint)
}

export default function ({vertical, bar}: { vertical: boolean, bar: Bar }) {
    const nerdFontMap = JSON.parse(readFile(`${projectDir}/assets/nerd_font_map.json`))

    const classes = createBinding(hyprland, "clients").as((clients) => {
        return uniqueBy(clients.reverse(), (client) => client.class).flatMap((it) => it.class)
    })

    return <box
        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
        <For each={classes} id={(it) => it}>
            {(clazz, index) => {
                const app = getApp(clazz)

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

                return <OkButton
                    hpadding={getHPadding(bar)}
                    vpadding={getVPadding(bar)}
                    selected={selected}
                    selectedCss={[`barDockSelected`]}
                    labelCss={[`barDockForeground`]}
                    backgroundCss={[`barDockBackground`]}
                    label={getAppGlyph(nerdFontMap, clazz)}
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
            }}
        </For>
    </box>
}