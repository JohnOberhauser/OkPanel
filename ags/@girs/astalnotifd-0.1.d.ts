/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://AstalNotifd?version=0.1' {
    // Module dependencies
    import type Gio from 'gi://Gio?version=2.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GLib from 'gi://GLib?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';

    export namespace AstalNotifd {
        /**
         * AstalNotifd-0.1
         */

        export namespace Urgency {
            export const $gtype: GObject.GType<Urgency>;
        }

        enum Urgency {
            LOW,
            NORMAL,
            CRITICAL,
        }

        export namespace ClosedReason {
            export const $gtype: GObject.GType<ClosedReason>;
        }

        enum ClosedReason {
            EXPIRED,
            DISMISSED_BY_USER,
            CLOSED,
            UNDEFINED,
        }

        export namespace State {
            export const $gtype: GObject.GType<State>;
        }

        enum State {
            DRAFT,
            SENT,
            RECEIVED,
        }
        const MAJOR_VERSION: number;
        const MINOR_VERSION: number;
        const MICRO_VERSION: number;
        const VERSION: string;
        /**
         * Get the singleton instance of [class`AstalNotifd`.Notifd]
         */
        function get_default(): Notifd;
        /**
         * Send a notification. This function does not depend on Notifd and can be used with any notification server. The [class@
         * AstalNotifd.Notification] passed to this function is never the same instance that [method`AstalNotifd`.Notifd.get_notification] returns. This
         * function will set the state of the passed notification from `DRAFT` to `SENT` after which the notification can no longer be mutated.
         * @param notification
         */
        function send_notification(notification: Notification): globalThis.Promise<void>;
        /**
         * Send a notification. This function does not depend on Notifd and can be used with any notification server. The [class@
         * AstalNotifd.Notification] passed to this function is never the same instance that [method`AstalNotifd`.Notifd.get_notification] returns. This
         * function will set the state of the passed notification from `DRAFT` to `SENT` after which the notification can no longer be mutated.
         * @param notification
         * @param _callback_
         */
        function send_notification(
            notification: Notification,
            _callback_: Gio.AsyncReadyCallback<Notification> | null,
        ): void;
        /**
         * Send a notification. This function does not depend on Notifd and can be used with any notification server. The [class@
         * AstalNotifd.Notification] passed to this function is never the same instance that [method`AstalNotifd`.Notifd.get_notification] returns. This
         * function will set the state of the passed notification from `DRAFT` to `SENT` after which the notification can no longer be mutated.
         * @param notification
         * @param _callback_
         */
        function send_notification(
            notification: Notification,
            _callback_?: Gio.AsyncReadyCallback<Notification> | null,
        ): globalThis.Promise<void> | void;
        function send_notification_finish(_res_: Gio.AsyncResult): void;
        namespace Action {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                invoked: () => void;
                'notify::id': (pspec: GObject.ParamSpec) => void;
                'notify::label': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                id: string;
                label: string;
            }
        }

        /**
         * Notification action.
         */
        class Action extends GObject.Object {
            static $gtype: GObject.GType<Action>;

            // Properties

            /**
             * Id of this action.
             */
            get id(): string;
            set id(val: string);
            /**
             * Label of this action that should be displayed to user.
             */
            get label(): string;
            set label(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Action.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Action.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](id: string, label: string): Action;

            // Signals

            connect<K extends keyof Action.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Action.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Action.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Action.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Action.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Action.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            /**
             * Invoke this action. Note that this method just notifies the client that this action was invoked by the user. If for example this notification
             * persists through the lifetime of the sending application this action will have no effect.
             */
            invoke(): void;
            get_id(): string;
            set_id(value: string): void;
            get_label(): string;
            set_label(value: string): void;
        }

        namespace Notifd {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                notified: (arg0: number, arg1: boolean) => void;
                resolved: (arg0: number, arg1: ClosedReason) => void;
                'notify::ignore-timeout': (pspec: GObject.ParamSpec) => void;
                'notify::dont-disturb': (pspec: GObject.ParamSpec) => void;
                'notify::default-timeout': (pspec: GObject.ParamSpec) => void;
                'notify::notifications': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                ignore_timeout: boolean;
                ignoreTimeout: boolean;
                dont_disturb: boolean;
                dontDisturb: boolean;
                default_timeout: number;
                defaultTimeout: number;
                notifications: Notification[];
            }
        }

        /**
         * The Notification daemon.
         * This class queues up to become the next daemon, while acting as a proxy in the meantime.
         */
        class Notifd extends GObject.Object {
            static $gtype: GObject.GType<Notifd>;

            // Properties

            /**
             * Ignore the timeout specified by incoming notifications. By default notifications can specify a timeout in milliseconds after which the daemon
             * will resolve them even without user input.
             */
            get ignore_timeout(): boolean;
            set ignore_timeout(val: boolean);
            /**
             * Ignore the timeout specified by incoming notifications. By default notifications can specify a timeout in milliseconds after which the daemon
             * will resolve them even without user input.
             */
            get ignoreTimeout(): boolean;
            set ignoreTimeout(val: boolean);
            /**
             * Indicate to frontends to not show popups to the user. This property does not have any effect on its own, its merely a value to use between the
             * daemon process and proxies for frontends to use.
             */
            get dont_disturb(): boolean;
            set dont_disturb(val: boolean);
            /**
             * Indicate to frontends to not show popups to the user. This property does not have any effect on its own, its merely a value to use between the
             * daemon process and proxies for frontends to use.
             */
            get dontDisturb(): boolean;
            set dontDisturb(val: boolean);
            /**
             * Timeout used for notifications that do not specify a timeout and let the server decide. Negative values result in no timeout. By default this
             * is -1.
             */
            get default_timeout(): number;
            set default_timeout(val: number);
            /**
             * Timeout used for notifications that do not specify a timeout and let the server decide. Negative values result in no timeout. By default this
             * is -1.
             */
            get defaultTimeout(): number;
            set defaultTimeout(val: number);
            /**
             * List of currently unresolved notifications.
             */
            get notifications(): Notification[];

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Notifd.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Notifd.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Notifd;

            // Signals

            connect<K extends keyof Notifd.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Notifd.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Notifd.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Notifd.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Notifd.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Notifd.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Static methods

            /**
             * Get the singleton instance
             */
            static get_default(): Notifd;

            // Methods

            /**
             * Gets the [class`AstalNotifd`.Notification] with id or null if there is no such Notification.
             * @param id
             */
            get_notification(id: number): Notification | null;
            get_ignore_timeout(): boolean;
            set_ignore_timeout(value: boolean): void;
            get_dont_disturb(): boolean;
            set_dont_disturb(value: boolean): void;
            get_default_timeout(): number;
            set_default_timeout(value: number): void;
            get_notifications(): Notification[];
        }

        namespace Notification {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                resolved: (arg0: ClosedReason) => void;
                invoked: (arg0: string) => void;
                'notify::state': (pspec: GObject.ParamSpec) => void;
                'notify::time': (pspec: GObject.ParamSpec) => void;
                'notify::id': (pspec: GObject.ParamSpec) => void;
                'notify::app-name': (pspec: GObject.ParamSpec) => void;
                'notify::app-icon': (pspec: GObject.ParamSpec) => void;
                'notify::summary': (pspec: GObject.ParamSpec) => void;
                'notify::body': (pspec: GObject.ParamSpec) => void;
                'notify::expire-timeout': (pspec: GObject.ParamSpec) => void;
                'notify::actions': (pspec: GObject.ParamSpec) => void;
                'notify::hints': (pspec: GObject.ParamSpec) => void;
                'notify::image': (pspec: GObject.ParamSpec) => void;
                'notify::action-icons': (pspec: GObject.ParamSpec) => void;
                'notify::category': (pspec: GObject.ParamSpec) => void;
                'notify::desktop-entry': (pspec: GObject.ParamSpec) => void;
                'notify::resident': (pspec: GObject.ParamSpec) => void;
                'notify::sound-file': (pspec: GObject.ParamSpec) => void;
                'notify::sound-name': (pspec: GObject.ParamSpec) => void;
                'notify::suppress-sound': (pspec: GObject.ParamSpec) => void;
                'notify::transient': (pspec: GObject.ParamSpec) => void;
                'notify::x': (pspec: GObject.ParamSpec) => void;
                'notify::y': (pspec: GObject.ParamSpec) => void;
                'notify::urgency': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                state: State;
                time: number;
                id: number;
                app_name: string;
                appName: string;
                app_icon: string;
                appIcon: string;
                summary: string;
                body: string;
                expire_timeout: number;
                expireTimeout: number;
                actions: Action[];
                hints: GLib.Variant;
                image: string;
                action_icons: boolean;
                actionIcons: boolean;
                category: string;
                desktop_entry: string;
                desktopEntry: string;
                resident: boolean;
                sound_file: string;
                soundFile: string;
                sound_name: string;
                soundName: string;
                suppress_sound: boolean;
                suppressSound: boolean;
                transient: boolean;
                x: number;
                y: number;
                urgency: Urgency;
            }
        }

        /**
         * Class representing a notification.
         */
        class Notification extends GObject.Object {
            static $gtype: GObject.GType<Notification>;

            // Properties

            /**
             * State of the notification.
             */
            get state(): State;
            set state(val: State);
            /**
             * Unix time of when the notification was sent or received.
             */
            get time(): number;
            set time(val: number);
            /**
             * Id of the notification.
             */
            get id(): number;
            set id(val: number);
            /**
             * Name of the sending application.
             */
            get app_name(): string;
            set app_name(val: string);
            /**
             * Name of the sending application.
             */
            get appName(): string;
            set appName(val: string);
            /**
             * Icon name of the sending application.
             */
            get app_icon(): string;
            set app_icon(val: string);
            /**
             * Icon name of the sending application.
             */
            get appIcon(): string;
            set appIcon(val: string);
            /**
             * Single line overview of the notification.
             */
            get summary(): string;
            set summary(val: string);
            /**
             * Multi-line body of text, where each line is a paragraph. May contain markup.
             */
            get body(): string;
            set body(val: string);
            /**
             * Time in milliseconds after the notification expires.
             */
            get expire_timeout(): number;
            set expire_timeout(val: number);
            /**
             * Time in milliseconds after the notification expires.
             */
            get expireTimeout(): number;
            set expireTimeout(val: number);
            /**
             * List of [class`AstalNotifd`.Action] of the notification. Can be invoked by calling [method`AstalNotifd`.Notification.invoke] with
             * the action's id.
             */
            get actions(): Action[];
            /**
             * Hints of the notification. Hints are a way to provide extra data to servers. To set hints on a `DRAFT` Notification use [method@
             * AstalNotifd.Notification.set_hint] or the property setters for standard hints.
             */
            get hints(): GLib.Variant;
            set hints(val: GLib.Variant);
            /**
             * Standard `image-path` hint. Path of an image
             */
            get image(): string;
            set image(val: string);
            /**
             * Standard `action-icons` hint. Indicates whether [class`AstalNotifd`.Action] identifier should be interpreted as a named icon.
             */
            get action_icons(): boolean;
            set action_icons(val: boolean);
            /**
             * Standard `action-icons` hint. Indicates whether [class`AstalNotifd`.Action] identifier should be interpreted as a named icon.
             */
            get actionIcons(): boolean;
            set actionIcons(val: boolean);
            /**
             * Standard `category` hint. [](https://specifications.freedesktop.org/notification-spec/latest/categories.html)
             */
            get category(): string;
            set category(val: string);
            /**
             * Standard `desktop-entry` hint. Specifies the name of the desktop filename representing the calling program.
             */
            get desktop_entry(): string;
            set desktop_entry(val: string);
            /**
             * Standard `desktop-entry` hint. Specifies the name of the desktop filename representing the calling program.
             */
            get desktopEntry(): string;
            set desktopEntry(val: string);
            /**
             * Standard `resident` hint. Indicates whether notification is kept after action invocation.
             */
            get resident(): boolean;
            set resident(val: boolean);
            /**
             * Standard `sound-file` hint. The path to a sound file to play when the notification pops up.
             */
            get sound_file(): string;
            set sound_file(val: string);
            /**
             * Standard `sound-file` hint. The path to a sound file to play when the notification pops up.
             */
            get soundFile(): string;
            set soundFile(val: string);
            /**
             * Standard `sound-name` hint. A themeable named sound from to play when the notification pops up
             */
            get sound_name(): string;
            set sound_name(val: string);
            /**
             * Standard `sound-name` hint. A themeable named sound from to play when the notification pops up
             */
            get soundName(): string;
            set soundName(val: string);
            /**
             * Standard `suppress-sound` hint. Indicates to suppress playing any sounds.
             */
            get suppress_sound(): boolean;
            set suppress_sound(val: boolean);
            /**
             * Standard `suppress-sound` hint. Indicates to suppress playing any sounds.
             */
            get suppressSound(): boolean;
            set suppressSound(val: boolean);
            /**
             * Standard `transient` hint. Indicates that the notification should be excluded from persistency.
             */
            get transient(): boolean;
            set transient(val: boolean);
            /**
             * Standard `x` hint. Specifies the X location on the screen that the notification should point to. The "y" hint must also be specified.
             */
            get x(): number;
            set x(val: number);
            /**
             * Standard `y` hint. Specifies the Y location on the screen that the notification should point to. The "x" hint must also be specified.
             */
            get y(): number;
            set y(val: number);
            /**
             * Standard `urgency` hint. [enum`AstalNotifd`.Urgency] level of the notification.
             */
            get urgency(): Urgency;
            set urgency(val: Urgency);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Notification.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Notification.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Notification;

            // Signals

            connect<K extends keyof Notification.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Notification.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Notification.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Notification.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Notification.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Notification.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            /**
             * Resolve this notification with [enum`AstalNotifd`.ClosedReason.DISMISSED_BY_USER].
             */
            dismiss(): void;
            /**
             * Resolve this notification with [enum`AstalNotifd`.ClosedReason.EXPIRED]. Note that there should be no reason to use this method because
             * expiration should be left to the daemon.
             */
            expire(): void;
            /**
             * Invoke an [class`AstalNotifd`.Action] of this notification.
             * @param action_id
             */
            invoke(action_id: string): void;
            add_action(action: Action): Notification;
            set_hint(name: string, value: GLib.Variant): Notification;
            get_hint(name: string): GLib.Variant | null;
            get_state(): State;
            get_time(): number;
            get_id(): number;
            set_id(value: number): void;
            get_app_name(): string;
            set_app_name(value: string): void;
            get_app_icon(): string;
            set_app_icon(value: string): void;
            get_summary(): string;
            set_summary(value: string): void;
            get_body(): string;
            set_body(value: string): void;
            get_expire_timeout(): number;
            set_expire_timeout(value: number): void;
            get_actions(): Action[];
            get_hints(): GLib.Variant;
            get_image(): string;
            set_image(value: string): void;
            get_action_icons(): boolean;
            set_action_icons(value: boolean): void;
            get_category(): string;
            set_category(value: string): void;
            get_desktop_entry(): string;
            set_desktop_entry(value: string): void;
            get_resident(): boolean;
            set_resident(value: boolean): void;
            get_sound_file(): string;
            set_sound_file(value: string): void;
            get_sound_name(): string;
            set_sound_name(value: string): void;
            get_suppress_sound(): boolean;
            set_suppress_sound(value: boolean): void;
            get_transient(): boolean;
            set_transient(value: boolean): void;
            get_x(): number;
            set_x(value: number): void;
            get_y(): number;
            set_y(value: number): void;
            get_urgency(): Urgency;
            set_urgency(value: Urgency | null): void;
        }

        type ActionClass = typeof Action;
        abstract class ActionPrivate {
            static $gtype: GObject.GType<ActionPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type NotifdClass = typeof Notifd;
        abstract class NotifdPrivate {
            static $gtype: GObject.GType<NotifdPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type NotificationClass = typeof Notification;
        abstract class NotificationPrivate {
            static $gtype: GObject.GType<NotificationPrivate>;

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

    export default AstalNotifd;
}

declare module 'gi://AstalNotifd' {
    import AstalNotifd01 from 'gi://AstalNotifd?version=0.1';
    export default AstalNotifd01;
}
// END
