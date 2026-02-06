import App from "ags/gtk4/app";
import {Astal, Gdk, Gtk} from "ags/gtk4";
import {timeout} from "ags/time";
import {Accessor, createState} from "ags";
import OkButton, {OkButtonSize} from "../common/OkButton";

export default function (
    entryBuffer: Gtk.EntryBuffer,
    infoText: Accessor<string>,
    errorText: Accessor<string>,
    message: string,
    onEnter: () => void,
    onCancel: () => void,
) {
    const [entryCharactersVisible, entryCharactersVisibleSetter] = createState(false)

    return <window
        namespace={"okpanel-polkit"}
        name={"polkitWindow"}
        application={App}
        layer={Astal.Layer.OVERLAY}
        keymode={Astal.Keymode.EXCLUSIVE}
        cssClasses={["transparentBackground"]}
        margin={5}
        visible={true}
        $={(self) => {
            let keyController = new Gtk.EventControllerKey()

            keyController.connect("key-pressed", (_, key) => {
                if (key === Gdk.KEY_Escape) {
                    onCancel()
                }
            })

            self.add_controller(keyController)
        }}>
        <box
            cssClasses={["window"]}>
            <box
                orientation={Gtk.Orientation.HORIZONTAL}
                marginStart={20}
                marginBottom={20}
                marginTop={20}
                marginEnd={20}>
                <label
                    marginEnd={30}
                    marginStart={10}
                    cssClasses={["polkitIcon"]}
                    label="󰯅"/>
                <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    <label
                        marginBottom={12}
                        cssClasses={["labelLargeBold"]}
                        label={message}/>
                    <label
                        visible={infoText.as((it) => it !== "")}
                        halign={Gtk.Align.START}
                        marginBottom={12}
                        cssClasses={["labelMedium"]}
                        label={infoText}/>
                    <label
                        visible={errorText.as((it) => it !== "")}
                        halign={Gtk.Align.START}
                        marginBottom={12}
                        cssClasses={["labelMediumWarning"]}
                        label={errorText}/>
                    <box
                        orientation={Gtk.Orientation.HORIZONTAL}>
                        <entry
                            cssClasses={["polkitEntry"]}
                            hexpand={true}
                            visibility={entryCharactersVisible}
                            buffer={entryBuffer}
                            onActivate={() => {
                                onEnter()
                            }}
                            $={(self) => {
                                timeout(200, () => {
                                    self.grab_focus()
                                })
                            }}/>
                        <OkButton
                            size={OkButtonSize.MEDIUM}
                            offset={2}
                            label={entryCharactersVisible.as((visible) => {
                                if (visible) {
                                    return ""
                                } else {
                                    return ""
                                }
                            })}
                            onClicked={() => {
                                entryCharactersVisibleSetter(!entryCharactersVisible.peek())
                            }}/>
                    </box>
                </box>
            </box>
        </box>
    </window>
}