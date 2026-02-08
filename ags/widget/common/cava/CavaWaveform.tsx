import {Gtk} from "ags/gtk4";
import Cairo from 'gi://cairo';
import AstalCava from "gi://AstalCava"
import {variableConfig} from "../../../config/config";
import {isAccessor} from "../../utils/bindings";
import { timeout } from "ags/time"
import {hexToRgba} from "../../utils/strings";
import {Accessor, createBinding, createComputed, createState, onCleanup, With} from "ags";

function getCoordinate(
    value: number,
    size: number,
    flipStart: boolean,
    intensity: number,
) {
    const magicSize = size * intensity
    if (flipStart) {
        // subtract 1 to make it align with the bar if the line should be flat
        return Math.min(size, (value * magicSize) - 1)
    }
    // add 1 to make it align with the bar if the line should be flat
    return Math.max(0, size - (value * magicSize) + 1)
}

function moveTo(
    cr: Cairo.Context,
    vertical: boolean,
    length: number,
    size: number,
) {
    if (vertical) {
        // @ts-ignore
        cr.moveTo(size, length)
    } else {
        // @ts-ignore
        cr.moveTo(length, size)
    }
}

function lineTo(
    cr: Cairo.Context,
    vertical: boolean,
    length: number,
    size: number,
) {
    if (vertical) {
        // @ts-ignore
        cr.lineTo(size, length)
    } else {
        // @ts-ignore
        cr.lineTo(length, size)
    }
}

// Weird things happen if there are over 200 bars
function setBars(cava: AstalCava.Cava, length: number) {
    cava.bars = Math.min(200, length / 10)
}

type Params = {
    vertical?: boolean,
    flipStart: Accessor<boolean>,
    length?: number | Accessor<number>,
    size?: number,
    expand?: boolean | Accessor<boolean>,
    intensity?: number | Accessor<number>,
    marginTop?: number,
    marginBottom?: number,
    marginStart?: number,
    marginEnd?: number,
    color?: Accessor<string>,
}

/**
 *
 * @param vertical if the waveform is vertical
 * @param flipStart if the waveform's 0 line is flipped.  For a horizontal waveform, if this is true, the base will
 * be at the top instead of the bottom of the drawable area
 * @param length the length of the waveform
 * @param size the size of the waveform.  If vertical, then size is width.  If horizontal, then size is height
 * @param expand expand the waveform to fill available space.
 * @param intensity makes the waves bigger or smaller
 * @param marginTop
 * @param marginBottom
 * @param marginStart
 * @param marginEnd
 * @param color
 */
export default function(
    {
        vertical = false,
        flipStart,
        length = 0,
        size = 0,
        expand = false,
        intensity = 1,
        marginTop,
        marginBottom,
        marginStart,
        marginEnd,
        color = variableConfig.theme.colors.primary.asAccessor(),
    }: Params
) {
    const parameters = createComputed([
        typeof length === 'number' ? createState(length)[0] : length,
        typeof expand === 'boolean' ? createState(expand)[0] : expand,
        typeof intensity === 'number' ? createState(intensity)[0] : intensity,
    ])
    return <box
        vexpand={!vertical}
        hexpand={vertical}>
        <With value={flipStart}>
            {(flip) => {
                if (vertical && !flip) {
                    return <box hexpand={true}/>
                } else {
                    return <box/>
                }
            }}
        </With>
        <With value={parameters}>
            {([length, expand, intensity]) => {
                return <CavaWaveformInternal
                    vertical={vertical}
                    flipStart={flipStart}
                    length={length}
                    size={size}
                    expand={expand}
                    intensity={intensity}
                    marginTop={marginTop}
                    marginBottom={marginBottom}
                    marginStart={marginStart}
                    marginEnd={marginEnd}
                    color={color}/>
            }}
        </With>
    </box>
}

type InternalParams = {
    vertical?: boolean,
    flipStart: Accessor<boolean>,
    length?: number,
    size?: number,
    expand?: boolean,
    intensity?: number,
    marginTop?: number,
    marginBottom?: number,
    marginStart?: number,
    marginEnd?: number,
    color: Accessor<string>
}

function CavaWaveformInternal(
    {
        vertical = false,
        flipStart,
        length = 0,
        size = 0,
        expand = false,
        intensity = 1,
        marginTop,
        marginBottom,
        marginStart,
        marginEnd,
        color,
    }: InternalParams
) {
    const cava = new AstalCava.Cava()
    cava.input = AstalCava.Input.PIPEWIRE

    setBars(cava, length)

    onCleanup(() => {
        cava.set_active(false)
    })

    let [r, g, b, a] = hexToRgba(color.peek())

    const unsub = color.subscribe(() => {
        [r, g, b, a] = hexToRgba(color.peek())
    })
    onCleanup(unsub)

    const drawing = new Gtk.DrawingArea({
        hexpand: vertical ? false : expand,
        vexpand: vertical ? expand : false,
        height_request: vertical ? length : size,
        width_request: vertical ? size : length,
    })

    drawing.set_draw_func((
        area: Gtk.DrawingArea,
        cr: Cairo.Context,
        drawWidth: number,
        drawHeight: number
    ) => {
        const drawLength = vertical ? drawHeight : drawWidth
        const drawSize = vertical ? drawWidth : drawHeight
        let flip: boolean
        if (isAccessor(flipStart)) {
            flip = flipStart.peek()
        } else {
            flip = flipStart
        }

        // @ts-ignore
        cr.setSourceRGBA(r, g, b, a)

        // @ts-ignore
        cr.setLineWidth(2)

        let x = 0
        const values = cava.values
        // add one to even the ends out
        const spacing = drawLength / (values.length * 2 + 1)

        values.reverse()

        // add or subtract 1 to make it align with the bar if the line should be flat
        moveTo(cr, vertical, x, flip ? -1 : drawSize + 1)

        values.forEach((value) => {
            x = x + spacing
            lineTo(cr, vertical, x, getCoordinate(value, drawSize, flip, intensity))
        })

        values.reverse()

        values.forEach((value) => {
            x = x + spacing
            lineTo(cr, vertical, x, getCoordinate(value, drawSize, flip, intensity))
        })

        // add or subtract 1 to make it align with the bar if the line should be flat
        lineTo(cr, vertical, drawLength, flip ? -1 : drawSize + 1)

        // @ts-ignore
        cr.stroke()
    })

    // Unsubscribe when the waveform isn't visible
    let unsubscribe: (() => void) | null = null

    drawing.connect("map", () => {
        // set the number of bars after 2 seconds so that size has been allocated.  Not sure how to detect allocation,
        // so just using a timer
        timeout(2000, () => {
            const drawLength = vertical
                ? drawing.get_height()
                : drawing.get_width()
            if (drawLength > 0) {
                setBars(cava, drawLength)
            }
        })

        unsubscribe = createBinding(cava, "values").subscribe(() => {
            drawing.queue_draw()
        })
    })

    drawing.connect("unmap", () => {
        if (unsubscribe) {
            unsubscribe()
            unsubscribe = null
        }
    })

    return <box
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginStart={marginStart}
        marginEnd={marginEnd}
        vexpand={vertical ? expand : false}
        hexpand={vertical ? false : expand}
        widthRequest={vertical ? size : length}
        heightRequest={vertical ? length : size}>
        {drawing}
    </box>
}