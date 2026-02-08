import GLib from "gi://GLib";
import Gio from "gi://Gio";
import {config, selectedConfig} from "../../config/config";

export function resolveWallpaper(): string | null {
    const cacheFilePath = `${GLib.get_home_dir()}/.cache/OkPanel/wallpaper/${selectedConfig.peek()?.fileName ?? ""}`;
    const cacheFile = Gio.File.new_for_path(cacheFilePath);

    let wallpaper: string | null = null;

    // try cache file first
    try {
        const info = cacheFile.query_info("standard::size", Gio.FileQueryInfoFlags.NONE, null);
        if (info.get_size() > 0) {
            const [ok, contents] = cacheFile.load_contents(null);
            if (ok) {
                const potentialPath = new TextDecoder("utf-8").decode(contents).trim();
                const potentialFile = Gio.File.new_for_path(potentialPath);
                if (potentialFile.query_exists(null)) {
                    wallpaper = potentialPath;
                }
            }
        }
    } catch {
        // ignore, fallback below
    }

    // fallback: first jpg/png in wallpaperDir
    if (!wallpaper) {
        try {
            const dirPath = config.wallpaper.wallpaperDir;

            if (dirPath && dirPath.length > 0) {
                const dirFile = Gio.File.new_for_path(dirPath);

                if (dirFile.query_file_type(Gio.FileQueryInfoFlags.NONE, null) === Gio.FileType.DIRECTORY) {
                    const enumerator = dirFile.enumerate_children(
                        "standard::name,standard::type",
                        Gio.FileQueryInfoFlags.NONE,
                        null
                    );

                    let info: Gio.FileInfo | null;
                    while ((info = enumerator.next_file(null))) {
                        if (info.get_file_type() === Gio.FileType.REGULAR) {
                            const name = info.get_name().toLowerCase();
                            if (name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png") || name.endsWith(".mp4")) {
                                wallpaper = `${dirPath}/${info.get_name()}`;
                                break;
                            }
                        }
                    }
                    enumerator.close(null);
                }
            }
        } catch (e) {
            console.error("failed to enumerate wallpaper directory", e);
        }
    }

    return wallpaper;
}