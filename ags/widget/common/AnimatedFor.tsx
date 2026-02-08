import Gtk from "gi://Gtk?version=4.0"
import {Accessor, createComputed, createState, For, onCleanup, With} from "ags";
import {timeout} from "ags/time";

function mapToSortedEntries<K, V>(
    m: Map<K, V>,
    cmp?: (a: K, b: K) => number
): [K, V][] {
    const entries = Array.from(m.entries())

    const defaultCmp = (a: K, b: K) => {
        if (typeof a === "number" && typeof b === "number") return a - b
        // fallback: compare as strings, numeric-aware
        return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: "base" })
    }

    entries.sort(([ka], [kb]) => (cmp ?? defaultCmp)(ka, kb))
    return entries
}

type AnimatedForProps<Item, El extends JSX.Element, Key> = {
    each: Accessor<Iterable<Item>>
    children: (item: Item, index: Accessor<number>) => El
    emptyState?: El,
    reverse?: boolean,
    id?: (item: Item) => Key
    /** Revealer transition type (default: CROSSFADE) */
    transitionType?: Gtk.RevealerTransitionType
    /** Revealer transition duration in ms (default: 220) */
    transitionDuration?: number
    orientation?: Gtk.Orientation
    spacing?: number
}

/**
 * A wrapper around <For> that animates item removal/exit with Gtk.Revealer.
 * It delays unmounting until the hide animation finishes.
 */
export function AnimatedFor<Item, El extends JSX.Element, Key>({
    each,
    children,
    emptyState,
    reverse = false,
    id = (item: any) => item as any as Key,
    transitionType = Gtk.RevealerTransitionType.CROSSFADE,
    transitionDuration = 220,
    orientation = Gtk.Orientation.VERTICAL,
    spacing = 0,
}: AnimatedForProps<Item, El, Key>) {
    const [rendered, renderedSet] = createState<Map<Key, Item>>(new Map())
    const [exiting, exitingSet] = createState<Map<Key, Item>>(new Map())

    function update() {
        const eachMap = new Map<Key, Item>()
        const newRendered = new Map<Key, Item>(rendered.peek())
        const newExiting = new Map<Key, Item>(exiting.peek())

        for (const item of each.peek()) {
            const k = id(item)
            eachMap.set(k, item)
            newRendered.set(k, item)
        }

        for (const [k, item] of newRendered) {
            if (!eachMap.has(k)) {
                newExiting.set(k, item)
            }
        }

        renderedSet(newRendered)
        exitingSet(newExiting)
    }

    // Reconcile on each() changes
    const unsub = each.subscribe(() => {
        update()
    })
    update()

    onCleanup(unsub)

    function removeItem(key: Key) {
        const cur = new Map(rendered.peek())
        const exit = new Map(exiting.peek())

        exit.delete(key)
        cur.delete(key)

        exitingSet(exit)
        renderedSet(cur)
    }

    const innerList = createComputed([
        rendered,
    ], (map) => {
        const entries = mapToSortedEntries(map)
        if (reverse) {
            return entries.reverse()
        }
        return entries
    })

    // Render via your existing <For>, keyed by .key
    return <box
        spacing={spacing}
        orientation={orientation}>
        <For
            each={innerList}
            id={(pair) => pair[0]}>
            {(pair, idx) => {
                const [key, item] = pair
                const [revealed, revealedSet] = createState(false)

                return <revealer
                    $={(self) => {
                        timeout(200, () => {
                            revealedSet(true)
                        })

                        const isClosing = createComputed([
                            exiting
                        ], (ex) => {
                            return ex.has(key)
                        })

                        isClosing.subscribe(() => {
                            if (isClosing.peek()) {
                                revealedSet(false)
                                timeout(300, () => {
                                    removeItem(key)
                                })
                            }
                        })
                    }}
                    revealChild={revealed}>
                    {children(item, idx)}
                </revealer>
            }}
        </For>
        <With value={rendered}>
            {(rendered) => {
                if (rendered.size === 0) {
                    return emptyState
                }
                return <box/>
            }}
        </With>
    </box>
}