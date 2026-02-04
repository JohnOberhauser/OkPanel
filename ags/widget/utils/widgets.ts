import {Gtk} from "ags/gtk4";
import GLib from "gi://GLib?version=2.0";
import {Accessor} from "ags";

export function orderChildrenLTR(box: Gtk.Box, order: Array<Gtk.Widget>) {
    const widgets = order.filter(Boolean) as Gtk.Widget[];
    if (!widgets.length) return;

    // Put the first at the very start
    box.reorder_child_after(widgets[0], null);

    // Chain each next widget after the previous one
    for (let i = 1; i < widgets.length; i++) {
        box.reorder_child_after(widgets[i], widgets[i - 1]);
    }
}

export function appendChildren(box: Gtk.Box, order: Array<Gtk.Widget>) {
    order.forEach((widget) => {
        box.append(widget)
    })
}

export function removeAllChildren(box: Gtk.Box) {
    let child = box.get_first_child();
    while (child) {
        const next = child.get_next_sibling();
        box.remove(child);
        child = next;
    }
}

export function ghostWhenTooNarrow(
    widget: Gtk.Widget,
    accessorThresholdBonus: Accessor<number>[] = [],
    baseThreshold: number = 10,
) {
    let tickId = 0
    let isGhost = false

    const applyGhost = (ghost: boolean) => {
        if (ghost === isGhost) return
        isGhost = ghost

        // fade out / in (no reflow)
        widget.set_opacity(ghost ? 0 : 1)

        // ignore input while hidden
        widget.set_can_target(!ghost)
    }

    const update = () => {
        const w = widget.get_width()
        const h = widget.get_height()
        if (w > 0 || h > 0) {
            const bonusThreshold = accessorThresholdBonus
                .map((it) => it.peek())
                .reduce((acc, val) => {
                    return acc + val
                }, 0)

            const threshold = baseThreshold + bonusThreshold

            applyGhost(w < threshold || h < threshold)
        }

        return GLib.SOURCE_CONTINUE
    }

    widget.connect("map", () => {
        if (tickId) return
        update()
        tickId = widget.add_tick_callback(() => update())
    })

    widget.connect("unmap", () => {
        if (!tickId) return
        widget.remove_tick_callback(tickId)
        tickId = 0
    })
}