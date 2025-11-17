import OkButton from "../common/OkButton";
import {variableConfig} from "../../config/config";
import {Bar} from "../../config/bar";
import {Accessor, createBinding, createComputed, createRoot, createState, onCleanup} from "ags";
import {getHPadding, getVPadding} from "./BarWidgets";
import {Gdk, Gtk} from "ags/gtk4";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import {launchApp} from "../utils/launch";
import Gio from "gi://Gio?version=2.0";
import GLib from "gi://GLib?version=2.0";
import {timeout, Timer} from "ags/time";

const hyprland = AstalHyprland.get_default()

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

function addLaunchToMenu(
    menu: Gio.Menu,
    actionGroup: Gio.SimpleActionGroup,
    pop: Gtk.PopoverMenu,
    shortcutNumber: number,
) {
    const newWindowAction = new Gio.SimpleAction({ name: "launch" });
    newWindowAction.connect("activate", () => {
        pop.popdown()
        // @ts-ignore
        const command: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].launch.get()
        if (command !== "") {
            launchApp(command)
        }
    });
    actionGroup.add_action(newWindowAction)

    menu.append("Launch", "main.launch")
}

function addNewWindowToMenu(
    menu: Gio.Menu,
    actionGroup: Gio.SimpleActionGroup,
    pop: Gtk.PopoverMenu,
    shortcutNumber: number,
) {
    const newWindowAction = new Gio.SimpleAction({name: "new-window"})
    // @ts-ignore
    const command: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].newWindow.get()
    if (command !== "") {
        newWindowAction.connect("activate", () => {
            pop.popdown()
            launchApp(command)
        })
        actionGroup.add_action(newWindowAction)

        menu.append("New Window", "main.new-window")
    }
}

function addMoveFocusedClientToMenu(
    menu: Gio.Menu,
    actionGroup: Gio.SimpleActionGroup,
    pop: Gtk.PopoverMenu,
    shortcutNumber: number,
) {
    // @ts-ignore
    const clazz: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.get()
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
    shortcutNumber: number,
) {
    // @ts-ignore
    const clazz: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.get()
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
    shortcutNumber: number,
) {
    const quitAction = new Gio.SimpleAction({name: "quit"})
    quitAction.connect("activate", () => {
        pop.popdown()
        // @ts-ignore
        const clazz: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.get()
        hyprland.clients.filter((it) => it.class === clazz).forEach((it) => it.kill())
    })
    actionGroup.add_action(quitAction)

    menu.append("Quit", "main.quit")
}

export default function (
    {
        shortcutNumber,
        bar,
    }: {
        shortcutNumber: number
        bar: Bar,
    }
) {
    const hyprland = AstalHyprland.get_default()
    // @ts-ignore
    const label: Accessor<string> = variableConfig.barWidgets[`shortcut${shortcutNumber}`].icon.asAccessor()

    const indicatorVisible = createComputed([
        createBinding(hyprland, "clients"),
        // @ts-ignore
        variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.asAccessor()
    ], (clients: AstalHyprland.Client[], clazz: string) => {
        return clients.filter((it) => it.class === clazz).length > 0
    })

    // @ts-ignore
    const clazz = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.get()
    const [selected, selectedSet] = createState(hyprland.focusedClient?.class === clazz)

    // Delay setting the selected value because the focused client might not have a class name just yet
    let selectedDebounceTimer: Timer | null = null;

    let dispose1 = createBinding(hyprland, "focusedClient").subscribe(() => {
        if (selectedDebounceTimer !== null) {
            selectedDebounceTimer.cancel()
        }
        selectedDebounceTimer = timeout(100, () => {
            // @ts-ignore
            const clazz = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.get()
            selectedSet(hyprland.focusedClient?.class === clazz)
            selectedDebounceTimer = null
        })
    })

    // @ts-ignore
    let dispose2 = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.asAccessor().subscribe(() => {
        if (selectedDebounceTimer !== null) {
            selectedDebounceTimer.cancel()
        }
        selectedDebounceTimer = timeout(100, () => {
            // @ts-ignore
            const clazz = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.get()
            selectedSet(hyprland.focusedClient?.class === clazz)
            selectedDebounceTimer = null
        })
    })

    onCleanup(dispose1)
    onCleanup(dispose2)

    return <overlay
        $={(self) => {
            self.add_overlay(
                <box
                    canTarget={false}
                    canFocus={false}
                    hexpand={false}
                    vexpand={false}
                    visible={indicatorVisible}
                    cssClasses={[`barShortcut${shortcutNumber}Indicator`]}
                    halign={getIndicatorHAlign(bar)}
                    valign={getIndicatorVAlign(bar)}
                    widthRequest={4}
                    heightRequest={4}
                    marginStart={6}
                    marginBottom={4}
                    marginEnd={6}
                    marginTop={4}
                /> as Gtk.Box
            )
        }}>
        <OkButton
            hpadding={getHPadding(bar)}
            vpadding={getVPadding(bar)}
            selected={selected}
            selectedCss={[`barShortcut${shortcutNumber}Selected`]}
            labelCss={[`barShortcut${shortcutNumber}Foreground`]}
            backgroundCss={[`barShortcut${shortcutNumber}Background`]}
            //@ts-ignore
            offset={variableConfig.barWidgets[`shortcut${shortcutNumber}`].iconOffset.asAccessor()}
            label={label}
            clickHandlers={{
                onLeftClick: () => {
                    // @ts-ignore
                    const clazz: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.get()
                    let clients = hyprland
                        .clients
                        .filter((it) => it.class === clazz)
                        .sort((a, b) => a.focusHistoryId - b.focusHistoryId)

                    if (clients.length === 0) {
                        // If there are no clients open, launch one
                        // @ts-ignore
                        const command: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].launch.get()
                        if (command !== "") {
                            launchApp(command)
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
                    // @ts-ignore
                    const command: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].newWindow.get()
                    if (command !== "") {
                        launchApp(command)
                    }
                },
                onRightClick: ({self, x, y}) => {
                    createRoot((dispose) => {
                        // @ts-ignore
                        const clazz: string = variableConfig.barWidgets[`shortcut${shortcutNumber}`].class.get()
                        let clients = hyprland
                            .clients
                            .filter((it) => it.class === clazz)

                        const pop = new Gtk.PopoverMenu()
                        pop.set_has_arrow(false)
                        pop.add_css_class("ok-popover")

                        const actionGroup = new Gio.SimpleActionGroup()
                        const menu = new Gio.Menu()

                        if (clients.length === 0) {
                            addLaunchToMenu(menu, actionGroup, pop, shortcutNumber)
                        } else {
                            addNewWindowToMenu(menu, actionGroup, pop, shortcutNumber)
                            addMoveFocusedClientToMenu(menu, actionGroup, pop, shortcutNumber)
                            addCloseFocusedToMenu(menu, actionGroup, pop, shortcutNumber)
                            addQuitToMenu(menu, actionGroup, pop, shortcutNumber)
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
            }}/>
    </overlay>
}