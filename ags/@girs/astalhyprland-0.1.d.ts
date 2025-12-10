/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://AstalHyprland?version=0.1' {
    // Module dependencies
    import type GLib from 'gi://GLib?version=2.0';
    import type Gio from 'gi://Gio?version=2.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';

    export namespace AstalHyprland {
        /**
         * AstalHyprland-0.1
         */

        export namespace MonitorTransform {
            export const $gtype: GObject.GType<MonitorTransform>;
        }

        enum MonitorTransform {
            NORMAL,
            /**
             * rotate by 90° counter clockwise
             */
            ROTATE_90_DEG,
            /**
             * rotate by 180°
             */
            ROTATE_180_DEG,
            /**
             * rotate by 270° counter clockwise
             */
            ROTATE_270_DEG,
            /**
             * mirror both axis
             */
            FLIPPED,
            /**
             * flip and rotate by 90°
             */
            FLIPPED_ROTATE_90_DEG,
            /**
             * flip and rotate by 180°
             */
            FLIPPED_ROTATE_180_DEG,
            /**
             * flip and rotate by 270°
             */
            FLIPPED_ROTATE_270_DEG,
        }
        const MAJOR_VERSION: number;
        const MINOR_VERSION: number;
        const MICRO_VERSION: number;
        const VERSION: string;
        function get_default(): Hyprland;

        export namespace Fullscreen {
            export const $gtype: GObject.GType<Fullscreen>;
        }

        enum Fullscreen {
            CURRENT,
            NONE,
            MAXIMIZED,
            FULLSCREEN,
        }
        namespace Client {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                removed: () => void;
                'moved-to': (arg0: Workspace) => void;
                'notify::address': (pspec: GObject.ParamSpec) => void;
                'notify::mapped': (pspec: GObject.ParamSpec) => void;
                'notify::hidden': (pspec: GObject.ParamSpec) => void;
                'notify::x': (pspec: GObject.ParamSpec) => void;
                'notify::y': (pspec: GObject.ParamSpec) => void;
                'notify::width': (pspec: GObject.ParamSpec) => void;
                'notify::height': (pspec: GObject.ParamSpec) => void;
                'notify::workspace': (pspec: GObject.ParamSpec) => void;
                'notify::floating': (pspec: GObject.ParamSpec) => void;
                'notify::monitor': (pspec: GObject.ParamSpec) => void;
                'notify::class': (pspec: GObject.ParamSpec) => void;
                'notify::title': (pspec: GObject.ParamSpec) => void;
                'notify::initial-class': (pspec: GObject.ParamSpec) => void;
                'notify::initial-title': (pspec: GObject.ParamSpec) => void;
                'notify::pid': (pspec: GObject.ParamSpec) => void;
                'notify::xwayland': (pspec: GObject.ParamSpec) => void;
                'notify::pinned': (pspec: GObject.ParamSpec) => void;
                'notify::fullscreen': (pspec: GObject.ParamSpec) => void;
                'notify::fullscreen-client': (pspec: GObject.ParamSpec) => void;
                'notify::swallowing': (pspec: GObject.ParamSpec) => void;
                'notify::focus-history-id': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                address: string;
                mapped: boolean;
                hidden: boolean;
                x: number;
                y: number;
                width: number;
                height: number;
                workspace: Workspace;
                floating: boolean;
                monitor: Monitor;
                class: string;
                title: string;
                initial_class: string;
                initialClass: string;
                initial_title: string;
                initialTitle: string;
                pid: number;
                xwayland: boolean;
                pinned: boolean;
                fullscreen: Fullscreen;
                fullscreen_client: Fullscreen;
                fullscreenClient: Fullscreen;
                swallowing: string;
                focus_history_id: number;
                focusHistoryId: number;
            }
        }

        class Client extends GObject.Object {
            static $gtype: GObject.GType<Client>;

            // Properties

            get address(): string;
            set address(val: string);
            get mapped(): boolean;
            set mapped(val: boolean);
            get hidden(): boolean;
            set hidden(val: boolean);
            get x(): number;
            set x(val: number);
            get y(): number;
            set y(val: number);
            get width(): number;
            set width(val: number);
            get height(): number;
            set height(val: number);
            get workspace(): Workspace;
            set workspace(val: Workspace);
            get floating(): boolean;
            set floating(val: boolean);
            get monitor(): Monitor;
            set monitor(val: Monitor);
            get class(): string;
            set class(val: string);
            get title(): string;
            set title(val: string);
            get initial_class(): string;
            set initial_class(val: string);
            get initialClass(): string;
            set initialClass(val: string);
            get initial_title(): string;
            set initial_title(val: string);
            get initialTitle(): string;
            set initialTitle(val: string);
            get pid(): number;
            set pid(val: number);
            get xwayland(): boolean;
            set xwayland(val: boolean);
            get pinned(): boolean;
            set pinned(val: boolean);
            get fullscreen(): Fullscreen;
            set fullscreen(val: Fullscreen);
            get fullscreen_client(): Fullscreen;
            set fullscreen_client(val: Fullscreen);
            get fullscreenClient(): Fullscreen;
            set fullscreenClient(val: Fullscreen);
            get swallowing(): string;
            set swallowing(val: string);
            get focus_history_id(): number;
            set focus_history_id(val: number);
            get focusHistoryId(): number;
            set focusHistoryId(val: number);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Client.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Client.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Client;

            // Signals

            connect<K extends keyof Client.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Client.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Client.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Client.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Client.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Client.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            kill(): void;
            focus(): void;
            move_to(ws: Workspace): void;
            toggle_floating(): void;
            get_address(): string;
            get_mapped(): boolean;
            get_hidden(): boolean;
            get_x(): number;
            get_y(): number;
            get_width(): number;
            get_height(): number;
            get_workspace(): Workspace;
            get_floating(): boolean;
            get_monitor(): Monitor;
            get_class(): string;
            get_title(): string;
            get_initial_class(): string;
            get_initial_title(): string;
            get_pid(): number;
            get_xwayland(): boolean;
            get_pinned(): boolean;
            get_fullscreen(): Fullscreen;
            get_fullscreen_client(): Fullscreen;
            get_swallowing(): string;
            get_focus_history_id(): number;
        }

        namespace Hyprland {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                event: (arg0: string, arg1: string) => void;
                minimize: (arg0: Client, arg1: boolean) => void;
                floating: (arg0: Client, arg1: boolean) => void;
                urgent: (arg0: Client) => void;
                'client-moved': (arg0: Client, arg1: Workspace) => void;
                submap: (arg0: string) => void;
                'keyboard-layout': (arg0: string, arg1: string) => void;
                'config-reloaded': () => void;
                'client-added': (arg0: Client) => void;
                'client-removed': (arg0: string) => void;
                'workspace-added': (arg0: Workspace) => void;
                'workspace-removed': (arg0: number) => void;
                'monitor-added': (arg0: Monitor) => void;
                'monitor-removed': (arg0: number) => void;
                'notify::monitors': (pspec: GObject.ParamSpec) => void;
                'notify::workspaces': (pspec: GObject.ParamSpec) => void;
                'notify::clients': (pspec: GObject.ParamSpec) => void;
                'notify::focused-workspace': (pspec: GObject.ParamSpec) => void;
                'notify::focused-monitor': (pspec: GObject.ParamSpec) => void;
                'notify::focused-client': (pspec: GObject.ParamSpec) => void;
                'notify::binds': (pspec: GObject.ParamSpec) => void;
                'notify::cursor-position': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                monitors: Monitor[];
                workspaces: Workspace[];
                clients: Client[];
                focused_workspace: Workspace;
                focusedWorkspace: Workspace;
                focused_monitor: Monitor;
                focusedMonitor: Monitor;
                focused_client: Client;
                focusedClient: Client;
                binds: Bind[];
                cursor_position: Position;
                cursorPosition: Position;
            }
        }

        class Hyprland extends GObject.Object {
            static $gtype: GObject.GType<Hyprland>;

            // Properties

            get monitors(): Monitor[];
            get workspaces(): Workspace[];
            get clients(): Client[];
            get focused_workspace(): Workspace;
            set focused_workspace(val: Workspace);
            get focusedWorkspace(): Workspace;
            set focusedWorkspace(val: Workspace);
            get focused_monitor(): Monitor;
            set focused_monitor(val: Monitor);
            get focusedMonitor(): Monitor;
            set focusedMonitor(val: Monitor);
            get focused_client(): Client;
            set focused_client(val: Client);
            get focusedClient(): Client;
            set focusedClient(val: Client);
            get binds(): Bind[];
            get cursor_position(): Position;
            get cursorPosition(): Position;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Hyprland.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Hyprland.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Hyprland;

            // Signals

            connect<K extends keyof Hyprland.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Hyprland.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Hyprland.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Hyprland.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Hyprland.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Hyprland.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Static methods

            static get_default(): Hyprland | null;

            // Methods

            get_monitor(id: number): Monitor;
            get_workspace(id: number): Workspace;
            get_client(address: string): Client | null;
            get_monitor_by_name(name: string): Monitor | null;
            get_workspace_by_name(name: string): Workspace | null;
            message(message: string): string;
            message_async(message: string): globalThis.Promise<string>;
            message_async(message: string, _callback_: Gio.AsyncReadyCallback<this> | null): void;
            message_async(
                message: string,
                _callback_?: Gio.AsyncReadyCallback<this> | null,
            ): globalThis.Promise<string> | void;
            message_finish(_res_: Gio.AsyncResult): string;
            dispatch(dispatcher: string, args: string): void;
            move_cursor(x: number, y: number): void;
            sync_monitors(): globalThis.Promise<void>;
            sync_monitors(_callback_: Gio.AsyncReadyCallback<this> | null): void;
            sync_monitors(_callback_?: Gio.AsyncReadyCallback<this> | null): globalThis.Promise<void> | void;
            sync_monitors_finish(_res_: Gio.AsyncResult): void;
            sync_workspaces(): globalThis.Promise<void>;
            sync_workspaces(_callback_: Gio.AsyncReadyCallback<this> | null): void;
            sync_workspaces(_callback_?: Gio.AsyncReadyCallback<this> | null): globalThis.Promise<void> | void;
            sync_workspaces_finish(_res_: Gio.AsyncResult): void;
            sync_clients(): globalThis.Promise<void>;
            sync_clients(_callback_: Gio.AsyncReadyCallback<this> | null): void;
            sync_clients(_callback_?: Gio.AsyncReadyCallback<this> | null): globalThis.Promise<void> | void;
            sync_clients_finish(_res_: Gio.AsyncResult): void;
            get_monitors(): Monitor[];
            get_workspaces(): Workspace[];
            get_clients(): Client[];
            get_focused_workspace(): Workspace;
            get_focused_monitor(): Monitor;
            get_focused_client(): Client;
            get_binds(): Bind[];
            get_cursor_position(): Position;
        }

        namespace Monitor {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                removed: () => void;
                'notify::id': (pspec: GObject.ParamSpec) => void;
                'notify::name': (pspec: GObject.ParamSpec) => void;
                'notify::description': (pspec: GObject.ParamSpec) => void;
                'notify::make': (pspec: GObject.ParamSpec) => void;
                'notify::model': (pspec: GObject.ParamSpec) => void;
                'notify::serial': (pspec: GObject.ParamSpec) => void;
                'notify::width': (pspec: GObject.ParamSpec) => void;
                'notify::height': (pspec: GObject.ParamSpec) => void;
                'notify::refresh-rate': (pspec: GObject.ParamSpec) => void;
                'notify::x': (pspec: GObject.ParamSpec) => void;
                'notify::y': (pspec: GObject.ParamSpec) => void;
                'notify::active-workspace': (pspec: GObject.ParamSpec) => void;
                'notify::special-workspace': (pspec: GObject.ParamSpec) => void;
                'notify::reserved-top': (pspec: GObject.ParamSpec) => void;
                'notify::reserved-bottom': (pspec: GObject.ParamSpec) => void;
                'notify::reserved-left': (pspec: GObject.ParamSpec) => void;
                'notify::reserved-right': (pspec: GObject.ParamSpec) => void;
                'notify::scale': (pspec: GObject.ParamSpec) => void;
                'notify::transform': (pspec: GObject.ParamSpec) => void;
                'notify::focused': (pspec: GObject.ParamSpec) => void;
                'notify::dpms-status': (pspec: GObject.ParamSpec) => void;
                'notify::vrr': (pspec: GObject.ParamSpec) => void;
                'notify::actively-tearing': (pspec: GObject.ParamSpec) => void;
                'notify::disabled': (pspec: GObject.ParamSpec) => void;
                'notify::current-format': (pspec: GObject.ParamSpec) => void;
                'notify::available-modes': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                id: number;
                name: string;
                description: string;
                make: string;
                model: string;
                serial: string;
                width: number;
                height: number;
                refresh_rate: number;
                refreshRate: number;
                x: number;
                y: number;
                active_workspace: Workspace;
                activeWorkspace: Workspace;
                special_workspace: Workspace;
                specialWorkspace: Workspace;
                reserved_top: number;
                reservedTop: number;
                reserved_bottom: number;
                reservedBottom: number;
                reserved_left: number;
                reservedLeft: number;
                reserved_right: number;
                reservedRight: number;
                scale: number;
                transform: MonitorTransform;
                focused: boolean;
                dpms_status: boolean;
                dpmsStatus: boolean;
                vrr: boolean;
                actively_tearing: boolean;
                activelyTearing: boolean;
                disabled: boolean;
                current_format: string;
                currentFormat: string;
                available_modes: string[];
                availableModes: string[];
            }
        }

        class Monitor extends GObject.Object {
            static $gtype: GObject.GType<Monitor>;

            // Properties

            get id(): number;
            set id(val: number);
            get name(): string;
            set name(val: string);
            get description(): string;
            set description(val: string);
            get make(): string;
            set make(val: string);
            get model(): string;
            set model(val: string);
            get serial(): string;
            set serial(val: string);
            get width(): number;
            set width(val: number);
            get height(): number;
            set height(val: number);
            get refresh_rate(): number;
            set refresh_rate(val: number);
            get refreshRate(): number;
            set refreshRate(val: number);
            get x(): number;
            set x(val: number);
            get y(): number;
            set y(val: number);
            get active_workspace(): Workspace;
            set active_workspace(val: Workspace);
            get activeWorkspace(): Workspace;
            set activeWorkspace(val: Workspace);
            get special_workspace(): Workspace;
            set special_workspace(val: Workspace);
            get specialWorkspace(): Workspace;
            set specialWorkspace(val: Workspace);
            get reserved_top(): number;
            set reserved_top(val: number);
            get reservedTop(): number;
            set reservedTop(val: number);
            get reserved_bottom(): number;
            set reserved_bottom(val: number);
            get reservedBottom(): number;
            set reservedBottom(val: number);
            get reserved_left(): number;
            set reserved_left(val: number);
            get reservedLeft(): number;
            set reservedLeft(val: number);
            get reserved_right(): number;
            set reserved_right(val: number);
            get reservedRight(): number;
            set reservedRight(val: number);
            get scale(): number;
            set scale(val: number);
            get transform(): MonitorTransform;
            set transform(val: MonitorTransform);
            get focused(): boolean;
            set focused(val: boolean);
            get dpms_status(): boolean;
            set dpms_status(val: boolean);
            get dpmsStatus(): boolean;
            set dpmsStatus(val: boolean);
            get vrr(): boolean;
            set vrr(val: boolean);
            get actively_tearing(): boolean;
            set actively_tearing(val: boolean);
            get activelyTearing(): boolean;
            set activelyTearing(val: boolean);
            get disabled(): boolean;
            set disabled(val: boolean);
            get current_format(): string;
            set current_format(val: string);
            get currentFormat(): string;
            set currentFormat(val: string);
            get available_modes(): string[];
            set available_modes(val: string[]);
            get availableModes(): string[];
            set availableModes(val: string[]);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Monitor.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Monitor.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Monitor;

            // Signals

            connect<K extends keyof Monitor.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Monitor.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Monitor.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Monitor.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Monitor.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Monitor.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            focus(): void;
            get_id(): number;
            get_name(): string;
            get_description(): string;
            get_make(): string;
            get_model(): string;
            get_serial(): string;
            get_width(): number;
            get_height(): number;
            get_refresh_rate(): number;
            get_x(): number;
            get_y(): number;
            get_active_workspace(): Workspace;
            get_special_workspace(): Workspace;
            get_reserved_top(): number;
            get_reserved_bottom(): number;
            get_reserved_left(): number;
            get_reserved_right(): number;
            get_scale(): number;
            get_transform(): MonitorTransform;
            get_focused(): boolean;
            get_dpms_status(): boolean;
            get_vrr(): boolean;
            get_actively_tearing(): boolean;
            get_disabled(): boolean;
            get_current_format(): string;
            get_available_modes(): string[];
        }

        namespace Bind {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::locked': (pspec: GObject.ParamSpec) => void;
                'notify::mouse': (pspec: GObject.ParamSpec) => void;
                'notify::release': (pspec: GObject.ParamSpec) => void;
                'notify::repeat': (pspec: GObject.ParamSpec) => void;
                'notify::long-press': (pspec: GObject.ParamSpec) => void;
                'notify::non-consuming': (pspec: GObject.ParamSpec) => void;
                'notify::has-description': (pspec: GObject.ParamSpec) => void;
                'notify::modmask': (pspec: GObject.ParamSpec) => void;
                'notify::submap': (pspec: GObject.ParamSpec) => void;
                'notify::key': (pspec: GObject.ParamSpec) => void;
                'notify::keycode': (pspec: GObject.ParamSpec) => void;
                'notify::catch-all': (pspec: GObject.ParamSpec) => void;
                'notify::description': (pspec: GObject.ParamSpec) => void;
                'notify::dispatcher': (pspec: GObject.ParamSpec) => void;
                'notify::arg': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                locked: boolean;
                mouse: boolean;
                release: boolean;
                repeat: boolean;
                long_press: boolean;
                longPress: boolean;
                non_consuming: boolean;
                nonConsuming: boolean;
                has_description: boolean;
                hasDescription: boolean;
                modmask: number;
                submap: string;
                key: string;
                keycode: number;
                catch_all: boolean;
                catchAll: boolean;
                description: string;
                dispatcher: string;
                arg: string;
            }
        }

        class Bind extends GObject.Object {
            static $gtype: GObject.GType<Bind>;

            // Properties

            get locked(): boolean;
            set locked(val: boolean);
            get mouse(): boolean;
            set mouse(val: boolean);
            get release(): boolean;
            set release(val: boolean);
            get repeat(): boolean;
            set repeat(val: boolean);
            get long_press(): boolean;
            set long_press(val: boolean);
            get longPress(): boolean;
            set longPress(val: boolean);
            get non_consuming(): boolean;
            set non_consuming(val: boolean);
            get nonConsuming(): boolean;
            set nonConsuming(val: boolean);
            get has_description(): boolean;
            set has_description(val: boolean);
            get hasDescription(): boolean;
            set hasDescription(val: boolean);
            get modmask(): number;
            set modmask(val: number);
            get submap(): string;
            set submap(val: string);
            get key(): string;
            set key(val: string);
            get keycode(): number;
            set keycode(val: number);
            get catch_all(): boolean;
            set catch_all(val: boolean);
            get catchAll(): boolean;
            set catchAll(val: boolean);
            get description(): string;
            set description(val: string);
            get dispatcher(): string;
            set dispatcher(val: string);
            get arg(): string;
            set arg(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Bind.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Bind.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Bind;

            // Signals

            connect<K extends keyof Bind.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Bind.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Bind.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Bind.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Bind.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Bind.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_locked(): boolean;
            set_locked(value: boolean): void;
            get_mouse(): boolean;
            set_mouse(value: boolean): void;
            get_release(): boolean;
            set_release(value: boolean): void;
            get_repeat(): boolean;
            set_repeat(value: boolean): void;
            get_long_press(): boolean;
            set_long_press(value: boolean): void;
            get_non_consuming(): boolean;
            set_non_consuming(value: boolean): void;
            get_has_description(): boolean;
            set_has_description(value: boolean): void;
            get_modmask(): number;
            set_modmask(value: number): void;
            get_submap(): string;
            set_submap(value: string): void;
            get_key(): string;
            set_key(value: string): void;
            get_keycode(): number;
            set_keycode(value: number): void;
            get_catch_all(): boolean;
            set_catch_all(value: boolean): void;
            get_description(): string;
            set_description(value: string): void;
            get_dispatcher(): string;
            set_dispatcher(value: string): void;
            get_arg(): string;
            set_arg(value: string): void;
        }

        namespace Position {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::x': (pspec: GObject.ParamSpec) => void;
                'notify::y': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                x: number;
                y: number;
            }
        }

        class Position extends GObject.Object {
            static $gtype: GObject.GType<Position>;

            // Properties

            get x(): number;
            set x(val: number);
            get y(): number;
            set y(val: number);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Position.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Position.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Position;

            // Signals

            connect<K extends keyof Position.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Position.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Position.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Position.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Position.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Position.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_x(): number;
            set_x(value: number): void;
            get_y(): number;
            set_y(value: number): void;
        }

        namespace Workspace {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                removed: () => void;
                'notify::id': (pspec: GObject.ParamSpec) => void;
                'notify::name': (pspec: GObject.ParamSpec) => void;
                'notify::monitor': (pspec: GObject.ParamSpec) => void;
                'notify::clients': (pspec: GObject.ParamSpec) => void;
                'notify::has-fullscreen': (pspec: GObject.ParamSpec) => void;
                'notify::last-client': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                id: number;
                name: string;
                monitor: Monitor;
                clients: Client[];
                has_fullscreen: boolean;
                hasFullscreen: boolean;
                last_client: Client;
                lastClient: Client;
            }
        }

        class Workspace extends GObject.Object {
            static $gtype: GObject.GType<Workspace>;

            // Properties

            get id(): number;
            set id(val: number);
            get name(): string;
            set name(val: string);
            get monitor(): Monitor;
            set monitor(val: Monitor);
            get clients(): Client[];
            get has_fullscreen(): boolean;
            set has_fullscreen(val: boolean);
            get hasFullscreen(): boolean;
            set hasFullscreen(val: boolean);
            get last_client(): Client;
            set last_client(val: Client);
            get lastClient(): Client;
            set lastClient(val: Client);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Workspace.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Workspace.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static dummy(id: number, monitor?: Monitor | null): Workspace;

            static ['new'](): Workspace;

            // Signals

            connect<K extends keyof Workspace.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Workspace.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Workspace.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Workspace.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Workspace.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Workspace.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            focus(): void;
            move_to(m: Monitor): void;
            get_id(): number;
            get_name(): string;
            get_monitor(): Monitor;
            get_clients(): Client[];
            get_has_fullscreen(): boolean;
            get_last_client(): Client;
        }

        type ClientClass = typeof Client;
        abstract class ClientPrivate {
            static $gtype: GObject.GType<ClientPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type HyprlandClass = typeof Hyprland;
        abstract class HyprlandPrivate {
            static $gtype: GObject.GType<HyprlandPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type MonitorClass = typeof Monitor;
        abstract class MonitorPrivate {
            static $gtype: GObject.GType<MonitorPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type BindClass = typeof Bind;
        abstract class BindPrivate {
            static $gtype: GObject.GType<BindPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type PositionClass = typeof Position;
        abstract class PositionPrivate {
            static $gtype: GObject.GType<PositionPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type WorkspaceClass = typeof Workspace;
        abstract class WorkspacePrivate {
            static $gtype: GObject.GType<WorkspacePrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        /**
         * Name of the imported GIR library
         * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L188
         */
        const __name__: string;
        /**
         * Version of the imported GIR library
         * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L189
         */
        const __version__: string;
    }

    export default AstalHyprland;
}

declare module 'gi://AstalHyprland' {
    import AstalHyprland01 from 'gi://AstalHyprland?version=0.1';
    export default AstalHyprland01;
}
// END
