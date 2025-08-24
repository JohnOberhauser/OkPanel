import App from "ags/gtk4/app"
import {addWidgets} from "./BarWidgets";
import {variableConfig} from "../../config/config";
import {Bar, selectedBar} from "../../config/bar";
import Astal from "gi://Astal?version=4.0";
import {Gtk} from "ags/gtk4";
import {createComputed, createState, With} from "ags"
import {addSystemMenuWidgets, createSystemWidgets} from "../systemMenu/SystemMenuWindow";

export const verticalBarWindowName = "verticalBar"

export const [integratedMenuRevealed, integratedMenuRevealedSetting] = createState(false)

export default function () {
    const marginLeft = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.marginOuter.asAccessor(),
        variableConfig.verticalBar.marginInner.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
    ], (bar, outer, inner, frameEnabled): number => {
        if (frameEnabled) {
            return 0
        }
        if (bar === Bar.LEFT) {
            return outer
        } else {
            return inner
        }
    })

    const marginRight = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.marginOuter.asAccessor(),
        variableConfig.verticalBar.marginInner.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
    ], (bar, outer, inner, frameEnabled): number => {
        if (frameEnabled) {
            return 0
        }
        if (bar === Bar.RIGHT) {
            return outer
        } else {
            return inner
        }
    })

    const marginTop = createComputed([
        variableConfig.verticalBar.marginStart.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
    ], (margin, frameEnabled) => {
        if (frameEnabled) {
            return 0
        }
        return margin
    })

    const marginBottom = createComputed([
        variableConfig.verticalBar.marginEnd.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
    ], (margin, frameEnabled) => {
        if (frameEnabled) {
            return 0
        }
        return margin
    })

    const cssClasses = createComputed([
        variableConfig.verticalBar.splitSections.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
    ], (split, frame) => {
        if (frame) {
            return ["sideBar", "frameWindow"]
        }
        if (split) {
            return ["sideBar"]
        }
        return ["sideBar", "barWindow"]
    })

    const anchor = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.expanded.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
    ], (bar, expanded, framed) => {
        if (bar === Bar.LEFT) {
            if (!expanded && !framed) {
                return Astal.WindowAnchor.LEFT
            }
            return Astal.WindowAnchor.TOP
                | Astal.WindowAnchor.LEFT
                | Astal.WindowAnchor.BOTTOM
        } else {
            if (!expanded && !framed) {
                return Astal.WindowAnchor.RIGHT
            }
            return Astal.WindowAnchor.TOP
                | Astal.WindowAnchor.RIGHT
                | Astal.WindowAnchor.BOTTOM
        }
    })

    const systemJsxWidgets = createSystemWidgets()

    let box: Gtk.Box | null = null
    let integratedMenu: Gtk.Widget | null = null
    let mainBar: Gtk.Widget | null = null

    selectedBar.asAccessor().subscribe(() => {
        if (selectedBar.get() === Bar.LEFT) {
            box?.reorder_child_after(mainBar!, integratedMenu)
        } else if (selectedBar.get() === Bar.RIGHT) {
            box?.reorder_child_after(integratedMenu!, mainBar)
        }
    })

    return <window
        defaultHeight={variableConfig.verticalBar.minimumHeight.asAccessor()}
        defaultWidth={1} // necessary or resizing doesn't work
        name={verticalBarWindowName}
        layer={Astal.Layer.TOP}
        namespace={"okpanel-vertical-bar"}
        heightRequest={variableConfig.verticalBar.minimumHeight.asAccessor()}
        cssClasses={["transparentBackground"]}
        monitor={variableConfig.mainMonitor.asAccessor()}
        visible={selectedBar.asAccessor()(bar =>
            bar === Bar.LEFT || bar === Bar.RIGHT
        )}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        // this window doesn't like marginStart for some reason
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        marginBottom={marginBottom}
        anchor={anchor}
        application={App}>
        <box
            orientation={Gtk.Orientation.HORIZONTAL}
            cssClasses={cssClasses}
            $={(self) => {
                box = self
            }}>
            <revealer
                transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
                visible={variableConfig.verticalBar.integratedMenu.asAccessor()}
                revealChild={integratedMenuRevealed}
                $={(self) => {
                    integratedMenu = self
                }}>
                <Gtk.ScrolledWindow
                    cssClasses={["scrollWindow"]}
                    vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
                    propagateNaturalHeight={true}
                    widthRequest={410}>
                    <With value={variableConfig.systemMenu.widgets.asAccessor()}>
                        {(widgets) => {
                            return <box
                                marginTop={20}
                                marginStart={20}
                                marginEnd={20}
                                marginBottom={20}
                                orientation={Gtk.Orientation.VERTICAL}
                                spacing={10}>
                                {addSystemMenuWidgets(widgets, systemJsxWidgets)}
                            </box>
                        }}
                    </With>
                </Gtk.ScrolledWindow>
            </revealer>
            <centerbox
                orientation={Gtk.Orientation.VERTICAL}
                $={(self) => {
                    mainBar = self
                }}
                startWidget={
                    <box
                        visible={variableConfig.verticalBar.topWidgets.asAccessor().as((widgets) =>
                            widgets.length > 0
                        )}
                        orientation={Gtk.Orientation.VERTICAL}
                        cssClasses={variableConfig.verticalBar.splitSections.asAccessor().as((split) =>
                            split ? ["barWindow"] : []
                        )}>
                        <With value={variableConfig.verticalBar.topWidgets.asAccessor()}>
                            {widgets => <box
                                orientation={Gtk.Orientation.VERTICAL}
                                marginTop={variableConfig.verticalBar.sectionPadding.asAccessor()}
                                marginBottom={variableConfig.verticalBar.sectionPadding.asAccessor()}
                                spacing={variableConfig.verticalBar.widgetSpacing.asAccessor()}>
                                {addWidgets(widgets, true)}
                            </box>}
                        </With>
                    </box> as Gtk.Widget
                }
                centerWidget={
                    <box
                        visible={variableConfig.verticalBar.centerWidgets.asAccessor().as((widgets) =>
                            widgets.length > 0
                        )}
                        orientation={Gtk.Orientation.VERTICAL}
                        cssClasses={variableConfig.verticalBar.splitSections.asAccessor().as((split) =>
                            split ? ["barWindow"] : []
                        )}>
                        <With value={variableConfig.verticalBar.centerWidgets.asAccessor()}>
                            {widgets => <box
                                orientation={Gtk.Orientation.VERTICAL}
                                marginTop={variableConfig.verticalBar.sectionPadding.asAccessor()}
                                marginBottom={variableConfig.verticalBar.sectionPadding.asAccessor()}
                                spacing={variableConfig.verticalBar.widgetSpacing.asAccessor()}>
                                {addWidgets(widgets, true)}
                            </box>}
                        </With>
                    </box> as Gtk.Widget
                }
                endWidget={
                    <box
                        visible={variableConfig.verticalBar.bottomWidgets.asAccessor().as((widgets) =>
                            widgets.length > 0
                        )}
                        orientation={Gtk.Orientation.VERTICAL}
                        valign={Gtk.Align.END}
                        cssClasses={variableConfig.verticalBar.splitSections.asAccessor().as((split) =>
                            split ? ["barWindow"] : []
                        )}>
                        <With value={variableConfig.verticalBar.bottomWidgets.asAccessor()}>
                            {widgets => <box
                                orientation={Gtk.Orientation.VERTICAL}
                                marginTop={variableConfig.verticalBar.sectionPadding.asAccessor()}
                                marginBottom={variableConfig.verticalBar.sectionPadding.asAccessor()}
                                spacing={variableConfig.verticalBar.widgetSpacing.asAccessor()}>
                                {addWidgets(widgets, true)}
                            </box>}
                        </With>
                    </box> as Gtk.Widget
                }/>
        </box>
    </window>
}
