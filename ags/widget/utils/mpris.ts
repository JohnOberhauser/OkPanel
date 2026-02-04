import Gio from "gi://Gio?version=2.0";
import {createState} from "ags";
import AstalIO from "gi://AstalIO?version=0.1";
import {interval} from "ags/time"
import GLib from "gi://GLib?version=2.0";

// Define a PlaybackStatus enum for the player's playback status.
export enum PlaybackStatus {
    Playing = "Playing",
    Paused = "Paused",
    Stopped = "Stopped"
}

export enum ShuffleStatus {
    Enabled = "Enabled",
    Disabled = "Disabled",
    Unsupported = "Unsupported"
}

export enum LoopStatus {
    None = "None",
    Track = "Track",
    Playlist = "Playlist",
    Unsupported = "Unsupported"
}

// -------------------------------------------------------
// Player class: represents a single MPRIS media player
// -------------------------------------------------------
export class Player {
    busName: string;
    rootProxy: Gio.DBusProxy | null;
    proxy: Gio.DBusProxy | null;
    isPrimaryPlayer: boolean

    identity = createState<string | null>(null);
    playbackStatus = createState<PlaybackStatus | null>(null);
    position = createState(0);
    trackLength = createState(0);
    title = createState<string | null>(null);
    artist = createState<string | null>(null);
    shuffleStatus = createState<ShuffleStatus | null>(null);
    canGoPrevious = createState(false);
    canGoNext = createState(false);
    loopStatus = createState<LoopStatus | null>(null);
    canControl = createState(false);

    positionInterval: AstalIO.Time | null;

    constructor(busName: string, isPrimary: boolean) {
        this.busName = busName;
        this.rootProxy = null;
        this.proxy = null;
        this.positionInterval = null;
        this.isPrimaryPlayer = isPrimary

        this._initRootProxy()
        this._initProxy();
        this._setupPositionInterval()
    }

    public destroy() {
        this.positionInterval?.cancel()
    }

    private _setupPositionInterval() {
        this.positionInterval = interval(1000, () => {
            if (this.proxy) {
                // Create a variant with the parameters (interface, property)
                let parameters = new GLib.Variant("(ss)", ["org.mpris.MediaPlayer2.Player", "Position"]);
                this.proxy.call(
                    "org.freedesktop.DBus.Properties.Get",
                    parameters,
                    Gio.DBusCallFlags.NONE,
                    -1,
                    null,
                    (proxy, res) => {
                        try {
                            let result = proxy?.call_finish(res);
                            // The result is a variant tuple; extract the first element.
                            // @ts-ignore
                            let posVariant = result.deep_unpack()[0];
                            let pos = posVariant.deep_unpack() as number / 1000000;
                            this.position[1](pos);
                        } catch (e) {
                            log("Failed to update position: " + e);
                        }
                    }
                );
            }
        })
    }

    private _initRootProxy(): void {
        try {
            // Create a synchronous proxy for the media player's "Player" interface.
            this.rootProxy = Gio.DBusProxy.new_sync(
                Gio.DBus.session,
                Gio.DBusProxyFlags.NONE,
                null, // GDBusInterfaceInfo (not needed)
                this.busName,
                "/org/mpris/MediaPlayer2",
                "org.mpris.MediaPlayer2",
                null // GCancellable
            );
        } catch (e) {
            console.error(e, `Error creating proxy for ${this.busName}`);
            return;
        }

        const idVar = this.rootProxy.get_cached_property("Identity");
        this.identity[1](idVar ? (idVar.deep_unpack() as string) : null);

        // Also listen for changes on the root interface
        this.rootProxy.connect("g-properties-changed", (_proxy, changed /* GLib.Variant */) => {
            const dict: any = changed.deep_unpack();
            if ("Identity" in dict) {
                try {
                    this.identity[1](dict["Identity"].deep_unpack() as string);
                } catch {
                    this.identity[1](null);
                }
            }
        });
    }

    private _initProxy(): void {
        try {
            // Create a synchronous proxy for the media player's "Player" interface.
            this.proxy = Gio.DBusProxy.new_sync(
                Gio.DBus.session,
                Gio.DBusProxyFlags.NONE,
                null, // GDBusInterfaceInfo (not needed)
                this.busName,
                "/org/mpris/MediaPlayer2",
                "org.mpris.MediaPlayer2.Player",
                null // GCancellable
            );
        } catch (e) {
            console.error(e, `Error creating proxy for ${this.busName}`);
            return;
        }

        // Connect to property-changed signal.
        this.proxy.connect("g-properties-changed", (proxy: Gio.DBusProxy, changed: GLib.Variant, invalidated: GLib.Variant) => {
            this._onPropertiesChanged(changed, invalidated);
        });

        // Initialize our properties from the current state.
        this._updateAllProperties();
    }

    private _updateAllProperties(): void {
        // Update title and artist from the "Metadata" property.
        const metaVariant = this.proxy!.get_cached_property("Metadata");
        if (metaVariant) {
            try {
                let meta: any = metaVariant.deep_unpack();
                if (meta["xesam:title"]) {
                    this.title[1](meta["xesam:title"].deep_unpack());
                } else {
                    this.title[1](null)
                }
                if (meta["xesam:artist"]) {
                    // xesam:artist is usually an array of strings.
                    if (Array.isArray(meta["xesam:artist"].deep_unpack())) {
                        this.artist[1](meta["xesam:artist"].deep_unpack().join(", "));
                    } else {
                        this.artist[1](meta["xesam:artist"].deep_unpack());
                    }
                } else {
                    this.artist[1](null);
                }
                // Extract track length from metadata.
                if (meta["mpris:length"]) {
                    let lengthNumber = meta["mpris:length"].deep_unpack() as number / 1000000;
                    this.trackLength[1](lengthNumber);
                } else {
                    this.trackLength[1](0);
                }
            } catch (e) {
                log("Could not unpack metadata: " + e);
                this.title[1](null);
                this.artist[1](null);
                this.trackLength[1](0);
            }
        } else {
            this.title[1](null);
            this.artist[1](null);
            this.trackLength[1](0);
        }

        // Update playbackStatus.
        const pbVar = this.proxy!.get_cached_property("PlaybackStatus");
        if (pbVar) {
            try {
                let pbStr = pbVar.deep_unpack() as string;
                this.playbackStatus[1](pbStr as PlaybackStatus);
            } catch (e) {
                this.playbackStatus[1](null);
            }
        } else {
            this.playbackStatus[1](null);
        }

        // Update position.
        const posVar = this.proxy!.get_cached_property("Position");
        if (posVar) {
            try {
                let posNumber = posVar.deep_unpack() as number / 1000000;
                this.position[1](posNumber);
            } catch (e) {
                this.position[1](0);
            }
        } else {
            this.position[1](0);
        }

        // Shuffle.
        const shuffleVar = this.proxy!.get_cached_property("Shuffle");
        if (shuffleVar) {
            try {
                let shuffleBool = shuffleVar.deep_unpack() as boolean;
                this.shuffleStatus[1](shuffleBool ? ShuffleStatus.Enabled : ShuffleStatus.Disabled);
            } catch (e) {
                this.shuffleStatus[1](ShuffleStatus.Unsupported);
            }
        } else {
            this.shuffleStatus[1](ShuffleStatus.Unsupported);
        }

        // CanGoPrevious.
        const canGoPrevVar = this.proxy!.get_cached_property("CanGoPrevious");
        if (canGoPrevVar) {
            try {
                let canGoPrev = canGoPrevVar.deep_unpack() as boolean;
                this.canGoPrevious[1](canGoPrev);
            } catch (e) {
                this.canGoPrevious[1](false);
            }
        } else {
            this.canGoPrevious[1](false);
        }

        // CanGoNext.
        const canGoNextVar = this.proxy!.get_cached_property("CanGoNext");
        if (canGoNextVar) {
            try {
                let canGoNext = canGoNextVar.deep_unpack() as boolean;
                this.canGoNext[1](canGoNext);
            } catch (e) {
                this.canGoNext[1](false);
            }
        } else {
            this.canGoNext[1](false);
        }

        // LoopStatus.
        const loopVar = this.proxy!.get_cached_property("LoopStatus");
        if (loopVar) {
            try {
                let loopStr = loopVar.deep_unpack() as string;
                this.loopStatus[1](loopStr as LoopStatus);
            } catch (e) {
                this.loopStatus[1](LoopStatus.Unsupported);
            }
        } else {
            this.loopStatus[1](LoopStatus.Unsupported);
        }

        // CanControl.
        const canControlVar = this.proxy!.get_cached_property("CanControl");
        if (canControlVar) {
            try {
                let canControl = canControlVar.deep_unpack() as boolean;
                this.canControl[1](canControl);
            } catch (e) {
                this.canControl[1](false);
            }
        } else {
            this.canControl[1](false);
        }

        this._notifyPropertiesUpdated();
    }

    private _onPropertiesChanged(changed: GLib.Variant, invalidated: GLib.Variant): void {
        let dict: any = changed.deep_unpack();

        if ("Metadata" in dict) {
            let metaVariant = dict["Metadata"];
            try {
                let meta: any = metaVariant.deep_unpack();
                if (meta["xesam:title"]) {
                    this.title[1](meta["xesam:title"].deep_unpack());
                } else {
                    this.title[1](null)
                }
                if (meta["xesam:artist"]) {
                    if (Array.isArray(meta["xesam:artist"].deep_unpack())) {
                        this.artist[1](meta["xesam:artist"].deep_unpack().join(", "));
                    } else {
                        this.artist[1](meta["xesam:artist"].deep_unpack());
                    }
                } else {
                    this.artist[1](null);
                }
                // Extract track length from metadata.
                if (meta["mpris:length"]) {
                    let lengthNumber = meta["mpris:length"].deep_unpack() as number / 1000000;
                    this.trackLength[1](lengthNumber);
                } else {
                    this.trackLength[1](0);
                }
            } catch (e) {
                log("Could not unpack metadata in onPropertiesChanged: " + e);
                this.title[1](null);
                this.artist[1](null);
                this.trackLength[1](0);
            }
        }
        if ("PlaybackStatus" in dict) {
            try {
                let pbStr = dict["PlaybackStatus"].deep_unpack() as string;
                this.playbackStatus[1](pbStr as PlaybackStatus);
            } catch (e) {
                this.playbackStatus[1](null);
            }
        }
        if ("Position" in dict) {
            try {
                let posNumber = dict["Position"].deep_unpack() as number;
                this.position[1](posNumber);
            } catch (e) {
                this.position[1](0);
            }
        }
        if ("Shuffle" in dict) {
            try {
                let shuffleBool = dict["Shuffle"].deep_unpack() as boolean;
                this.shuffleStatus[1](shuffleBool ? ShuffleStatus.Enabled : ShuffleStatus.Disabled);
            } catch (e) {
                this.shuffleStatus[1](ShuffleStatus.Unsupported);
            }
        }
        if ("CanGoPrevious" in dict) {
            try {
                let canGoPrev = dict["CanGoPrevious"].deep_unpack() as boolean;
                this.canGoPrevious[1](canGoPrev);
            } catch (e) {
                this.canGoPrevious[1](false);
            }
        }
        if ("CanGoNext" in dict) {
            try {
                let canGoNext = dict["CanGoNext"].deep_unpack() as boolean;
                this.canGoNext[1](canGoNext);
            } catch (e) {
                this.canGoNext[1](false);
            }
        }
        if ("LoopStatus" in dict) {
            try {
                let loopStr = dict["LoopStatus"].deep_unpack() as string;
                this.loopStatus[1](loopStr as LoopStatus);
            } catch (e) {
                this.loopStatus[1](LoopStatus.Unsupported);
            }
        }

        if ("CanControl" in dict) {
            try {
                let canControl = dict["CanControl"].deep_unpack() as boolean;
                this.canControl[1](canControl);
            } catch (e) {
                this.canControl[1](false);
            }
        }

        this._notifyPropertiesUpdated();
    }

    private _notifyPropertiesUpdated(): void {
        // uncomment to enable logs

        // log(`Player (${this.busName}) updated:`);
        // log(`  Identity: ${this.identity[0].get()}`);
        // log(`  PlaybackStatus: ${this.playbackStatus[0].get()}`);
        // log(`  Position: ${this.position[0].get()}`);
        // log(`  Track Length: ${this.trackLength[0].get()}`);
        // log(`  Title: ${this.title[0].get()}`);
        // log(`  Artist: ${this.artist[0].get()}`);
        // log(`  Shuffle: ${this.shuffleStatus[0].get()}`);
        // log(`  CanGoPrevious: ${this.canGoPrevious[0].get()}`);
        // log(`  CanGoNext: ${this.canGoNext[0].get()}`);
        // log(`  LoopStatus: ${this.loopStatus[0].get()}`);
        // log(`  CanControl: ${this.canControl[0].get()}`);
    }

    public setShuffleStatus(status: ShuffleStatus): void {
        if (!this.proxy) {
            console.log(`No proxy available for ${this.busName}`);
            return;
        }

        // Determine the boolean value based on the enum.
        let boolValue: boolean;
        switch (status) {
            case ShuffleStatus.Enabled:
                boolValue = true;
                break;
            case ShuffleStatus.Disabled:
                boolValue = false;
                break;
            case ShuffleStatus.Unsupported:
                console.log("Shuffle is unsupported; not setting property.");
                return;
        }

        // Create a GLib.Variant for the boolean.
        let valueVariant = new GLib.Variant("b", boolValue);

        // Create parameters for the DBus method call.
        // The tuple contains: interface name, property name, and the value.
        let parameters = new GLib.Variant("(ssv)", ["org.mpris.MediaPlayer2.Player", "Shuffle", valueVariant]);

        // Call the "Set" method on org.freedesktop.DBus.Properties to update the property.
        this.proxy.call(
            "org.freedesktop.DBus.Properties.Set",
            parameters,
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            (proxy, res) => {
                try {
                    proxy?.call_finish(res);
                    // Optionally update the local reactive variable.
                    this.shuffleStatus[1](status);
                    console.log(`Shuffle status set to ${status}`);
                } catch (e) {
                    console.error("Error setting shuffle status: " + e);
                }
            }
        );
    }

    public setLoopStatus(status: LoopStatus): void {
        if (!this.proxy) {
            console.log(`No proxy available for ${this.busName}`);
            return;
        }

        // Create a GLib.Variant for the new loop status. LoopStatus is a string.
        let valueVariant = new GLib.Variant("s", status);

        // Prepare the DBus parameters as a tuple: (interface, property, value)
        let parameters = new GLib.Variant("(ssv)", ["org.mpris.MediaPlayer2.Player", "LoopStatus", valueVariant]);

        // Call the DBus method to set the property.
        this.proxy.call(
            "org.freedesktop.DBus.Properties.Set",
            parameters,
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            (proxy, res) => {
                try {
                    proxy?.call_finish(res);
                    // Update the local reactive variable if the call succeeds.
                    this.loopStatus[1](status);
                    console.log(`Loop status set to ${status}`);
                } catch (e) {
                    console.error("Error setting loop status: " + e);
                }
            }
        );
    }

    public nextTrack(): void {
        if (!this.proxy) {
            console.log(`No proxy available for ${this.busName}`);
            return;
        }
        // Call the Next method with no parameters.
        this.proxy.call(
            "Next",
            new GLib.Variant("()", []),
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            (proxy, res) => {
                try {
                    proxy?.call_finish(res);
                    console.log("Switched to next track");
                } catch (e) {
                    console.error("Error switching to next track: " + e);
                }
            }
        );
    }

    public previousTrack(): void {
        if (!this.proxy) {
            console.log(`No proxy available for ${this.busName}`);
            return;
        }
        // Call the Previous method with no parameters.
        this.proxy.call(
            "Previous",
            new GLib.Variant("()", []),
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            (proxy, res) => {
                try {
                    proxy?.call_finish(res);
                    console.log("Switched to previous track");
                } catch (e) {
                    console.error("Error switching to previous track: " + e);
                }
            }
        );
    }

    public playPause(): void {
        if (!this.proxy) {
            console.log(`No proxy available for ${this.busName}`);
            return;
        }
        // Call the PlayPause method with no parameters.
        this.proxy.call(
            "PlayPause",
            new GLib.Variant("()", []),
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            (proxy, res) => {
                try {
                    proxy?.call_finish(res);
                    console.log("Toggled play/pause");
                } catch (e) {
                    console.error("Error toggling play/pause: " + e);
                }
            }
        );
        this.playbackStatus[1](this.playbackStatus[0].peek() === PlaybackStatus.Playing ? PlaybackStatus.Paused : PlaybackStatus.Playing)
    }

    public setPosition(newPosition: number): void {
        if (!this.proxy) {
            console.log(`No proxy available for ${this.busName}`);
            return;
        }

        // Retrieve the Metadata property from the proxy.
        const metaVariant = this.proxy.get_cached_property("Metadata");
        if (!metaVariant) {
            console.log("No metadata available; cannot update track position.");
            return;
        }

        // Unpack the metadata to extract the track id.
        let meta: any;
        try {
            meta = metaVariant.deep_unpack();
        } catch (e) {
            console.error("Error unpacking metadata: " + e);
            return;
        }

        // Ensure the metadata contains the track id.
        if (!meta["mpris:trackid"]) {
            console.log("No track id available in metadata.");
            return;
        }

        let trackId: string;
        try {
            // mpris:trackid is itself a variant; extract the plain string.
            trackId = meta["mpris:trackid"].deep_unpack();
        } catch (e) {
            console.error("Error unpacking track id: " + e);
            return;
        }

        // Create a tuple variant for the parameters.
        // The signature "(ox)" indicates a tuple with an object path ("o") and an int64 ("x").
        let parameters = new GLib.Variant("(ox)", [trackId, newPosition * 1000000]);

        // Call the "SetPosition" method on the MPRIS interface.
        this.proxy.call(
            "SetPosition",
            parameters,
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            (proxy, res) => {
                try {
                    proxy?.call_finish(res);
                    console.log(`Position updated to ${newPosition} (seconds)`);
                } catch (e) {
                    console.error("Error setting position: " + e);
                }
            }
        );

        this.position[1](newPosition)
    }
}

// -------------------------------------------------------
// Mpris class: keeps track of all active Player objects
// -------------------------------------------------------
export class Mpris {
    private static _instance: Mpris | null = null;

    static get_default(): Mpris {
        if (Mpris._instance === null) {
            Mpris._instance = new Mpris();
        }
        return Mpris._instance;
    }

    players = createState<Player[]>([]);

    constructor() {
        // Watch for NameOwnerChanged signals so we detect players appearing/disappearing.
        this._watchNameOwnerChanges();

        // Load any players already active.
        this._loadExistingPlayers();
    }

    public rotatePrimaryPlayer(): void {
        const players = this.players[0].peek();

        // Don't rotate if 0 or 1 player
        if (players.length <= 1) return;

        const currentIndex = players.findIndex(p => p.isPrimaryPlayer);
        if (currentIndex === -1) return; // no current primary set

        // Clear current primary
        players[currentIndex].isPrimaryPlayer = false;

        // Calculate next index (wrap around)
        const nextIndex = (currentIndex + 1) % players.length;

        // Set new primary
        players[nextIndex].isPrimaryPlayer = true;

        // Update the reactive list (to notify bindings)
        this.players[1]([...players]);
    }

    private _loadExistingPlayers(): void {
        Gio.DBus.session.call(
            "org.freedesktop.DBus",
            "/org/freedesktop/DBus",
            "org.freedesktop.DBus",
            "ListNames",
            null,
            null,
            Gio.DBusCallFlags.NONE,
            -1,
            null,
            (connection, res, data) => {
                try {
                    let result: GLib.Variant = Gio.DBus.session.call_finish(res);
                    // The ListNames call returns an array of names.
                    // @ts-ignore
                    let names: string[] = result.deep_unpack()[0]
                    for (let name of names) {
                        if (name.startsWith("org.mpris.MediaPlayer2")) {
                            this._addPlayer(name);
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        );
    }

    private _watchNameOwnerChanges(): void {
        Gio.DBus.session.signal_subscribe(
            null,  // sender: null means any sender
            "org.freedesktop.DBus",
            "NameOwnerChanged",
            "/org/freedesktop/DBus",
            null,  // no filtering by specific name
            Gio.DBusSignalFlags.NONE,
            (conn, senderName, objectPath, interfaceName, signalName, parameters) => {
                // The signal parameters are [name, old_owner, new_owner].
                // @ts-ignore
                let [name, oldOwner, newOwner] = parameters.deep_unpack();
                if (!name.startsWith("org.mpris.MediaPlayer2")) return;

                if (newOwner !== "") {
                    // A new player appeared.
                    this._addPlayer(name);
                } else {
                    // A player has disappeared.
                    this._removePlayer(name);
                }
            }
        );
    }

    private _addPlayer(busName: string): void {
        if (!this.players[0].peek().find((player) => player.busName === busName)) {
            log("Adding player: " + busName);
            try {
                let player = new Player(busName, this.players[0].length === 0);
                this.players[1](this.players[0].peek().concat(player))
            } catch (e) {
                console.error(e, "Failed to add player: " + busName)
            }
        }
    }

    private _removePlayer(busName: string): void {
        log("Removing player: " + busName)
        const player = this.players[0].peek().find((player) => player.busName === busName)
        player?.destroy()
        const newList = this.players[0].peek().filter((player) => player.busName !== busName)
        if (newList.length !== 0 && player?.isPrimaryPlayer) {
            newList[0].isPrimaryPlayer = true
        }
        this.players[1](newList)
    }
}