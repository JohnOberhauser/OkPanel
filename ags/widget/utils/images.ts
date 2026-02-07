import GdkPixbuf from "gi://GdkPixbuf?version=2.0";
import {Gdk} from "ags/gtk4";
import Gio from "gi://Gio?version=2.0";

/**
 * Creates a scaled texture at the desired width and height, cropping out extra content if the aspect
 * ratio of the image is different from the aspect ratio of the desired width/height
 * @param width desired width
 * @param height desired height
 * @param path full path to the file
 */
export async function createScaledTexture(width: number, height: number, path: string) {
    if (width === 0 || height === 0) return null
    const file = Gio.File.new_for_path(path);

    let pixbuf: GdkPixbuf.Pixbuf;
    try {
        const stream = file.read(null);
        pixbuf = await new Promise((resolve, reject) => {
            GdkPixbuf.Pixbuf.new_from_stream_async(stream, null, (obj, res) => {
                try {
                    resolve(GdkPixbuf.Pixbuf.new_from_stream_finish(res));
                } catch (e) {
                    reject(e);
                }
            });
        });
    } catch (e) {
        logError(e);
        return null;
    }

    const originalWidth = pixbuf.get_width();
    const originalHeight = pixbuf.get_height();

    const srcAspect = originalWidth / originalHeight;
    const dstAspect = width / height;

    let cropX = 0;
    let cropY = 0;
    let cropW = originalWidth;
    let cropH = originalHeight;

    if (srcAspect > dstAspect) {
        // wider than target → crop left/right
        cropW = Math.floor(originalHeight * dstAspect);
        cropX = Math.floor((originalWidth - cropW) / 2);
    } else if (srcAspect < dstAspect) {
        // taller than target → crop top/bottom
        cropH = Math.floor(originalWidth / dstAspect);
        cropY = Math.floor((originalHeight - cropH) / 2);
    }

    const cropped = pixbuf.new_subpixbuf(cropX, cropY, cropW, cropH);

    // ---- THEN scale exactly to target size ----

    const scaled = cropped.scale_simple(
        width,
        height,
        GdkPixbuf.InterpType.BILINEAR,
    )!;

    return Gdk.Texture.new_for_pixbuf(scaled);
}