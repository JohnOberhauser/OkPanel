import {Gtk} from "ags/gtk4"
import {addWidgets} from "./BarWidgets";
import {variableConfig} from "../../config/config";
import {Bar, selectedBar} from "../../config/bar";
import {createComputed, createState, With} from "ags";
import {interval} from "ags/time";

export const [horizontalBarHeight, horizontalBarHeightSetter] = createState(0)

export default function ({setup}: {setup: (self: Gtk.Widget) => void}) {
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
            return ["frameWindow"]
        }
        if (split) {
            return []
        }
        return ["barWindow"]
    })

    // wrapped in a box for the padding (margins of the center box)
    return <box
        $={(self) => {
            setup(self)

            interval(1000, () => {
                horizontalBarHeightSetter(self.get_allocated_height())
            })
            horizontalBarHeightSetter(self.get_allocated_height())
        }}
        marginStart={marginLeft}
        marginEnd={marginRight}
        marginTop={marginTop}
        marginBottom={marginBottom}
        cssClasses={cssClasses}
        visible={selectedBar.asAccessor()((bar) => {
            return bar === Bar.TOP || bar === Bar.BOTTOM
        })}>
        <centerbox
            marginTop={2}
            marginBottom={2}
            marginStart={2}
            marginEnd={2}
            hexpand={true}
            widthRequest={variableConfig.horizontalBar.minimumWidth.asAccessor()}
            orientation={Gtk.Orientation.HORIZONTAL}
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
    </box>
}
