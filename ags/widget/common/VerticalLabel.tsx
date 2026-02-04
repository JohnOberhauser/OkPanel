import Cairo from "cairo";
import {Gtk} from "ags/gtk4";
import {variableConfig} from "../../config/config";
import {hexToRgba} from "../utils/strings";
import {isAccessor} from "../utils/bindings";
import {Accessor, createComputed, onCleanup, With} from "ags";

export default function (
    {
        text,
        fontSize,
        flipped,
        bold,
        alignment,
        minimumHeight = 0,
        foregroundColor = variableConfig.theme.colors.foreground.asAccessor(),
    }:
    {
        text: string | Accessor<string>,
        fontSize: number,
        flipped: boolean | Accessor<boolean>,
        bold: boolean,
        alignment: Accessor<Gtk.Align>,
        minimumHeight?: number,
        foregroundColor?: Accessor<string>
    }
) {
    const variableParams = createComputed([
        variableConfig.theme.font.asAccessor(),
        alignment
    ])
    return <box>
        <With value={variableParams}>
            {([font, align]) => {
                return <VerticalLabelInternal
                    text={text}
                    fontSize={fontSize}
                    flipped={flipped}
                    bold={bold}
                    alignment={align}
                    minimumHeight={minimumHeight}
                    font={font}
                    foregroundColor={foregroundColor}/>
            }}
        </With>
    </box>
}

function VerticalLabelInternal(
    {
        text,
        fontSize,
        flipped,
        bold,
        alignment = Gtk.Align.CENTER,
        minimumHeight = 0,
        font,
        foregroundColor,
    }:
    {
        text: string | Accessor<string>,
        fontSize: number,
        flipped: boolean | Accessor<boolean>,
        bold: boolean,
        alignment?: Gtk.Align,
        minimumHeight?: number,
        font: string,
        foregroundColor: Accessor<string>
    }
) {
    const area = new Gtk.DrawingArea()
    area.set_content_width(fontSize)

    let realText = ""
    if (isAccessor(text)) {
        const unsub = text.subscribe(() => {
            realText = text.peek()
            area.queue_draw()
        })
        onCleanup(unsub)
        realText = text.peek()
    } else {
        realText = text
    }

    let realFlipped = false
    if (isAccessor(flipped)) {
        const unsub = flipped.subscribe(() => {
            realFlipped = flipped.peek()
            area.queue_draw()
        })
        onCleanup(unsub)
        realFlipped = flipped.peek()
    } else {
        realFlipped = flipped
    }

    let [r, g, b, a] = hexToRgba(foregroundColor.peek())

    const unsub = foregroundColor.subscribe(() => {
        [r, g, b, a] = hexToRgba(foregroundColor.peek())
        area.queue_draw()
    })
    onCleanup(unsub)

    area.set_draw_func((widget, cr, width, height) => {
        cr.save()
        cr.translate(realFlipped ? width / 4 : width * 3/4, (height / 2) - 8)
        cr.rotate(realFlipped ? Math.PI / 2 : -Math.PI / 2) // 90 degrees counterclockwise
        cr.setSourceRGBA(r, g, b, a)
        cr.selectFontFace(font, Cairo.FontSlant.NORMAL, bold ? Cairo.FontWeight.BOLD : Cairo.FontWeight.NORMAL)
        cr.setFontSize(fontSize)

        const extents = cr.textExtents(realText)
        const textWidth = extents.width
        const textHeight = extents.height

        // align the text
        let y
        if (alignment === Gtk.Align.CENTER) {
            y = -textWidth / 2
        } else if ((alignment === Gtk.Align.START && flipped) || (alignment === Gtk.Align.END && !flipped)) {
            y = -height / 2
        } else {
            y = (height / 2) - textWidth
        }

        const x = (width - textHeight) / 2
        cr.moveTo(y, x)
        cr.showText(realText)
        cr.restore()

        // textWidth is height when rotated
        area.set_content_height(textWidth)
    })

    return <box
        heightRequest={minimumHeight}>
        {area}
    </box>
}