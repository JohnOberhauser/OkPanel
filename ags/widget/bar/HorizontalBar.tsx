import {Gtk} from "ags/gtk4"
import {addWidgets} from "./BarWidgets";
import {variableConfig} from "../../config/config";
import {Bar, selectedBar} from "../../config/bar";
import {createComputed, createState, With} from "ags";

export default function ({setup}: {setup: (self: Gtk.CenterBox) => void}) {
    const marginTop = createComputed([
        selectedBar.asAccessor(),
        variableConfig.horizontalBar.marginOuter.asAccessor(),
        variableConfig.horizontalBar.marginInner.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, outer, inner, frameEnabled): number => {
        if (frameEnabled) {
            return 0
        }
        if (bar === Bar.TOP) {
            return outer
        } else {
            return inner
        }
    })

    const marginBottom = createComputed([
        selectedBar.asAccessor(),
        variableConfig.horizontalBar.marginOuter.asAccessor(),
        variableConfig.horizontalBar.marginInner.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, outer, inner, frameEnabled): number => {
        if (frameEnabled) {
            return 0
        }
        if (bar === Bar.BOTTOM) {
            return outer
        } else {
            return inner
        }
    })

    const marginLeft = createComputed([
        variableConfig.horizontalBar.marginStart.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (margin, frameEnabled) => {
        if (frameEnabled) {
            return 0
        }
        return margin
    })

    const marginRight = createComputed([
        variableConfig.horizontalBar.marginEnd.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (margin, frameEnabled) => {
        if (frameEnabled) {
            return 0
        }
        return margin
    })

    const cssClasses = createComputed([
        variableConfig.horizontalBar.splitSections.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (split, frame) => {
        if (frame) {
            return ["topBar", "frameWindow"]
        }
        if (split) {
            return ["topBar"]
        }
        return ["topBar", "barWindow"]
    })

    return <centerbox
        $={(self) => {
            setup(self)
        }}
        marginStart={marginLeft}
        marginEnd={marginRight}
        marginTop={marginTop}
        marginBottom={marginBottom}
        widthRequest={variableConfig.horizontalBar.minimumWidth.asAccessor()}
        visible={selectedBar.asAccessor()((bar) => {
            return bar === Bar.TOP || bar === Bar.BOTTOM
        })}
        orientation={Gtk.Orientation.HORIZONTAL}
        cssClasses={cssClasses}
        startWidget={
            <box
                visible={variableConfig.horizontalBar.leftWidgets.asAccessor().as((widgets) =>
                    widgets.length > 0
                )}
                halign={Gtk.Align.START}
                cssClasses={variableConfig.horizontalBar.splitSections.asAccessor().as((split) =>
                    split ? ["barWindow"] : []
                )}>
                <With value={variableConfig.horizontalBar.leftWidgets.asAccessor()}>
                    {widgets => <box
                        orientation={Gtk.Orientation.HORIZONTAL}
                        marginStart={variableConfig.horizontalBar.sectionPadding.asAccessor()}
                        marginEnd={variableConfig.horizontalBar.sectionPadding.asAccessor()}
                        spacing={variableConfig.horizontalBar.widgetSpacing.asAccessor()}>
                        {addWidgets(widgets, false)}
                    </box>}
                </With>
            </box> as Gtk.Widget
        }
        centerWidget={
            <box
                visible={variableConfig.horizontalBar.centerWidgets.asAccessor().as((widgets) =>
                    widgets.length > 0
                )}
                cssClasses={variableConfig.horizontalBar.splitSections.asAccessor().as((split) =>
                    split ? ["barWindow"] : []
                )}>
                <With value={variableConfig.horizontalBar.centerWidgets.asAccessor()}>
                    {widgets => <box
                        orientation={Gtk.Orientation.HORIZONTAL}
                        marginStart={variableConfig.horizontalBar.sectionPadding.asAccessor()}
                        marginEnd={variableConfig.horizontalBar.sectionPadding.asAccessor()}
                        spacing={variableConfig.horizontalBar.widgetSpacing.asAccessor()}>
                        {addWidgets(widgets, false)}
                    </box>}
                </With>
            </box> as Gtk.Widget
        }
        endWidget={
            <box
                visible={variableConfig.horizontalBar.rightWidgets.asAccessor().as((widgets) =>
                    widgets.length > 0
                )}
                halign={Gtk.Align.END}
                cssClasses={variableConfig.horizontalBar.splitSections.asAccessor().as((split) =>
                    split ? ["barWindow"] : []
                )}>
                <With value={variableConfig.horizontalBar.rightWidgets.asAccessor()}>
                    {widgets => <box
                        orientation={Gtk.Orientation.HORIZONTAL}
                        marginStart={variableConfig.horizontalBar.sectionPadding.asAccessor()}
                        marginEnd={variableConfig.horizontalBar.sectionPadding.asAccessor()}
                        spacing={variableConfig.horizontalBar.widgetSpacing.asAccessor()}>
                        {addWidgets(widgets, false)}
                    </box>}
                </With>
            </box> as Gtk.Widget
        }/>
}
