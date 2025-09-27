import {Gdk, Gtk} from "ags/gtk4";

type ScrollHandler = (info: {
    dx: number
    dy: number
    hovered: boolean
    shift: boolean
}) => void

export function attachHoverScroll(box: Gtk.Box, onScroll: ScrollHandler) {
    // Track hover state
    let hovered = false;
    const motion = new Gtk.EventControllerMotion();
    motion.connect('enter', () => hovered = true);
    motion.connect('leave', () => hovered = false);
    box.add_controller(motion);

    // Handle mouse wheel scrolling
    // DISCRETE gives +/-1 steps for wheel; add SMOOTH if you want touchpads too
    const scrollCtrl = new Gtk.EventControllerScroll({
        flags: Gtk.EventControllerScrollFlags.VERTICAL |
            Gtk.EventControllerScrollFlags.DISCRETE, // add SMOOTH if desired
    });

    scrollCtrl.connect('scroll', (_ctrl, dx, dy) => {
        if (!hovered) return Gdk.EVENT_PROPAGATE;

        // Optional: check modifiers (e.g., Shift to change behavior)
        const state = _ctrl.get_current_event_state?.() ?? 0;
        const shift = (state & Gdk.ModifierType.SHIFT_MASK) !== 0;

        // Your action: dy < 0 is scroll up, dy > 0 is scroll down
        onScroll({ dx, dy, hovered, shift });

        // Stop propagation so parent scrolled windows don't consume it
        return Gdk.EVENT_STOP;
    });

    // Bubble phase usually works best so children get first crack at events
    scrollCtrl.set_propagation_phase(Gtk.PropagationPhase.BUBBLE);
    box.add_controller(scrollCtrl);
}