import {Astal, Gtk} from "ags/gtk4";
import App from "ags/gtk4/app";
import Cairo from 'gi://cairo';
import {hexToRgba} from "../../utils/strings";
import {variableConfig} from "../../../config/config";
import {createComputed} from "ags";
import {Bar, selectedBar} from "../../../config/bar";
import VerticalBar from "../VerticalBar";
import IntegratedMenu from "../IntegratedMenu";

export const frameWindowName = "frame"

let frameBox: Gtk.Box
let verticalBox: Gtk.Box
let integratedMenu: Gtk.Widget
let verticalBar: Gtk.Widget
let frame: Gtk.Box

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

function VerticalBox() {
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

    return <box
        $={(self) => {
            verticalBox = self

            // Add the children in the proper order based on the currently selected bar
            const im = <IntegratedMenu
                setup={(self) => {
                    integratedMenu = self
                }}/> as Gtk.Widget
            const vb = <VerticalBar
                setup={(self) => {
                    verticalBar = self
                }}/> as Gtk.Widget

            if (selectedBar.get() === Bar.RIGHT) {
                self.append(vb)
                self.append(im)
            } else {
                self.append(im)
                self.append(vb)
            }
        }}
        marginStart={marginLeft}
        marginEnd={marginRight}
        marginTop={marginTop}
        marginBottom={marginBottom}
        cssClasses={cssClasses}
        orientation={Gtk.Orientation.HORIZONTAL}/>
}

export default function (): Astal.Window {

    selectedBar.asAccessor().subscribe(() => {
        if (selectedBar.get() === Bar.LEFT) {
            frameBox?.reorder_child_after(frame, verticalBox)
            verticalBox?.reorder_child_after(verticalBar, integratedMenu)
        } else if (selectedBar.get() === Bar.RIGHT) {
            frameBox?.reorder_child_after(verticalBox, frame)
            verticalBox?.reorder_child_after(integratedMenu, verticalBar)
        }
    })

    const frameVisible = createComputed([
        selectedBar.asAccessor(),
        variableConfig.verticalBar.enableFrame.asAccessor(),
        variableConfig.horizontalBar.enableFrame.asAccessor(),
    ], (bar, enabledVert, enabledHor) => {
        if (bar === Bar.LEFT || bar === Bar.RIGHT) {
            return enabledVert
        }
        return enabledHor
    })

    return <window
        name={frameWindowName}
        cssClasses={["transparentBackground"]}
        layer={Astal.Layer.BOTTOM}
        namespace={"okpanel-frame"}
        exclusivity={Astal.Exclusivity.IGNORE}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        visible={true}
        application={App}>
        <box
            orientation={Gtk.Orientation.HORIZONTAL}
            $={(self) => {
                frameBox = self

                // Add the children in the proper order based on the currently selected bar
                const f = <box
                    canTarget={false}
                    canFocus={false}
                    visible={frameVisible}
                    $={(self) => {
                        frame = self
                    }}>
                    <OutlineOverlay/>
                </box> as Gtk.Widget

                const vb = <VerticalBox/> as Gtk.Widget

                if (selectedBar.get() === Bar.RIGHT) {
                    self.append(f)
                    self.append(vb)
                } else {
                    self.append(vb)
                    self.append(f)
                }
            }}>
        </box>
    </window> as Astal.Window
}