import {Astal, Gtk} from "ags/gtk4";
import App from "ags/gtk4/app";
import Cairo from 'gi://cairo';
import {hexToRgba} from "../../utils/strings";
import {variableConfig} from "../../../config/config";
import {createComputed} from "ags";
import {Bar, selectedBar} from "../../../config/bar";
import VerticalBar from "../VerticalBar";
import IntegratedMenu from "../IntegratedMenu";
import HorizontalBar from "../HorizontalBar";

export const frameWindowName = "frame"

let frameBox: Gtk.Box
let verticalBox: Gtk.Box
let horizontalBox: Gtk.Box
let integratedMenu: Gtk.Widget
let verticalBar: Gtk.Widget
let horizontalBar: Gtk.Widget
let frame: Gtk.Widget
let frameWindow: Gtk.Window

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
        selectedBar.asAccessor(),
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

                // Inner hole geometry
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

                // After we draw the cutout, we change the input region of the frame window to include
                // everything except the cutout region
                
                // ——— Build input region in *window* coordinates ———
                const surf = frameWindow.get_native()?.get_surface();
                if (!surf) return;

                // Window size (not the drawing area)
                const winW = frameWindow.get_allocated_width();
                const winH = frameWindow.get_allocated_height();

                // Offset of the drawing area inside the window
                // (TS defs are thin; cast to any for GI boxed types)
                const bounds = da.compute_bounds(frameWindow)[1];
                const daOffX = bounds ? bounds.get_x() : 0;
                const daOffY = bounds ? bounds.get_y() : 0;

                // Hole rect in *window* coords
                const holeL = Math.max(0, Math.floor(daOffX + x));
                const holeT = Math.max(0, Math.floor(daOffY + y));
                const holeR = Math.min(winW, Math.ceil(daOffX + x + iw));
                const holeB = Math.min(winH, Math.ceil(daOffY + y + ih));

                const Region = (Cairo as any).Region;
                const RectangleInt = (Cairo as any).RectangleInt;
                const region = new Region();

                const addRect = (X: number, Y: number, W: number, H: number) => {
                    if (W <= 0 || H <= 0) return;
                    region.unionRectangle(new RectangleInt({ x: X, y: Y, width: W, height: H }));
                };

                // Four bands around the hole (all in window coords)
                // Top
                addRect(0, 0, winW, holeT);
                // Left
                addRect(0, holeT, holeL, Math.max(0, holeB - holeT));
                // Right
                addRect(holeR, holeT, Math.max(0, winW - holeR), Math.max(0, holeB - holeT));
                // Bottom
                addRect(0, holeB, winW, Math.max(0, winH - holeB));

                surf.set_input_region(region);
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
            return ["frameWindow"]
        }
        if (split) {
            return []
        }
        return ["barWindow"]
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
        const bar = selectedBar.get()
        switch (bar) {
            case Bar.LEFT:
                frameBox?.reorder_child_after(frame, verticalBox)
                verticalBox?.reorder_child_after(verticalBar, integratedMenu)
                break
            case Bar.RIGHT:
                frameBox?.reorder_child_after(verticalBox, frame)
                verticalBox?.reorder_child_after(integratedMenu, verticalBar)
                break
            case Bar.TOP:
                horizontalBox.reorder_child_after(frameBox, horizontalBar)
                break
            case Bar.BOTTOM:
                horizontalBox.reorder_child_after(horizontalBar, frameBox)
                break
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
        $={(self) => {
            frameWindow = self
        }}
        name={frameWindowName}
        cssClasses={["transparentBackground"]}
        layer={Astal.Layer.TOP}
        namespace={"okpanel-frame"}
        exclusivity={Astal.Exclusivity.IGNORE}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        visible={true}
        application={App}>
        <box
            $={(self) => {
                horizontalBox = self

                const hb = <HorizontalBar
                    setup={(self) => {
                        horizontalBar = self
                    }}/> as Gtk.Widget

                const fb = <box
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
                </box> as Gtk.Widget

                if (selectedBar.get() === Bar.BOTTOM) {
                    self.append(fb)
                    self.append(hb)
                } else {
                    self.append(hb)
                    self.append(fb)
                }
            }}
            orientation={Gtk.Orientation.VERTICAL}/>
    </window> as Astal.Window
}