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

declare module 'gi://AstalGreet?version=0.1' {
    // Module dependencies
    import type Gio from 'gi://Gio?version=2.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GLib from 'gi://GLib?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';

    export namespace AstalGreet {
        /**
         * AstalGreet-0.1
         */

        export namespace ErrorType {
            export const $gtype: GObject.GType<ErrorType>;
        }

        enum ErrorType {
            /**
             * Indicates that authentication failed. This is not a fatal error, and is likely caused by incorrect credentials.
             */
            AUTH_ERROR,
            /**
             * A general error. See the error description for more information.
             */
            ERROR,
        }

        export namespace AuthMessageType {
            export const $gtype: GObject.GType<AuthMessageType>;
        }

        enum AuthMessageType {
            /**
             * Indicates that input from the user should be visible when they answer this question.
             */
            VISIBLE,
            /**
             * Indicates that input from the user should be considered secret when they answer this question.
             */
            SECRET,
            /**
             * Indicates that this message is informative, not a question.
             */
            INFO,
            /**
             * Indicates that this message is an error, not a question.
             */
            ERROR,
        }
        const MAJOR_VERSION: number;
        const MINOR_VERSION: number;
        const MICRO_VERSION: number;
        const VERSION: string;
        /**
         * Shorthand for creating a session, posting the password, and starting the session with the given `cmd` which is parsed with [func@
         * GLib.shell_parse_argv].
         * @param username User to login to
         * @param password Password of the user
         * @param cmd Command to start the session with
         */
        function login(username: string, password: string, cmd: string): globalThis.Promise<void>;
        /**
         * Shorthand for creating a session, posting the password, and starting the session with the given `cmd` which is parsed with [func@
         * GLib.shell_parse_argv].
         * @param username User to login to
         * @param password Password of the user
         * @param cmd Command to start the session with
         * @param _callback_
         */
        function login(
            username: string,
            password: string,
            cmd: string,
            _callback_: Gio.AsyncReadyCallback<string> | null,
        ): void;
        /**
         * Shorthand for creating a session, posting the password, and starting the session with the given `cmd` which is parsed with [func@
         * GLib.shell_parse_argv].
         * @param username User to login to
         * @param password Password of the user
         * @param cmd Command to start the session with
         * @param _callback_
         */
        function login(
            username: string,
            password: string,
            cmd: string,
            _callback_?: Gio.AsyncReadyCallback<string> | null,
        ): globalThis.Promise<void> | void;
        function login_finish(_res_: Gio.AsyncResult): void;
        /**
         * Same as [func`AstalGreet`.login] but allow for setting additonal env in the form of `name=value` pairs.
         * @param username User to login to
         * @param password Password of the user
         * @param cmd Command to start the session with
         * @param env Additonal env vars to set for the session
         */
        function login_with_env(
            username: string,
            password: string,
            cmd: string,
            env: string[],
        ): globalThis.Promise<void>;
        /**
         * Same as [func`AstalGreet`.login] but allow for setting additonal env in the form of `name=value` pairs.
         * @param username User to login to
         * @param password Password of the user
         * @param cmd Command to start the session with
         * @param env Additonal env vars to set for the session
         * @param _callback_
         */
        function login_with_env(
            username: string,
            password: string,
            cmd: string,
            env: string[],
            _callback_: Gio.AsyncReadyCallback<string> | null,
        ): void;
        /**
         * Same as [func`AstalGreet`.login] but allow for setting additonal env in the form of `name=value` pairs.
         * @param username User to login to
         * @param password Password of the user
         * @param cmd Command to start the session with
         * @param env Additonal env vars to set for the session
         * @param _callback_
         */
        function login_with_env(
            username: string,
            password: string,
            cmd: string,
            env: string[],
            _callback_?: Gio.AsyncReadyCallback<string> | null,
        ): globalThis.Promise<void> | void;
        function login_with_env_finish(_res_: Gio.AsyncResult): void;
        namespace Request {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::type-name': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                type_name: string;
                typeName: string;
            }
        }

        /**
         * Base Request type.
         */
        abstract class Request extends GObject.Object {
            static $gtype: GObject.GType<Request>;

            // Properties

            get type_name(): string;
            get typeName(): string;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Request.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Request.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof Request.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Request.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Request.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Request.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Request.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Request.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Virtual methods

            vfunc_get_type_name(): string;

            // Methods

            /**
             * Send this request to greetd.
             */
            send(): globalThis.Promise<Response>;
            /**
             * Send this request to greetd.
             * @param _callback_
             */
            send(_callback_: Gio.AsyncReadyCallback<this> | null): void;
            /**
             * Send this request to greetd.
             * @param _callback_
             */
            send(_callback_?: Gio.AsyncReadyCallback<this> | null): globalThis.Promise<Response> | void;
            send_finish(_res_: Gio.AsyncResult): Response;
            get_type_name(): string;
        }

        namespace CreateSession {
            // Signal signatures
            interface SignalSignatures extends Request.SignalSignatures {
                'notify::username': (pspec: GObject.ParamSpec) => void;
                'notify::type-name': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends Request.ConstructorProps {
                username: string;
            }
        }

        /**
         * Creates a session and initiates a login attempted for the given user. The session is ready to be started if a success is returned.
         */
        class CreateSession extends Request {
            static $gtype: GObject.GType<CreateSession>;

            // Properties

            get username(): string;
            set username(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: CreateSession.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<CreateSession.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](username: string): CreateSession;

            // Signals

            connect<K extends keyof CreateSession.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, CreateSession.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof CreateSession.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, CreateSession.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof CreateSession.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<CreateSession.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_username(): string;
            set_username(value: string): void;
        }

        namespace PostAuthMesssage {
            // Signal signatures
            interface SignalSignatures extends Request.SignalSignatures {
                'notify::response': (pspec: GObject.ParamSpec) => void;
                'notify::type-name': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends Request.ConstructorProps {
                response: string;
            }
        }

        /**
         * Answers an authentication message. If the message was informative (info, error), then a response does not need to be set in this
         * message. The session is ready to be started if a success is returned.
         */
        class PostAuthMesssage extends Request {
            static $gtype: GObject.GType<PostAuthMesssage>;

            // Properties

            get response(): string;
            set response(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: PostAuthMesssage.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<PostAuthMesssage.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](response: string): PostAuthMesssage;

            // Signals

            connect<K extends keyof PostAuthMesssage.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, PostAuthMesssage.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof PostAuthMesssage.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, PostAuthMesssage.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof PostAuthMesssage.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<PostAuthMesssage.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_response(): string;
            set_response(value: string): void;
        }

        namespace StartSession {
            // Signal signatures
            interface SignalSignatures extends Request.SignalSignatures {
                'notify::cmd': (pspec: GObject.ParamSpec) => void;
                'notify::env': (pspec: GObject.ParamSpec) => void;
                'notify::type-name': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends Request.ConstructorProps {
                cmd: string[];
                env: string[];
            }
        }

        /**
         * Requests for the session to be started using the provided command line, adding the supplied environment to that created by PAM. The session
         * will start after the greeter process terminates
         */
        class StartSession extends Request {
            static $gtype: GObject.GType<StartSession>;

            // Properties

            get cmd(): string[];
            set cmd(val: string[]);
            get env(): string[];
            set env(val: string[]);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: StartSession.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<StartSession.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](cmd: string[], env: string[]): StartSession;

            // Signals

            connect<K extends keyof StartSession.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, StartSession.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof StartSession.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, StartSession.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof StartSession.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<StartSession.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_cmd(): string[];
            set_cmd(value: string[]): void;
            get_env(): string[];
            set_env(value: string[]): void;
        }

        namespace CancelSession {
            // Signal signatures
            interface SignalSignatures extends Request.SignalSignatures {
                'notify::type-name': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends Request.ConstructorProps {}
        }

        /**
         * Cancels the session that is currently under configuration.
         */
        class CancelSession extends Request {
            static $gtype: GObject.GType<CancelSession>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: CancelSession.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<CancelSession.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): CancelSession;

            // Signals

            connect<K extends keyof CancelSession.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, CancelSession.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof CancelSession.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, CancelSession.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof CancelSession.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<CancelSession.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;
        }

        namespace Response {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {}

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {}
        }

        /**
         * Base Response type.
         */
        abstract class Response extends GObject.Object {
            static $gtype: GObject.GType<Response>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Response.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Response.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof Response.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Response.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Response.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Response.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Response.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Response.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;
        }

        namespace Success {
            // Signal signatures
            interface SignalSignatures extends Response.SignalSignatures {}

            // Constructor properties interface

            interface ConstructorProps extends Response.ConstructorProps {}
        }

        /**
         * Indicates that the request succeeded.
         */
        class Success extends Response {
            static $gtype: GObject.GType<Success>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Success.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Success.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof Success.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Success.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Success.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Success.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Success.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Success.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;
        }

        namespace Error {
            // Signal signatures
            interface SignalSignatures extends Response.SignalSignatures {
                'notify::error-type': (pspec: GObject.ParamSpec) => void;
                'notify::description': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends Response.ConstructorProps {
                error_type: ErrorType;
                errorType: ErrorType;
                description: string;
            }
        }

        /**
         * Indicates that the request succeeded.
         */
        class Error extends Response {
            static $gtype: GObject.GType<Error>;

            // Properties

            get error_type(): ErrorType;
            set error_type(val: ErrorType);
            get errorType(): ErrorType;
            set errorType(val: ErrorType);
            get description(): string;
            set description(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Error.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Error.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof Error.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Error.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Error.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Error.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Error.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Error.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_error_type(): ErrorType;
            get_description(): string;
        }

        namespace AuthMessage {
            // Signal signatures
            interface SignalSignatures extends Response.SignalSignatures {
                'notify::message-type': (pspec: GObject.ParamSpec) => void;
                'notify::message': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends Response.ConstructorProps {
                message_type: AuthMessageType;
                messageType: AuthMessageType;
                message: string;
            }
        }

        /**
         * Indicates that the request succeeded.
         */
        class AuthMessage extends Response {
            static $gtype: GObject.GType<AuthMessage>;

            // Properties

            get message_type(): AuthMessageType;
            set message_type(val: AuthMessageType);
            get messageType(): AuthMessageType;
            set messageType(val: AuthMessageType);
            get message(): string;
            set message(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: AuthMessage.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<AuthMessage.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof AuthMessage.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AuthMessage.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof AuthMessage.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, AuthMessage.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof AuthMessage.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<AuthMessage.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_message_type(): AuthMessageType;
            get_message(): string;
        }

        type RequestClass = typeof Request;
        abstract class RequestPrivate {
            static $gtype: GObject.GType<RequestPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type CreateSessionClass = typeof CreateSession;
        abstract class CreateSessionPrivate {
            static $gtype: GObject.GType<CreateSessionPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type PostAuthMesssageClass = typeof PostAuthMesssage;
        abstract class PostAuthMesssagePrivate {
            static $gtype: GObject.GType<PostAuthMesssagePrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type StartSessionClass = typeof StartSession;
        abstract class StartSessionPrivate {
            static $gtype: GObject.GType<StartSessionPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type CancelSessionClass = typeof CancelSession;
        abstract class CancelSessionPrivate {
            static $gtype: GObject.GType<CancelSessionPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type ResponseClass = typeof Response;
        abstract class ResponsePrivate {
            static $gtype: GObject.GType<ResponsePrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type SuccessClass = typeof Success;
        abstract class SuccessPrivate {
            static $gtype: GObject.GType<SuccessPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type ErrorClass = typeof Error;
        abstract class ErrorPrivate {
            static $gtype: GObject.GType<ErrorPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type AuthMessageClass = typeof AuthMessage;
        abstract class AuthMessagePrivate {
            static $gtype: GObject.GType<AuthMessagePrivate>;

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

    export default AstalGreet;
}

declare module 'gi://AstalGreet' {
    import AstalGreet01 from 'gi://AstalGreet?version=0.1';
    export default AstalGreet01;
}
// END
