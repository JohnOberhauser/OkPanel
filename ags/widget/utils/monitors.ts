import {execAsync} from "ags/process";

type HyprMonitorRaw = {
    id: number | string;
    name?: string;
    width?: number;
    height?: number;
    // ...other fields ignored
};

export type HyprMonitorInfo = {
    id: number;
    name: string;
    width: number;   // device pixels from hyprctl
    height: number;  // device pixels from hyprctl
};

/**
 * Get Hyprland monitor info by numeric ID.
 * Returns { id, name, width, height } or null if not found/invalid.
 */
export async function getHyprMonitorInfoById(id: number | string): Promise<HyprMonitorInfo | null> {
    try {
        const out = await execAsync("hyprctl monitors -j");
        const data = JSON.parse(out) as unknown;

        if (!Array.isArray(data)) return null;

        const targetId = Number(id);
        const m = (data as HyprMonitorRaw[]).find(mon => Number(mon.id) === targetId);
        if (!m || typeof m.name !== "string") return null;

        // Guard DPMS/transient 0×0 reports; clamp to at least 1
        const w = Math.max(1, Number(m.width ?? 0));
        const h = Math.max(1, Number(m.height ?? 0));

        return { id: targetId, name: m.name, width: w, height: h };
    } catch (e) {
        console.error("getHyprMonitorInfoById error:", e);
        return null;
    }
}

export async function getHyprMonitorsInfo(): Promise<HyprMonitorInfo[] | null> {
    try {
        const out = await execAsync("hyprctl monitors -j");
        const data = JSON.parse(out) as unknown;

        if (!Array.isArray(data)) return null;

        return data as HyprMonitorInfo[]
    } catch (e) {
        console.error("getHyprMonitorInfoById error:", e);
        return null;
    }
}