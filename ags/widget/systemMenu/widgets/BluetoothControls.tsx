import {Gtk} from "ags/gtk4"
import {getBluetoothIcon, getBluetoothName} from "../../utils/bluetooth";
import Bluetooth from "gi://AstalBluetooth";
import RevealerRow from "../../common/RevealerRow";
import OkButton from "../../common/OkButton";
import {createBinding, createComputed, createState, For, onCleanup, With} from "ags";
import {integratedMenuRevealed} from "../IntegratedMenu";

function BluetoothDevices() {
    const bluetooth = Bluetooth.get_default()

    const devicesBinding = createComputed([
        createBinding(bluetooth, "devices")
    ], (devices) => {
        return devices.filter((device) => {
            return device.name != null
        })
    })

    return <box
        orientation={Gtk.Orientation.VERTICAL}>
        <With value={devicesBinding}>
            {(devices: Bluetooth.Device[]) => {
                if (devices.length === 0) {
                    return <label
                        cssClasses={["labelMedium"]}
                        label="No devices"/>
                } else {
                    return <box/>
                }
            }}
        </With>
        <For each={devicesBinding}>
            {(device) => {
                const [buttonsRevealed, buttonsRevealedSetter] = createState(false)
                const connectionState = createComputed([
                    createBinding(device, "connected"),
                    createBinding(device, "connecting")
                ])

                return <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    <OkButton
                        hexpand={true}
                        label={`  ${device.name}`}
                        labelHalign={Gtk.Align.START}
                        onClicked={() => {
                            buttonsRevealedSetter(!buttonsRevealed.peek())
                        }}/>
                    <revealer
                        revealChild={buttonsRevealed}
                        transitionDuration={200}
                        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                        <box
                            cssClasses={["systemMenuInnerRevealedContent"]}
                            orientation={Gtk.Orientation.VERTICAL}
                            spacing={10}>
                            <OkButton
                                primary={true}
                                hexpand={true}
                                visible={createBinding(device, "paired")}
                                label={connectionState((value) => {
                                    const connected = value[0]
                                    const connecting = value[1]
                                    if (connecting) {
                                        return "Connecting"
                                    } else if (connected) {
                                        return "Disconnect"
                                    } else {
                                        return "Connect"
                                    }
                                })}
                                onClicked={() => {
                                    if (device.connecting) {
                                        // do nothing
                                    } else if (device.connected) {
                                        device.disconnect_device((device, result, data) => {
                                            console.log("device disconnected")
                                        })
                                    } else {
                                        device.connect_device((device, result, data) => {
                                            console.log("device connected")
                                        })
                                    }
                                }}/>
                            <OkButton
                                primary={true}
                                hexpand={true}
                                visible={createBinding(device, "paired")}
                                label={createBinding(device, "trusted").as((trusted) => {
                                    if (trusted) {
                                        return "Untrust"
                                    } else {
                                        return "Trust"
                                    }
                                })}
                                onClicked={() => {
                                    device.set_trusted(!device.trusted)
                                }}/>
                            <OkButton
                                primary={true}
                                hexpand={true}
                                label={createBinding(device, "paired").as((paired) => {
                                    return paired ? "Unpair" : "Pair"
                                })}
                                onClicked={() => {
                                    if (device.paired) {
                                        bluetooth.adapter.remove_device(device)
                                    } else {
                                        device.pair()
                                    }
                                }}/>
                        </box>
                    </revealer>
                </box>
            }}
        </For>
    </box>
}

export default function () {
    const bluetooth = Bluetooth.get_default()

    return <RevealerRow
        setup={(revealed) => {
            const unsub = integratedMenuRevealed.subscribe(() => {
                if (!integratedMenuRevealed.peek()) {
                    revealed[1](false)
                }
            })
            onCleanup(unsub)
        }}
        visible={createBinding(bluetooth, "isPowered")}
        icon={getBluetoothIcon()}
        iconOffset={0}
        content={
            <label
                cssClasses={["labelMediumBold"]}
                halign={Gtk.Align.START}
                hexpand={true}
                label={getBluetoothName()}/>
        }
        revealedContent={
            <box
                orientation={Gtk.Orientation.VERTICAL}>
                <box
                    orientation={Gtk.Orientation.HORIZONTAL}>
                    <label
                        marginStart={20}
                        halign={Gtk.Align.START}
                        hexpand={true}
                        label="Devices"
                        cssClasses={["labelLargeBold", "colorPrimary"]}/>
                    <OkButton
                        label={createBinding(bluetooth.adapter, "discovering").as((discovering) => {
                            return discovering ? "Stop scanning" : "Scan"
                        })}
                        onClicked={() => {
                            if (bluetooth.adapter.discovering) {
                                bluetooth.adapter.stop_discovery()
                            } else {
                                bluetooth.adapter.start_discovery()
                            }
                        }}/>
                </box>
                <BluetoothDevices/>
            </box>
        }
    />
}