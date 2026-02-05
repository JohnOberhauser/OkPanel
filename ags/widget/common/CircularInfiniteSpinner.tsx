import { Gtk } from "ags/gtk4";
import { Accessor } from "ags";
import { hexToRgba } from "../utils/strings";

type Props = {
    color: string;
    size?: number;                // px
    stroke?: number;              // px
    trackAlpha?: number;          // 0..1
    sweep?: number;               // 0..1 of a full circle (arc length)
    speed?: number;               // rotations per second
    cssClasses?: string[];
    visible?: boolean | Accessor<boolean>;
};

export default function CircularInfiniteSpinner({
                                    color,
                                    size = 24,
                                    stroke = 3,
                                    trackAlpha = 0.25,
                                    sweep = 0.28,
                                    speed = 1.2,
                                    cssClasses = [],
                                    visible = true,
                                }: Props) {
    return (
        <drawingarea
            visible={visible}
            cssClasses={cssClasses}
            widthRequest={size}
            heightRequest={size}
            $={(area: Gtk.DrawingArea) => {
                const fgColor = hexToRgba(color);

                // Monotonic start time for animation
                const startUs = Date.now() * 1000;

                const draw = (_: Gtk.DrawingArea, cr: any, w: number, h: number) => {
                    const cx = w / 2, cy = h / 2;
                    const r = Math.min(w, h) / 2 - stroke / 2;

                    cr.setLineWidth(stroke);
                    cr.setLineCap?.(1); // 1 = ROUND in cairo; safe if available

                    // Track ring
                    {
                        const [rC, gC, bC] = fgColor;
                        cr.setSourceRGBA(rC, gC, bC, trackAlpha);
                        cr.arc(cx, cy, r, 0, 2 * Math.PI);
                        cr.stroke();
                    }

                    // Spinner arc (rotating)
                    {
                        const nowUs = Date.now() * 1000;
                        const t = (nowUs - startUs) / 1_000_000; // seconds

                        const rotations = speed * t;
                        const start = -Math.PI / 2 + rotations * 2 * Math.PI;
                        const end = start + Math.max(0, Math.min(1, sweep)) * 2 * Math.PI;

                        const [rF, gF, bF, aF] = fgColor;
                        cr.setSourceRGBA(rF, gF, bF, aF);
                        cr.arc(cx, cy, r, start, end);
                        cr.stroke();
                    }
                };

                area.set_draw_func(draw);

                // Animate: redraw every frame while mapped (visible on screen)
                const tickId = area.add_tick_callback(() => {
                    area.queue_draw();
                    return true; // keep ticking
                });

                area.connect("destroy", () => {
                    if (tickId) area.remove_tick_callback(tickId);
                });
            }}
        />
    );
}