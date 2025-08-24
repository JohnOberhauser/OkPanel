import AstalNetwork from "gi://AstalNetwork"
import {getAccessPointIcon, getNetworkIconBinding} from "../../utils/network";
import {Gtk} from "ags/gtk4"
import App from "ags/gtk4/app"
import {execAsync} from "ags/process"
import {SystemMenuWindowName} from "../SystemMenuWindow";
import Pango from "gi://Pango?version=1.0";
import RevealerRow from "../../common/RevealerRow";
import OkButton from "../../common/OkButton";
import {createBinding, createComputed, createState, For, Setter, State, With} from "ags";

const [wifiConnections, wifiConnectionsSetter] = createState<string[]>([])
const [inactiveWifiConnections, inactiveWifiConnectionsSetter] = createState<string[]>([])
const [activeWifiConnections, activeWifiConnectionsSetter] = createState<string[]>([])
const [vpnConnections, vpnConnectionsSetter] = createState<string[]>([])
export const [activeVpnConnections, activeVpnConnectionsSetter] = createState<string[]>([])
const [airplaneModeEnabled, airplaneModelEnabledSetter] = createState(false)

function updateAirplaneMode() {
    execAsync(["bash", "-c", `nmcli networking`])
        .catch((error) => {
            console.error(error)
        })
        .then((value) => {
            if (typeof value !== "string") {
                return
            }
            const enabled = value.trim() === "disabled"
            airplaneModelEnabledSetter(enabled)
        })
}

function enableAirplaneMode() {
    execAsync(["bash", "-c", `nmcli networking off`])
        .catch((error) => {
            console.error(error)
        }).finally(() => {
            updateAirplaneMode()
        })
}

function disableAirplaneMode() {
    execAsync(["bash", "-c", `nmcli networking on`])
        .catch((error) => {
            console.error(error)
        }).finally(() => {
            updateAirplaneMode()
        })
}

function ssidInRange(ssid: string) {
    const network = AstalNetwork.get_default()

    return network.wifi.accessPoints.find((accessPoint) => {
        return accessPoint.ssid === ssid
    }) != null
}

function updateConnections() {
    // update active connections
    execAsync(["bash", "-c", `nmcli -t -f NAME,TYPE connection show --active`])
        .catch((error) => {
            console.error(error)
        })
        .then((value) => {
            if (typeof value !== "string") {
                return
            }

            const wifiNames = value
                .split("\n")
                .filter((line) => line.includes("802-11-wireless"))
                .map((line) => line.split(":")[0].trim())
                .sort((a, b) => {
                    const aInRange = ssidInRange(a)
                    const bInRange = ssidInRange(b)
                    if (aInRange && bInRange) {
                        return 0
                    } else if (aInRange) {
                        return -1
                    } else {
                        return 1
                    }
                });

            activeWifiConnectionsSetter(wifiNames)

            const vpnNames = value
                .split("\n")
                .filter((line) => line.includes("vpn") || line.includes("wireguard"))
                .map((line) => line.split(":")[0].trim())
                .sort((a, b) => {
                    if (a > b) {
                        return 1
                    } else {
                        return -1
                    }
                });

            activeVpnConnectionsSetter(vpnNames)
        })
        .finally(() => {
            // update inactive connections
            execAsync(["bash", "-c", `nmcli -t -f NAME,TYPE connection show`])
                .catch((error) => {
                    console.error(error)
                })
                .then((value) => {
                    if (typeof value !== "string") {
                        return
                    }

                    const wifiNames = value
                        .split("\n")
                        .filter((line) => line.includes("802-11-wireless"))
                        .map((line) => line.split(":")[0].trim())
                        .sort((a, b) => {
                            const aInRange = ssidInRange(a)
                            const bInRange = ssidInRange(b)
                            if (aInRange && bInRange) {
                                return 0
                            } else if (aInRange) {
                                return -1
                            } else {
                                return 1
                            }
                        });

                    wifiConnectionsSetter(wifiNames)
                    inactiveWifiConnectionsSetter(
                        wifiNames
                            .filter((line) => !activeWifiConnections.get().includes(line))
                    )

                    const vpnNames = value
                        .split("\n")
                        .filter((line) => line.includes("vpn") || line.includes("wireguard"))
                        .map((line) => line.split(":")[0].trim())
                        .filter((line) => !activeVpnConnections.get().includes(line))
                        .sort((a, b) => {
                            if (a > b) {
                                return 1
                            } else {
                                return -1
                            }
                        });

                    vpnConnectionsSetter(vpnNames)
                })
        })
}

function deleteConnection(ssid: string) {
    execAsync(["bash", "-c", `nmcli connection delete "${ssid}"`])
        .finally(() => {
            updateConnections()
        })
}

function disconnect(ssid: string) {
    execAsync(["bash", "-c", `nmcli connection down "${ssid}"`])
        .finally(() => {
            updateConnections()
        })
}

function addWireguardConnection()
{
    const dialog = new Gtk.FileChooserNative({
        title: 'Select WireGuard Config',
        action: Gtk.FileChooserAction.OPEN,
        accept_label: 'Open',
        cancel_label: 'Cancel',
    });

    // Filter for .conf files
    const filter = new Gtk.FileFilter();
    filter.set_name('WireGuard Config (*.conf)');
    filter.add_pattern('*.conf');
    dialog.add_filter(filter);

    dialog.connect('response', (dlg, response) => {
        if (response === Gtk.ResponseType.ACCEPT) {
            const file = dlg.get_file();
            if (file !== null) {
                execAsync(["bash", "-c", `nmcli connection import type wireguard file "${file.get_path()}"`])
                    .finally(() => {
                        updateConnections()
                    })
            }
        }
        dlg.destroy();
    });

    dialog.show();
}

function connectVpn(name: string, isConnectingSetter: Setter<boolean>) {
    isConnectingSetter(true)
    // first disconnect any existing vpn connections
    activeVpnConnections.get().forEach((vpnName) => {
        execAsync(["bash", "-c", `nmcli connection down "${vpnName}"`])
            .finally(() => {
                updateConnections()
            })
    })

    execAsync(["bash", "-c", `nmcli connection up "${name}"`])
        .catch((error) => {
            console.error(error)
        }).finally(() => {
            updateConnections()
            isConnectingSetter(false)
        })
}

function AirplaneMode() {
    return <box
        marginStart={20}
        marginEnd={20}
        orientation={Gtk.Orientation.HORIZONTAL}>
        <label
            halign={Gtk.Align.START}
            hexpand={true}
            label="󰀝  Airplane mode"
            cssClasses={["labelMedium"]}/>
        <switch
            onNotifyActive={(self) => {
                if (self.active) {
                    enableAirplaneMode()
                } else {
                    disableAirplaneMode()
                }
            }}
            active={airplaneModeEnabled}/>
    </box>
}

function PasswordEntry(
    {
        accessPoint,
        passwordEntryRevealed
    }: {
        accessPoint: AstalNetwork.AccessPoint,
        passwordEntryRevealed: State<boolean>
    }
) {
    const [text, textSetter] = createState("")
    const [errorRevealed, errorRevealedSetter] = createState(false)
    const [isConnecting, isConnectingSetter] = createState(false)

    passwordEntryRevealed[0].subscribe(() => {
        if (!passwordEntryRevealed[0].get()) {
            errorRevealedSetter(false)
        }
    })

    const connect = () => {
        errorRevealedSetter(false)
        isConnectingSetter(true)
        execAsync(["bash", "-c", `echo '${text.get()}' | nmcli device wifi connect "${accessPoint.ssid}" --ask`])
            .catch((error) => {
                console.error(error)
                errorRevealedSetter(true)
                deleteConnection(accessPoint.ssid)
            })
            .then((value) => {
                console.log(value)
            })
            .finally(() => {
                if (!errorRevealed.get()) {
                    passwordEntryRevealed[1](false)
                    updateConnections()
                }
                isConnectingSetter(false)
            })
    }

    return <box
        marginTop={4}
        orientation={Gtk.Orientation.VERTICAL}
        spacing={4}>
        {accessPoint.flags !== 0 && <box
            orientation={Gtk.Orientation.VERTICAL}>
            <label
                halign={Gtk.Align.START}
                cssClasses={["labelSmall"]}
                label="Password"/>
            <entry
                cssClasses={["networkPasswordEntry"]}
                onActivate={() => connect()}
                $={(self) => {
                    self.connect('changed', () => textSetter(self.text))
                }}/>
        </box>}
        <revealer
            revealChild={errorRevealed}
            transitionDuration={200}
            transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
            <label
                halign={Gtk.Align.START}
                cssClasses={["labelSmallWarning"]}
                label="Error Connecting"/>
        </revealer>
        <OkButton
            primary={true}
            hexpand={true}
            label={isConnecting((connecting) => {
                if (connecting) {
                    return "Connecting"
                } else {
                    return "Connect"
                }
            })}
            onClicked={() => {
                if (!isConnecting.get()) {
                    connect()
                }
            }}/>
    </box>
}

function WifiConnections() {
    const network = AstalNetwork.get_default()

    return <box
        orientation={Gtk.Orientation.VERTICAL}>
        <label
            halign={Gtk.Align.START}
            cssClasses={["labelLargeBold"]}
            label="Saved networks"/>
        <For each={inactiveWifiConnections}>
            {(connection) => {
                const [buttonsRevealed, buttonsRevealedSetter] = createState(false)

                setTimeout(() => {
                    createBinding(App.get_window(SystemMenuWindowName)!, "visible").subscribe(() => {
                        if (!App.get_window(SystemMenuWindowName)?.visible) {
                            buttonsRevealedSetter(false)
                        }
                    })
                }, 1_000)

                let label: string
                let canConnect: boolean
                const accessPoint = network.wifi.accessPoints.find((accessPoint) => {
                    return accessPoint.ssid === connection
                })
                if (accessPoint != null) {
                    label = `${getAccessPointIcon(accessPoint)}  ${connection}`
                    canConnect = network.wifi.activeAccessPoint?.ssid !== connection;
                } else {
                    label = `󰤮  ${connection}`
                    canConnect = false
                }

                return <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    <OkButton
                        hexpand={true}
                        label={label}
                        labelHalign={Gtk.Align.START}
                        onClicked={() => {
                            buttonsRevealedSetter(!buttonsRevealed.get())
                        }}/>
                    <revealer
                        revealChild={buttonsRevealed}
                        transitionDuration={200}
                        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                        <box
                            marginTop={4}
                            orientation={Gtk.Orientation.VERTICAL}
                            spacing={4}>
                            {canConnect && <OkButton
                                hexpand={true}
                                primary={true}
                                label="Connect"
                                onClicked={() => {
                                    execAsync(`nmcli c up ${connection}`)
                                        .catch((error) => {
                                            console.error(error)
                                        })
                                        .finally(() => {
                                            updateConnections()
                                        })
                                }}/>}
                            <OkButton
                                hexpand={true}
                                primary={true}
                                label="Forget"
                                onClicked={() => {
                                    deleteConnection(connection)
                                }}/>
                        </box>
                    </revealer>
                </box>
            }}
        </For>
    </box>
}

function WifiScannedConnections() {
    const network = AstalNetwork.get_default()

    return <box
        orientation={Gtk.Orientation.VERTICAL}>
        <With value={createBinding(network.wifi, "scanning")}>
            {(scanning) => {
                if (scanning) {
                    return <label
                        halign={Gtk.Align.START}
                        cssClasses={["labelLargeBold"]}
                        marginBottom={4}
                        label="Scanning…"/>
                } else {
                    const accessPoints = network.wifi.accessPoints

                    const accessPointsUi = accessPoints.filter((value) => {
                        return value.ssid != null
                            && wifiConnections.get().find((connection) => {
                                return value.ssid === connection
                            }) == null
                    }).sort((a, b) => {
                        if (a.strength > b.strength) {
                            return -1
                        } else {
                            return 1
                        }
                    }).map((accessPoint) => {
                        const [passwordEntryRevealed, passwordEntryRevealedSetter] = createState(false)

                        setTimeout(() => {
                            createBinding(App.get_window(SystemMenuWindowName)!, "visible").subscribe(() => {
                                if (!App.get_window(SystemMenuWindowName)?.visible) {
                                    passwordEntryRevealedSetter(false)
                                }
                            })
                        }, 1_000)

                        return <box
                            orientation={Gtk.Orientation.VERTICAL}>
                            <box
                                orientation={Gtk.Orientation.HORIZONTAL}>
                                <OkButton
                                    hexpand={true}
                                    labelHalign={Gtk.Align.START}
                                    label={`${getAccessPointIcon(accessPoint)}  ${accessPoint.ssid}`}
                                    onClicked={() => {
                                        passwordEntryRevealedSetter(!passwordEntryRevealed.get())
                                    }}/>
                            </box>
                            <revealer
                                revealChild={passwordEntryRevealed}
                                transitionDuration={200}
                                transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                                <PasswordEntry
                                    accessPoint={accessPoint}
                                    passwordEntryRevealed={[passwordEntryRevealed, passwordEntryRevealedSetter]}/>
                            </revealer>
                        </box>
                    })

                    return <box
                        orientation={Gtk.Orientation.VERTICAL}>
                        <label
                            halign={Gtk.Align.START}
                            cssClasses={["labelLargeBold"]}
                            label="Available networks"/>
                        {accessPointsUi}
                    </box>
                }
            }}
        </With>
    </box>
}

function VpnActiveConnections() {
    return <box
        visible={activeVpnConnections((connections) => {
            return connections.length !== 0
        })}
        orientation={Gtk.Orientation.VERTICAL}>
        <With value={activeVpnConnections}>
            {(connections) => {
                if (connections.length === 0) {
                    return <box/>
                }
                return <label
                    halign={Gtk.Align.START}
                    cssClasses={["labelLargeBold"]}
                    label="Active VPN"/>
            }}
        </With>
        <For each={activeVpnConnections}>
            {(connection) => {
                const [buttonsRevealed, buttonsRevealedSetter] = createState(false)

                setTimeout(() => {
                    createBinding(App.get_window(SystemMenuWindowName)!, "visible").subscribe(() => {
                        if (!App.get_window(SystemMenuWindowName)?.visible) {
                            buttonsRevealedSetter(false)
                        }
                    })
                }, 1_000)

                return <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    <OkButton
                        hexpand={true}
                        labelHalign={Gtk.Align.START}
                        label={`󰯄  ${connection}`}
                        onClicked={() => {
                            buttonsRevealedSetter(!buttonsRevealed.get())
                        }}/>
                    <revealer
                        revealChild={buttonsRevealed}
                        transitionDuration={200}
                        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                        <box
                            marginTop={4}
                            marginBottom={4}
                            orientation={Gtk.Orientation.VERTICAL}
                            spacing={4}>
                            <OkButton
                                hexpand={true}
                                primary={true}
                                label="Disconnect"
                                onClicked={() => {
                                    execAsync(`nmcli c down ${connection}`)
                                        .catch((error) => {
                                            console.error(error)
                                        })
                                        .finally(() => {
                                            updateConnections()
                                        })
                                }}/>
                            <OkButton
                                hexpand={true}
                                primary={true}
                                label="Forget"
                                onClicked={() => {
                                    deleteConnection(connection)
                                }}/>
                        </box>
                    </revealer>
                </box>
            }}
        </For>
    </box>
}

function VpnConnections() {
    return <box
        orientation={Gtk.Orientation.VERTICAL}
        spacing={4}>
        <label
            halign={Gtk.Align.START}
            cssClasses={["labelLargeBold"]}
            label="VPN Connections"/>
        <For each={vpnConnections}>
            {(connection) => {
                const [buttonsRevealed, buttonsRevealedSetter] = createState(false)
                const [isConnecting, isConnectingSetter] = createState(false)

                setTimeout(() => {
                    createBinding(App.get_window(SystemMenuWindowName)!, "visible").subscribe(() => {
                        if (!App.get_window(SystemMenuWindowName)?.visible) {
                            buttonsRevealedSetter(false)
                        }
                    })
                }, 1_000)

                return <box
                    orientation={Gtk.Orientation.VERTICAL}>
                    <OkButton
                        hexpand={true}
                        labelHalign={Gtk.Align.START}
                        label={`󰯄  ${connection}`}
                        onClicked={() => {
                            buttonsRevealedSetter(!buttonsRevealed.get())
                        }}/>
                    <revealer
                        revealChild={buttonsRevealed}
                        transitionDuration={200}
                        transitionType={Gtk.RevealerTransitionType.SLIDE_DOWN}>
                        <box
                            marginTop={4}
                            marginBottom={4}
                            orientation={Gtk.Orientation.VERTICAL}
                            spacing={4}>
                            <OkButton
                                hexpand={true}
                                primary={true}
                                label={isConnecting.as((connecting) => {
                                    if (connecting) {
                                        return "Connecting"
                                    } else {
                                        return "Connect"
                                    }
                                })}
                                onClicked={() => {
                                    if (!isConnecting.get()) {
                                        connectVpn(connection, isConnectingSetter)
                                    }
                                }}/>
                            <OkButton
                                hexpand={true}
                                primary={true}
                                label="Forget"
                                onClicked={() => {
                                    deleteConnection(connection)
                                }}/>
                        </box>
                    </revealer>
                </box>
            }}
        </For>
        <OkButton
            primary={true}
            label="Add Wireguard VPN"
            onClicked={() => {
                addWireguardConnection()
            }}/>
    </box>
}

export default function () {
    const network = AstalNetwork.get_default()

    updateConnections()
    updateAirplaneMode()

    setTimeout(() => {
        createBinding(App.get_window(SystemMenuWindowName)!, "visible").subscribe(() => {
            if (App.get_window(SystemMenuWindowName)?.visible) {
                updateConnections()
            }
        })
    }, 1_000)

    const networkName = createComputed([
        createBinding(network.client, "primaryConnection"),
        activeVpnConnections
    ])

    return <RevealerRow
        icon={getNetworkIconBinding()}
        iconOffset={2}
        windowName={SystemMenuWindowName}
        content={
            <label
                cssClasses={["labelMediumBold"]}
                halign={Gtk.Align.START}
                hexpand={true}
                ellipsize={Pango.EllipsizeMode.END}
                label={networkName.as((value) => {
                    const primaryConnection = value[0]
                    const activeVpnConnectionsValue = value[1]
                    let name: string
                    if (primaryConnection === null) {
                        name = "Not Connected"
                    } else if (primaryConnection.id.toLowerCase().startsWith("wired")) {
                        name = "Wired"
                    } else {
                        name = primaryConnection.id
                    }
                    if (activeVpnConnectionsValue.length === 0) {
                        return name
                    } else {
                        return `${name} (+VPN)`
                    }
                })}/>
        }
        revealedContent={
            <box
                marginTop={10}
                orientation={Gtk.Orientation.VERTICAL}
                spacing={12}>
                <AirplaneMode/>
                {network.wifi && <With value={createBinding(network.wifi, "activeAccessPoint")}>
                    {(activeAccessPoint: AstalNetwork.AccessPoint) => {
                        return <box
                            hexpand={true}
                            marginBottom={8}>
                            <OkButton
                                hexpand={true}
                                visible={activeAccessPoint !== null}
                                primary={true}
                                label="Disconnect"
                                onClicked={() => {
                                    disconnect(activeAccessPoint.ssid)
                                }}/>
                        </box>
                    }}
                </With>}
                <VpnActiveConnections/>
                <VpnConnections/>
                {network.wifi && <WifiConnections/>}
                {network.wifi && <WifiScannedConnections/>}
            </box>
        }
        setup={(revealed) => {
            revealed[0].subscribe(() => {
                if (revealed[0].get()) {
                    console.log("networking revealed")
                    network.wifi?.scan()
                    updateAirplaneMode()
                }
            })
        }}
    />
}
