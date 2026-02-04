import {Gtk} from "ags/gtk4";
import OkButton, {OkButtonHorizontalPadding, OkButtonSize} from "./OkButton";
import {Accessor, createState, State} from "ags";

type Params = {
    marginTop?: number;
    marginBottom?: number;
    marginStart?: number;
    marginEnd?: number;
    visible?: boolean | Accessor<boolean>;
    icon: string | Accessor<string>;
    iconOffset: number | Accessor<number>;
    setup?: (revealed: State<boolean>) => void;
    onClick?: () => void;
    content?: JSX.Element;
    revealedContent?: JSX.Element;
}

export default function (
    {
        marginTop = 0,
        marginBottom = 0,
        marginStart = 0,
        marginEnd = 0,
        visible = true,
        icon,
        iconOffset,
        setup,
        onClick,
        content,
        revealedContent,
    }: Params
) {
    const [revealed, revealedSetter] = createState(false)

    if (setup) {
        setup([revealed, revealedSetter])
    }

    return <box
        visible={visible}
        marginTop={marginTop}
        marginBottom={marginBottom}
        marginEnd={marginEnd}
        marginStart={marginStart}
        orientation={Gtk.Orientation.VERTICAL}>
        <box
            orientation={Gtk.Orientation.HORIZONTAL}>
            <OkButton
                size={OkButtonSize.XL}
                offset={iconOffset}
                label={icon}
                onClicked={onClick}/>
            <box marginEnd={10}/>
            <box
                marginTop={4}>
                {content}
            </box>
            <OkButton
                size={OkButtonSize.SMALL}
                hpadding={OkButtonHorizontalPadding.THIN}
                label={revealed((revealed): string => {
                    if (revealed) {
                        return ""
                    } else {
                        return ""
                    }
                })}
                onClicked={() => {
                    revealedSetter(!revealed.peek())
                }}/>
        </box>
        <revealer
            marginStart={10}
            marginEnd={10}
            revealChild={revealed}
            transitionDuration={200}
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
            {revealedContent}
        </revealer>
    </box>
}