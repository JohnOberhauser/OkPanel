import GLib from "gi://GLib";
import Gio from "gi://Gio";
import {config, selectedConfig} from "../../config/config";
import {execAsync} from "ags/process";
import {wallpaperPathStateSet} from "./Wallpaper";

export async function setWallpaper(path: string): Promise<void> {
    console.log("setting wallpaper")
    console.log(`wallpaper path: ${path}`)
    const script = config.wallpaper.wallpaperUpdateScript;

    // require an existing, executable script (match your bash guard)
    if (!script || !GLib.file_test(script, GLib.FileTest.EXISTS | GLib.FileTest.IS_EXECUTABLE)) {
        console.log("setWallpaper: wallpaperUpdateScript missing or not executable:", script);
    } else {
        await execAsync(`${GLib.shell_quote(script)} ${GLib.shell_quote(path)}`);
    }

    try {
        // cache the selected wallpaper path
        const themeName = selectedConfig.peek()?.fileName;
        if (!themeName) return; // nothing to cache against

        const cacheDirPath = `${GLib.get_home_dir()}/.cache/OkPanel/wallpaper`;
        const cacheFilePath = `${cacheDirPath}/${themeName}`;

        const cacheDir = Gio.File.new_for_path(cacheDirPath);
        try {
            cacheDir.make_directory_with_parents(null);
        } catch { /* already exists or cannot create; continue */ }

        const cacheFile = Gio.File.new_for_path(cacheFilePath);
        const data = new TextEncoder().encode(path + "\n");
        cacheFile.replace_contents(
            data,
            null,                           // etag
            false,                          // make_backup
            Gio.FileCreateFlags.REPLACE_DESTINATION,
            null
        );
        wallpaperPathStateSet(path)
    } catch (e) {
        console.error("setWallpaper failed:", e);
    }
}