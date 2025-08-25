import {Astal, Gtk} from "ags/gtk4";
import App from "ags/gtk4/app";
import Cairo from 'gi://cairo';
import {hexToRgba} from "../utils/strings";
import {variableConfig} from "../../config/config";
import {createComputed, Accessor} from "ags";
import {Bar, selectedBar} from "../../config/bar";
import VerticalBar, {integratedMenuRevealed, integratedMenuWidth} from "./VerticalBar";

export const monitorFrameWindowName = "monitorFrame"

function roundedRect(ctx: any, x: number, y: number, w: number, h: number, r: number) {
    r = Math.max(0, Math.min(r, Math.min(w, h) / 2));
    const pi2 = Math.PI / 2;
    ctx.newPath();
    ctx.arc(x + w - r, y + r,     r, -pi2, 0);
    ctx.arc(x + w - r, y + h - r, r, 0,    pi2);
    ctx.arc(x + r,     y + h - r, r, pi2,  Math.PI);
    ctx.arc(x + r,     y + r,     r, Math.PI, 1.5 * Math.PI);
    ctx.closePath();
}

export function OutlineOverlay() {
    const redrawAccessor = createComputed([
        variableConfig.theme.bars.frameThickness.asAccessor(),
        variableConfig.theme.bars.borderRadius.asAccessor(),
        variableConfig.theme.bars.backgroundColor.asAccessor(),
        variableConfig.theme.colors.primary.asAccessor(),
        variableConfig.theme.bars.borderWidth.asAccessor(),
    ])

    return <drawingarea
        hexpand
        vexpand
        canTarget={false}
        sensitive={false}
        $={(da: Gtk.DrawingArea) => {
            da.set_draw_func((_area, ctx: any, w: number, h: number) => {
                const thickness       = variableConfig.theme.bars.frameThickness.get();
                const innerRadius     = variableConfig.theme.bars.borderRadius.get();
                const [fr, fg, fb, fa]    = hexToRgba(variableConfig.theme.bars.backgroundColor.get());
                const [br, bg, bb, ba]  = hexToRgba(variableConfig.theme.colors.primary.get());
                const innerBorderWidth  = variableConfig.theme.bars.borderWidth.get();
                const bar = selectedBar.get();

                ctx.save();
                ctx.setAntialias(Cairo.Antialias.BEST);

                // Frame: square outer edges
                ctx.setOperator(Cairo.Operator.OVER);
                ctx.setSourceRGBA(fr, fg, fb, fa);
                ctx.rectangle(0, 0, w, h);
                ctx.fill();

                let x, y, iw, ih

                switch (bar) {
                    case Bar.BOTTOM:
                        x = thickness;
                        y = thickness;
                        iw = Math.max(0, w - 2 * thickness);
                        ih = Math.max(0, h - thickness);
                        break
                    case Bar.TOP:
                        x = thickness;
                        y = 0;
                        iw = Math.max(0, w - 2 * thickness);
                        ih = Math.max(0, h - thickness);
                        break
                    case Bar.LEFT:
                        x = 0;
                        y = thickness;
                        iw = Math.max(0, w - thickness);
                        ih = Math.max(0, h - 2 * thickness);
                        break
                    case Bar.RIGHT:
                        x = thickness;
                        y = thickness;
                        iw = Math.max(0, w - thickness);
                        ih = Math.max(0, h - 2 * thickness);
                        break
                }

                // Inner hole geometry
                const r  = Math.max(0, Math.min(innerRadius, Math.min(iw, ih) / 2));

                // Cutout (transparent center)
                ctx.setOperator(Cairo.Operator.CLEAR);
                roundedRect(ctx, x, y, iw, ih, r);
                ctx.fill();

                // Interior border: draw ONLY on the inside by clipping to the hole,
                // then stroking the same path with 2x width (clip keeps inner half).
                if (innerBorderWidth > 0 && ba > 0) {
                    ctx.setOperator(Cairo.Operator.OVER);
                    ctx.save();
                    roundedRect(ctx, x, y, iw, ih, r);
                    ctx.clip();                          // limit to the transparent hole
                    roundedRect(ctx, x, y, iw, ih, r);   // the stroke path
                    ctx.setSourceRGBA(br, bg, bb, ba);
                    ctx.setLineWidth(innerBorderWidth * 2);
                    ctx.setLineJoin(Cairo.LineJoin.ROUND);
                    ctx.setLineCap(Cairo.LineCap.ROUND);
                    ctx.stroke();
                    ctx.restore();
                }

                ctx.restore();
                ctx.setOperator(Cairo.Operator.OVER);
            });

            redrawAccessor.subscribe(() => {
                da.queue_draw()
            })
        }}
    />;
}

export function MonitorFrameBottom(): Astal.Window {
    const visible = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, enabledVert, enabledHor) => {
        if (bar === Bar.BOTTOM) return false
        if (bar === Bar.LEFT || bar === Bar.RIGHT) {
            return enabledVert
        }
        return enabledHor
    })

    return <window
        cssClasses={["mostlyTransparentBackground"]}
        layer={Astal.Layer.BOTTOM}
        namespace={"okpanel-monitor-frame"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        visible={visible}
        application={App}
        canTarget={false}
        canFocus={false}
        $={(self) => {
            self.get_native()?.get_surface()?.set_input_region(new Cairo.Region())
        }}>
        <box
            vexpand={true}
            hexpand={true}
            heightRequest={variableConfig.theme.bars.frameThickness.asAccessor()}/>
    </window> as Astal.Window
}

export function MonitorFrameTop(): Astal.Window {
    const visible = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, enabledVert, enabledHor) => {
        if (bar === Bar.TOP) return false
        if (bar === Bar.LEFT || bar === Bar.RIGHT) {
            return enabledVert
        }
        return enabledHor
    })

    return <window
        cssClasses={["mostlyTransparentBackground"]}
        layer={Astal.Layer.BOTTOM}
        namespace={"okpanel-monitor-frame"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT}
        visible={visible}
        application={App}
        canTarget={false}
        canFocus={false}
        $={(self) => {
            self.get_native()?.get_surface()?.set_input_region(new Cairo.Region())
        }}>
        <box
            vexpand={true}
            hexpand={true}
            heightRequest={variableConfig.theme.bars.frameThickness.asAccessor()}/>
    </window> as Astal.Window
}

export function MonitorFrameLeft(): Astal.Window {
    const visible = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, enabledVert, enabledHor) => {
        if (bar === Bar.RIGHT || bar === Bar.LEFT) {
            return enabledVert
        }
        return enabledHor
    })

    const size = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.theme.bars.frameThickness.asAccessor(),
        variableConfig.verticalBar.marginOuter.asAccessor(),
        variableConfig.verticalBar.marginInner.asAccessor(),
        variableConfig.verticalBar.compact.asAccessor(),
    ], (
        bar,
        enableFrame,
        frameThickness,
        marginOuter,
        marginInner,
        compact,
    ) => {
        if (bar === Bar.LEFT) {
            let barWidth: number
            if (compact) {
                barWidth = 32
            } else {
                barWidth = 46
            }
            let margin: number
            if (enableFrame) {
                margin = marginOuter
            } else {
                margin = marginOuter + marginInner
            }

            return margin + barWidth
        }
        return enableFrame ? frameThickness : 0
    })

    return <window
        defaultWidth={1} // necessary or resizing doesn't work
        cssClasses={["mostlyTransparentBackground"]}
        layer={Astal.Layer.BOTTOM}
        namespace={"okpanel-monitor-frame"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        visible={visible}
        application={App}
        canTarget={false}
        canFocus={false}
        $={(self) => {
            self.get_native()?.get_surface()?.set_input_region(new Cairo.Region())
        }}>
        <box
            vexpand={true}
            hexpand={true}>
            {/*Represents the bar*/}
            <box
                widthRequest={size}/>
            {/*Represents integrated menu*/}
            <revealer
                visible={selectedBar.asAccessor().as((bar) => {
                    return bar === Bar.LEFT
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
                revealChild={integratedMenuRevealed}>
                <box
                    widthRequest={integratedMenuWidth}/>
            </revealer>
        </box>
    </window> as Astal.Window
}

export function MonitorFrameRight(): Astal.Window {
    const visible = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, enabledVert, enabledHor) => {
        if (bar === Bar.RIGHT || bar === Bar.LEFT) {
            return enabledVert
        }
        return enabledHor
    })

    const size = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.theme.bars.frameThickness.asAccessor(),
        variableConfig.verticalBar.marginOuter.asAccessor(),
        variableConfig.verticalBar.marginInner.asAccessor(),
        variableConfig.verticalBar.compact.asAccessor(),
    ], (
        bar,
        enableFrame,
        frameThickness,
        marginOuter,
        marginInner,
        compact,
    ) => {
        if (bar === Bar.RIGHT) {
            let barWidth: number
            if (compact) {
                barWidth = 32
            } else {
                barWidth = 46
            }
            let margin: number
            if (enableFrame) {
                margin = marginOuter
            } else {
                margin = marginOuter + marginInner
            }
            return margin + barWidth
        }
        return enableFrame ? frameThickness : 0
    })

    return <window
        defaultWidth={1} // necessary or resizing doesn't work
        cssClasses={["mostlyTransparentBackground"]}
        layer={Astal.Layer.BOTTOM}
        namespace={"okpanel-monitor-frame"}
        exclusivity={Astal.Exclusivity.EXCLUSIVE}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.TOP}
        visible={visible}
        application={App}
        canTarget={false}
        canFocus={false}
        $={(self) => {
            self.get_native()?.get_surface()?.set_input_region(new Cairo.Region())
        }}>
        <box
            vexpand={true}
            hexpand={true}>
            {/*Represents the bar*/}
            <box
                widthRequest={size}/>
            {/*Represents integrated menu*/}
            <revealer
                visible={selectedBar.asAccessor().as((bar) => {
                    return bar === Bar.RIGHT
                })}
                transitionType={Gtk.RevealerTransitionType.SLIDE_RIGHT}
                revealChild={integratedMenuRevealed}>
                <box
                    widthRequest={integratedMenuWidth}/>
            </revealer>
        </box>
    </window> as Astal.Window
}

export default function (): Astal.Window {
    const visible = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, enabledVert, enabledHor) => {
        if (bar === Bar.LEFT || bar === Bar.RIGHT) {
            return enabledVert
        }
        return enabledHor
    })

    let box: Gtk.Box
    let bar: Gtk.Box
    let frame: Gtk.Box

    selectedBar.asAccessor().subscribe(() => {
        if (selectedBar.get() === Bar.LEFT) {
            box?.reorder_child_after(frame, bar)
        } else if (selectedBar.get() === Bar.RIGHT) {
            box?.reorder_child_after(bar, frame)
        }
    })

    return <window
        name={monitorFrameWindowName}
        cssClasses={["transparentBackground"]}
        layer={Astal.Layer.BOTTOM}
        namespace={"okpanel-monitor-frame"}
        exclusivity={Astal.Exclusivity.IGNORE}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        visible={true}
        application={App}>
        <box
            orientation={Gtk.Orientation.HORIZONTAL}
            $={(self) => {
                box = self
            }}>
            <VerticalBar
                setup={(self) => {
                    bar = self
                }}/>
            <box
                canTarget={false}
                canFocus={false}
                visible={visible}
                $={(self) => {
                    frame = self
                    //TODO use layer TOP and figure this out
                    // self.get_native()?.get_surface()?.set_input_region(new Cairo.Region())
                    // visible.subscribe(() => {
                    //     self.get_native()?.get_surface()?.set_input_region(new Cairo.Region())
                    // })
                }}>
                <OutlineOverlay/>
            </box>
        </box>
    </window> as Astal.Window
}