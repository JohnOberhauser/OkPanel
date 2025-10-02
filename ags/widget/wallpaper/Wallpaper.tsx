import App from "ags/gtk4/app";
import {Astal, Gtk} from "ags/gtk4";
import {createScaledTexture} from "../utils/images";
import {resolveWallpaper} from "./getWallpaper";
import GLib from "gi://GLib?version=2.0";
import {createState, onCleanup} from "ags";
import {variableConfig} from "../../config/config";
import {toGtkTransition} from "./transitions";

export const [wallpaperPathState, wallpaperPathStateSet] = createState("")

function applyWallpaper(
    path: string,
    wallpaperStack: Gtk.Stack
) {
    if (!wallpaperStack) return;

    // use current allocated size; if 0 (early), fall back to the window size guess
    const w = Math.max(1, wallpaperStack.get_allocated_width());
    const h = Math.max(1, wallpaperStack.get_allocated_height());

    createScaledTexture(w, h, path).then((texture) => {
        const pic = Gtk.Picture.new_for_paintable(texture);
        pic.contentFit = Gtk.ContentFit.COVER;
        pic.hexpand = true;
        pic.vexpand = true;

        const name = `wp-${Date.now()}`;
        // add as a named child so Stack can animate between pages
        wallpaperStack.add_named(pic, name);

        const duration = variableConfig.wallpaper.transitionDuration.get()

        // configure crossfade and flip
        wallpaperStack.transition_type = toGtkTransition(variableConfig.wallpaper.transitionType.get())
        wallpaperStack.transition_duration = duration;
        wallpaperStack.set_visible_child_name(name);

        // cleanup: after the fade, remove any non-visible children (pause videos if you add support)
        GLib.timeout_add(GLib.PRIORITY_DEFAULT, duration + 40, () => {
            const keep = wallpaperStack.get_visible_child();
            let child = wallpaperStack.get_first_child();
            while (child) {
                const next = child.get_next_sibling();
                if (child !== keep) {
                    wallpaperStack.remove(child);
                }
                child = next;
            }
            return GLib.SOURCE_REMOVE;
        });
    }).catch((e) => {
        console.error("applyWallpaper failed:", e);
    });
}

export default function (
    monitorId: number,
    monitorWidth: number,
    monitorHeight: number,
): Astal.Window {
    return <window
        name={"wallpaper"}
        monitor={monitorId}
        cssClasses={["windowBackground"]}
        layer={Astal.Layer.BACKGROUND}
        namespace={"okpanel-wallpaper"}
        exclusivity={Astal.Exclusivity.IGNORE}
        anchor={Astal.WindowAnchor.RIGHT | Astal.WindowAnchor.TOP | Astal.WindowAnchor.BOTTOM | Astal.WindowAnchor.LEFT}
        visible={variableConfig.wallpaper.showWallpaper.asAccessor()}
        application={App}>
        <stack
            $={(self) => {
                const wallpaperPath = resolveWallpaper()

                if (wallpaperPath !== null) {
                    createScaledTexture(monitorWidth, monitorHeight, wallpaperPath).then((texture) => {
                        const picture = Gtk.Picture.new_for_paintable(texture)
                        picture.contentFit = Gtk.ContentFit.COVER

                        self.add_named(picture, "initial");
                        self.set_visible_child_name("initial");
                    })
                }

                const unsub = wallpaperPathState.subscribe(() => {
                    applyWallpaper(wallpaperPathState.get(), self)
                })
                onCleanup(unsub)
            }}
            hexpand
            vexpand>

        </stack>
    </window> as Astal.Window
}