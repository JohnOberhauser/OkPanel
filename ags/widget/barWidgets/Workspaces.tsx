import Hyprland from "gi://AstalHyprland"
import Divider from "../common/Divider";
import {variableConfig} from "../../config/config";
import {Bar} from "../../config/bar";
import Gtk from "gi://Gtk?version=4.0";
import OkButton, {OkButtonSize} from "../common/OkButton";
import {createBinding, createComputed, With} from "ags";
import {getHPadding, getVPadding} from "./BarWidgets";
import {attachHoverScroll} from "../utils/scroll";

function groupByProperty(
    array: Hyprland.Workspace[],
): Hyprland.Workspace[][] {
    const map = new Map<Hyprland.Monitor, Hyprland.Workspace[]>();

    array.forEach((item) => {
        const key = item.monitor;
        if (key === null) {
            return
        }
        if (!map.has(key)) {
            map.set(key, []);
        }
        map.get(key)!.unshift(item);
    });

    return Array.from(map.values()).sort((a, b) => {
        return a[0].monitor.id - b[0].monitor.id
    });
}

export default function ({vertical, bar}: { vertical: boolean, bar: Bar }) {
    const hypr = Hyprland.get_default()
    const hyprlandWorkspaces = createBinding(hypr, "workspaces")
    return <box
        overflow={Gtk.Overflow.HIDDEN}
        cssClasses={["barWorkspacesBackground", "radiusSmall"]}
        orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
        <With value={hyprlandWorkspaces}>
            {(workspaces) => {
                const groupedWorkspaces = groupByProperty(workspaces)
                return <box
                    orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
                    {groupedWorkspaces.map((workspaceGroup, index) => {
                        return <box
                            $={(self) => {
                                attachHoverScroll(self, ({dy}) => {
                                    if (dy < 0) {
                                        hypr.dispatch("workspace", variableConfig.barWidgets.workspaces.scrollUpCommand.get())
                                    } else if (dy > 0) {
                                        hypr.dispatch("workspace", variableConfig.barWidgets.workspaces.scrollDownCommand.get())
                                    }
                                })
                            }}
                            orientation={vertical ? Gtk.Orientation.VERTICAL : Gtk.Orientation.HORIZONTAL}>
                            {index > 0 && index < groupedWorkspaces.length &&
                                <Divider
                                    thin={true}
                                    marginStart={4}
                                    marginEnd={4}/>
                            }
                            {workspaceGroup.sort((a, b) => {
                                return a.id - b.id
                            }).map((workspace: Hyprland.Workspace) => {
                                let labelCss = createComputed([
                                    createBinding(workspace.monitor, "activeWorkspace"),
                                ], (w: Hyprland.Workspace) => {
                                    const isActive = w?.id === workspace.id
                                    return isActive ? ["barWorkspacesForeground"] : ["barWorkspacesInactiveForeground"]
                                })

                                let offset = createComputed([
                                    createBinding(workspace.monitor, "activeWorkspace"),
                                    variableConfig.barWidgets.workspaces.activeOffset.asAccessor(),
                                    variableConfig.barWidgets.workspaces.inactiveOffset.asAccessor()
                                ], (w: Hyprland.Workspace, activeOffset, inactiveOffset) => {
                                    const isActive = w?.id === workspace.id
                                    return isActive ? activeOffset : inactiveOffset
                                })

                                let label = createComputed([
                                    createBinding(workspace.monitor, "activeWorkspace"),
                                    variableConfig.barWidgets.workspaces.activeIcon.asAccessor(),
                                    variableConfig.barWidgets.workspaces.inactiveIcon.asAccessor()
                                ], (w: Hyprland.Workspace, activeIcon, inactiveIcon) => {
                                    const isActive = w?.id === workspace.id
                                    return isActive ? activeIcon : inactiveIcon
                                })

                                let size = createComputed([
                                    createBinding(workspace.monitor, "activeWorkspace"),
                                    variableConfig.barWidgets.workspaces.largeActive.asAccessor()
                                ], (w: Hyprland.Workspace, isLarge) => {
                                    const isActive = w?.id === workspace.id
                                    return isActive && isLarge ? OkButtonSize.LARGE : OkButtonSize.SMALL
                                })

                                return <OkButton
                                    labelCss={labelCss.get()}
                                    backgroundCss={["barWorkspaceButtonBackground"]}
                                    offset={offset}
                                    hpadding={getHPadding(bar)}
                                    vpadding={getVPadding(bar)}
                                    label={label}
                                    size={size}
                                    onClicked={() => {
                                        if (workspace.monitor.activeWorkspace.id !== workspace.id) {
                                            hypr.dispatch("workspace", `${workspace.id}`)
                                        }
                                    }}/>
                            })}
                        </box>
                    })}
                </box>
            }}
        </With>
    </box>
}