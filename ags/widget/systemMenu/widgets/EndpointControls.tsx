import Wp from "gi://AstalWp"
import {Gtk} from "ags/gtk4"
import Pango from "gi://Pango?version=1.0";
import RevealerRow from "../../common/RevealerRow";
import {toggleMuteEndpoint} from "../../utils/audio";
import OkButton from "../../common/OkButton";
import {Accessor, createBinding, createComputed, For, onCleanup} from "ags";
import {integratedMenuRevealed} from "../IntegratedMenu";

/**
 * An Endpoint is either a speaker or microphone
 *
 * @param defaultEndpoint either [Wp.Audio.default_speaker] or [Wp.Audio.default_microphone]
 * @param getIcon function that takes an Endpoint and returns the proper string icon
 * @param endpointsBinding binding obtained via [bind(Wp.Audio, "speakers")] or [bind(Wp.Audio, "microphones"]
 */
export default function (
    {
        defaultEndpoint,
        getIcon,
        endpointsBinding
    }: {
        defaultEndpoint: Wp.Endpoint,
        getIcon: (endpoint: Wp.Endpoint) => string,
        endpointsBinding: Accessor<Wp.Endpoint[]>
    }
) {
    const endpointLabelVar = createComputed([
        createBinding(defaultEndpoint, "description"),
        createBinding(defaultEndpoint, "volume"),
        createBinding(defaultEndpoint, "mute")
    ])

    return <RevealerRow
        setup={(revealed) => {
            const unsub = integratedMenuRevealed.subscribe(() => {
                if (!integratedMenuRevealed.peek()) {
                    revealed[1](false)
                }
            })
            onCleanup(unsub)
        }}
        icon={endpointLabelVar(() => getIcon(defaultEndpoint))}
        iconOffset={endpointLabelVar(() => {
            const icon = getIcon(defaultEndpoint)
            if (icon === "") {
                return 7
            }
            return 0
        })}
        onClick={() => {
            toggleMuteEndpoint(defaultEndpoint)
        }}
        content={
            <slider
                canFocus={false}
                focusOnClick={false}
                cssClasses={["systemMenuVolumeProgress"]}
                hexpand={true}
                onChangeValue={({value}) => {
                    defaultEndpoint.volume = value
                }}
                value={createBinding(defaultEndpoint, "volume")}
            />
        }
        revealedContent={
            <box
                marginTop={10}
                orientation={Gtk.Orientation.VERTICAL}>
                <For each={endpointsBinding}>
                    {(endpoint) => {
                        return <OkButton
                            hexpand={true}
                            onClicked={() => {
                                endpoint.set_is_default(true)
                            }}
                            ellipsize={Pango.EllipsizeMode.END}
                            label={createBinding(endpoint, "isDefault").as((isDefault) => {
                                if (isDefault) {
                                    return `  ${endpoint.description}`
                                } else {
                                    return `   ${endpoint.description}`
                                }
                            })}
                            labelHalign={Gtk.Align.START}/>
                    }}
                </For>
            </box>
        }
    />
}