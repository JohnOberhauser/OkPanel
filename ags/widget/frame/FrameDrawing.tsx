import {variableConfig} from "../../config/config";
import {Accessor, createComputed, createState, onCleanup} from "ags";
import {Astal, Gtk} from "ags/gtk4";
import {hexToRgba} from "../utils/strings";
import Cairo from 'gi://cairo';
import {isFraction} from "../utils/numbers";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import {topBarHeight} from "./bars/TopBar";
import {bottomBarHeight} from "./bars/BottomBar";

const hyprland = AstalHyprland.get_default()

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

export default function (
    {
        frameWindow,
        leftGroupWidth,
        rightGroupWidth,
    }: {
        frameWindow: Astal.Window,
        leftGroupWidth: Accessor<number>,
        rightGroupWidth: Accessor<number>,
    }
) {
    const redrawAccessor = createComputed([
        variableConfig.frame.drawFrame.asAccessor(),
        variableConfig.frame.borderRadius.asAccessor(),
        variableConfig.frame.backgroundColor.asAccessor(),
        variableConfig.frame.borderColor.asAccessor(),
        variableConfig.frame.borderWidth.asAccessor(),
        variableConfig.frame.bottomThickness.asAccessor(),
        variableConfig.frame.topThickness.asAccessor(),
        variableConfig.frame.leftThickness.asAccessor(),
        variableConfig.frame.rightThickness.asAccessor(),

        leftGroupWidth,
        variableConfig.leftBar.marginStart.asAccessor(),
        variableConfig.leftBar.marginEnd.asAccessor(),
        variableConfig.leftBar.borderWidth.asAccessor(),

        rightGroupWidth,
        variableConfig.rightBar.marginStart.asAccessor(),
        variableConfig.rightBar.marginEnd.asAccessor(),
        variableConfig.rightBar.borderWidth.asAccessor(),

        topBarHeight,
        variableConfig.topBar.marginTop.asAccessor(),
        variableConfig.topBar.marginBottom.asAccessor(),
        variableConfig.topBar.borderWidth.asAccessor(),

        bottomBarHeight,
        variableConfig.bottomBar.marginTop.asAccessor(),
        variableConfig.bottomBar.marginBottom.asAccessor(),
        variableConfig.bottomBar.borderWidth.asAccessor(),

    ])

    const [leftScalingFixVisible, leftScalingFixVisibleSetter] = createState(false)
    const [bottomScalingFixVisible, bottomScalingFixVisibleSetter] = createState(false)

    // The overlays are a hacky fix for a fractional scaling issue with either cairo or Gtk.DrawingArea.
    // A ~2px gap is left to the right and bottom of the Gtk.DrawingArea when using cairo to draw the frame.
    // The gap is not there when using CSS.  Using an overlay when we detect fractional scaling with Hyprland
    // to hide the gap.
    return <overlay
        $={(self) => {
            self.add_overlay(
                <box
                    vexpand
                    visible={leftScalingFixVisible}
                    cssClasses={["frameScalingFix"]}
                    hexpand={false}
                    widthRequest={2}
                    halign={Gtk.Align.END}
                /> as Gtk.Widget
            )
            self.add_overlay(
                <box
                    hexpand
                    visible={bottomScalingFixVisible}
                    cssClasses={["frameScalingFix"]}
                    vexpand={false}
                    heightRequest={2}
                    valign={Gtk.Align.END}
                /> as Gtk.Widget
            )
        }}
        canTarget={false}
        canFocus={false}
        sensitive={false}>
        <drawingarea
            hexpand
            vexpand
            canTarget={false}
            canFocus={false}
            sensitive={false}
            $={(da: Gtk.DrawingArea) => {
                da.set_draw_func((_area, ctx: any, w: number, h: number) => {
                    const innerRadius     = variableConfig.frame.borderRadius.peek();
                    const [fr, fg, fb, fa]    = hexToRgba(variableConfig.frame.backgroundColor.peek());
                    const [br, bg, bb, ba]  = hexToRgba(variableConfig.frame.borderColor.peek());
                    const innerBorderWidth  = variableConfig.frame.borderWidth.peek();

                    const leftThickness =
                        variableConfig.frame.leftThickness.peek() +
                        variableConfig.leftBar.marginStart.peek() +
                        variableConfig.leftBar.marginEnd.peek() +
                        variableConfig.leftBar.borderWidth.peek() * 2 +
                        leftGroupWidth.peek()
                    const rightThickness =
                        variableConfig.frame.rightThickness.peek() +
                        variableConfig.rightBar.marginStart.peek() +
                        variableConfig.rightBar.marginEnd.peek() +
                        variableConfig.rightBar.borderWidth.peek() * 2 +
                        rightGroupWidth.peek()
                    const topThickness =
                        variableConfig.frame.topThickness.peek() +
                        variableConfig.topBar.marginTop.peek() +
                        variableConfig.topBar.marginBottom.peek() +
                        variableConfig.topBar.borderWidth.peek() * 2 +
                        topBarHeight.peek()
                    const bottomThickness =
                        variableConfig.frame.bottomThickness.peek() +
                        variableConfig.bottomBar.marginTop.peek() +
                        variableConfig.bottomBar.marginBottom.peek() +
                        variableConfig.bottomBar.borderWidth.peek() * 2 +
                        bottomBarHeight.peek()

                    // Inner hole geometry
                    let x, y, iw, ih

                    x = leftThickness;
                    y = topThickness;
                    iw = Math.max(0, w - leftThickness - rightThickness);
                    ih = Math.max(0, h - topThickness - bottomThickness);

                    ctx.setAntialias(Cairo.Antialias.BEST);

                    if (variableConfig.frame.drawFrame.peek()) {
                        // Frame: square outer edges
                        ctx.setOperator(Cairo.Operator.OVER);
                        ctx.setSourceRGBA(fr, fg, fb, fa);
                        ctx.rectangle(0, 0, w, h);
                        ctx.fill();

                        const r = Math.max(0, Math.min(innerRadius, Math.min(iw, ih) / 2));

                        // Cutout (transparent center)
                        ctx.setOperator(Cairo.Operator.CLEAR);
                        roundedRect(ctx, x, y, iw, ih, r);
                        ctx.fill();

                        // Interior border: draw ONLY on the inside by clipping to the hole,
                        // then stroking the same path with 2x width (clip keeps inner half).
                        if (innerBorderWidth > 0 && ba > 0) {
                            ctx.setOperator(Cairo.Operator.OVER);
                            roundedRect(ctx, x, y, iw, ih, r);
                            ctx.clip();                          // limit to the transparent hole
                            roundedRect(ctx, x, y, iw, ih, r);   // the stroke path
                            ctx.setSourceRGBA(br, bg, bb, ba);
                            ctx.setLineWidth(innerBorderWidth * 2);
                            ctx.setLineJoin(Cairo.LineJoin.ROUND);
                            ctx.setLineCap(Cairo.LineCap.ROUND);
                            ctx.stroke();
                        }
                    }

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

                    // Enable or disable fractional scaling fix
                    const isFractionalScaling = isFraction(hyprland.monitors[0].scale)
                    leftScalingFixVisibleSetter(
                        isFractionalScaling
                        && !(rightThickness === 0 && innerBorderWidth === 0)
                        && variableConfig.frame.drawFrame.peek()
                    )
                    bottomScalingFixVisibleSetter(
                        isFractionalScaling
                        && !(bottomThickness === 0 && innerBorderWidth === 0)
                        && variableConfig.frame.drawFrame.peek()
                    )
                });

                const unsub = redrawAccessor.subscribe(() => {
                    da.queue_draw()
                })
                onCleanup(unsub)
            }}
        />
    </overlay>
}