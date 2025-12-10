/// <reference path="./nm-1.0.d.ts" />
/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />
/// <reference path="./gtk-4.0.d.ts" />
/// <reference path="./gsk-4.0.d.ts" />
/// <reference path="./graphene-1.0.d.ts" />
/// <reference path="./gdk-4.0.d.ts" />
/// <reference path="./cairo-1.0.d.ts" />
/// <reference path="./cairo.d.ts" />
/// <reference path="./pangocairo-1.0.d.ts" />
/// <reference path="./pango-1.0.d.ts" />
/// <reference path="./harfbuzz-0.0.d.ts" />
/// <reference path="./freetype2-2.0.d.ts" />
/// <reference path="./gdkpixbuf-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://NMA4?version=1.0' {
    // Module dependencies
    import type NM from 'gi://NM?version=1.0';
    import type Gio from 'gi://Gio?version=2.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GLib from 'gi://GLib?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';
    import type Gtk from 'gi://Gtk?version=4.0';
    import type Gsk from 'gi://Gsk?version=4.0';
    import type Graphene from 'gi://Graphene?version=1.0';
    import type Gdk from 'gi://Gdk?version=4.0';
    import type cairo from 'cairo';
    import type PangoCairo from 'gi://PangoCairo?version=1.0';
    import type Pango from 'gi://Pango?version=1.0';
    import type HarfBuzz from 'gi://HarfBuzz?version=0.0';
    import type freetype2 from 'gi://freetype2?version=2.0';
    import type GdkPixbuf from 'gi://GdkPixbuf?version=2.0';

    export namespace NMA4 {
        /**
         * NMA4-1.0
         */

        /**
         * Flags that controls what is the certificate chooser button able to pick.
         * Currently only local files are supported, but might be extended to use URIs,
         * such as PKCS\#11 certificate URIs in future as well.
         */

        /**
         * Flags that controls what is the certificate chooser button able to pick.
         * Currently only local files are supported, but might be extended to use URIs,
         * such as PKCS\#11 certificate URIs in future as well.
         */
        export namespace CertChooserFlags {
            export const $gtype: GObject.GType<CertChooserFlags>;
        }

        enum CertChooserFlags {
            /**
             * No flags
             */
            NONE,
            /**
             * Only pick a certificate, not a key
             */
            CERT,
            /**
             * Hide all controls but the secrets entries
             */
            PASSWORDS,
            /**
             * Ensure the chooser only selects regular PEM files
             */
            PEM,
            /**
             * Do not show password entries (Since: 1.8.34)
             */
            NO_PASSWORDS,
        }

        export namespace MobileFamily {
            export const $gtype: GObject.GType<MobileFamily>;
        }

        enum MobileFamily {
            /**
             * Unknown or invalid network access method
             */
            UNKNOWN,
            /**
             * 3rd Generation Partnership Project (3GPP) network
             */
            '3GPP',
            /**
             * A CDMA network
             */
            CDMA,
        }
        const BAR_CODE_SIZE: string;
        const BAR_CODE_TEXT: string;
        const BAR_CODE_WIDGET_CONNECTION: string;
        /**
         * Evaluates to the major version number of NetworkManager which this source
         * is compiled against.
         */
        const MAJOR_VERSION: number;
        /**
         * Evaluates to the micro version number of NetworkManager which this source
         * compiled against.
         */
        const MICRO_VERSION: number;
        /**
         * Evaluates to the minor version number of NetworkManager which this source
         * is compiled against.
         */
        const MINOR_VERSION: number;
        /**
         * Splits the input MCCMNC string into separate MCC and MNC strings.
         * @param mccmnc input MCCMNC string.
         * @returns %TRUE if correctly split and @mcc and @mnc are set; %FALSE otherwise.
         */
        function mobile_providers_split_3gpp_mcc_mnc(mccmnc: string): [boolean, string, string];
        /**
         * Returns secret flags corresponding to the selected password storage menu
         * in the attached icon
         * @param passwd_entry password #GtkEntry which the password icon/menu is attached to
         * @returns secret flags corresponding to the active item in password menu
         */
        function utils_menu_to_secret_flags(passwd_entry: Gtk.Widget): NM.SettingSecretFlags;
        /**
         * Adds a secondary icon and creates a popup menu for password entry.
         * The active menu item is set up according to initial_flags, or
         * from `setting/``password_flags_name` (if they are not NULL).
         * If the `setting/``password_flags_name` are not NULL, secret flags will
         * be automatically updated in the setting when menu is changed.
         * @param passwd_entry password #GtkEntry which the icon is attached to
         * @param initial_flags initial secret flags to setup password menu from
         * @param setting #NMSetting containing the password, or NULL
         * @param password_flags_name name of the secret flags (like psk-flags), or NULL
         * @param with_not_required whether to include "Not required" menu item
         * @param ask_mode %TRUE if the entry is shown in ASK mode. That means,   while prompting for a password, contrary to being inside the   editor mode.   If %TRUE, the entry should be sensivive on selected "always-ask"   icon (this is e.f. for nm-applet asking for password), otherwise   not.   If %FALSE, it shall not be possible to select a different storage,   because we only prompt for a password, we cannot change the password   location.
         */
        function utils_setup_password_storage(
            passwd_entry: Gtk.Widget,
            initial_flags: NM.SettingSecretFlags | null,
            setting: NM.Setting,
            password_flags_name: string,
            with_not_required: boolean,
            ask_mode: boolean,
        ): void;
        /**
         * Updates secret flags in the password storage popup menu and also
         * in the `setting` (if `setting` and `password_flags_name` are not NULL).
         * @param passwd_entry #GtkEntry with the password
         * @param secret_flags secret flags to set
         * @param setting #NMSetting containing the password, or NULL
         * @param password_flags_name name of the secret flags (like psk-flags), or NULL
         */
        function utils_update_password_storage(
            passwd_entry: Gtk.Widget,
            secret_flags: NM.SettingSecretFlags | null,
            setting: NM.Setting,
            password_flags_name: string,
        ): void;
        interface MobileWizardCallback {
            (self: MobileWizard, canceled: boolean, method: MobileWizardAccessMethod): void;
        }
        namespace BarCode {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::size': (pspec: GObject.ParamSpec) => void;
                'notify::text': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                size: number;
                text: string;
            }
        }

        class BarCode extends GObject.Object {
            static $gtype: GObject.GType<BarCode>;

            // Properties

            get size(): number;
            set text(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: BarCode.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<BarCode.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](text: string): BarCode;

            // Signals

            connect<K extends keyof BarCode.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, BarCode.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof BarCode.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, BarCode.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof BarCode.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<BarCode.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            /**
             * Draws the QR code onto the given context.
             * @param cr cairo context
             */
            draw(cr: cairo.Context): void;
            get_size(): number;
            /**
             * Regenerates the QR code for a different text.
             * @param text new bar code text
             */
            set_text(text: string): void;
        }

        namespace BarCodeWidget {
            // Signal signatures
            interface SignalSignatures extends Gtk.Box.SignalSignatures {
                'notify::connection': (pspec: GObject.ParamSpec) => void;
                'notify::baseline-child': (pspec: GObject.ParamSpec) => void;
                'notify::baseline-position': (pspec: GObject.ParamSpec) => void;
                'notify::homogeneous': (pspec: GObject.ParamSpec) => void;
                'notify::spacing': (pspec: GObject.ParamSpec) => void;
                'notify::can-focus': (pspec: GObject.ParamSpec) => void;
                'notify::can-target': (pspec: GObject.ParamSpec) => void;
                'notify::css-classes': (pspec: GObject.ParamSpec) => void;
                'notify::css-name': (pspec: GObject.ParamSpec) => void;
                'notify::cursor': (pspec: GObject.ParamSpec) => void;
                'notify::focus-on-click': (pspec: GObject.ParamSpec) => void;
                'notify::focusable': (pspec: GObject.ParamSpec) => void;
                'notify::halign': (pspec: GObject.ParamSpec) => void;
                'notify::has-default': (pspec: GObject.ParamSpec) => void;
                'notify::has-focus': (pspec: GObject.ParamSpec) => void;
                'notify::has-tooltip': (pspec: GObject.ParamSpec) => void;
                'notify::height-request': (pspec: GObject.ParamSpec) => void;
                'notify::hexpand': (pspec: GObject.ParamSpec) => void;
                'notify::hexpand-set': (pspec: GObject.ParamSpec) => void;
                'notify::layout-manager': (pspec: GObject.ParamSpec) => void;
                'notify::limit-events': (pspec: GObject.ParamSpec) => void;
                'notify::margin-bottom': (pspec: GObject.ParamSpec) => void;
                'notify::margin-end': (pspec: GObject.ParamSpec) => void;
                'notify::margin-start': (pspec: GObject.ParamSpec) => void;
                'notify::margin-top': (pspec: GObject.ParamSpec) => void;
                'notify::name': (pspec: GObject.ParamSpec) => void;
                'notify::opacity': (pspec: GObject.ParamSpec) => void;
                'notify::overflow': (pspec: GObject.ParamSpec) => void;
                'notify::parent': (pspec: GObject.ParamSpec) => void;
                'notify::receives-default': (pspec: GObject.ParamSpec) => void;
                'notify::root': (pspec: GObject.ParamSpec) => void;
                'notify::scale-factor': (pspec: GObject.ParamSpec) => void;
                'notify::sensitive': (pspec: GObject.ParamSpec) => void;
                'notify::tooltip-markup': (pspec: GObject.ParamSpec) => void;
                'notify::tooltip-text': (pspec: GObject.ParamSpec) => void;
                'notify::valign': (pspec: GObject.ParamSpec) => void;
                'notify::vexpand': (pspec: GObject.ParamSpec) => void;
                'notify::vexpand-set': (pspec: GObject.ParamSpec) => void;
                'notify::visible': (pspec: GObject.ParamSpec) => void;
                'notify::width-request': (pspec: GObject.ParamSpec) => void;
                'notify::orientation': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends Gtk.Box.ConstructorProps,
                    Gtk.Accessible.ConstructorProps,
                    Gtk.Buildable.ConstructorProps,
                    Gtk.ConstraintTarget.ConstructorProps,
                    Gtk.Orientable.ConstructorProps {
                connection: NM.Connection;
            }
        }

        class BarCodeWidget
            extends Gtk.Box
            implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable
        {
            static $gtype: GObject.GType<BarCodeWidget>;

            // Properties

            get connection(): NM.Connection;
            set connection(val: NM.Connection);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: BarCodeWidget.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<BarCodeWidget.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof BarCodeWidget.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, BarCodeWidget.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof BarCodeWidget.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, BarCodeWidget.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof BarCodeWidget.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<BarCodeWidget.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Inherited properties
            /**
             * The orientation of the orientable.
             */
            get orientation(): Gtk.Orientation;
            set orientation(val: Gtk.Orientation);

            // Inherited methods
            /**
             * Retrieves the orientation of the `orientable`.
             * @returns the orientation of the @orientable
             */
            get_orientation(): Gtk.Orientation;
            /**
             * Sets the orientation of the `orientable`.
             * @param orientation the orientable’s new orientation
             */
            set_orientation(orientation: Gtk.Orientation | null): void;
            /**
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target`.
             *
             * Whenever the `source_property` is changed the `target_property` is
             * updated using the same value. For instance:
             *
             *
             * ```c
             *   g_object_bind_property (action, "active", widget, "sensitive", 0);
             * ```
             *
             *
             * Will result in the "sensitive" property of the widget #GObject instance to be
             * updated with the same value of the "active" property of the action #GObject
             * instance.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well.
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. To remove the binding without affecting the
             * `source` and the `target` you can just call g_object_unref() on the returned
             * #GBinding instance.
             *
             * Removing the binding by calling g_object_unref() on it must only be done if
             * the binding, `source` and `target` are only used from a single thread and it
             * is clear that both `source` and `target` outlive the binding. Especially it
             * is not safe to rely on this if the binding, `source` or `target` can be
             * finalized from different threads. Keep another reference to the binding and
             * use g_binding_unbind() instead to be on the safe side.
             *
             * A #GObject can have multiple bindings.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
            ): GObject.Binding;
            /**
             * Complete version of g_object_bind_property().
             *
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target,` allowing you to set the transformation functions to be used by
             * the binding.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well. The `transform_from` function is only used in case
             * of bidirectional bindings, otherwise it will be ignored
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. This will release the reference that is
             * being held on the #GBinding instance; if you want to hold on to the
             * #GBinding instance, you will need to hold a reference to it.
             *
             * To remove the binding, call g_binding_unbind().
             *
             * A #GObject can have multiple bindings.
             *
             * The same `user_data` parameter will be used for both `transform_to`
             * and `transform_from` transformation functions; the `notify` function will
             * be called once, when the binding is removed. If you need different data
             * for each transformation function, please use
             * g_object_bind_property_with_closures() instead.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @param transform_to the transformation function     from the @source to the @target, or %NULL to use the default
             * @param transform_from the transformation function     from the @target to the @source, or %NULL to use the default
             * @param notify a function to call when disposing the binding, to free     resources used by the transformation functions, or %NULL if not required
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property_full(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
                transform_to?: GObject.BindingTransformFunc | null,
                transform_from?: GObject.BindingTransformFunc | null,
                notify?: GLib.DestroyNotify | null,
            ): GObject.Binding;
            // Conflicted with GObject.Object.bind_property_full
            bind_property_full(...args: never[]): any;
            /**
             * This function is intended for #GObject implementations to re-enforce
             * a [floating][floating-ref] object reference. Doing this is seldom
             * required: all #GInitiallyUnowneds are created with a floating reference
             * which usually just needs to be sunken by calling g_object_ref_sink().
             */
            force_floating(): void;
            /**
             * Increases the freeze count on `object`. If the freeze count is
             * non-zero, the emission of "notify" signals on `object` is
             * stopped. The signals are queued until the freeze count is decreased
             * to zero. Duplicate notifications are squashed so that at most one
             * #GObject::notify signal is emitted for each property modified while the
             * object is frozen.
             *
             * This is necessary for accessors that modify multiple properties to prevent
             * premature notification while the object is still being modified.
             */
            freeze_notify(): void;
            /**
             * Gets a named field from the objects table of associations (see g_object_set_data()).
             * @param key name of the key for that association
             * @returns the data if found,          or %NULL if no such data exists.
             */
            get_data(key: string): any | null;
            /**
             * Gets a property of an object.
             *
             * The value can be:
             * - an empty GObject.Value initialized by G_VALUE_INIT, which will be automatically initialized with the expected type of the property (since GLib 2.60)
             * - a GObject.Value initialized with the expected type of the property
             * - a GObject.Value initialized with a type to which the expected type of the property can be transformed
             *
             * In general, a copy is made of the property contents and the caller is responsible for freeing the memory by calling GObject.Value.unset.
             *
             * Note that GObject.Object.get_property is really intended for language bindings, GObject.Object.get is much more convenient for C programming.
             * @param property_name The name of the property to get
             * @param value Return location for the property value. Can be an empty GObject.Value initialized by G_VALUE_INIT (auto-initialized with expected type since GLib 2.60), a GObject.Value initialized with the expected property type, or a GObject.Value initialized with a transformable type
             */
            get_property(property_name: string, value: GObject.Value | any): any;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            get_qdata(quark: GLib.Quark): any | null;
            /**
             * Gets `n_properties` properties for an `object`.
             * Obtained properties will be set to `values`. All properties must be valid.
             * Warnings will be emitted and undefined behaviour may result if invalid
             * properties are passed in.
             * @param names the names of each property to get
             * @param values the values of each property to get
             */
            getv(names: string[], values: (GObject.Value | any)[]): void;
            /**
             * Checks whether `object` has a [floating][floating-ref] reference.
             * @returns %TRUE if @object has a floating reference
             */
            is_floating(): boolean;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param property_name the name of a property installed on the class of @object.
             */
            notify(property_name: string): void;
            /**
             * Emits a "notify" signal for the property specified by `pspec` on `object`.
             *
             * This function omits the property name lookup, hence it is faster than
             * g_object_notify().
             *
             * One way to avoid using g_object_notify() from within the
             * class that registered the properties, and using g_object_notify_by_pspec()
             * instead, is to store the GParamSpec used with
             * g_object_class_install_property() inside a static array, e.g.:
             *
             *
             * ```c
             *   typedef enum
             *   {
             *     PROP_FOO = 1,
             *     PROP_LAST
             *   } MyObjectProperty;
             *
             *   static GParamSpec *properties[PROP_LAST];
             *
             *   static void
             *   my_object_class_init (MyObjectClass *klass)
             *   {
             *     properties[PROP_FOO] = g_param_spec_int ("foo", NULL, NULL,
             *                                              0, 100,
             *                                              50,
             *                                              G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS);
             *     g_object_class_install_property (gobject_class,
             *                                      PROP_FOO,
             *                                      properties[PROP_FOO]);
             *   }
             * ```
             *
             *
             * and then notify a change on the "foo" property with:
             *
             *
             * ```c
             *   g_object_notify_by_pspec (self, properties[PROP_FOO]);
             * ```
             *
             * @param pspec the #GParamSpec of a property installed on the class of @object.
             */
            notify_by_pspec(pspec: GObject.ParamSpec): void;
            /**
             * Increases the reference count of `object`.
             *
             * Since GLib 2.56, if `GLIB_VERSION_MAX_ALLOWED` is 2.56 or greater, the type
             * of `object` will be propagated to the return type (using the GCC typeof()
             * extension), so any casting the caller needs to do on the return type must be
             * explicit.
             * @returns the same @object
             */
            ref(): GObject.Object;
            /**
             * Increase the reference count of `object,` and possibly remove the
             * [floating][floating-ref] reference, if `object` has a floating reference.
             *
             * In other words, if the object is floating, then this call "assumes
             * ownership" of the floating reference, converting it to a normal
             * reference by clearing the floating flag while leaving the reference
             * count unchanged.  If the object is not floating, then this call
             * adds a new normal reference increasing the reference count by one.
             *
             * Since GLib 2.56, the type of `object` will be propagated to the return type
             * under the same conditions as for g_object_ref().
             * @returns @object
             */
            ref_sink(): GObject.Object;
            /**
             * Releases all references to other objects. This can be used to break
             * reference cycles.
             *
             * This function should only be called from object system implementations.
             */
            run_dispose(): void;
            /**
             * Each object carries around a table of associations from
             * strings to pointers.  This function lets you set an association.
             *
             * If the object already had an association with that name,
             * the old association will be destroyed.
             *
             * Internally, the `key` is converted to a #GQuark using g_quark_from_string().
             * This means a copy of `key` is kept permanently (even after `object` has been
             * finalized) — so it is recommended to only use a small, bounded set of values
             * for `key` in your program, to avoid the #GQuark storage growing unbounded.
             * @param key name of the key
             * @param data data to associate with that key
             */
            set_data(key: string, data?: any | null): void;
            /**
             * Sets a property on an object.
             * @param property_name The name of the property to set
             * @param value The value to set the property to
             */
            set_property(property_name: string, value: GObject.Value | any): void;
            /**
             * Remove a specified datum from the object's data associations,
             * without invoking the association's destroy handler.
             * @param key name of the key
             * @returns the data if found, or %NULL          if no such data exists.
             */
            steal_data(key: string): any | null;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata() and removes the `data` from object
             * without invoking its destroy() function (if any was
             * set).
             * Usually, calling this function is only required to update
             * user data pointers with a destroy notifier, for example:
             *
             * ```c
             * void
             * object_add_to_user_list (GObject     *object,
             *                          const gchar *new_string)
             * {
             *   // the quark, naming the object data
             *   GQuark quark_string_list = g_quark_from_static_string ("my-string-list");
             *   // retrieve the old string list
             *   GList *list = g_object_steal_qdata (object, quark_string_list);
             *
             *   // prepend new string
             *   list = g_list_prepend (list, g_strdup (new_string));
             *   // this changed 'list', so we need to set it again
             *   g_object_set_qdata_full (object, quark_string_list, list, free_string_list);
             * }
             * static void
             * free_string_list (gpointer data)
             * {
             *   GList *node, *list = data;
             *
             *   for (node = list; node; node = node->next)
             *     g_free (node->data);
             *   g_list_free (list);
             * }
             * ```
             *
             * Using g_object_get_qdata() in the above example, instead of
             * g_object_steal_qdata() would have left the destroy function set,
             * and thus the partial string list would have been freed upon
             * g_object_set_qdata_full().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            steal_qdata(quark: GLib.Quark): any | null;
            /**
             * Reverts the effect of a previous call to
             * g_object_freeze_notify(). The freeze count is decreased on `object`
             * and when it reaches zero, queued "notify" signals are emitted.
             *
             * Duplicate notifications for each property are squashed so that at most one
             * #GObject::notify signal is emitted for each property, in the reverse order
             * in which they have been queued.
             *
             * It is an error to call this function when the freeze count is zero.
             */
            thaw_notify(): void;
            /**
             * Decreases the reference count of `object`. When its reference count
             * drops to 0, the object is finalized (i.e. its memory is freed).
             *
             * If the pointer to the #GObject may be reused in future (for example, if it is
             * an instance variable of another object), it is recommended to clear the
             * pointer to %NULL rather than retain a dangling pointer to a potentially
             * invalid #GObject instance. Use g_clear_object() for this.
             */
            unref(): void;
            /**
             * This function essentially limits the life time of the `closure` to
             * the life time of the object. That is, when the object is finalized,
             * the `closure` is invalidated by calling g_closure_invalidate() on
             * it, in order to prevent invocations of the closure with a finalized
             * (nonexisting) object. Also, g_object_ref() and g_object_unref() are
             * added as marshal guards to the `closure,` to ensure that an extra
             * reference count is held on `object` during invocation of the
             * `closure`.  Usually, this function will be called on closures that
             * use this `object` as closure data.
             * @param closure #GClosure to watch
             */
            watch_closure(closure: GObject.Closure): void;
            /**
             * the `constructed` function is called by g_object_new() as the
             *  final step of the object creation process.  At the point of the call, all
             *  construction properties have been set on the object.  The purpose of this
             *  call is to allow for object initialisation steps that can only be performed
             *  after construction properties have been set.  `constructed` implementors
             *  should chain up to the `constructed` call of their parent class to allow it
             *  to complete its initialisation.
             */
            vfunc_constructed(): void;
            /**
             * emits property change notification for a bunch
             *  of properties. Overriding `dispatch_properties_changed` should be rarely
             *  needed.
             * @param n_pspecs
             * @param pspecs
             */
            vfunc_dispatch_properties_changed(n_pspecs: number, pspecs: GObject.ParamSpec): void;
            /**
             * the `dispose` function is supposed to drop all references to other
             *  objects, but keep the instance otherwise intact, so that client method
             *  invocations still work. It may be run multiple times (due to reference
             *  loops). Before returning, `dispose` should chain up to the `dispose` method
             *  of the parent class.
             */
            vfunc_dispose(): void;
            /**
             * instance finalization function, should finish the finalization of
             *  the instance begun in `dispose` and chain up to the `finalize` method of the
             *  parent class.
             */
            vfunc_finalize(): void;
            /**
             * the generic getter for all properties of this type. Should be
             *  overridden for every type with properties.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_get_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param pspec
             */
            vfunc_notify(pspec: GObject.ParamSpec): void;
            /**
             * the generic setter for all properties of this type. Should be
             *  overridden for every type with properties. If implementations of
             *  `set_property` don't emit property change notification explicitly, this will
             *  be done implicitly by the type system. However, if the notify signal is
             *  emitted explicitly, the type system will not emit it a second time.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_set_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Disconnects a handler from an instance so it will not be called during any future or currently ongoing emissions of the signal it has been connected to.
             * @param id Handler ID of the handler to be disconnected
             */
            disconnect(id: number): void;
            /**
             * Sets multiple properties of an object at once. The properties argument should be a dictionary mapping property names to values.
             * @param properties Object containing the properties to set
             */
            set(properties: { [key: string]: any }): void;
            /**
             * Blocks a handler of an instance so it will not be called during any signal emissions
             * @param id Handler ID of the handler to be blocked
             */
            block_signal_handler(id: number): void;
            /**
             * Unblocks a handler so it will be called again during any signal emissions
             * @param id Handler ID of the handler to be unblocked
             */
            unblock_signal_handler(id: number): void;
            /**
             * Stops a signal's emission by the given signal name. This will prevent the default handler and any subsequent signal handlers from being invoked.
             * @param detailedName Name of the signal to stop emission of
             */
            stop_emission_by_name(detailedName: string): void;
        }

        namespace CertChooser {
            // Signal signatures
            interface SignalSignatures extends Gtk.Grid.SignalSignatures {
                'cert-password-validate': () => GLib.Error;
                'cert-validate': () => GLib.Error;
                changed: () => void;
                'key-password-validate': () => GLib.Error;
                'key-validate': () => GLib.Error;
                'notify::flags': (pspec: GObject.ParamSpec) => void;
                'notify::title': (pspec: GObject.ParamSpec) => void;
                'notify::baseline-row': (pspec: GObject.ParamSpec) => void;
                'notify::column-homogeneous': (pspec: GObject.ParamSpec) => void;
                'notify::column-spacing': (pspec: GObject.ParamSpec) => void;
                'notify::row-homogeneous': (pspec: GObject.ParamSpec) => void;
                'notify::row-spacing': (pspec: GObject.ParamSpec) => void;
                'notify::can-focus': (pspec: GObject.ParamSpec) => void;
                'notify::can-target': (pspec: GObject.ParamSpec) => void;
                'notify::css-classes': (pspec: GObject.ParamSpec) => void;
                'notify::css-name': (pspec: GObject.ParamSpec) => void;
                'notify::cursor': (pspec: GObject.ParamSpec) => void;
                'notify::focus-on-click': (pspec: GObject.ParamSpec) => void;
                'notify::focusable': (pspec: GObject.ParamSpec) => void;
                'notify::halign': (pspec: GObject.ParamSpec) => void;
                'notify::has-default': (pspec: GObject.ParamSpec) => void;
                'notify::has-focus': (pspec: GObject.ParamSpec) => void;
                'notify::has-tooltip': (pspec: GObject.ParamSpec) => void;
                'notify::height-request': (pspec: GObject.ParamSpec) => void;
                'notify::hexpand': (pspec: GObject.ParamSpec) => void;
                'notify::hexpand-set': (pspec: GObject.ParamSpec) => void;
                'notify::layout-manager': (pspec: GObject.ParamSpec) => void;
                'notify::limit-events': (pspec: GObject.ParamSpec) => void;
                'notify::margin-bottom': (pspec: GObject.ParamSpec) => void;
                'notify::margin-end': (pspec: GObject.ParamSpec) => void;
                'notify::margin-start': (pspec: GObject.ParamSpec) => void;
                'notify::margin-top': (pspec: GObject.ParamSpec) => void;
                'notify::name': (pspec: GObject.ParamSpec) => void;
                'notify::opacity': (pspec: GObject.ParamSpec) => void;
                'notify::overflow': (pspec: GObject.ParamSpec) => void;
                'notify::parent': (pspec: GObject.ParamSpec) => void;
                'notify::receives-default': (pspec: GObject.ParamSpec) => void;
                'notify::root': (pspec: GObject.ParamSpec) => void;
                'notify::scale-factor': (pspec: GObject.ParamSpec) => void;
                'notify::sensitive': (pspec: GObject.ParamSpec) => void;
                'notify::tooltip-markup': (pspec: GObject.ParamSpec) => void;
                'notify::tooltip-text': (pspec: GObject.ParamSpec) => void;
                'notify::valign': (pspec: GObject.ParamSpec) => void;
                'notify::vexpand': (pspec: GObject.ParamSpec) => void;
                'notify::vexpand-set': (pspec: GObject.ParamSpec) => void;
                'notify::visible': (pspec: GObject.ParamSpec) => void;
                'notify::width-request': (pspec: GObject.ParamSpec) => void;
                'notify::orientation': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends Gtk.Grid.ConstructorProps,
                    Gtk.Accessible.ConstructorProps,
                    Gtk.Buildable.ConstructorProps,
                    Gtk.ConstraintTarget.ConstructorProps,
                    Gtk.Orientable.ConstructorProps {
                flags: number;
                title: string;
            }
        }

        class CertChooser
            extends Gtk.Grid
            implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Orientable
        {
            static $gtype: GObject.GType<CertChooser>;

            // Properties

            set flags(val: number);
            set title(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: CertChooser.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<CertChooser.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](title: string, flags: CertChooserFlags): CertChooser;
            // Conflicted with Gtk.Grid.new

            static ['new'](...args: never[]): any;

            // Signals

            connect<K extends keyof CertChooser.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, CertChooser.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof CertChooser.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, CertChooser.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof CertChooser.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<CertChooser.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            /**
             * Adds the labels to the specified size group so that they are aligned
             * nicely with other entries in a form.
             *
             * It is expected that the NMACertChooser is a GtkGrid with two columns
             * with the labels in the first one.
             * @param group a size group
             */
            add_to_size_group(group: Gtk.SizeGroup): void;
            /**
             * Gets the real certificate location from the chooser button along with the scheme.
             * @returns the certificate path
             */
            get_cert(): [string | null, NM.Setting8021xCKScheme];
            /**
             * Obtains the password or a PIN that was be required to access the certificate.
             * @returns the certificate PIN or password
             */
            get_cert_password(): string;
            /**
             * Returns secret flags corresponding to the certificate password
             * if one is present. The chooser would typically call into
             * nma_utils_menu_to_secret_flags() for the certificate password
             * entry.
             * @returns secret flags corresponding to the certificate password
             */
            get_cert_password_flags(): NM.SettingSecretFlags;
            /**
             * Gets the real certificate URI from the chooser button along with the scheme.
             * @returns the certificate URI
             */
            get_cert_uri(): string | null;
            /**
             * Gets the real key location from the chooser button along with the scheme.
             * @returns the key path
             */
            get_key(): [string | null, NM.Setting8021xCKScheme];
            /**
             * Obtains the password or a PIN that was be required to access the key.
             * @returns the key PIN or password
             */
            get_key_password(): string;
            /**
             * Returns secret flags corresponding to the key password
             * if one is present. The chooser would typically call into
             * nma_utils_menu_to_secret_flags() for the key password
             * entry.
             * @returns secret flags corresponding to the key password
             */
            get_key_password_flags(): NM.SettingSecretFlags;
            /**
             * Gets the real key URI from the chooser button along with the scheme.
             * @returns the key URI
             */
            get_key_uri(): string | null;
            /**
             * Sets the certificate location for the chooser button.
             * @param value the path or URI of a certificate
             * @param scheme the scheme of the certificate path
             */
            set_cert(value: string, scheme: NM.Setting8021xCKScheme | null): void;
            /**
             * Sets the password or a PIN that might be required to access the certificate.
             * @param password the certificate PIN or password
             */
            set_cert_password(password: string): void;
            /**
             * Sets the certificate URI for the chooser button.
             * @param uri the path or URI of a certificate
             */
            set_cert_uri(uri: string): void;
            /**
             * Sets the key location for the chooser button.
             * @param value the path or URI of a key
             * @param scheme the scheme of the key path
             */
            set_key(value: string, scheme: NM.Setting8021xCKScheme | null): void;
            /**
             * Sets the password or a PIN that might be required to access the key.
             * @param password the key PIN or password
             */
            set_key_password(password: string): void;
            /**
             * Sets the key URI for the chooser button.
             * @param uri the URI of a key
             */
            set_key_uri(uri: string): void;
            /**
             * This method basically calls nma_utils_setup_password_storage()
             * on the certificate password entry, in case one is present.
             * @param initial_flags initial secret flags to setup password menu from
             * @param setting #NMSetting containing the password, or NULL
             * @param password_flags_name name of the secret flags (like psk-flags), or NULL
             * @param with_not_required whether to include "Not required" menu item
             * @param ask_mode %TRUE if the entry is shown in ASK mode
             */
            setup_cert_password_storage(
                initial_flags: NM.SettingSecretFlags | null,
                setting: NM.Setting,
                password_flags_name: string,
                with_not_required: boolean,
                ask_mode: boolean,
            ): void;
            /**
             * This method basically calls nma_utils_setup_password_storage()
             * on the key password entry, in case one is present.
             * @param initial_flags initial secret flags to setup password menu from
             * @param setting #NMSetting containing the password, or NULL
             * @param password_flags_name name of the secret flags (like psk-flags), or NULL
             * @param with_not_required whether to include "Not required" menu item
             * @param ask_mode %TRUE if the entry is shown in ASK mode
             */
            setup_key_password_storage(
                initial_flags: NM.SettingSecretFlags | null,
                setting: NM.Setting,
                password_flags_name: string,
                with_not_required: boolean,
                ask_mode: boolean,
            ): void;
            /**
             * This method basically calls nma_utils_update_password_storage()
             * on the certificate password entry, in case one is present.
             * @param secret_flags secret flags to set
             * @param setting #NMSetting containing the password, or NULL
             * @param password_flags_name name of the secret flags (like psk-flags), or NULL
             */
            update_cert_password_storage(
                secret_flags: NM.SettingSecretFlags | null,
                setting: NM.Setting,
                password_flags_name: string,
            ): void;
            /**
             * This method basically calls nma_utils_update_password_storage()
             * on the key password entry, in case one is present.
             * @param secret_flags secret flags to set
             * @param setting #NMSetting containing the password, or NULL
             * @param password_flags_name name of the secret flags (like psk-flags), or NULL
             */
            update_key_password_storage(
                secret_flags: NM.SettingSecretFlags | null,
                setting: NM.Setting,
                password_flags_name: string,
            ): void;
            /**
             * Validates whether the chosen values make sense. The users can do further
             * validation by subscribing to the "*-changed" signals and returning an
             * error themselves.
             * @returns %TRUE if validation passes, %FALSE otherwise
             */
            validate(): boolean;

            // Inherited properties
            /**
             * The orientation of the orientable.
             */
            get orientation(): Gtk.Orientation;
            set orientation(val: Gtk.Orientation);

            // Inherited methods
            /**
             * Retrieves the orientation of the `orientable`.
             * @returns the orientation of the @orientable
             */
            get_orientation(): Gtk.Orientation;
            /**
             * Sets the orientation of the `orientable`.
             * @param orientation the orientable’s new orientation
             */
            set_orientation(orientation: Gtk.Orientation | null): void;
            /**
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target`.
             *
             * Whenever the `source_property` is changed the `target_property` is
             * updated using the same value. For instance:
             *
             *
             * ```c
             *   g_object_bind_property (action, "active", widget, "sensitive", 0);
             * ```
             *
             *
             * Will result in the "sensitive" property of the widget #GObject instance to be
             * updated with the same value of the "active" property of the action #GObject
             * instance.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well.
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. To remove the binding without affecting the
             * `source` and the `target` you can just call g_object_unref() on the returned
             * #GBinding instance.
             *
             * Removing the binding by calling g_object_unref() on it must only be done if
             * the binding, `source` and `target` are only used from a single thread and it
             * is clear that both `source` and `target` outlive the binding. Especially it
             * is not safe to rely on this if the binding, `source` or `target` can be
             * finalized from different threads. Keep another reference to the binding and
             * use g_binding_unbind() instead to be on the safe side.
             *
             * A #GObject can have multiple bindings.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
            ): GObject.Binding;
            /**
             * Complete version of g_object_bind_property().
             *
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target,` allowing you to set the transformation functions to be used by
             * the binding.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well. The `transform_from` function is only used in case
             * of bidirectional bindings, otherwise it will be ignored
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. This will release the reference that is
             * being held on the #GBinding instance; if you want to hold on to the
             * #GBinding instance, you will need to hold a reference to it.
             *
             * To remove the binding, call g_binding_unbind().
             *
             * A #GObject can have multiple bindings.
             *
             * The same `user_data` parameter will be used for both `transform_to`
             * and `transform_from` transformation functions; the `notify` function will
             * be called once, when the binding is removed. If you need different data
             * for each transformation function, please use
             * g_object_bind_property_with_closures() instead.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @param transform_to the transformation function     from the @source to the @target, or %NULL to use the default
             * @param transform_from the transformation function     from the @target to the @source, or %NULL to use the default
             * @param notify a function to call when disposing the binding, to free     resources used by the transformation functions, or %NULL if not required
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property_full(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
                transform_to?: GObject.BindingTransformFunc | null,
                transform_from?: GObject.BindingTransformFunc | null,
                notify?: GLib.DestroyNotify | null,
            ): GObject.Binding;
            // Conflicted with GObject.Object.bind_property_full
            bind_property_full(...args: never[]): any;
            /**
             * This function is intended for #GObject implementations to re-enforce
             * a [floating][floating-ref] object reference. Doing this is seldom
             * required: all #GInitiallyUnowneds are created with a floating reference
             * which usually just needs to be sunken by calling g_object_ref_sink().
             */
            force_floating(): void;
            /**
             * Increases the freeze count on `object`. If the freeze count is
             * non-zero, the emission of "notify" signals on `object` is
             * stopped. The signals are queued until the freeze count is decreased
             * to zero. Duplicate notifications are squashed so that at most one
             * #GObject::notify signal is emitted for each property modified while the
             * object is frozen.
             *
             * This is necessary for accessors that modify multiple properties to prevent
             * premature notification while the object is still being modified.
             */
            freeze_notify(): void;
            /**
             * Gets a named field from the objects table of associations (see g_object_set_data()).
             * @param key name of the key for that association
             * @returns the data if found,          or %NULL if no such data exists.
             */
            get_data(key: string): any | null;
            /**
             * Gets a property of an object.
             *
             * The value can be:
             * - an empty GObject.Value initialized by G_VALUE_INIT, which will be automatically initialized with the expected type of the property (since GLib 2.60)
             * - a GObject.Value initialized with the expected type of the property
             * - a GObject.Value initialized with a type to which the expected type of the property can be transformed
             *
             * In general, a copy is made of the property contents and the caller is responsible for freeing the memory by calling GObject.Value.unset.
             *
             * Note that GObject.Object.get_property is really intended for language bindings, GObject.Object.get is much more convenient for C programming.
             * @param property_name The name of the property to get
             * @param value Return location for the property value. Can be an empty GObject.Value initialized by G_VALUE_INIT (auto-initialized with expected type since GLib 2.60), a GObject.Value initialized with the expected property type, or a GObject.Value initialized with a transformable type
             */
            get_property(property_name: string, value: GObject.Value | any): any;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            get_qdata(quark: GLib.Quark): any | null;
            /**
             * Gets `n_properties` properties for an `object`.
             * Obtained properties will be set to `values`. All properties must be valid.
             * Warnings will be emitted and undefined behaviour may result if invalid
             * properties are passed in.
             * @param names the names of each property to get
             * @param values the values of each property to get
             */
            getv(names: string[], values: (GObject.Value | any)[]): void;
            /**
             * Checks whether `object` has a [floating][floating-ref] reference.
             * @returns %TRUE if @object has a floating reference
             */
            is_floating(): boolean;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param property_name the name of a property installed on the class of @object.
             */
            notify(property_name: string): void;
            /**
             * Emits a "notify" signal for the property specified by `pspec` on `object`.
             *
             * This function omits the property name lookup, hence it is faster than
             * g_object_notify().
             *
             * One way to avoid using g_object_notify() from within the
             * class that registered the properties, and using g_object_notify_by_pspec()
             * instead, is to store the GParamSpec used with
             * g_object_class_install_property() inside a static array, e.g.:
             *
             *
             * ```c
             *   typedef enum
             *   {
             *     PROP_FOO = 1,
             *     PROP_LAST
             *   } MyObjectProperty;
             *
             *   static GParamSpec *properties[PROP_LAST];
             *
             *   static void
             *   my_object_class_init (MyObjectClass *klass)
             *   {
             *     properties[PROP_FOO] = g_param_spec_int ("foo", NULL, NULL,
             *                                              0, 100,
             *                                              50,
             *                                              G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS);
             *     g_object_class_install_property (gobject_class,
             *                                      PROP_FOO,
             *                                      properties[PROP_FOO]);
             *   }
             * ```
             *
             *
             * and then notify a change on the "foo" property with:
             *
             *
             * ```c
             *   g_object_notify_by_pspec (self, properties[PROP_FOO]);
             * ```
             *
             * @param pspec the #GParamSpec of a property installed on the class of @object.
             */
            notify_by_pspec(pspec: GObject.ParamSpec): void;
            /**
             * Increases the reference count of `object`.
             *
             * Since GLib 2.56, if `GLIB_VERSION_MAX_ALLOWED` is 2.56 or greater, the type
             * of `object` will be propagated to the return type (using the GCC typeof()
             * extension), so any casting the caller needs to do on the return type must be
             * explicit.
             * @returns the same @object
             */
            ref(): GObject.Object;
            /**
             * Increase the reference count of `object,` and possibly remove the
             * [floating][floating-ref] reference, if `object` has a floating reference.
             *
             * In other words, if the object is floating, then this call "assumes
             * ownership" of the floating reference, converting it to a normal
             * reference by clearing the floating flag while leaving the reference
             * count unchanged.  If the object is not floating, then this call
             * adds a new normal reference increasing the reference count by one.
             *
             * Since GLib 2.56, the type of `object` will be propagated to the return type
             * under the same conditions as for g_object_ref().
             * @returns @object
             */
            ref_sink(): GObject.Object;
            /**
             * Releases all references to other objects. This can be used to break
             * reference cycles.
             *
             * This function should only be called from object system implementations.
             */
            run_dispose(): void;
            /**
             * Each object carries around a table of associations from
             * strings to pointers.  This function lets you set an association.
             *
             * If the object already had an association with that name,
             * the old association will be destroyed.
             *
             * Internally, the `key` is converted to a #GQuark using g_quark_from_string().
             * This means a copy of `key` is kept permanently (even after `object` has been
             * finalized) — so it is recommended to only use a small, bounded set of values
             * for `key` in your program, to avoid the #GQuark storage growing unbounded.
             * @param key name of the key
             * @param data data to associate with that key
             */
            set_data(key: string, data?: any | null): void;
            /**
             * Sets a property on an object.
             * @param property_name The name of the property to set
             * @param value The value to set the property to
             */
            set_property(property_name: string, value: GObject.Value | any): void;
            /**
             * Remove a specified datum from the object's data associations,
             * without invoking the association's destroy handler.
             * @param key name of the key
             * @returns the data if found, or %NULL          if no such data exists.
             */
            steal_data(key: string): any | null;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata() and removes the `data` from object
             * without invoking its destroy() function (if any was
             * set).
             * Usually, calling this function is only required to update
             * user data pointers with a destroy notifier, for example:
             *
             * ```c
             * void
             * object_add_to_user_list (GObject     *object,
             *                          const gchar *new_string)
             * {
             *   // the quark, naming the object data
             *   GQuark quark_string_list = g_quark_from_static_string ("my-string-list");
             *   // retrieve the old string list
             *   GList *list = g_object_steal_qdata (object, quark_string_list);
             *
             *   // prepend new string
             *   list = g_list_prepend (list, g_strdup (new_string));
             *   // this changed 'list', so we need to set it again
             *   g_object_set_qdata_full (object, quark_string_list, list, free_string_list);
             * }
             * static void
             * free_string_list (gpointer data)
             * {
             *   GList *node, *list = data;
             *
             *   for (node = list; node; node = node->next)
             *     g_free (node->data);
             *   g_list_free (list);
             * }
             * ```
             *
             * Using g_object_get_qdata() in the above example, instead of
             * g_object_steal_qdata() would have left the destroy function set,
             * and thus the partial string list would have been freed upon
             * g_object_set_qdata_full().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            steal_qdata(quark: GLib.Quark): any | null;
            /**
             * Reverts the effect of a previous call to
             * g_object_freeze_notify(). The freeze count is decreased on `object`
             * and when it reaches zero, queued "notify" signals are emitted.
             *
             * Duplicate notifications for each property are squashed so that at most one
             * #GObject::notify signal is emitted for each property, in the reverse order
             * in which they have been queued.
             *
             * It is an error to call this function when the freeze count is zero.
             */
            thaw_notify(): void;
            /**
             * Decreases the reference count of `object`. When its reference count
             * drops to 0, the object is finalized (i.e. its memory is freed).
             *
             * If the pointer to the #GObject may be reused in future (for example, if it is
             * an instance variable of another object), it is recommended to clear the
             * pointer to %NULL rather than retain a dangling pointer to a potentially
             * invalid #GObject instance. Use g_clear_object() for this.
             */
            unref(): void;
            /**
             * This function essentially limits the life time of the `closure` to
             * the life time of the object. That is, when the object is finalized,
             * the `closure` is invalidated by calling g_closure_invalidate() on
             * it, in order to prevent invocations of the closure with a finalized
             * (nonexisting) object. Also, g_object_ref() and g_object_unref() are
             * added as marshal guards to the `closure,` to ensure that an extra
             * reference count is held on `object` during invocation of the
             * `closure`.  Usually, this function will be called on closures that
             * use this `object` as closure data.
             * @param closure #GClosure to watch
             */
            watch_closure(closure: GObject.Closure): void;
            /**
             * the `constructed` function is called by g_object_new() as the
             *  final step of the object creation process.  At the point of the call, all
             *  construction properties have been set on the object.  The purpose of this
             *  call is to allow for object initialisation steps that can only be performed
             *  after construction properties have been set.  `constructed` implementors
             *  should chain up to the `constructed` call of their parent class to allow it
             *  to complete its initialisation.
             */
            vfunc_constructed(): void;
            /**
             * emits property change notification for a bunch
             *  of properties. Overriding `dispatch_properties_changed` should be rarely
             *  needed.
             * @param n_pspecs
             * @param pspecs
             */
            vfunc_dispatch_properties_changed(n_pspecs: number, pspecs: GObject.ParamSpec): void;
            /**
             * the `dispose` function is supposed to drop all references to other
             *  objects, but keep the instance otherwise intact, so that client method
             *  invocations still work. It may be run multiple times (due to reference
             *  loops). Before returning, `dispose` should chain up to the `dispose` method
             *  of the parent class.
             */
            vfunc_dispose(): void;
            /**
             * instance finalization function, should finish the finalization of
             *  the instance begun in `dispose` and chain up to the `finalize` method of the
             *  parent class.
             */
            vfunc_finalize(): void;
            /**
             * the generic getter for all properties of this type. Should be
             *  overridden for every type with properties.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_get_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param pspec
             */
            vfunc_notify(pspec: GObject.ParamSpec): void;
            /**
             * the generic setter for all properties of this type. Should be
             *  overridden for every type with properties. If implementations of
             *  `set_property` don't emit property change notification explicitly, this will
             *  be done implicitly by the type system. However, if the notify signal is
             *  emitted explicitly, the type system will not emit it a second time.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_set_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Disconnects a handler from an instance so it will not be called during any future or currently ongoing emissions of the signal it has been connected to.
             * @param id Handler ID of the handler to be disconnected
             */
            disconnect(id: number): void;
            /**
             * Sets multiple properties of an object at once. The properties argument should be a dictionary mapping property names to values.
             * @param properties Object containing the properties to set
             */
            set(properties: { [key: string]: any }): void;
            /**
             * Blocks a handler of an instance so it will not be called during any signal emissions
             * @param id Handler ID of the handler to be blocked
             */
            block_signal_handler(id: number): void;
            /**
             * Unblocks a handler so it will be called again during any signal emissions
             * @param id Handler ID of the handler to be unblocked
             */
            unblock_signal_handler(id: number): void;
            /**
             * Stops a signal's emission by the given signal name. This will prevent the default handler and any subsequent signal handlers from being invoked.
             * @param detailedName Name of the signal to stop emission of
             */
            stop_emission_by_name(detailedName: string): void;
        }

        namespace MobileProvidersDatabase {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::country-codes': (pspec: GObject.ParamSpec) => void;
                'notify::service-providers': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends GObject.Object.ConstructorProps,
                    Gio.AsyncInitable.ConstructorProps,
                    Gio.Initable.ConstructorProps {
                country_codes: string;
                countryCodes: string;
                service_providers: string;
                serviceProviders: string;
            }
        }

        class MobileProvidersDatabase
            extends GObject.Object
            implements Gio.AsyncInitable<MobileProvidersDatabase>, Gio.Initable
        {
            static $gtype: GObject.GType<MobileProvidersDatabase>;

            // Properties

            get country_codes(): string;
            get countryCodes(): string;
            get service_providers(): string;
            get serviceProviders(): string;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: MobileProvidersDatabase.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<MobileProvidersDatabase.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static new_finish(res: Gio.AsyncResult): MobileProvidersDatabase;
            // Conflicted with Gio.AsyncInitable.new_finish

            static new_finish(...args: never[]): any;

            static new_sync(
                country_codes?: string | null,
                service_providers?: string | null,
                cancellable?: Gio.Cancellable | null,
            ): MobileProvidersDatabase;

            // Signals

            connect<K extends keyof MobileProvidersDatabase.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, MobileProvidersDatabase.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof MobileProvidersDatabase.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, MobileProvidersDatabase.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof MobileProvidersDatabase.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<MobileProvidersDatabase.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Static methods

            static ['new'](
                country_codes?: string | null,
                service_providers?: string | null,
                cancellable?: Gio.Cancellable | null,
                callback?: Gio.AsyncReadyCallback<MobileProvidersDatabase> | null,
            ): void;

            // Methods

            dump(): void;
            get_countries(): GLib.HashTable<string, CountryInfo>;
            lookup_3gpp_mcc_mnc(mccmnc: string): MobileProvider;
            lookup_cdma_sid(sid: number): MobileProvider;
            lookup_country(country_code: string): CountryInfo;

            // Inherited methods
            /**
             * Starts asynchronous initialization of the object implementing the
             * interface. This must be done before any real use of the object after
             * initial construction. If the object also implements #GInitable you can
             * optionally call g_initable_init() instead.
             *
             * This method is intended for language bindings. If writing in C,
             * g_async_initable_new_async() should typically be used instead.
             *
             * When the initialization is finished, `callback` will be called. You can
             * then call g_async_initable_init_finish() to get the result of the
             * initialization.
             *
             * Implementations may also support cancellation. If `cancellable` is not
             * %NULL, then initialization can be cancelled by triggering the cancellable
             * object from another thread. If the operation was cancelled, the error
             * %G_IO_ERROR_CANCELLED will be returned. If `cancellable` is not %NULL, and
             * the object doesn't support cancellable initialization, the error
             * %G_IO_ERROR_NOT_SUPPORTED will be returned.
             *
             * As with #GInitable, if the object is not initialized, or initialization
             * returns with an error, then all operations on the object except
             * g_object_ref() and g_object_unref() are considered to be invalid, and
             * have undefined behaviour. They will often fail with g_critical() or
             * g_warning(), but this must not be relied on.
             *
             * Callers should not assume that a class which implements #GAsyncInitable can
             * be initialized multiple times; for more information, see g_initable_init().
             * If a class explicitly supports being initialized multiple times,
             * implementation requires yielding all subsequent calls to init_async() on the
             * results of the first call.
             *
             * For classes that also support the #GInitable interface, the default
             * implementation of this method will run the g_initable_init() function
             * in a thread, so if you want to support asynchronous initialization via
             * threads, just implement the #GAsyncInitable interface without overriding
             * any interface methods.
             * @param io_priority the [I/O priority](iface.AsyncResult.html#io-priority) of the operation
             * @param cancellable optional #GCancellable object, %NULL to ignore.
             */
            init_async(io_priority: number, cancellable?: Gio.Cancellable | null): globalThis.Promise<boolean>;
            /**
             * Starts asynchronous initialization of the object implementing the
             * interface. This must be done before any real use of the object after
             * initial construction. If the object also implements #GInitable you can
             * optionally call g_initable_init() instead.
             *
             * This method is intended for language bindings. If writing in C,
             * g_async_initable_new_async() should typically be used instead.
             *
             * When the initialization is finished, `callback` will be called. You can
             * then call g_async_initable_init_finish() to get the result of the
             * initialization.
             *
             * Implementations may also support cancellation. If `cancellable` is not
             * %NULL, then initialization can be cancelled by triggering the cancellable
             * object from another thread. If the operation was cancelled, the error
             * %G_IO_ERROR_CANCELLED will be returned. If `cancellable` is not %NULL, and
             * the object doesn't support cancellable initialization, the error
             * %G_IO_ERROR_NOT_SUPPORTED will be returned.
             *
             * As with #GInitable, if the object is not initialized, or initialization
             * returns with an error, then all operations on the object except
             * g_object_ref() and g_object_unref() are considered to be invalid, and
             * have undefined behaviour. They will often fail with g_critical() or
             * g_warning(), but this must not be relied on.
             *
             * Callers should not assume that a class which implements #GAsyncInitable can
             * be initialized multiple times; for more information, see g_initable_init().
             * If a class explicitly supports being initialized multiple times,
             * implementation requires yielding all subsequent calls to init_async() on the
             * results of the first call.
             *
             * For classes that also support the #GInitable interface, the default
             * implementation of this method will run the g_initable_init() function
             * in a thread, so if you want to support asynchronous initialization via
             * threads, just implement the #GAsyncInitable interface without overriding
             * any interface methods.
             * @param io_priority the [I/O priority](iface.AsyncResult.html#io-priority) of the operation
             * @param cancellable optional #GCancellable object, %NULL to ignore.
             * @param callback a #GAsyncReadyCallback to call when the request is satisfied
             */
            init_async(
                io_priority: number,
                cancellable: Gio.Cancellable | null,
                callback: Gio.AsyncReadyCallback<this> | null,
            ): void;
            /**
             * Starts asynchronous initialization of the object implementing the
             * interface. This must be done before any real use of the object after
             * initial construction. If the object also implements #GInitable you can
             * optionally call g_initable_init() instead.
             *
             * This method is intended for language bindings. If writing in C,
             * g_async_initable_new_async() should typically be used instead.
             *
             * When the initialization is finished, `callback` will be called. You can
             * then call g_async_initable_init_finish() to get the result of the
             * initialization.
             *
             * Implementations may also support cancellation. If `cancellable` is not
             * %NULL, then initialization can be cancelled by triggering the cancellable
             * object from another thread. If the operation was cancelled, the error
             * %G_IO_ERROR_CANCELLED will be returned. If `cancellable` is not %NULL, and
             * the object doesn't support cancellable initialization, the error
             * %G_IO_ERROR_NOT_SUPPORTED will be returned.
             *
             * As with #GInitable, if the object is not initialized, or initialization
             * returns with an error, then all operations on the object except
             * g_object_ref() and g_object_unref() are considered to be invalid, and
             * have undefined behaviour. They will often fail with g_critical() or
             * g_warning(), but this must not be relied on.
             *
             * Callers should not assume that a class which implements #GAsyncInitable can
             * be initialized multiple times; for more information, see g_initable_init().
             * If a class explicitly supports being initialized multiple times,
             * implementation requires yielding all subsequent calls to init_async() on the
             * results of the first call.
             *
             * For classes that also support the #GInitable interface, the default
             * implementation of this method will run the g_initable_init() function
             * in a thread, so if you want to support asynchronous initialization via
             * threads, just implement the #GAsyncInitable interface without overriding
             * any interface methods.
             * @param io_priority the [I/O priority](iface.AsyncResult.html#io-priority) of the operation
             * @param cancellable optional #GCancellable object, %NULL to ignore.
             * @param callback a #GAsyncReadyCallback to call when the request is satisfied
             */
            init_async(
                io_priority: number,
                cancellable?: Gio.Cancellable | null,
                callback?: Gio.AsyncReadyCallback<this> | null,
            ): globalThis.Promise<boolean> | void;
            /**
             * Finishes asynchronous initialization and returns the result.
             * See g_async_initable_init_async().
             * @param res a #GAsyncResult.
             * @returns %TRUE if successful. If an error has occurred, this function will return %FALSE and set @error appropriately if present.
             */
            init_finish(res: Gio.AsyncResult): boolean;
            /**
             * Finishes the async construction for the various g_async_initable_new
             * calls, returning the created object or %NULL on error.
             * @param res the #GAsyncResult from the callback
             * @returns a newly created #GObject,      or %NULL on error. Free with g_object_unref().
             */
            new_finish(res: Gio.AsyncResult): MobileProvidersDatabase;
            /**
             * Starts asynchronous initialization of the object implementing the
             * interface. This must be done before any real use of the object after
             * initial construction. If the object also implements #GInitable you can
             * optionally call g_initable_init() instead.
             *
             * This method is intended for language bindings. If writing in C,
             * g_async_initable_new_async() should typically be used instead.
             *
             * When the initialization is finished, `callback` will be called. You can
             * then call g_async_initable_init_finish() to get the result of the
             * initialization.
             *
             * Implementations may also support cancellation. If `cancellable` is not
             * %NULL, then initialization can be cancelled by triggering the cancellable
             * object from another thread. If the operation was cancelled, the error
             * %G_IO_ERROR_CANCELLED will be returned. If `cancellable` is not %NULL, and
             * the object doesn't support cancellable initialization, the error
             * %G_IO_ERROR_NOT_SUPPORTED will be returned.
             *
             * As with #GInitable, if the object is not initialized, or initialization
             * returns with an error, then all operations on the object except
             * g_object_ref() and g_object_unref() are considered to be invalid, and
             * have undefined behaviour. They will often fail with g_critical() or
             * g_warning(), but this must not be relied on.
             *
             * Callers should not assume that a class which implements #GAsyncInitable can
             * be initialized multiple times; for more information, see g_initable_init().
             * If a class explicitly supports being initialized multiple times,
             * implementation requires yielding all subsequent calls to init_async() on the
             * results of the first call.
             *
             * For classes that also support the #GInitable interface, the default
             * implementation of this method will run the g_initable_init() function
             * in a thread, so if you want to support asynchronous initialization via
             * threads, just implement the #GAsyncInitable interface without overriding
             * any interface methods.
             * @param io_priority the [I/O priority](iface.AsyncResult.html#io-priority) of the operation
             * @param cancellable optional #GCancellable object, %NULL to ignore.
             * @param callback a #GAsyncReadyCallback to call when the request is satisfied
             */
            vfunc_init_async(
                io_priority: number,
                cancellable?: Gio.Cancellable | null,
                callback?: Gio.AsyncReadyCallback<this> | null,
            ): void;
            /**
             * Finishes asynchronous initialization and returns the result.
             * See g_async_initable_init_async().
             * @param res a #GAsyncResult.
             */
            vfunc_init_finish(res: Gio.AsyncResult): boolean;
            /**
             * Initializes the object implementing the interface.
             *
             * This method is intended for language bindings. If writing in C,
             * g_initable_new() should typically be used instead.
             *
             * The object must be initialized before any real use after initial
             * construction, either with this function or g_async_initable_init_async().
             *
             * Implementations may also support cancellation. If `cancellable` is not %NULL,
             * then initialization can be cancelled by triggering the cancellable object
             * from another thread. If the operation was cancelled, the error
             * %G_IO_ERROR_CANCELLED will be returned. If `cancellable` is not %NULL and
             * the object doesn't support cancellable initialization the error
             * %G_IO_ERROR_NOT_SUPPORTED will be returned.
             *
             * If the object is not initialized, or initialization returns with an
             * error, then all operations on the object except g_object_ref() and
             * g_object_unref() are considered to be invalid, and have undefined
             * behaviour. See the [description][iface`Gio`.Initable#description] for more details.
             *
             * Callers should not assume that a class which implements #GInitable can be
             * initialized multiple times, unless the class explicitly documents itself as
             * supporting this. Generally, a class’ implementation of init() can assume
             * (and assert) that it will only be called once. Previously, this documentation
             * recommended all #GInitable implementations should be idempotent; that
             * recommendation was relaxed in GLib 2.54.
             *
             * If a class explicitly supports being initialized multiple times, it is
             * recommended that the method is idempotent: multiple calls with the same
             * arguments should return the same results. Only the first call initializes
             * the object; further calls return the result of the first call.
             *
             * One reason why a class might need to support idempotent initialization is if
             * it is designed to be used via the singleton pattern, with a
             * #GObjectClass.constructor that sometimes returns an existing instance.
             * In this pattern, a caller would expect to be able to call g_initable_init()
             * on the result of g_object_new(), regardless of whether it is in fact a new
             * instance.
             * @param cancellable optional #GCancellable object, %NULL to ignore.
             * @returns %TRUE if successful. If an error has occurred, this function will     return %FALSE and set @error appropriately if present.
             */
            init(cancellable?: Gio.Cancellable | null): boolean;
            /**
             * Initializes the object implementing the interface.
             *
             * This method is intended for language bindings. If writing in C,
             * g_initable_new() should typically be used instead.
             *
             * The object must be initialized before any real use after initial
             * construction, either with this function or g_async_initable_init_async().
             *
             * Implementations may also support cancellation. If `cancellable` is not %NULL,
             * then initialization can be cancelled by triggering the cancellable object
             * from another thread. If the operation was cancelled, the error
             * %G_IO_ERROR_CANCELLED will be returned. If `cancellable` is not %NULL and
             * the object doesn't support cancellable initialization the error
             * %G_IO_ERROR_NOT_SUPPORTED will be returned.
             *
             * If the object is not initialized, or initialization returns with an
             * error, then all operations on the object except g_object_ref() and
             * g_object_unref() are considered to be invalid, and have undefined
             * behaviour. See the [description][iface`Gio`.Initable#description] for more details.
             *
             * Callers should not assume that a class which implements #GInitable can be
             * initialized multiple times, unless the class explicitly documents itself as
             * supporting this. Generally, a class’ implementation of init() can assume
             * (and assert) that it will only be called once. Previously, this documentation
             * recommended all #GInitable implementations should be idempotent; that
             * recommendation was relaxed in GLib 2.54.
             *
             * If a class explicitly supports being initialized multiple times, it is
             * recommended that the method is idempotent: multiple calls with the same
             * arguments should return the same results. Only the first call initializes
             * the object; further calls return the result of the first call.
             *
             * One reason why a class might need to support idempotent initialization is if
             * it is designed to be used via the singleton pattern, with a
             * #GObjectClass.constructor that sometimes returns an existing instance.
             * In this pattern, a caller would expect to be able to call g_initable_init()
             * on the result of g_object_new(), regardless of whether it is in fact a new
             * instance.
             * @param cancellable optional #GCancellable object, %NULL to ignore.
             */
            vfunc_init(cancellable?: Gio.Cancellable | null): boolean;
            /**
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target`.
             *
             * Whenever the `source_property` is changed the `target_property` is
             * updated using the same value. For instance:
             *
             *
             * ```c
             *   g_object_bind_property (action, "active", widget, "sensitive", 0);
             * ```
             *
             *
             * Will result in the "sensitive" property of the widget #GObject instance to be
             * updated with the same value of the "active" property of the action #GObject
             * instance.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well.
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. To remove the binding without affecting the
             * `source` and the `target` you can just call g_object_unref() on the returned
             * #GBinding instance.
             *
             * Removing the binding by calling g_object_unref() on it must only be done if
             * the binding, `source` and `target` are only used from a single thread and it
             * is clear that both `source` and `target` outlive the binding. Especially it
             * is not safe to rely on this if the binding, `source` or `target` can be
             * finalized from different threads. Keep another reference to the binding and
             * use g_binding_unbind() instead to be on the safe side.
             *
             * A #GObject can have multiple bindings.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
            ): GObject.Binding;
            /**
             * Complete version of g_object_bind_property().
             *
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target,` allowing you to set the transformation functions to be used by
             * the binding.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well. The `transform_from` function is only used in case
             * of bidirectional bindings, otherwise it will be ignored
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. This will release the reference that is
             * being held on the #GBinding instance; if you want to hold on to the
             * #GBinding instance, you will need to hold a reference to it.
             *
             * To remove the binding, call g_binding_unbind().
             *
             * A #GObject can have multiple bindings.
             *
             * The same `user_data` parameter will be used for both `transform_to`
             * and `transform_from` transformation functions; the `notify` function will
             * be called once, when the binding is removed. If you need different data
             * for each transformation function, please use
             * g_object_bind_property_with_closures() instead.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @param transform_to the transformation function     from the @source to the @target, or %NULL to use the default
             * @param transform_from the transformation function     from the @target to the @source, or %NULL to use the default
             * @param notify a function to call when disposing the binding, to free     resources used by the transformation functions, or %NULL if not required
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property_full(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
                transform_to?: GObject.BindingTransformFunc | null,
                transform_from?: GObject.BindingTransformFunc | null,
                notify?: GLib.DestroyNotify | null,
            ): GObject.Binding;
            // Conflicted with GObject.Object.bind_property_full
            bind_property_full(...args: never[]): any;
            /**
             * This function is intended for #GObject implementations to re-enforce
             * a [floating][floating-ref] object reference. Doing this is seldom
             * required: all #GInitiallyUnowneds are created with a floating reference
             * which usually just needs to be sunken by calling g_object_ref_sink().
             */
            force_floating(): void;
            /**
             * Increases the freeze count on `object`. If the freeze count is
             * non-zero, the emission of "notify" signals on `object` is
             * stopped. The signals are queued until the freeze count is decreased
             * to zero. Duplicate notifications are squashed so that at most one
             * #GObject::notify signal is emitted for each property modified while the
             * object is frozen.
             *
             * This is necessary for accessors that modify multiple properties to prevent
             * premature notification while the object is still being modified.
             */
            freeze_notify(): void;
            /**
             * Gets a named field from the objects table of associations (see g_object_set_data()).
             * @param key name of the key for that association
             * @returns the data if found,          or %NULL if no such data exists.
             */
            get_data(key: string): any | null;
            /**
             * Gets a property of an object.
             *
             * The value can be:
             * - an empty GObject.Value initialized by G_VALUE_INIT, which will be automatically initialized with the expected type of the property (since GLib 2.60)
             * - a GObject.Value initialized with the expected type of the property
             * - a GObject.Value initialized with a type to which the expected type of the property can be transformed
             *
             * In general, a copy is made of the property contents and the caller is responsible for freeing the memory by calling GObject.Value.unset.
             *
             * Note that GObject.Object.get_property is really intended for language bindings, GObject.Object.get is much more convenient for C programming.
             * @param property_name The name of the property to get
             * @param value Return location for the property value. Can be an empty GObject.Value initialized by G_VALUE_INIT (auto-initialized with expected type since GLib 2.60), a GObject.Value initialized with the expected property type, or a GObject.Value initialized with a transformable type
             */
            get_property(property_name: string, value: GObject.Value | any): any;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            get_qdata(quark: GLib.Quark): any | null;
            /**
             * Gets `n_properties` properties for an `object`.
             * Obtained properties will be set to `values`. All properties must be valid.
             * Warnings will be emitted and undefined behaviour may result if invalid
             * properties are passed in.
             * @param names the names of each property to get
             * @param values the values of each property to get
             */
            getv(names: string[], values: (GObject.Value | any)[]): void;
            /**
             * Checks whether `object` has a [floating][floating-ref] reference.
             * @returns %TRUE if @object has a floating reference
             */
            is_floating(): boolean;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param property_name the name of a property installed on the class of @object.
             */
            notify(property_name: string): void;
            /**
             * Emits a "notify" signal for the property specified by `pspec` on `object`.
             *
             * This function omits the property name lookup, hence it is faster than
             * g_object_notify().
             *
             * One way to avoid using g_object_notify() from within the
             * class that registered the properties, and using g_object_notify_by_pspec()
             * instead, is to store the GParamSpec used with
             * g_object_class_install_property() inside a static array, e.g.:
             *
             *
             * ```c
             *   typedef enum
             *   {
             *     PROP_FOO = 1,
             *     PROP_LAST
             *   } MyObjectProperty;
             *
             *   static GParamSpec *properties[PROP_LAST];
             *
             *   static void
             *   my_object_class_init (MyObjectClass *klass)
             *   {
             *     properties[PROP_FOO] = g_param_spec_int ("foo", NULL, NULL,
             *                                              0, 100,
             *                                              50,
             *                                              G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS);
             *     g_object_class_install_property (gobject_class,
             *                                      PROP_FOO,
             *                                      properties[PROP_FOO]);
             *   }
             * ```
             *
             *
             * and then notify a change on the "foo" property with:
             *
             *
             * ```c
             *   g_object_notify_by_pspec (self, properties[PROP_FOO]);
             * ```
             *
             * @param pspec the #GParamSpec of a property installed on the class of @object.
             */
            notify_by_pspec(pspec: GObject.ParamSpec): void;
            /**
             * Increases the reference count of `object`.
             *
             * Since GLib 2.56, if `GLIB_VERSION_MAX_ALLOWED` is 2.56 or greater, the type
             * of `object` will be propagated to the return type (using the GCC typeof()
             * extension), so any casting the caller needs to do on the return type must be
             * explicit.
             * @returns the same @object
             */
            ref(): GObject.Object;
            /**
             * Increase the reference count of `object,` and possibly remove the
             * [floating][floating-ref] reference, if `object` has a floating reference.
             *
             * In other words, if the object is floating, then this call "assumes
             * ownership" of the floating reference, converting it to a normal
             * reference by clearing the floating flag while leaving the reference
             * count unchanged.  If the object is not floating, then this call
             * adds a new normal reference increasing the reference count by one.
             *
             * Since GLib 2.56, the type of `object` will be propagated to the return type
             * under the same conditions as for g_object_ref().
             * @returns @object
             */
            ref_sink(): GObject.Object;
            /**
             * Releases all references to other objects. This can be used to break
             * reference cycles.
             *
             * This function should only be called from object system implementations.
             */
            run_dispose(): void;
            /**
             * Each object carries around a table of associations from
             * strings to pointers.  This function lets you set an association.
             *
             * If the object already had an association with that name,
             * the old association will be destroyed.
             *
             * Internally, the `key` is converted to a #GQuark using g_quark_from_string().
             * This means a copy of `key` is kept permanently (even after `object` has been
             * finalized) — so it is recommended to only use a small, bounded set of values
             * for `key` in your program, to avoid the #GQuark storage growing unbounded.
             * @param key name of the key
             * @param data data to associate with that key
             */
            set_data(key: string, data?: any | null): void;
            /**
             * Sets a property on an object.
             * @param property_name The name of the property to set
             * @param value The value to set the property to
             */
            set_property(property_name: string, value: GObject.Value | any): void;
            /**
             * Remove a specified datum from the object's data associations,
             * without invoking the association's destroy handler.
             * @param key name of the key
             * @returns the data if found, or %NULL          if no such data exists.
             */
            steal_data(key: string): any | null;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata() and removes the `data` from object
             * without invoking its destroy() function (if any was
             * set).
             * Usually, calling this function is only required to update
             * user data pointers with a destroy notifier, for example:
             *
             * ```c
             * void
             * object_add_to_user_list (GObject     *object,
             *                          const gchar *new_string)
             * {
             *   // the quark, naming the object data
             *   GQuark quark_string_list = g_quark_from_static_string ("my-string-list");
             *   // retrieve the old string list
             *   GList *list = g_object_steal_qdata (object, quark_string_list);
             *
             *   // prepend new string
             *   list = g_list_prepend (list, g_strdup (new_string));
             *   // this changed 'list', so we need to set it again
             *   g_object_set_qdata_full (object, quark_string_list, list, free_string_list);
             * }
             * static void
             * free_string_list (gpointer data)
             * {
             *   GList *node, *list = data;
             *
             *   for (node = list; node; node = node->next)
             *     g_free (node->data);
             *   g_list_free (list);
             * }
             * ```
             *
             * Using g_object_get_qdata() in the above example, instead of
             * g_object_steal_qdata() would have left the destroy function set,
             * and thus the partial string list would have been freed upon
             * g_object_set_qdata_full().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            steal_qdata(quark: GLib.Quark): any | null;
            /**
             * Reverts the effect of a previous call to
             * g_object_freeze_notify(). The freeze count is decreased on `object`
             * and when it reaches zero, queued "notify" signals are emitted.
             *
             * Duplicate notifications for each property are squashed so that at most one
             * #GObject::notify signal is emitted for each property, in the reverse order
             * in which they have been queued.
             *
             * It is an error to call this function when the freeze count is zero.
             */
            thaw_notify(): void;
            /**
             * Decreases the reference count of `object`. When its reference count
             * drops to 0, the object is finalized (i.e. its memory is freed).
             *
             * If the pointer to the #GObject may be reused in future (for example, if it is
             * an instance variable of another object), it is recommended to clear the
             * pointer to %NULL rather than retain a dangling pointer to a potentially
             * invalid #GObject instance. Use g_clear_object() for this.
             */
            unref(): void;
            /**
             * This function essentially limits the life time of the `closure` to
             * the life time of the object. That is, when the object is finalized,
             * the `closure` is invalidated by calling g_closure_invalidate() on
             * it, in order to prevent invocations of the closure with a finalized
             * (nonexisting) object. Also, g_object_ref() and g_object_unref() are
             * added as marshal guards to the `closure,` to ensure that an extra
             * reference count is held on `object` during invocation of the
             * `closure`.  Usually, this function will be called on closures that
             * use this `object` as closure data.
             * @param closure #GClosure to watch
             */
            watch_closure(closure: GObject.Closure): void;
            /**
             * the `constructed` function is called by g_object_new() as the
             *  final step of the object creation process.  At the point of the call, all
             *  construction properties have been set on the object.  The purpose of this
             *  call is to allow for object initialisation steps that can only be performed
             *  after construction properties have been set.  `constructed` implementors
             *  should chain up to the `constructed` call of their parent class to allow it
             *  to complete its initialisation.
             */
            vfunc_constructed(): void;
            /**
             * emits property change notification for a bunch
             *  of properties. Overriding `dispatch_properties_changed` should be rarely
             *  needed.
             * @param n_pspecs
             * @param pspecs
             */
            vfunc_dispatch_properties_changed(n_pspecs: number, pspecs: GObject.ParamSpec): void;
            /**
             * the `dispose` function is supposed to drop all references to other
             *  objects, but keep the instance otherwise intact, so that client method
             *  invocations still work. It may be run multiple times (due to reference
             *  loops). Before returning, `dispose` should chain up to the `dispose` method
             *  of the parent class.
             */
            vfunc_dispose(): void;
            /**
             * instance finalization function, should finish the finalization of
             *  the instance begun in `dispose` and chain up to the `finalize` method of the
             *  parent class.
             */
            vfunc_finalize(): void;
            /**
             * the generic getter for all properties of this type. Should be
             *  overridden for every type with properties.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_get_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param pspec
             */
            vfunc_notify(pspec: GObject.ParamSpec): void;
            /**
             * the generic setter for all properties of this type. Should be
             *  overridden for every type with properties. If implementations of
             *  `set_property` don't emit property change notification explicitly, this will
             *  be done implicitly by the type system. However, if the notify signal is
             *  emitted explicitly, the type system will not emit it a second time.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_set_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Disconnects a handler from an instance so it will not be called during any future or currently ongoing emissions of the signal it has been connected to.
             * @param id Handler ID of the handler to be disconnected
             */
            disconnect(id: number): void;
            /**
             * Sets multiple properties of an object at once. The properties argument should be a dictionary mapping property names to values.
             * @param properties Object containing the properties to set
             */
            set(properties: { [key: string]: any }): void;
            /**
             * Blocks a handler of an instance so it will not be called during any signal emissions
             * @param id Handler ID of the handler to be blocked
             */
            block_signal_handler(id: number): void;
            /**
             * Unblocks a handler so it will be called again during any signal emissions
             * @param id Handler ID of the handler to be unblocked
             */
            unblock_signal_handler(id: number): void;
            /**
             * Stops a signal's emission by the given signal name. This will prevent the default handler and any subsequent signal handlers from being invoked.
             * @param detailedName Name of the signal to stop emission of
             */
            stop_emission_by_name(detailedName: string): void;
        }

        namespace MobileWizard {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {}

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {}
        }

        class MobileWizard extends GObject.Object {
            static $gtype: GObject.GType<MobileWizard>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: MobileWizard.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<MobileWizard.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            // Signals

            connect<K extends keyof MobileWizard.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, MobileWizard.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof MobileWizard.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, MobileWizard.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof MobileWizard.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<MobileWizard.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            destroy(): void;
            present(): void;
        }

        namespace VpnPasswordDialog {
            // Signal signatures
            interface SignalSignatures extends Gtk.Dialog.SignalSignatures {
                'notify::use-header-bar': (pspec: GObject.ParamSpec) => void;
                'notify::application': (pspec: GObject.ParamSpec) => void;
                'notify::child': (pspec: GObject.ParamSpec) => void;
                'notify::decorated': (pspec: GObject.ParamSpec) => void;
                'notify::default-height': (pspec: GObject.ParamSpec) => void;
                'notify::default-widget': (pspec: GObject.ParamSpec) => void;
                'notify::default-width': (pspec: GObject.ParamSpec) => void;
                'notify::deletable': (pspec: GObject.ParamSpec) => void;
                'notify::destroy-with-parent': (pspec: GObject.ParamSpec) => void;
                'notify::display': (pspec: GObject.ParamSpec) => void;
                'notify::focus-visible': (pspec: GObject.ParamSpec) => void;
                'notify::focus-widget': (pspec: GObject.ParamSpec) => void;
                'notify::fullscreened': (pspec: GObject.ParamSpec) => void;
                'notify::gravity': (pspec: GObject.ParamSpec) => void;
                'notify::handle-menubar-accel': (pspec: GObject.ParamSpec) => void;
                'notify::hide-on-close': (pspec: GObject.ParamSpec) => void;
                'notify::icon-name': (pspec: GObject.ParamSpec) => void;
                'notify::is-active': (pspec: GObject.ParamSpec) => void;
                'notify::maximized': (pspec: GObject.ParamSpec) => void;
                'notify::mnemonics-visible': (pspec: GObject.ParamSpec) => void;
                'notify::modal': (pspec: GObject.ParamSpec) => void;
                'notify::resizable': (pspec: GObject.ParamSpec) => void;
                'notify::startup-id': (pspec: GObject.ParamSpec) => void;
                'notify::suspended': (pspec: GObject.ParamSpec) => void;
                'notify::title': (pspec: GObject.ParamSpec) => void;
                'notify::titlebar': (pspec: GObject.ParamSpec) => void;
                'notify::transient-for': (pspec: GObject.ParamSpec) => void;
                'notify::can-focus': (pspec: GObject.ParamSpec) => void;
                'notify::can-target': (pspec: GObject.ParamSpec) => void;
                'notify::css-classes': (pspec: GObject.ParamSpec) => void;
                'notify::css-name': (pspec: GObject.ParamSpec) => void;
                'notify::cursor': (pspec: GObject.ParamSpec) => void;
                'notify::focus-on-click': (pspec: GObject.ParamSpec) => void;
                'notify::focusable': (pspec: GObject.ParamSpec) => void;
                'notify::halign': (pspec: GObject.ParamSpec) => void;
                'notify::has-default': (pspec: GObject.ParamSpec) => void;
                'notify::has-focus': (pspec: GObject.ParamSpec) => void;
                'notify::has-tooltip': (pspec: GObject.ParamSpec) => void;
                'notify::height-request': (pspec: GObject.ParamSpec) => void;
                'notify::hexpand': (pspec: GObject.ParamSpec) => void;
                'notify::hexpand-set': (pspec: GObject.ParamSpec) => void;
                'notify::layout-manager': (pspec: GObject.ParamSpec) => void;
                'notify::limit-events': (pspec: GObject.ParamSpec) => void;
                'notify::margin-bottom': (pspec: GObject.ParamSpec) => void;
                'notify::margin-end': (pspec: GObject.ParamSpec) => void;
                'notify::margin-start': (pspec: GObject.ParamSpec) => void;
                'notify::margin-top': (pspec: GObject.ParamSpec) => void;
                'notify::name': (pspec: GObject.ParamSpec) => void;
                'notify::opacity': (pspec: GObject.ParamSpec) => void;
                'notify::overflow': (pspec: GObject.ParamSpec) => void;
                'notify::parent': (pspec: GObject.ParamSpec) => void;
                'notify::receives-default': (pspec: GObject.ParamSpec) => void;
                'notify::root': (pspec: GObject.ParamSpec) => void;
                'notify::scale-factor': (pspec: GObject.ParamSpec) => void;
                'notify::sensitive': (pspec: GObject.ParamSpec) => void;
                'notify::tooltip-markup': (pspec: GObject.ParamSpec) => void;
                'notify::tooltip-text': (pspec: GObject.ParamSpec) => void;
                'notify::valign': (pspec: GObject.ParamSpec) => void;
                'notify::vexpand': (pspec: GObject.ParamSpec) => void;
                'notify::vexpand-set': (pspec: GObject.ParamSpec) => void;
                'notify::visible': (pspec: GObject.ParamSpec) => void;
                'notify::width-request': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends Gtk.Dialog.ConstructorProps,
                    Gtk.Accessible.ConstructorProps,
                    Gtk.Buildable.ConstructorProps,
                    Gtk.ConstraintTarget.ConstructorProps,
                    Gtk.Native.ConstructorProps,
                    Gtk.Root.ConstructorProps,
                    Gtk.ShortcutManager.ConstructorProps {}
        }

        class VpnPasswordDialog
            extends Gtk.Dialog
            implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Native, Gtk.Root, Gtk.ShortcutManager
        {
            static $gtype: GObject.GType<VpnPasswordDialog>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: VpnPasswordDialog.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<VpnPasswordDialog.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](title: string, message: string, password: string): VpnPasswordDialog;
            // Conflicted with Gtk.Dialog.new

            static ['new'](...args: never[]): any;

            // Signals

            connect<K extends keyof VpnPasswordDialog.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, VpnPasswordDialog.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof VpnPasswordDialog.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, VpnPasswordDialog.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof VpnPasswordDialog.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<VpnPasswordDialog.SignalSignatures[K]> extends [any, ...infer Q]
                    ? Q
                    : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            focus_password(): void;
            focus_password_secondary(): void;
            focus_password_ternary(): void;
            get_password(): string;
            get_password_secondary(): string;
            get_password_ternary(): string;
            run_and_block(): boolean;
            set_password(password: string): void;
            set_password_label(label: string): void;
            set_password_secondary(password_secondary: string): void;
            set_password_secondary_label(label: string): void;
            set_password_ternary(password_ternary: string): void;
            set_password_ternary_label(label: string): void;
            set_show_password(show: boolean): void;
            set_show_password_secondary(show: boolean): void;
            set_show_password_ternary(show: boolean): void;

            // Inherited properties
            /**
             * Whether the widget or any of its descendents can accept
             * the input focus.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get can_focus(): boolean;
            set can_focus(val: boolean);
            /**
             * Whether the widget or any of its descendents can accept
             * the input focus.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get canFocus(): boolean;
            set canFocus(val: boolean);
            /**
             * Whether the widget can receive pointer events.
             */
            get can_target(): boolean;
            set can_target(val: boolean);
            /**
             * Whether the widget can receive pointer events.
             */
            get canTarget(): boolean;
            set canTarget(val: boolean);
            /**
             * A list of css classes applied to this widget.
             */
            get css_classes(): string[];
            set css_classes(val: string[]);
            /**
             * A list of css classes applied to this widget.
             */
            get cssClasses(): string[];
            set cssClasses(val: string[]);
            /**
             * The name of this widget in the CSS tree.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get css_name(): string;
            /**
             * The name of this widget in the CSS tree.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get cssName(): string;
            /**
             * The cursor used by `widget`.
             */
            get cursor(): Gdk.Cursor;
            set cursor(val: Gdk.Cursor);
            /**
             * Whether the widget should grab focus when it is clicked with the mouse.
             *
             * This property is only relevant for widgets that can take focus.
             */
            get focus_on_click(): boolean;
            set focus_on_click(val: boolean);
            /**
             * Whether the widget should grab focus when it is clicked with the mouse.
             *
             * This property is only relevant for widgets that can take focus.
             */
            get focusOnClick(): boolean;
            set focusOnClick(val: boolean);
            /**
             * Whether this widget itself will accept the input focus.
             */
            get focusable(): boolean;
            set focusable(val: boolean);
            /**
             * How to distribute horizontal space if widget gets extra space.
             */
            get halign(): Gtk.Align;
            set halign(val: Gtk.Align);
            /**
             * Whether the widget is the default widget.
             */
            get has_default(): boolean;
            /**
             * Whether the widget is the default widget.
             */
            get hasDefault(): boolean;
            /**
             * Whether the widget has the input focus.
             */
            get has_focus(): boolean;
            /**
             * Whether the widget has the input focus.
             */
            get hasFocus(): boolean;
            /**
             * Enables or disables the emission of the [signal`Gtk`.Widget::query-tooltip]
             * signal on `widget`.
             *
             * A true value indicates that `widget` can have a tooltip, in this case
             * the widget will be queried using [signal`Gtk`.Widget::query-tooltip] to
             * determine whether it will provide a tooltip or not.
             */
            get has_tooltip(): boolean;
            set has_tooltip(val: boolean);
            /**
             * Enables or disables the emission of the [signal`Gtk`.Widget::query-tooltip]
             * signal on `widget`.
             *
             * A true value indicates that `widget` can have a tooltip, in this case
             * the widget will be queried using [signal`Gtk`.Widget::query-tooltip] to
             * determine whether it will provide a tooltip or not.
             */
            get hasTooltip(): boolean;
            set hasTooltip(val: boolean);
            /**
             * Overrides for height request of the widget.
             *
             * If this is -1, the natural request will be used.
             */
            get height_request(): number;
            set height_request(val: number);
            /**
             * Overrides for height request of the widget.
             *
             * If this is -1, the natural request will be used.
             */
            get heightRequest(): number;
            set heightRequest(val: number);
            /**
             * Whether to expand horizontally.
             */
            get hexpand(): boolean;
            set hexpand(val: boolean);
            /**
             * Whether to use the `hexpand` property.
             */
            get hexpand_set(): boolean;
            set hexpand_set(val: boolean);
            /**
             * Whether to use the `hexpand` property.
             */
            get hexpandSet(): boolean;
            set hexpandSet(val: boolean);
            /**
             * The [class`Gtk`.LayoutManager] instance to use to compute
             * the preferred size of the widget, and allocate its children.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get layout_manager(): Gtk.LayoutManager;
            set layout_manager(val: Gtk.LayoutManager);
            /**
             * The [class`Gtk`.LayoutManager] instance to use to compute
             * the preferred size of the widget, and allocate its children.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get layoutManager(): Gtk.LayoutManager;
            set layoutManager(val: Gtk.LayoutManager);
            /**
             * Makes this widget act like a modal dialog, with respect to
             * event delivery.
             *
             * Global event controllers will not handle events with targets
             * inside the widget, unless they are set up to ignore propagation
             * limits. See [method`Gtk`.EventController.set_propagation_limit].
             */
            get limit_events(): boolean;
            set limit_events(val: boolean);
            /**
             * Makes this widget act like a modal dialog, with respect to
             * event delivery.
             *
             * Global event controllers will not handle events with targets
             * inside the widget, unless they are set up to ignore propagation
             * limits. See [method`Gtk`.EventController.set_propagation_limit].
             */
            get limitEvents(): boolean;
            set limitEvents(val: boolean);
            /**
             * Margin on bottom side of widget.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get margin_bottom(): number;
            set margin_bottom(val: number);
            /**
             * Margin on bottom side of widget.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get marginBottom(): number;
            set marginBottom(val: number);
            /**
             * Margin on end of widget, horizontally.
             *
             * This property supports left-to-right and right-to-left text
             * directions.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get margin_end(): number;
            set margin_end(val: number);
            /**
             * Margin on end of widget, horizontally.
             *
             * This property supports left-to-right and right-to-left text
             * directions.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get marginEnd(): number;
            set marginEnd(val: number);
            /**
             * Margin on start of widget, horizontally.
             *
             * This property supports left-to-right and right-to-left text
             * directions.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get margin_start(): number;
            set margin_start(val: number);
            /**
             * Margin on start of widget, horizontally.
             *
             * This property supports left-to-right and right-to-left text
             * directions.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get marginStart(): number;
            set marginStart(val: number);
            /**
             * Margin on top side of widget.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get margin_top(): number;
            set margin_top(val: number);
            /**
             * Margin on top side of widget.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get marginTop(): number;
            set marginTop(val: number);
            /**
             * The name of the widget.
             */
            get name(): string;
            set name(val: string);
            /**
             * The requested opacity of the widget.
             */
            get opacity(): number;
            set opacity(val: number);
            /**
             * How content outside the widget's content area is treated.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get overflow(): Gtk.Overflow;
            set overflow(val: Gtk.Overflow);
            /**
             * The parent widget of this widget.
             */
            get parent(): Gtk.Widget;
            /**
             * Whether the widget will receive the default action when it is focused.
             */
            get receives_default(): boolean;
            set receives_default(val: boolean);
            /**
             * Whether the widget will receive the default action when it is focused.
             */
            get receivesDefault(): boolean;
            set receivesDefault(val: boolean);
            /**
             * The `GtkRoot` widget of the widget tree containing this widget.
             *
             * This will be `NULL` if the widget is not contained in a root widget.
             */
            get root(): Gtk.Root;
            /**
             * The scale factor of the widget.
             */
            get scale_factor(): number;
            /**
             * The scale factor of the widget.
             */
            get scaleFactor(): number;
            /**
             * Whether the widget responds to input.
             */
            get sensitive(): boolean;
            set sensitive(val: boolean);
            /**
             * Sets the text of tooltip to be the given string, which is marked up
             * with Pango markup.
             *
             * Also see [method`Gtk`.Tooltip.set_markup].
             *
             * This is a convenience property which will take care of getting the
             * tooltip shown if the given string is not `NULL`:
             * [property`Gtk`.Widget:has-tooltip] will automatically be set to true
             * and there will be taken care of [signal`Gtk`.Widget::query-tooltip] in
             * the default signal handler.
             *
             * Note that if both [property`Gtk`.Widget:tooltip-text] and
             * [property`Gtk`.Widget:tooltip-markup] are set, the last one wins.
             */
            get tooltip_markup(): string;
            set tooltip_markup(val: string);
            /**
             * Sets the text of tooltip to be the given string, which is marked up
             * with Pango markup.
             *
             * Also see [method`Gtk`.Tooltip.set_markup].
             *
             * This is a convenience property which will take care of getting the
             * tooltip shown if the given string is not `NULL`:
             * [property`Gtk`.Widget:has-tooltip] will automatically be set to true
             * and there will be taken care of [signal`Gtk`.Widget::query-tooltip] in
             * the default signal handler.
             *
             * Note that if both [property`Gtk`.Widget:tooltip-text] and
             * [property`Gtk`.Widget:tooltip-markup] are set, the last one wins.
             */
            get tooltipMarkup(): string;
            set tooltipMarkup(val: string);
            /**
             * Sets the text of tooltip to be the given string.
             *
             * Also see [method`Gtk`.Tooltip.set_text].
             *
             * This is a convenience property which will take care of getting the
             * tooltip shown if the given string is not `NULL`:
             * [property`Gtk`.Widget:has-tooltip] will automatically be set to true
             * and there will be taken care of [signal`Gtk`.Widget::query-tooltip] in
             * the default signal handler.
             *
             * Note that if both [property`Gtk`.Widget:tooltip-text] and
             * [property`Gtk`.Widget:tooltip-markup] are set, the last one wins.
             */
            get tooltip_text(): string;
            set tooltip_text(val: string);
            /**
             * Sets the text of tooltip to be the given string.
             *
             * Also see [method`Gtk`.Tooltip.set_text].
             *
             * This is a convenience property which will take care of getting the
             * tooltip shown if the given string is not `NULL`:
             * [property`Gtk`.Widget:has-tooltip] will automatically be set to true
             * and there will be taken care of [signal`Gtk`.Widget::query-tooltip] in
             * the default signal handler.
             *
             * Note that if both [property`Gtk`.Widget:tooltip-text] and
             * [property`Gtk`.Widget:tooltip-markup] are set, the last one wins.
             */
            get tooltipText(): string;
            set tooltipText(val: string);
            /**
             * How to distribute vertical space if widget gets extra space.
             */
            get valign(): Gtk.Align;
            set valign(val: Gtk.Align);
            /**
             * Whether to expand vertically.
             */
            get vexpand(): boolean;
            set vexpand(val: boolean);
            /**
             * Whether to use the `vexpand` property.
             */
            get vexpand_set(): boolean;
            set vexpand_set(val: boolean);
            /**
             * Whether to use the `vexpand` property.
             */
            get vexpandSet(): boolean;
            set vexpandSet(val: boolean);
            /**
             * Whether the widget is visible.
             */
            get visible(): boolean;
            set visible(val: boolean);
            /**
             * Overrides for width request of the widget.
             *
             * If this is -1, the natural request will be used.
             */
            get width_request(): number;
            set width_request(val: number);
            /**
             * Overrides for width request of the widget.
             *
             * If this is -1, the natural request will be used.
             */
            get widthRequest(): number;
            set widthRequest(val: number);

            // Inherited methods
            /**
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target`.
             *
             * Whenever the `source_property` is changed the `target_property` is
             * updated using the same value. For instance:
             *
             *
             * ```c
             *   g_object_bind_property (action, "active", widget, "sensitive", 0);
             * ```
             *
             *
             * Will result in the "sensitive" property of the widget #GObject instance to be
             * updated with the same value of the "active" property of the action #GObject
             * instance.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well.
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. To remove the binding without affecting the
             * `source` and the `target` you can just call g_object_unref() on the returned
             * #GBinding instance.
             *
             * Removing the binding by calling g_object_unref() on it must only be done if
             * the binding, `source` and `target` are only used from a single thread and it
             * is clear that both `source` and `target` outlive the binding. Especially it
             * is not safe to rely on this if the binding, `source` or `target` can be
             * finalized from different threads. Keep another reference to the binding and
             * use g_binding_unbind() instead to be on the safe side.
             *
             * A #GObject can have multiple bindings.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
            ): GObject.Binding;
            /**
             * Complete version of g_object_bind_property().
             *
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target,` allowing you to set the transformation functions to be used by
             * the binding.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well. The `transform_from` function is only used in case
             * of bidirectional bindings, otherwise it will be ignored
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. This will release the reference that is
             * being held on the #GBinding instance; if you want to hold on to the
             * #GBinding instance, you will need to hold a reference to it.
             *
             * To remove the binding, call g_binding_unbind().
             *
             * A #GObject can have multiple bindings.
             *
             * The same `user_data` parameter will be used for both `transform_to`
             * and `transform_from` transformation functions; the `notify` function will
             * be called once, when the binding is removed. If you need different data
             * for each transformation function, please use
             * g_object_bind_property_with_closures() instead.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @param transform_to the transformation function     from the @source to the @target, or %NULL to use the default
             * @param transform_from the transformation function     from the @target to the @source, or %NULL to use the default
             * @param notify a function to call when disposing the binding, to free     resources used by the transformation functions, or %NULL if not required
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property_full(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
                transform_to?: GObject.BindingTransformFunc | null,
                transform_from?: GObject.BindingTransformFunc | null,
                notify?: GLib.DestroyNotify | null,
            ): GObject.Binding;
            // Conflicted with GObject.Object.bind_property_full
            bind_property_full(...args: never[]): any;
            /**
             * This function is intended for #GObject implementations to re-enforce
             * a [floating][floating-ref] object reference. Doing this is seldom
             * required: all #GInitiallyUnowneds are created with a floating reference
             * which usually just needs to be sunken by calling g_object_ref_sink().
             */
            force_floating(): void;
            /**
             * Increases the freeze count on `object`. If the freeze count is
             * non-zero, the emission of "notify" signals on `object` is
             * stopped. The signals are queued until the freeze count is decreased
             * to zero. Duplicate notifications are squashed so that at most one
             * #GObject::notify signal is emitted for each property modified while the
             * object is frozen.
             *
             * This is necessary for accessors that modify multiple properties to prevent
             * premature notification while the object is still being modified.
             */
            freeze_notify(): void;
            /**
             * Gets a named field from the objects table of associations (see g_object_set_data()).
             * @param key name of the key for that association
             * @returns the data if found,          or %NULL if no such data exists.
             */
            get_data(key: string): any | null;
            /**
             * Gets a property of an object.
             *
             * The value can be:
             * - an empty GObject.Value initialized by G_VALUE_INIT, which will be automatically initialized with the expected type of the property (since GLib 2.60)
             * - a GObject.Value initialized with the expected type of the property
             * - a GObject.Value initialized with a type to which the expected type of the property can be transformed
             *
             * In general, a copy is made of the property contents and the caller is responsible for freeing the memory by calling GObject.Value.unset.
             *
             * Note that GObject.Object.get_property is really intended for language bindings, GObject.Object.get is much more convenient for C programming.
             * @param property_name The name of the property to get
             * @param value Return location for the property value. Can be an empty GObject.Value initialized by G_VALUE_INIT (auto-initialized with expected type since GLib 2.60), a GObject.Value initialized with the expected property type, or a GObject.Value initialized with a transformable type
             */
            get_property(property_name: string, value: GObject.Value | any): any;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            get_qdata(quark: GLib.Quark): any | null;
            /**
             * Gets `n_properties` properties for an `object`.
             * Obtained properties will be set to `values`. All properties must be valid.
             * Warnings will be emitted and undefined behaviour may result if invalid
             * properties are passed in.
             * @param names the names of each property to get
             * @param values the values of each property to get
             */
            getv(names: string[], values: (GObject.Value | any)[]): void;
            /**
             * Checks whether `object` has a [floating][floating-ref] reference.
             * @returns %TRUE if @object has a floating reference
             */
            is_floating(): boolean;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param property_name the name of a property installed on the class of @object.
             */
            notify(property_name: string): void;
            /**
             * Emits a "notify" signal for the property specified by `pspec` on `object`.
             *
             * This function omits the property name lookup, hence it is faster than
             * g_object_notify().
             *
             * One way to avoid using g_object_notify() from within the
             * class that registered the properties, and using g_object_notify_by_pspec()
             * instead, is to store the GParamSpec used with
             * g_object_class_install_property() inside a static array, e.g.:
             *
             *
             * ```c
             *   typedef enum
             *   {
             *     PROP_FOO = 1,
             *     PROP_LAST
             *   } MyObjectProperty;
             *
             *   static GParamSpec *properties[PROP_LAST];
             *
             *   static void
             *   my_object_class_init (MyObjectClass *klass)
             *   {
             *     properties[PROP_FOO] = g_param_spec_int ("foo", NULL, NULL,
             *                                              0, 100,
             *                                              50,
             *                                              G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS);
             *     g_object_class_install_property (gobject_class,
             *                                      PROP_FOO,
             *                                      properties[PROP_FOO]);
             *   }
             * ```
             *
             *
             * and then notify a change on the "foo" property with:
             *
             *
             * ```c
             *   g_object_notify_by_pspec (self, properties[PROP_FOO]);
             * ```
             *
             * @param pspec the #GParamSpec of a property installed on the class of @object.
             */
            notify_by_pspec(pspec: GObject.ParamSpec): void;
            /**
             * Increases the reference count of `object`.
             *
             * Since GLib 2.56, if `GLIB_VERSION_MAX_ALLOWED` is 2.56 or greater, the type
             * of `object` will be propagated to the return type (using the GCC typeof()
             * extension), so any casting the caller needs to do on the return type must be
             * explicit.
             * @returns the same @object
             */
            ref(): GObject.Object;
            /**
             * Increase the reference count of `object,` and possibly remove the
             * [floating][floating-ref] reference, if `object` has a floating reference.
             *
             * In other words, if the object is floating, then this call "assumes
             * ownership" of the floating reference, converting it to a normal
             * reference by clearing the floating flag while leaving the reference
             * count unchanged.  If the object is not floating, then this call
             * adds a new normal reference increasing the reference count by one.
             *
             * Since GLib 2.56, the type of `object` will be propagated to the return type
             * under the same conditions as for g_object_ref().
             * @returns @object
             */
            ref_sink(): GObject.Object;
            /**
             * Releases all references to other objects. This can be used to break
             * reference cycles.
             *
             * This function should only be called from object system implementations.
             */
            run_dispose(): void;
            /**
             * Each object carries around a table of associations from
             * strings to pointers.  This function lets you set an association.
             *
             * If the object already had an association with that name,
             * the old association will be destroyed.
             *
             * Internally, the `key` is converted to a #GQuark using g_quark_from_string().
             * This means a copy of `key` is kept permanently (even after `object` has been
             * finalized) — so it is recommended to only use a small, bounded set of values
             * for `key` in your program, to avoid the #GQuark storage growing unbounded.
             * @param key name of the key
             * @param data data to associate with that key
             */
            set_data(key: string, data?: any | null): void;
            /**
             * Sets a property on an object.
             * @param property_name The name of the property to set
             * @param value The value to set the property to
             */
            set_property(property_name: string, value: GObject.Value | any): void;
            /**
             * Remove a specified datum from the object's data associations,
             * without invoking the association's destroy handler.
             * @param key name of the key
             * @returns the data if found, or %NULL          if no such data exists.
             */
            steal_data(key: string): any | null;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata() and removes the `data` from object
             * without invoking its destroy() function (if any was
             * set).
             * Usually, calling this function is only required to update
             * user data pointers with a destroy notifier, for example:
             *
             * ```c
             * void
             * object_add_to_user_list (GObject     *object,
             *                          const gchar *new_string)
             * {
             *   // the quark, naming the object data
             *   GQuark quark_string_list = g_quark_from_static_string ("my-string-list");
             *   // retrieve the old string list
             *   GList *list = g_object_steal_qdata (object, quark_string_list);
             *
             *   // prepend new string
             *   list = g_list_prepend (list, g_strdup (new_string));
             *   // this changed 'list', so we need to set it again
             *   g_object_set_qdata_full (object, quark_string_list, list, free_string_list);
             * }
             * static void
             * free_string_list (gpointer data)
             * {
             *   GList *node, *list = data;
             *
             *   for (node = list; node; node = node->next)
             *     g_free (node->data);
             *   g_list_free (list);
             * }
             * ```
             *
             * Using g_object_get_qdata() in the above example, instead of
             * g_object_steal_qdata() would have left the destroy function set,
             * and thus the partial string list would have been freed upon
             * g_object_set_qdata_full().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            steal_qdata(quark: GLib.Quark): any | null;
            /**
             * Reverts the effect of a previous call to
             * g_object_freeze_notify(). The freeze count is decreased on `object`
             * and when it reaches zero, queued "notify" signals are emitted.
             *
             * Duplicate notifications for each property are squashed so that at most one
             * #GObject::notify signal is emitted for each property, in the reverse order
             * in which they have been queued.
             *
             * It is an error to call this function when the freeze count is zero.
             */
            thaw_notify(): void;
            /**
             * Decreases the reference count of `object`. When its reference count
             * drops to 0, the object is finalized (i.e. its memory is freed).
             *
             * If the pointer to the #GObject may be reused in future (for example, if it is
             * an instance variable of another object), it is recommended to clear the
             * pointer to %NULL rather than retain a dangling pointer to a potentially
             * invalid #GObject instance. Use g_clear_object() for this.
             */
            unref(): void;
            /**
             * This function essentially limits the life time of the `closure` to
             * the life time of the object. That is, when the object is finalized,
             * the `closure` is invalidated by calling g_closure_invalidate() on
             * it, in order to prevent invocations of the closure with a finalized
             * (nonexisting) object. Also, g_object_ref() and g_object_unref() are
             * added as marshal guards to the `closure,` to ensure that an extra
             * reference count is held on `object` during invocation of the
             * `closure`.  Usually, this function will be called on closures that
             * use this `object` as closure data.
             * @param closure #GClosure to watch
             */
            watch_closure(closure: GObject.Closure): void;
            /**
             * the `constructed` function is called by g_object_new() as the
             *  final step of the object creation process.  At the point of the call, all
             *  construction properties have been set on the object.  The purpose of this
             *  call is to allow for object initialisation steps that can only be performed
             *  after construction properties have been set.  `constructed` implementors
             *  should chain up to the `constructed` call of their parent class to allow it
             *  to complete its initialisation.
             */
            vfunc_constructed(): void;
            /**
             * emits property change notification for a bunch
             *  of properties. Overriding `dispatch_properties_changed` should be rarely
             *  needed.
             * @param n_pspecs
             * @param pspecs
             */
            vfunc_dispatch_properties_changed(n_pspecs: number, pspecs: GObject.ParamSpec): void;
            /**
             * the `dispose` function is supposed to drop all references to other
             *  objects, but keep the instance otherwise intact, so that client method
             *  invocations still work. It may be run multiple times (due to reference
             *  loops). Before returning, `dispose` should chain up to the `dispose` method
             *  of the parent class.
             */
            vfunc_dispose(): void;
            /**
             * instance finalization function, should finish the finalization of
             *  the instance begun in `dispose` and chain up to the `finalize` method of the
             *  parent class.
             */
            vfunc_finalize(): void;
            /**
             * the generic getter for all properties of this type. Should be
             *  overridden for every type with properties.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_get_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param pspec
             */
            vfunc_notify(pspec: GObject.ParamSpec): void;
            /**
             * the generic setter for all properties of this type. Should be
             *  overridden for every type with properties. If implementations of
             *  `set_property` don't emit property change notification explicitly, this will
             *  be done implicitly by the type system. However, if the notify signal is
             *  emitted explicitly, the type system will not emit it a second time.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_set_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Disconnects a handler from an instance so it will not be called during any future or currently ongoing emissions of the signal it has been connected to.
             * @param id Handler ID of the handler to be disconnected
             */
            disconnect(id: number): void;
            /**
             * Sets multiple properties of an object at once. The properties argument should be a dictionary mapping property names to values.
             * @param properties Object containing the properties to set
             */
            set(properties: { [key: string]: any }): void;
            /**
             * Blocks a handler of an instance so it will not be called during any signal emissions
             * @param id Handler ID of the handler to be blocked
             */
            block_signal_handler(id: number): void;
            /**
             * Unblocks a handler so it will be called again during any signal emissions
             * @param id Handler ID of the handler to be unblocked
             */
            unblock_signal_handler(id: number): void;
            /**
             * Stops a signal's emission by the given signal name. This will prevent the default handler and any subsequent signal handlers from being invoked.
             * @param detailedName Name of the signal to stop emission of
             */
            stop_emission_by_name(detailedName: string): void;
            /**
             * Enables or disables an action installed with
             * [method`Gtk`.WidgetClass.install_action].
             * @param action_name action name, such as "clipboard.paste"
             * @param enabled whether the action is now enabled
             */
            action_set_enabled(action_name: string, enabled: boolean): void;
            /**
             * Activates the widget.
             *
             * The activation will emit the signal set using
             * [method`Gtk`.WidgetClass.set_activate_signal]
             * during class initialization.
             *
             * Activation is what happens when you press <kbd>Enter</kbd>
             * on a widget.
             *
             * If you wish to handle the activation keybinding yourself,
             * it is recommended to use [method`Gtk`.WidgetClass.add_shortcut]
             * with an action created with [ctor`Gtk`.SignalAction.new].
             *
             * If `widget` is not activatable, the function returns false.
             * @returns true if the widget was activated
             */
            activate(): boolean;
            /**
             * Activates an action for the widget.
             *
             * The action is looked up in the action groups associated with
             * `widget` and its ancestors.
             *
             * If the action is in an action group added with
             * [method`Gtk`.Widget.insert_action_group], the `name` is expected
             * to be prefixed with the prefix that was used when the group was
             * inserted.
             *
             * The arguments must match the actions expected parameter type,
             * as returned by [method`Gio`.Action.get_parameter_type].
             * @param name the name of the action to activate
             * @param args parameters to use
             * @returns true if the action was activated
             */
            activate_action(name: string, args?: GLib.Variant | null): boolean;
            /**
             * Activates the `default.activate` action for the widget.
             *
             * The action is looked up in the same was as for
             * [method`Gtk`.Widget.activate_action].
             */
            activate_default(): void;
            /**
             * Adds an event controller to the widget.
             *
             * The event controllers of a widget handle the events that are
             * propagated to the widget.
             *
             * You will usually want to call this function right after
             * creating any kind of [class`Gtk`.EventController].
             * @param controller an event controller that hasn't been   added to a widget yet
             */
            add_controller(controller: Gtk.EventController): void;
            /**
             * Adds a style class to the widget.
             *
             * After calling this function, the widget’s style will match
             * for `css_class,` according to CSS matching rules.
             *
             * Use [method`Gtk`.Widget.remove_css_class] to remove the
             * style again.
             * @param css_class style class to add to @widget, without the leading period
             */
            add_css_class(css_class: string): void;
            /**
             * Adds a widget to the list of mnemonic labels for this widget.
             *
             * See [method`Gtk`.Widget.list_mnemonic_labels].
             *
             * Note that the list of mnemonic labels for the widget is cleared
             * when the widget is destroyed, so the caller must make sure
             * to update its internal state at this point as well.
             * @param label a widget that acts as a mnemonic label for @widget
             */
            add_mnemonic_label(label: Gtk.Widget): void;
            /**
             * Queues an animation frame update and adds a callback to be called
             * before each frame.
             *
             * Until the tick callback is removed, it will be called frequently
             * (usually at the frame rate of the output device or as quickly as
             * the application can be repainted, whichever is slower). For this
             * reason, is most suitable for handling graphics that change every
             * frame or every few frames.
             *
             * The tick callback does not automatically imply a relayout or repaint.
             * If you want a repaint or relayout, and aren’t changing widget properties
             * that would trigger that (for example, changing the text of a label),
             * then you will have to call [method`Gtk`.Widget.queue_resize] or
             * [method`Gtk`.Widget.queue_draw] yourself.
             *
             * [method`Gdk`.FrameClock.get_frame_time] should generally be used
             * for timing continuous animations and
             * [method`Gdk`.FrameTimings.get_predicted_presentation_time] should be
             * used if you are trying to display isolated frames at particular times.
             *
             * This is a more convenient alternative to connecting directly to the
             * [signal`Gdk`.FrameClock::update] signal of the frame clock, since you
             * don't have to worry about when a frame clock is assigned to a widget.
             *
             * To remove a tick callback, pass the ID that is returned by this function
             * to [method`Gtk`.Widget.remove_tick_callback].
             * @param callback function   to call for updating animations
             * @returns an ID for this callback
             */
            add_tick_callback(callback: Gtk.TickCallback): number;
            /**
             * Assigns size, position, (optionally) a baseline and transform
             * to a child widget.
             *
             * In this function, the allocation and baseline may be adjusted.
             * The given allocation will be forced to be bigger than the
             * widget's minimum size, as well as at least 0×0 in size.
             *
             * This function is only used by widget implementations.
             *
             * For a version that does not take a transform, see
             * [method`Gtk`.Widget.size_allocate].
             * @param width new width
             * @param height new height
             * @param baseline new baseline, or -1
             * @param transform transformation to be applied
             */
            allocate(width: number, height: number, baseline: number, transform?: Gsk.Transform | null): void;
            /**
             * Called by widgets as the user moves around the window using
             * keyboard shortcuts.
             *
             * The `direction` argument indicates what kind of motion is taking
             * place (up, down, left, right, tab forward, tab backward).
             *
             * This function calls the [vfunc`Gtk`.Widget.focus] virtual function;
             * widgets can override the virtual function in order to implement
             * appropriate focus behavior.
             *
             * The default `focus()` virtual function for a widget should return
             * true if moving in `direction` left the focus on a focusable location
             * inside that widget, and false if moving in `direction` moved the focus
             * outside the widget. When returning true, widgets normally call
             * [method`Gtk`.Widget.grab_focus] to place the focus accordingly;
             * when returning false, they don’t modify the current focus location.
             *
             * This function is used by custom widget implementations; if you're
             * writing an app, you’d use [method`Gtk`.Widget.grab_focus] to move
             * the focus to a particular widget.
             * @param direction direction of focus movement
             * @returns true if focus ended up inside @widget
             */
            child_focus(direction: Gtk.DirectionType | null): boolean;
            /**
             * Computes the bounds for `widget` in the coordinate space of `target`.
             *
             * The bounds of widget are (the bounding box of) the region that it is
             * expected to draw in. See the [coordinate system](coordinates.html)
             * overview to learn more.
             *
             * If the operation is successful, true is returned. If `widget` has no
             * bounds or the bounds cannot be expressed in `target'`s coordinate space
             * (for example if both widgets are in different windows), false is
             * returned and `bounds` is set to the zero rectangle.
             *
             * It is valid for `widget` and `target` to be the same widget.
             * @param target the target widget
             * @returns true if the bounds could be computed
             */
            compute_bounds(target: Gtk.Widget): [boolean, Graphene.Rect];
            /**
             * Computes whether a parent widget should give this widget
             * extra space when possible.
             *
             * Widgets with children should check this, rather than looking at
             * [method`Gtk`.Widget.get_hexpand] or [method`Gtk`.Widget.get_vexpand].
             *
             * This function already checks whether the widget is visible, so
             * visibility does not need to be checked separately. Non-visible
             * widgets are not expanded.
             *
             * The computed expand value uses either the expand setting explicitly
             * set on the widget itself, or, if none has been explicitly set,
             * the widget may expand if some of its children do.
             * @param orientation expand direction
             * @returns whether widget tree rooted here should be expanded
             */
            compute_expand(orientation: Gtk.Orientation | null): boolean;
            /**
             * Translates the given `point` in `widget'`s coordinates to coordinates
             * in `target’`s coordinate system.
             *
             * In order to perform this operation, both widgets must share a
             * a common ancestor. If that is not the case, `out_point` is set
             * to (0, 0) and false is returned.
             * @param target the widget to transform into
             * @param point a point in @widget's coordinate system
             * @returns true if @src_widget and @dest_widget have a common   ancestor, false otherwise
             */
            compute_point(target: Gtk.Widget, point: Graphene.Point): [boolean, Graphene.Point];
            /**
             * Computes a matrix suitable to describe a transformation from
             * `widget'`s coordinate system into `target'`s coordinate system.
             *
             * The transform can not be computed in certain cases, for example
             * when `widget` and `target` do not share a common ancestor. In that
             * case `out_transform` gets set to the identity matrix.
             *
             * To learn more about widget coordinate systems, see the coordinate
             * system [overview](coordinates.html).
             * @param target the target widget that the matrix will transform to
             * @returns true if the transform could be computed
             */
            compute_transform(target: Gtk.Widget): [boolean, Graphene.Matrix];
            /**
             * Tests if a given point is contained in the widget.
             *
             * The coordinates for (x, y) must be in widget coordinates, so
             * (0, 0) is assumed to be the top left of `widget'`s content area.
             * @param x X coordinate to test, relative to @widget's origin
             * @param y Y coordinate to test, relative to @widget's origin
             * @returns true if @widget contains the point (x, y)
             */
            contains(x: number, y: number): boolean;
            /**
             * Creates a new `PangoContext` that is configured for the widget.
             *
             * The `PangoContext` will have the appropriate font map,
             * font options, font description, and base direction set.
             *
             * See also [method`Gtk`.Widget.get_pango_context].
             * @returns the new `PangoContext`
             */
            create_pango_context(): Pango.Context;
            /**
             * Creates a new `PangoLayout` that is configured for the widget.
             *
             * The `PangoLayout` will have the appropriate font map,
             * font description, and base direction set.
             *
             * If you keep a `PangoLayout` created in this way around,
             * you need to re-create it when the widgets `PangoContext`
             * is replaced. This can be tracked by listening to changes
             * of the [property`Gtk`.Widget:root] property on the widget.
             * @param text text to set on the layout
             * @returns the new `PangoLayout`
             */
            create_pango_layout(text?: string | null): Pango.Layout;
            /**
             * Clears the template children for the widget.
             *
             * This function is the opposite of [method`Gtk`.Widget.init_template],
             * and it is used to clear all the template children from a widget
             * instance. If you bound a template child to a field in the instance
             * structure, or in the instance private data structure, the field will
             * be set to `NULL` after this function returns.
             *
             * You should call this function inside the `GObjectClass.dispose()`
             * implementation of any widget that called [method`Gtk`.Widget.init_template].
             * Typically, you will want to call this function last, right before
             * chaining up to the parent type's dispose implementation, e.g.
             *
             * ```c
             * static void
             * some_widget_dispose (GObject *gobject)
             * {
             *   SomeWidget *self = SOME_WIDGET (gobject);
             *
             *   // Clear the template data for SomeWidget
             *   gtk_widget_dispose_template (GTK_WIDGET (self), SOME_TYPE_WIDGET);
             *
             *   G_OBJECT_CLASS (some_widget_parent_class)->dispose (gobject);
             * }
             * ```
             * @param widget_type the type of the widget to finalize the template for
             */
            dispose_template(widget_type: GObject.GType): void;
            /**
             * Checks to see if a drag movement has passed the GTK drag threshold.
             * @param start_x X coordinate of start of drag
             * @param start_y Y coordinate of start of drag
             * @param current_x current X coordinate
             * @param current_y current Y coordinate
             * @returns true if the drag threshold has been passed
             */
            drag_check_threshold(start_x: number, start_y: number, current_x: number, current_y: number): boolean;
            /**
             * Notifies the user about an input-related error on the widget.
             *
             * If the [property`Gtk`.Settings:gtk-error-bell] setting is true,
             * it calls [method`Gdk`.Surface.beep], otherwise it does nothing.
             *
             * Note that the effect of [method`Gdk`.Surface.beep] can be configured
             * in many ways, depending on the windowing backend and the desktop
             * environment or window manager that is used.
             */
            error_bell(): void;
            /**
             * Returns the baseline that has currently been allocated to the widget.
             *
             * This function is intended to be used when implementing handlers
             * for the `GtkWidget`Class.snapshot() function, and when allocating
             * child widgets in `GtkWidget`Class.size_allocate().
             * @returns the baseline of the @widget, or -1 if none
             */
            get_allocated_baseline(): number;
            /**
             * Returns the height that has currently been allocated to the widget.
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @returns the height of the @widget
             */
            get_allocated_height(): number;
            /**
             * Returns the width that has currently been allocated to the widget.
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @returns the width of the @widget
             */
            get_allocated_width(): number;
            /**
             * Retrieves the widget’s allocation.
             *
             * Note, when implementing a layout widget: a widget’s allocation
             * will be its “adjusted” allocation, that is, the widget’s parent
             * typically calls [method`Gtk`.Widget.size_allocate] with an allocation,
             * and that allocation is then adjusted (to handle margin
             * and alignment for example) before assignment to the widget.
             * [method`Gtk`.Widget.get_allocation] returns the adjusted allocation that
             * was actually assigned to the widget. The adjusted allocation is
             * guaranteed to be completely contained within the
             * [method`Gtk`.Widget.size_allocate] allocation, however.
             *
             * So a layout widget is guaranteed that its children stay inside
             * the assigned bounds, but not that they have exactly the bounds the
             * widget assigned.
             */
            get_allocation(): Gtk.Allocation;
            /**
             * Gets the first ancestor of the widget with type `widget_type`.
             *
             * For example, `gtk_widget_get_ancestor (widget, GTK_TYPE_BOX)`
             * gets the first `GtkBox` that’s an ancestor of `widget`. No
             * reference will be added to the returned widget; it should
             * not be unreferenced.
             *
             * Note that unlike [method`Gtk`.Widget.is_ancestor], this function
             * considers `widget` to be an ancestor of itself.
             * @param widget_type ancestor type
             * @returns the ancestor widget
             */
            get_ancestor(widget_type: GObject.GType): Gtk.Widget | null;
            /**
             * Returns the baseline that has currently been allocated to the widget.
             *
             * This function is intended to be used when implementing handlers
             * for the `GtkWidgetClass.snapshot()` function, and when allocating
             * child widgets in `GtkWidgetClass.size_allocate()`.
             * @returns the baseline of the @widget, or -1 if none
             */
            get_baseline(): number;
            /**
             * Determines whether the input focus can enter the widget or any
             * of its children.
             *
             * See [method`Gtk`.Widget.set_can_focus].
             * @returns true if the input focus can enter @widget
             */
            get_can_focus(): boolean;
            /**
             * Queries whether the widget can be the target of pointer events.
             * @returns true if @widget can receive pointer events
             */
            get_can_target(): boolean;
            /**
             * Gets the value set with [method`Gtk`.Widget.set_child_visible].
             *
             * If you feel a need to use this function, your code probably
             * needs reorganization.
             *
             * This function is only useful for widget implementations
             * and should never be called by an application.
             * @returns true if the widget is mapped with the parent
             */
            get_child_visible(): boolean;
            /**
             * Gets the clipboard object for the widget.
             *
             * This is a utility function to get the clipboard object for the
             * display that `widget` is using.
             *
             * Note that this function always works, even when `widget` is not
             * realized yet.
             * @returns the appropriate clipboard object
             */
            get_clipboard(): Gdk.Clipboard;
            /**
             * Gets the current foreground color for the widget’s style.
             *
             * This function should only be used in snapshot
             * implementations that need to do custom drawing
             * with the foreground color.
             */
            get_color(): Gdk.RGBA;
            /**
             * Returns the list of style classes applied to the widget.
             * @returns a `NULL`-terminated list of   css classes currently applied to @widget
             */
            get_css_classes(): string[];
            /**
             * Returns the CSS name of the widget.
             * @returns the CSS name
             */
            get_css_name(): string;
            /**
             * Gets the cursor set on the widget.
             *
             * See [method`Gtk`.Widget.set_cursor] for details.
             * @returns the cursor   that is set on @widget
             */
            get_cursor(): Gdk.Cursor | null;
            /**
             * Gets the reading direction for the widget.
             *
             * See [method`Gtk`.Widget.set_direction].
             * @returns the reading direction for the widget
             */
            get_direction(): Gtk.TextDirection;
            /**
             * Get the display for the window that the widget belongs to.
             *
             * This function can only be called after the widget has been
             * added to a widget hierarchy with a `GtkRoot` at the top.
             *
             * In general, you should only create display-specific
             * resources when a widget has been realized, and you should
             * free those resources when the widget is unrealized.
             * @returns the display for this widget
             */
            get_display(): Gdk.Display;
            /**
             * Returns the widget’s first child.
             *
             * This function is primarily meant for widget implementations.
             * @returns the widget's first child
             */
            get_first_child(): Gtk.Widget | null;
            /**
             * Returns the focus child of the widget.
             * @returns the current focus   child of @widget
             */
            get_focus_child(): Gtk.Widget | null;
            /**
             * Returns whether the widget should grab focus when it is clicked
             * with the mouse.
             *
             * See [method`Gtk`.Widget.set_focus_on_click].
             * @returns true if the widget should grab focus when it is   clicked with the mouse
             */
            get_focus_on_click(): boolean;
            /**
             * Determines whether the widget can own the input focus.
             *
             * See [method`Gtk`.Widget.set_focusable].
             * @returns true if @widget can own the input focus
             */
            get_focusable(): boolean;
            /**
             * Gets the font map of the widget.
             *
             * See [method`Gtk`.Widget.set_font_map].
             * @returns the font map of @widget
             */
            get_font_map(): Pango.FontMap | null;
            /**
             * Returns the `cairo_font_options_t` of the widget.
             *
             * Seee [method`Gtk`.Widget.set_font_options].
             * @returns the `cairo_font_options_t` of widget
             */
            get_font_options(): cairo.FontOptions | null;
            /**
             * Obtains the frame clock for a widget.
             *
             * The frame clock is a global “ticker” that can be used to drive
             * animations and repaints. The most common reason to get the frame
             * clock is to call [method`Gdk`.FrameClock.get_frame_time], in order
             * to get a time to use for animating. For example you might record
             * the start of the animation with an initial value from
             * [method`Gdk`.FrameClock.get_frame_time], and then update the animation
             * by calling [method`Gdk`.FrameClock.get_frame_time] again during each repaint.
             *
             * [method`Gdk`.FrameClock.request_phase] will result in a new frame on the
             * clock, but won’t necessarily repaint any widgets. To repaint a widget,
             * you have to use [method`Gtk`.Widget.queue_draw] which invalidates the
             * widget (thus scheduling it to receive a draw on the next frame).
             * [method`Gtk`.Widget.queue_draw] will also end up requesting a frame
             * on the appropriate frame clock.
             *
             * A widget’s frame clock will not change while the widget is mapped.
             * Reparenting a widget (which implies a temporary unmap) can change
             * the widget’s frame clock.
             *
             * Unrealized widgets do not have a frame clock.
             * @returns the frame clock
             */
            get_frame_clock(): Gdk.FrameClock | null;
            /**
             * Gets the horizontal alignment of the widget.
             *
             * For backwards compatibility reasons this method will never return
             * one of the baseline alignments, but instead it will convert it to
             * [enum`Gtk`.Align.fill] or [enum`Gtk`.Align.center].
             *
             * Baselines are not supported for horizontal alignment.
             * @returns the horizontal alignment of @widget
             */
            get_halign(): Gtk.Align;
            /**
             * Returns the current value of the `has-tooltip` property.
             * @returns current value of `has-tooltip` on @widget
             */
            get_has_tooltip(): boolean;
            /**
             * Returns the content height of the widget.
             *
             * This function returns the height passed to its
             * size-allocate implementation, which is the height you
             * should be using in [vfunc`Gtk`.Widget.snapshot].
             *
             * For pointer events, see [method`Gtk`.Widget.contains].
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @returns The height of @widget
             */
            get_height(): number;
            /**
             * Gets whether the widget would like any available extra horizontal
             * space.
             *
             * When a user resizes a window, widgets with expand set to true generally
             * receive the extra space. For example, a list or scrollable area
             * or document in your window would often be set to expand.
             *
             * Widgets with children should use [method`Gtk`.Widget.compute_expand]
             * rather than this function, to see whether any of its children,
             * has the expand flag set. If any child of a widget wants to
             * expand, the parent may ask to expand also.
             *
             * This function only looks at the widget’s own hexpand flag, rather
             * than computing whether the entire widget tree rooted at this widget
             * wants to expand.
             * @returns whether hexpand flag is set
             */
            get_hexpand(): boolean;
            /**
             * Gets whether the `hexpand` flag has been explicitly set.
             *
             * If [property`Gtk`.Widget:hexpand] property is set, then it
             * overrides any computed expand value based on child widgets.
             * If `hexpand` is not set, then the expand value depends on
             * whether any children of the widget would like to expand.
             *
             * There are few reasons to use this function, but it’s here
             * for completeness and consistency.
             * @returns whether hexpand has been explicitly set
             */
            get_hexpand_set(): boolean;
            /**
             * Returns the widget’s last child.
             *
             * This function is primarily meant for widget implementations.
             * @returns the widget's last child
             */
            get_last_child(): Gtk.Widget | null;
            /**
             * Retrieves the layout manager of the widget.
             *
             * See [method`Gtk`.Widget.set_layout_manager].
             * @returns the layout manager of @widget
             */
            get_layout_manager(): Gtk.LayoutManager | null;
            /**
             * Gets the value of the [property`Gtk`.Widget:limit-events] property.
             */
            get_limit_events(): boolean;
            /**
             * Returns whether the widget is mapped.
             * @returns true if the widget is mapped
             */
            get_mapped(): boolean;
            /**
             * Gets the bottom margin of the widget.
             * @returns The bottom margin of @widget
             */
            get_margin_bottom(): number;
            /**
             * Gets the end margin of the widget.
             * @returns The end margin of @widget
             */
            get_margin_end(): number;
            /**
             * Gets the start margin of the widget.
             * @returns The start margin of @widget
             */
            get_margin_start(): number;
            /**
             * Gets the top margin of the widget.
             * @returns The top margin of @widget
             */
            get_margin_top(): number;
            /**
             * Retrieves the name of a widget.
             *
             * See [method`Gtk`.Widget.set_name] for the significance of widget names.
             * @returns name of the widget
             */
            get_name(): string;
            /**
             * Returns the nearest `GtkNative` ancestor of the widget.
             *
             * This function will return `NULL` if the widget is not
             * contained inside a widget tree with a native ancestor.
             *
             * `GtkNative` widgets will return themselves here.
             * @returns the `GtkNative` ancestor of @widget
             */
            get_native(): Gtk.Native | null;
            /**
             * Returns the widget’s next sibling.
             *
             * This function is primarily meant for widget implementations.
             * @returns the widget's next sibling
             */
            get_next_sibling(): Gtk.Widget | null;
            /**
             * Fetches the requested opacity for the widget.
             *
             * See [method`Gtk`.Widget.set_opacity].
             * @returns the requested opacity for this widget
             */
            get_opacity(): number;
            /**
             * Returns the widget’s overflow value.
             * @returns The widget's overflow value
             */
            get_overflow(): Gtk.Overflow;
            /**
             * Gets a `PangoContext` that is configured for the widget.
             *
             * The `PangoContext` will have the appropriate font map, font description,
             * and base direction set.
             *
             * Unlike the context returned by [method`Gtk`.Widget.create_pango_context],
             * this context is owned by the widget (it can be used until the screen
             * for the widget changes or the widget is removed from its toplevel),
             * and will be updated to match any changes to the widget’s attributes.
             * This can be tracked by listening to changes of the
             * [property`Gtk`.Widget:root] property on the widget.
             * @returns the `PangoContext` for the widget
             */
            get_pango_context(): Pango.Context;
            /**
             * Returns the parent widget of the widget.
             * @returns the parent widget of @widget
             */
            get_parent(): Gtk.Widget | null;
            /**
             * Retrieves the minimum and natural size of a widget, taking
             * into account the widget’s preference for height-for-width management.
             *
             * This is used to retrieve a suitable size by container widgets which do
             * not impose any restrictions on the child placement. It can be used
             * to deduce toplevel window and menu sizes as well as child widgets in
             * free-form containers such as `GtkFixed`.
             *
             * Handle with care. Note that the natural height of a height-for-width
             * widget will generally be a smaller size than the minimum height, since
             * the required height for the natural width is generally smaller than the
             * required height for the minimum width.
             *
             * Use [method`Gtk`.Widget.measure] if you want to support baseline alignment.
             */
            get_preferred_size(): [Gtk.Requisition | null, Gtk.Requisition | null];
            /**
             * Returns the widget’s previous sibling.
             *
             * This function is primarily meant for widget implementations.
             * @returns the widget's previous sibling
             */
            get_prev_sibling(): Gtk.Widget | null;
            /**
             * Gets the primary clipboard of the widget.
             *
             * This is a utility function to get the primary clipboard object
             * for the display that `widget` is using.
             *
             * Note that this function always works, even when `widget` is not
             * realized yet.
             * @returns the appropriate clipboard object
             */
            get_primary_clipboard(): Gdk.Clipboard;
            /**
             * Determines whether the widget is realized.
             * @returns true if @widget is realized
             */
            get_realized(): boolean;
            /**
             * Determines whether the widget is always treated as the default widget
             * within its toplevel when it has the focus, even if another widget
             * is the default.
             *
             * See [method`Gtk`.Widget.set_receives_default].
             * @returns true if @widget acts as the default widget when focused
             */
            get_receives_default(): boolean;
            /**
             * Gets whether the widget prefers a height-for-width layout
             * or a width-for-height layout.
             *
             * Single-child widgets generally propagate the preference of
             * their child, more complex widgets need to request something
             * either in context of their children or in context of their
             * allocation capabilities.
             * @returns The `GtkSizeRequestMode` preferred by @widget.
             */
            get_request_mode(): Gtk.SizeRequestMode;
            /**
             * Returns the `GtkRoot` widget of the widget.
             *
             * This function will return `NULL` if the widget is not contained
             * inside a widget tree with a root widget.
             *
             * `GtkRoot` widgets will return themselves here.
             * @returns the root widget of @widget
             */
            get_root(): Gtk.Root | null;
            /**
             * Retrieves the internal scale factor that maps from window
             * coordinates to the actual device pixels.
             *
             * On traditional systems this is 1, on high density outputs,
             * it can be a higher value (typically 2).
             *
             * See [method`Gdk`.Surface.get_scale_factor].
             *
             * Note that modern systems may support *fractional* scaling,
             * where the scale factor is not an integer. On such systems,
             * this function will return the next higher integer value,
             * but you probably want to use [method`Gdk`.Surface.get_scale]
             * to get the fractional scale value.
             * @returns the scale factor for @widget
             */
            get_scale_factor(): number;
            /**
             * Returns the widget’s sensitivity.
             *
             * This function returns the value that has been set using
             * [method`Gtk`.Widget.set_sensitive]).
             *
             * The effective sensitivity of a widget is however determined
             * by both its own and its parent widget’s sensitivity.
             * See [method`Gtk`.Widget.is_sensitive].
             * @returns true if the widget is sensitive
             */
            get_sensitive(): boolean;
            /**
             * Gets the settings object holding the settings used for the widget.
             *
             * Note that this function can only be called when the `GtkWidget`
             * is attached to a toplevel, since the settings object is specific
             * to a particular display. If you want to monitor the widget for
             * changes in its settings, connect to the `notify::display` signal.
             * @returns the relevant settings object
             */
            get_settings(): Gtk.Settings;
            /**
             * Returns the content width or height of the widget.
             *
             * Which dimension is returned depends on `orientation`.
             *
             * This is equivalent to calling [method`Gtk`.Widget.get_width]
             * for [enum`Gtk`.Orientation.horizontal] or [method`Gtk`.Widget.get_height]
             * for [enum`Gtk`.Orientation.vertical], but can be used when
             * writing orientation-independent code, such as when
             * implementing [iface`Gtk`.Orientable] widgets.
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @param orientation the orientation to query
             * @returns the size of @widget in @orientation
             */
            get_size(orientation: Gtk.Orientation | null): number;
            /**
             * Gets the size request that was explicitly set for the widget.
             *
             * A value of -1 stored in `width` or `height` indicates that that
             * dimension has not been set explicitly and the natural requisition
             * of the widget will be used instead.
             *
             * See [method`Gtk`.Widget.set_size_request].
             *
             * To get the size a widget will actually request, call
             * [method`Gtk`.Widget.measure] instead of this function.
             */
            get_size_request(): [number, number];
            /**
             * Returns the widget state as a flag set.
             *
             * It is worth mentioning that the effective [flags`Gtk`.StateFlags.insensitive]
             * state will be returned, that is, also based on parent insensitivity,
             * even if `widget` itself is sensitive.
             *
             * Also note that if you are looking for a way to obtain the
             * [flags`Gtk`.StateFlags] to pass to a [class`Gtk`.StyleContext]
             * method, you should look at [method`Gtk`.StyleContext.get_state].
             * @returns the state flags of widget
             */
            get_state_flags(): Gtk.StateFlags;
            /**
             * Returns the style context associated to the widget.
             *
             * The returned object is guaranteed to be the same
             * for the lifetime of `widget`.
             * @returns the widgets style context
             */
            get_style_context(): Gtk.StyleContext;
            /**
             * Fetches an object build from the template XML for `widget_type` in
             * the widget.
             *
             * This will only report children which were previously declared
             * with [method`Gtk`.WidgetClass.bind_template_child_full] or one of its
             * variants.
             *
             * This function is only meant to be called for code which is private
             * to the `widget_type` which declared the child and is meant for language
             * bindings which cannot easily make use of the GObject structure offsets.
             * @param widget_type The `GType` to get a template child for
             * @param name ID of the child defined in the template XML
             * @returns the object built in the template XML with   the id @name
             */
            get_template_child<T = GObject.Object>(widget_type: GObject.GType, name: string): T;
            /**
             * Gets the contents of the tooltip for the widget.
             *
             * If the tooltip has not been set using
             * [method`Gtk`.Widget.set_tooltip_markup], this
             * function returns `NULL`.
             * @returns the tooltip text
             */
            get_tooltip_markup(): string | null;
            /**
             * Gets the contents of the tooltip for the widget.
             *
             * If the `widget'`s tooltip was set using
             * [method`Gtk`.Widget.set_tooltip_markup],
             * this function will return the escaped text.
             * @returns the tooltip text
             */
            get_tooltip_text(): string | null;
            /**
             * Gets the vertical alignment of the widget.
             * @returns the vertical alignment of @widget
             */
            get_valign(): Gtk.Align;
            /**
             * Gets whether the widget would like any available extra vertical
             * space.
             *
             * See [method`Gtk`.Widget.get_hexpand] for more detail.
             * @returns whether vexpand flag is set
             */
            get_vexpand(): boolean;
            /**
             * Gets whether the `vexpand` flag has been explicitly set.
             *
             * See [method`Gtk`.Widget.get_hexpand_set] for more detail.
             * @returns whether vexpand has been explicitly set
             */
            get_vexpand_set(): boolean;
            /**
             * Determines whether the widget is visible.
             *
             * If you want to take into account whether the widget’s
             * parent is also marked as visible, use
             * [method`Gtk`.Widget.is_visible] instead.
             *
             * This function does not check if the widget is
             * obscured in any way.
             *
             * See [method`Gtk`.Widget.set_visible].
             * @returns true if the widget is visible
             */
            get_visible(): boolean;
            /**
             * Returns the content width of the widget.
             *
             * This function returns the width passed to its
             * size-allocate implementation, which is the width you
             * should be using in [vfunc`Gtk`.Widget.snapshot].
             *
             * For pointer events, see [method`Gtk`.Widget.contains].
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @returns The width of @widget
             */
            get_width(): number;
            /**
             * Causes `widget` to have the keyboard focus for the window
             * that it belongs to.
             *
             * If `widget` is not focusable, or its [vfunc`Gtk`.Widget.grab_focus]
             * implementation cannot transfer the focus to a descendant of `widget`
             * that is focusable, it will not take focus and false will be returned.
             *
             * Calling [method`Gtk`.Widget.grab_focus] on an already focused widget
             * is allowed, should not have an effect, and return true.
             * @returns true if focus is now inside @widget
             */
            grab_focus(): boolean;
            /**
             * Returns whether a style class is currently applied to the widget.
             * @param css_class style class, without the leading period
             * @returns true if @css_class is currently applied to @widget
             */
            has_css_class(css_class: string): boolean;
            /**
             * Determines if the widget should show a visible indication that
             * it has the global input focus.
             *
             * This is a convenience function that takes into account whether
             * focus indication should currently be shown in the toplevel window
             * of `widget`. See [method`Gtk`.Window.get_focus_visible] for more
             * information about focus indication.
             *
             * To find out if the widget has the global input focus, use
             * [method`Gtk`.Widget.has_focus].
             * @returns true if the widget should display a “focus rectangle”
             */
            has_visible_focus(): boolean;
            /**
             * Reverses the effects of [method.Gtk.Widget.show].
             *
             * This is causing the widget to be hidden (invisible to the user).
             */
            hide(): void;
            /**
             * Returns whether the widget is currently being destroyed.
             *
             * This information can sometimes be used to avoid doing
             * unnecessary work.
             * @returns true if @widget is being destroyed
             */
            in_destruction(): boolean;
            /**
             * Creates and initializes child widgets defined in templates.
             *
             * This function must be called in the instance initializer
             * for any class which assigned itself a template using
             * [method`Gtk`.WidgetClass.set_template].
             *
             * It is important to call this function in the instance initializer
             * of a widget subclass and not in `GObject.constructed()` or
             * `GObject.constructor()` for two reasons:
             *
             *  - derived widgets will assume that the composite widgets
             *    defined by its parent classes have been created in their
             *    relative instance initializers
             *  - when calling `g_object_new()` on a widget with composite templates,
             *    it’s important to build the composite widgets before the construct
             *    properties are set. Properties passed to `g_object_new()` should
             *    take precedence over properties set in the private template XML
             *
             * A good rule of thumb is to call this function as the first thing in
             * an instance initialization function.
             */
            init_template(): void;
            /**
             * Inserts an action group into the widget's actions.
             *
             * Children of `widget` that implement [iface`Gtk`.Actionable] can
             * then be associated with actions in `group` by setting their
             * “action-name” to `prefix`.`action-name`.
             *
             * Note that inheritance is defined for individual actions. I.e.
             * even if you insert a group with prefix `prefix,` actions with
             * the same prefix will still be inherited from the parent, unless
             * the group contains an action with the same name.
             *
             * If `group` is `NULL`, a previously inserted group for `name` is
             * removed from `widget`.
             * @param name the prefix for actions in @group
             * @param group an action group
             */
            insert_action_group(name: string, group?: Gio.ActionGroup | null): void;
            /**
             * Sets the parent widget of the widget.
             *
             * In contrast to [method`Gtk`.Widget.set_parent], this function
             * inserts `widget` at a specific position into the list of children
             * of the `parent` widget.
             *
             * It will be placed after `previous_sibling,` or at the beginning if
             * `previous_sibling` is `NULL`.
             *
             * After calling this function, `gtk_widget_get_prev_sibling (widget)`
             * will return `previous_sibling`.
             *
             * If `parent` is already set as the parent widget of `widget,` this
             * function can also be used to reorder `widget` in the child widget
             * list of `parent`.
             *
             * This function is primarily meant for widget implementations; if you are
             * just using a widget, you *must* use its own API for adding children.
             * @param parent the parent widget to insert @widget into
             * @param previous_sibling the new previous sibling of @widget
             */
            insert_after(parent: Gtk.Widget, previous_sibling?: Gtk.Widget | null): void;
            /**
             * Sets the parent widget of the widget.
             *
             * In contrast to [method`Gtk`.Widget.set_parent], this function
             * inserts `widget` at a specific position into the list of children
             * of the `parent` widget.
             *
             * It will be placed before `next_sibling,` or at the end if
             * `next_sibling` is `NULL`.
             *
             * After calling this function, `gtk_widget_get_next_sibling (widget)`
             * will return `next_sibling`.
             *
             * If `parent` is already set as the parent widget of `widget,` this function
             * can also be used to reorder `widget` in the child widget list of `parent`.
             *
             * This function is primarily meant for widget implementations; if you are
             * just using a widget, you *must* use its own API for adding children.
             * @param parent the parent widget to insert @widget into
             * @param next_sibling the new next sibling of @widget
             */
            insert_before(parent: Gtk.Widget, next_sibling?: Gtk.Widget | null): void;
            /**
             * Determines whether the widget is a descendent of `ancestor`.
             * @param ancestor another `GtkWidget`
             * @returns true if @ancestor contains @widget as a child,   grandchild, great grandchild, etc
             */
            is_ancestor(ancestor: Gtk.Widget): boolean;
            /**
             * Determines whether the widget can be drawn to.
             *
             * A widget can be drawn if it is mapped and visible.
             * @returns true if @widget is drawable
             */
            is_drawable(): boolean;
            /**
             * Determines if the widget is the focus widget within its
             * toplevel.
             *
             * This does not mean that the [property`Gtk`.Widget:has-focus]
             * property is necessarily set; [property`Gtk`.Widget:has-focus]
             * will only be set if the toplevel widget additionally has the
             * global input focus.
             * @returns true if the widget is the focus widget
             */
            is_focus(): boolean;
            /**
             * Returns the widget’s effective sensitivity.
             *
             * This means it is sensitive itself and also its
             * parent widget is sensitive.
             * @returns true if the widget is effectively sensitive
             */
            is_sensitive(): boolean;
            /**
             * Determines whether the widget and all its parents are marked as
             * visible.
             *
             * This function does not check if the widget is obscured in any way.
             *
             * See also [method`Gtk`.Widget.get_visible] and
             * [method`Gtk`.Widget.set_visible].
             * @returns true if the widget and all its parents are visible
             */
            is_visible(): boolean;
            /**
             * Emits the [signal`Gtk`.Widget::keynav-failed] signal on the widget.
             *
             * This function should be called whenever keyboard navigation
             * within a single widget hits a boundary.
             *
             * The return value of this function should be interpreted
             * in a way similar to the return value of
             * [method`Gtk`.Widget.child_focus]. When true is returned,
             * stay in the widget, the failed keyboard navigation is ok
             * and/or there is nowhere we can/should move the focus to.
             * When false is returned, the caller should continue with
             * keyboard navigation outside the widget, e.g. by calling
             * [method`Gtk`.Widget.child_focus] on the widget’s toplevel.
             *
             * The default [signal`Gtk`.Widget::keynav-failed] handler returns
             * false for [enum`Gtk`.DirectionType.tab-forward] and
             * [enum`Gtk`.DirectionType.tab-backward]. For the other values
             * of [enum`Gtk`.DirectionType] it returns true.
             *
             * Whenever the default handler returns true, it also calls
             * [method`Gtk`.Widget.error_bell] to notify the user of the
             * failed keyboard navigation.
             *
             * A use case for providing an own implementation of `::keynav-failed`
             * (either by connecting to it or by overriding it) would be a row of
             * [class`Gtk`.Entry] widgets where the user should be able to navigate
             * the entire row with the cursor keys, as e.g. known from user
             * interfaces that require entering license keys.
             * @param direction direction of focus movement
             * @returns true if stopping keyboard navigation is fine, false   if the emitting widget should try to handle the keyboard   navigation attempt in its parent widget
             */
            keynav_failed(direction: Gtk.DirectionType | null): boolean;
            /**
             * Returns the widgets for which this widget is the target of a
             * mnemonic.
             *
             * Typically, these widgets will be labels. See, for example,
             * [method`Gtk`.Label.set_mnemonic_widget].
             *
             * The widgets in the list are not individually referenced.
             * If you want to iterate through the list and perform actions
             * involving callbacks that might destroy the widgets, you
             * must call `g_list_foreach (result, (GFunc)g_object_ref, NULL)`
             * first, and then unref all the widgets afterwards.
             * @returns the list   of mnemonic labels
             */
            list_mnemonic_labels(): Gtk.Widget[];
            /**
             * Causes a widget to be mapped if it isn’t already.
             *
             * This function is only for use in widget implementations.
             */
            map(): void;
            /**
             * Measures `widget` in the orientation `orientation` and for the given `for_size`.
             *
             * As an example, if `orientation` is %GTK_ORIENTATION_HORIZONTAL and `for_size`
             * is 300, this functions will compute the minimum and natural width of `widget`
             * if it is allocated at a height of 300 pixels.
             *
             * See [GtkWidget’s geometry management section](class.Widget.html#height-for-width-geometry-management) for
             * a more details on implementing `GtkWidgetClass.measure()`.
             * @param orientation the orientation to measure
             * @param for_size Size for the opposite of @orientation, i.e.   if @orientation is %GTK_ORIENTATION_HORIZONTAL, this is   the height the widget should be measured with. The %GTK_ORIENTATION_VERTICAL   case is analogous. This way, both height-for-width and width-for-height   requests can be implemented. If no size is known, -1 can be passed.
             */
            measure(orientation: Gtk.Orientation | null, for_size: number): [number, number, number, number];
            /**
             * Emits the [signal`Gtk`.Widget::mnemonic-activate] signal.
             * @param group_cycling true if there are other widgets with the same mnemonic
             * @returns true if the signal has been handled
             */
            mnemonic_activate(group_cycling: boolean): boolean;
            /**
             * Returns a list model to track the children of the widget.
             *
             * Calling this function will enable extra internal bookkeeping
             * to track children and emit signals on the returned listmodel.
             * It may slow down operations a lot.
             *
             * Applications should try hard to avoid calling this function
             * because of the slowdowns.
             * @returns a list model tracking @widget's children
             */
            observe_children(): Gio.ListModel;
            /**
             * Returns a list model to track the event controllers of the widget.
             *
             * Calling this function will enable extra internal bookkeeping
             * to track controllers and emit signals on the returned listmodel.
             * It may slow down operations a lot.
             *
             * Applications should try hard to avoid calling this function
             * because of the slowdowns.
             * @returns a list model tracking @widget's controllers
             */
            observe_controllers(): Gio.ListModel;
            /**
             * Finds the descendant of the widget closest to a point.
             *
             * The point (x, y) must be given in widget coordinates, so (0, 0)
             * is assumed to be the top left of `widget'`s content area.
             *
             * Usually widgets will return `NULL` if the given coordinate is not
             * contained in `widget` checked via [method`Gtk`.Widget.contains].
             * Otherwise they will recursively try to find a child that does
             * not return `NULL`. Widgets are however free to customize their
             * picking algorithm.
             *
             * This function is used on the toplevel to determine the widget
             * below the mouse cursor for purposes of hover highlighting and
             * delivering events.
             * @param x x coordinate to test, relative to @widget's origin
             * @param y y coordinate to test, relative to @widget's origin
             * @param flags flags to influence what is picked
             * @returns the widget's descendant at (x, y)
             */
            pick(x: number, y: number, flags: Gtk.PickFlags | null): Gtk.Widget | null;
            /**
             * Flags the widget for a rerun of the [vfunc`Gtk`.Widget.size_allocate]
             * function.
             *
             * Use this function instead of [method`Gtk`.Widget.queue_resize]
             * when the `widget'`s size request didn't change but it wants to
             * reposition its contents.
             *
             * An example user of this function is [method`Gtk`.Widget.set_halign].
             *
             * This function is only for use in widget implementations.
             */
            queue_allocate(): void;
            /**
             * Schedules this widget to be redrawn.
             *
             * The redraw will happen in the paint phase
             * of the current or the next frame.
             *
             * This means `widget'`s [vfunc`Gtk`.Widget.snapshot]
             * implementation will be called.
             */
            queue_draw(): void;
            /**
             * Flags a widget to have its size renegotiated.
             *
             * This should be called when a widget for some reason has a new
             * size request. For example, when you change the text in a
             * [class`Gtk`.Label], the label queues a resize to ensure there’s
             * enough space for the new text.
             *
             * Note that you cannot call gtk_widget_queue_resize() on a widget
             * from inside its implementation of the [vfunc`Gtk`.Widget.size_allocate]
             * virtual method. Calls to gtk_widget_queue_resize() from inside
             * [vfunc`Gtk`.Widget.size_allocate] will be silently ignored.
             *
             * This function is only for use in widget implementations.
             */
            queue_resize(): void;
            /**
             * Creates the GDK resources associated with a widget.
             *
             * Normally realization happens implicitly; if you show a widget
             * and all its parent containers, then the widget will be realized
             * and mapped automatically.
             *
             * Realizing a widget requires all the widget’s parent widgets to be
             * realized; calling this function realizes the widget’s parents
             * in addition to `widget` itself. If a widget is not yet inside a
             * toplevel window when you realize it, bad things will happen.
             *
             * This function is primarily used in widget implementations, and
             * isn’t very useful otherwise. Many times when you think you might
             * need it, a better approach is to connect to a signal that will be
             * called after the widget is realized automatically, such as
             * [signal`Gtk`.Widget::realize].
             */
            realize(): void;
            /**
             * Removes an event controller from the widget.
             *
             * The removed event controller will not receive any more events,
             * and should not be used again.
             *
             * Widgets will remove all event controllers automatically when they
             * are destroyed, there is normally no need to call this function.
             * @param controller an event controller
             */
            remove_controller(controller: Gtk.EventController): void;
            /**
             * Removes a style from the widget.
             *
             * After this, the style of `widget` will stop matching for `css_class`.
             * @param css_class style class to remove from @widget, without the leading period
             */
            remove_css_class(css_class: string): void;
            /**
             * Removes a widget from the list of mnemonic labels for this widget.
             *
             * See [method`Gtk`.Widget.list_mnemonic_labels].
             *
             * The widget must have previously been added to the list with
             * [method`Gtk`.Widget.add_mnemonic_label].
             * @param label a widget that is a mnemonic label for @widget
             */
            remove_mnemonic_label(label: Gtk.Widget): void;
            /**
             * Removes a tick callback previously registered with
             * [method`Gtk`.Widget.add_tick_callback].
             * @param id an ID returned by [method@Gtk.Widget.add_tick_callback]
             */
            remove_tick_callback(id: number): void;
            /**
             * Sets whether the input focus can enter the widget or
             * any of its children.
             *
             * Applications should set `can_focus` to false to mark a
             * widget as for pointer/touch use only.
             *
             * Note that having `can_focus` be true is only one of the
             * necessary conditions for being focusable. A widget must
             * also be sensitive and focusable and not have an ancestor
             * that is marked as not can-focus in order to receive input
             * focus.
             *
             * See [method`Gtk`.Widget.grab_focus] for actually setting
             * the input focus on a widget.
             * @param can_focus whether the input focus can enter   the widget or any of its children
             */
            set_can_focus(can_focus: boolean): void;
            /**
             * Sets whether the widget can be the target of pointer events.
             * @param can_target whether this widget should be able to   receive pointer events
             */
            set_can_target(can_target: boolean): void;
            /**
             * Sets whether the widget should be mapped along with its parent.
             *
             * The child visibility can be set for widget before it is added
             * to a container with [method`Gtk`.Widget.set_parent], to avoid
             * mapping children unnecessary before immediately unmapping them.
             * However it will be reset to its default state of true when the
             * widget is removed from a container.
             *
             * Note that changing the child visibility of a widget does not
             * queue a resize on the widget. Most of the time, the size of
             * a widget is computed from all visible children, whether or
             * not they are mapped. If this is not the case, the container
             * can queue a resize itself.
             *
             * This function is only useful for widget implementations
             * and should never be called by an application.
             * @param child_visible whether @widget should be mapped along   with its parent
             */
            set_child_visible(child_visible: boolean): void;
            /**
             * Replaces the current style classes of the widget with `classes`.
             * @param classes `NULL`-terminated list of style classes
             */
            set_css_classes(classes: string[]): void;
            /**
             * Sets the cursor to be shown when the pointer hovers over
             * the widget.
             *
             * If the `cursor` is `NULL`, `widget` will use the cursor
             * inherited from its parent.
             * @param cursor the new cursor
             */
            set_cursor(cursor?: Gdk.Cursor | null): void;
            /**
             * Sets the cursor to be shown when the pointer hovers over
             * the widget.
             *
             * This is a utility function that creates a cursor via
             * [ctor`Gdk`.Cursor.new_from_name] and then sets it on `widget`
             * with [method`Gtk`.Widget.set_cursor]. See those functions for
             * details.
             *
             * On top of that, this function allows `name` to be `NULL`, which
             * will do the same as calling [method`Gtk`.Widget.set_cursor]
             * with a `NULL` cursor.
             * @param name the name of the cursor
             */
            set_cursor_from_name(name?: string | null): void;
            /**
             * Sets the reading direction on the widget.
             *
             * This direction controls the primary direction for widgets
             * containing text, and also the direction in which the children
             * of a container are packed. The ability to set the direction is
             * present in order so that correct localization into languages with
             * right-to-left reading directions can be done.
             *
             * Generally, applications will let the default reading direction
             * prevail, except for widgets where the children are arranged in
             * an order that is explicitly visual rather than logical (such as
             * buttons for text justification).
             *
             * If the direction is set to [enum`Gtk`.TextDirection.none], then
             * the value set by [func`Gtk`.Widget.set_default_direction] will be used.
             * @param dir the new direction
             */
            set_direction(dir: Gtk.TextDirection | null): void;
            /**
             * Set the focus child of the widget.
             *
             * This function is only suitable for widget implementations.
             * If you want a certain widget to get the input focus, call
             * [method`Gtk`.Widget.grab_focus] on it.
             * @param child a direct child widget of @widget   or `NULL` to unset the focus child
             */
            set_focus_child(child?: Gtk.Widget | null): void;
            /**
             * Sets whether the widget should grab focus when it is clicked
             * with the mouse.
             *
             * Making mouse clicks not grab focus is useful in places like
             * toolbars where you don’t want the keyboard focus removed from
             * the main area of the application.
             * @param focus_on_click whether the widget should grab focus when clicked   with the mouse
             */
            set_focus_on_click(focus_on_click: boolean): void;
            /**
             * Sets whether the widget can own the input focus.
             *
             * Widget implementations should set `focusable` to true in
             * their init() function if they want to receive keyboard input.
             *
             * Note that having `focusable` be true is only one of the
             * necessary conditions for being focusable. A widget must
             * also be sensitive and can-focus and not have an ancestor
             * that is marked as not can-focus in order to receive input
             * focus.
             *
             * See [method`Gtk`.Widget.grab_focus] for actually setting
             * the input focus on a widget.
             * @param focusable whether or not @widget can own the input focus
             */
            set_focusable(focusable: boolean): void;
            /**
             * Sets the font map to use for text rendering in the widget.
             *
             * The font map is the object that is used to look up fonts.
             * Setting a custom font map can be useful in special situations,
             * e.g. when you need to add application-specific fonts to the set
             * of available fonts.
             *
             * When not set, the widget will inherit the font map from its parent.
             * @param font_map a `PangoFontMap`
             */
            set_font_map(font_map?: Pango.FontMap | null): void;
            /**
             * Sets the `cairo_font_options_t` used for text rendering
             * in the widget.
             *
             * When not set, the default font options for the `GdkDisplay`
             * will be used.
             * @param options a `cairo_font_options_t` struct   to unset any previously set default font options
             */
            set_font_options(options?: cairo.FontOptions | null): void;
            /**
             * Sets the horizontal alignment of the widget.
             * @param align the horizontal alignment
             */
            set_halign(align: Gtk.Align | null): void;
            /**
             * Sets the `has-tooltip` property on the widget.
             * @param has_tooltip whether or not @widget has a tooltip
             */
            set_has_tooltip(has_tooltip: boolean): void;
            /**
             * Sets whether the widget would like any available extra horizontal
             * space.
             *
             * When a user resizes a window, widgets with expand set to true generally
             * receive the extra space. For example, a list or scrollable area
             * or document in your window would often be set to expand.
             *
             * Call this function to set the expand flag if you would like your
             * widget to become larger horizontally when the window has extra
             * room.
             *
             * By default, widgets automatically expand if any of their children
             * want to expand. (To see if a widget will automatically expand given
             * its current children and state, call [method`Gtk`.Widget.compute_expand].
             * A widget can decide how the expandability of children affects its
             * own expansion by overriding the `compute_expand` virtual method on
             * `GtkWidget`.).
             *
             * Setting hexpand explicitly with this function will override the
             * automatic expand behavior.
             *
             * This function forces the widget to expand or not to expand,
             * regardless of children. The override occurs because
             * [method`Gtk`.Widget.set_hexpand] sets the hexpand-set property (see
             * [method`Gtk`.Widget.set_hexpand_set]) which causes the widget’s hexpand
             * value to be used, rather than looking at children and widget state.
             * @param expand whether to expand
             */
            set_hexpand(expand: boolean): void;
            /**
             * Sets whether the hexpand flag will be used.
             *
             * The [property`Gtk`.Widget:hexpand-set] property will be set
             * automatically when you call [method`Gtk`.Widget.set_hexpand]
             * to set hexpand, so the most likely reason to use this function
             * would be to unset an explicit expand flag.
             *
             * If hexpand is set, then it overrides any computed
             * expand value based on child widgets. If hexpand is not
             * set, then the expand value depends on whether any
             * children of the widget would like to expand.
             *
             * There are few reasons to use this function, but it’s here
             * for completeness and consistency.
             * @param set value for hexpand-set property
             */
            set_hexpand_set(set: boolean): void;
            /**
             * Sets the layout manager to use for measuring and allocating children
             * of the widget.
             * @param layout_manager a layout manager
             */
            set_layout_manager(layout_manager?: Gtk.LayoutManager | null): void;
            /**
             * Sets whether the widget acts like a modal dialog,
             * with respect to event delivery.
             * @param limit_events whether to limit events
             */
            set_limit_events(limit_events: boolean): void;
            /**
             * Sets the bottom margin of the widget.
             * @param margin the bottom margin
             */
            set_margin_bottom(margin: number): void;
            /**
             * Sets the end margin of the widget.
             * @param margin the end margin
             */
            set_margin_end(margin: number): void;
            /**
             * Sets the start margin of the widget.
             * @param margin the start margin
             */
            set_margin_start(margin: number): void;
            /**
             * Sets the top margin of the widget.
             * @param margin the top margin
             */
            set_margin_top(margin: number): void;
            /**
             * Sets a widgets name.
             *
             * Setting a name allows you to refer to the widget from a
             * CSS file. You can apply a style to widgets with a particular name
             * in the CSS file. See the documentation for the CSS syntax (on the
             * same page as the docs for [class`Gtk`.StyleContext].
             *
             * Note that the CSS syntax has certain special characters to delimit
             * and represent elements in a selector (period, #, >, *...), so using
             * these will make your widget impossible to match by name. Any combination
             * of alphanumeric symbols, dashes and underscores will suffice.
             * @param name name for the widget
             */
            set_name(name: string): void;
            /**
             * Requests the widget to be rendered partially transparent.
             *
             * An opacity of 0 is fully transparent and an opacity of 1
             * is fully opaque.
             *
             * Opacity works on both toplevel widgets and child widgets, although
             * there are some limitations: For toplevel widgets, applying opacity
             * depends on the capabilities of the windowing system. On X11, this
             * has any effect only on X displays with a compositing manager, see
             * [method`Gdk`.Display.is_composited]. On Windows and Wayland it will
             * always work, although setting a window’s opacity after the window
             * has been shown may cause some flicker.
             *
             * Note that the opacity is inherited through inclusion — if you set
             * a toplevel to be partially translucent, all of its content will
             * appear translucent, since it is ultimatively rendered on that
             * toplevel. The opacity value itself is not inherited by child
             * widgets (since that would make widgets deeper in the hierarchy
             * progressively more translucent). As a consequence, [class`Gtk`.Popover]
             * instances and other [iface`Gtk`.Native] widgets with their own surface
             * will use their own opacity value, and thus by default appear
             * non-translucent, even if they are attached to a toplevel that
             * is translucent.
             * @param opacity desired opacity, between 0 and 1
             */
            set_opacity(opacity: number): void;
            /**
             * Sets how the widget treats content that is drawn outside the
             * it's content area.
             *
             * See the definition of [enum`Gtk`.Overflow] for details.
             *
             * This setting is provided for widget implementations and
             * should not be used by application code.
             *
             * The default value is [enum`Gtk`.Overflow.visible].
             * @param overflow desired overflow value
             */
            set_overflow(overflow: Gtk.Overflow | null): void;
            /**
             * Sets the parent widget of the widget.
             *
             * This takes care of details such as updating the state and style
             * of the child to reflect its new location and resizing the parent.
             * The opposite function is [method`Gtk`.Widget.unparent].
             *
             * This function is useful only when implementing subclasses of
             * `GtkWidget`.
             * @param parent parent widget
             */
            set_parent(parent: Gtk.Widget): void;
            /**
             * Sets whether the widget will be treated as the default
             * widget within its toplevel when it has the focus, even if
             * another widget is the default.
             * @param receives_default whether or not @widget can be a default widget
             */
            set_receives_default(receives_default: boolean): void;
            /**
             * Sets the sensitivity of the widget.
             *
             * A widget is sensitive if the user can interact with it.
             * Insensitive widgets are “grayed out” and the user can’t
             * interact with them. Insensitive widgets are known as
             * “inactive”, “disabled”, or “ghosted” in some other toolkits.
             * @param sensitive true to make the widget sensitive
             */
            set_sensitive(sensitive: boolean): void;
            /**
             * Sets the minimum size of the widget.
             *
             * That is, the widget’s size request will be at least `width`
             * by `height`. You can use this function to force a widget to
             * be larger than it normally would be.
             *
             * In most cases, [method`Gtk`.Window.set_default_size] is a better
             * choice for toplevel windows than this function; setting the default
             * size will still allow users to shrink the window. Setting the size
             * request will force them to leave the window at least as large as
             * the size request.
             *
             * Note the inherent danger of setting any fixed size - themes,
             * translations into other languages, different fonts, and user action
             * can all change the appropriate size for a given widget. So, it is
             * basically impossible to hardcode a size that will always work.
             *
             * The size request of a widget is the smallest size a widget can
             * accept while still functioning well and drawing itself correctly.
             * However in some strange cases a widget may be allocated less than
             * its requested size, and in many cases a widget may be allocated more
             * space than it requested.
             *
             * If the size request in a given direction is -1 (unset), then
             * the “natural” size request of the widget will be used instead.
             *
             * The size request set here does not include any margin from the
             * properties
             * [property`Gtk`.Widget:margin-start],
             * [property`Gtk`.Widget:margin-end],
             * [property`Gtk`.Widget:margin-top], and
             * [property`Gtk`.Widget:margin-bottom], but it does include pretty
             * much all other padding or border properties set by any subclass
             * of `GtkWidget`.
             * @param width width @widget should request, or -1 to unset
             * @param height height @widget should request, or -1 to unset
             */
            set_size_request(width: number, height: number): void;
            /**
             * Turns on flag values in the current widget state.
             *
             * Typical widget states are insensitive, prelighted, etc.
             *
             * This function accepts the values [flags`Gtk`.StateFlags.dir-ltr] and
             * [flags`Gtk`.StateFlags.dir-rtl] but ignores them. If you want to set
             * the widget's direction, use [method`Gtk`.Widget.set_direction].
             *
             * This function is for use in widget implementations.
             * @param flags state flags to turn on
             * @param clear whether to clear state before turning on @flags
             */
            set_state_flags(flags: Gtk.StateFlags | null, clear: boolean): void;
            /**
             * Sets the contents of the tooltip for widget.
             *
             * `markup` must contain Pango markup.
             *
             * This function will take care of setting the
             * [property`Gtk`.Widget:has-tooltip] as a side effect, and of the
             * default handler for the [signal`Gtk`.Widget::query-tooltip] signal.
             *
             * See also [method`Gtk`.Tooltip.set_markup].
             * @param markup the contents of the tooltip for @widget
             */
            set_tooltip_markup(markup?: string | null): void;
            /**
             * Sets the contents of the tooltip for the widget.
             *
             * If `text` contains any markup, it will be escaped.
             *
             * This function will take care of setting
             * [property`Gtk`.Widget:has-tooltip] as a side effect,
             * and of the default handler for the
             * [signal`Gtk`.Widget::query-tooltip] signal.
             *
             * See also [method`Gtk`.Tooltip.set_text].
             * @param text the contents of the tooltip for @widget
             */
            set_tooltip_text(text?: string | null): void;
            /**
             * Sets the vertical alignment of the widget.
             * @param align the vertical alignment
             */
            set_valign(align: Gtk.Align | null): void;
            /**
             * Sets whether the widget would like any available extra vertical
             * space.
             *
             * See [method`Gtk`.Widget.set_hexpand] for more detail.
             * @param expand whether to expand
             */
            set_vexpand(expand: boolean): void;
            /**
             * Sets whether the vexpand flag will be used.
             *
             * See [method`Gtk`.Widget.set_hexpand_set] for more detail.
             * @param set value for vexpand-set property
             */
            set_vexpand_set(set: boolean): void;
            /**
             * Sets the visibility state of `widget`.
             *
             * Note that setting this to true doesn’t mean the widget is
             * actually viewable, see [method`Gtk`.Widget.get_visible].
             * @param visible whether the widget should be shown or not
             */
            set_visible(visible: boolean): void;
            /**
             * Returns whether the widget should contribute to
             * the measuring and allocation of its parent.
             *
             * This is false for invisible children, but also
             * for children that have their own surface, such
             * as [class`Gtk`.Popover] instances.
             * @returns true if child should be included in   measuring and allocating
             */
            should_layout(): boolean;
            /**
             * Flags a widget to be displayed.
             *
             * Any widget that isn’t shown will not appear on the screen.
             *
             * Remember that you have to show the containers containing a widget,
             * in addition to the widget itself, before it will appear onscreen.
             *
             * When a toplevel widget is shown, it is immediately realized and
             * mapped; other shown widgets are realized and mapped when their
             * toplevel widget is realized and mapped.
             */
            show(): void;
            /**
             * Allocates widget with a transformation that translates
             * the origin to the position in `allocation`.
             *
             * This is a simple form of [method`Gtk`.Widget.allocate].
             * @param allocation position and size to be allocated to @widget
             * @param baseline the baseline of the child, or -1
             */
            size_allocate(allocation: Gtk.Allocation, baseline: number): void;
            /**
             * Snapshots a child of the widget.
             *
             * When a widget receives a call to the snapshot function,
             * it must send synthetic [vfunc`Gtk`.Widget.snapshot] calls
             * to all children. This function provides a convenient way
             * of doing this. A widget, when it receives a call to its
             * [vfunc`Gtk`.Widget.snapshot] function, calls
             * gtk_widget_snapshot_child() once for each child, passing in
             * the `snapshot` the widget received.
             *
             * This function takes care of translating the origin of `snapshot,`
             * and deciding whether the child needs to be snapshot.
             *
             * It does nothing for children that implement `GtkNative`.
             * @param child a child of @widget
             * @param snapshot snapshot as passed to the widget. In particular, no   calls to [method@Gtk.Snapshot.translate] or other transform calls   should have been made
             */
            snapshot_child(child: Gtk.Widget, snapshot: Gtk.Snapshot): void;
            /**
             * Translates coordinates relative to `src_widget’`s allocation
             * to coordinates relative to `dest_widget’`s allocations.
             *
             * In order to perform this operation, both widget must share
             * a common ancestor. If that is not the case, `dest_x` and `dest_y`
             * are set to 0 and false is returned.
             * @param dest_widget another widget
             * @param src_x X position in widget coordinates of @src_widget
             * @param src_y Y position in widget coordinates of @src_widget
             * @returns true if @src_widget and @dest_widget have a common   ancestor, false otherwise
             */
            translate_coordinates(dest_widget: Gtk.Widget, src_x: number, src_y: number): [boolean, number, number];
            /**
             * Triggers a tooltip query on the display of the widget.
             */
            trigger_tooltip_query(): void;
            /**
             * Causes a widget to be unmapped if it’s currently mapped.
             *
             * This function is only for use in widget implementations.
             */
            unmap(): void;
            /**
             * Removes `widget` from its parent.
             *
             * This function is only for use in widget implementations,
             * typically in dispose.
             */
            unparent(): void;
            /**
             * Causes a widget to be unrealized.
             *
             * This frees all GDK resources associated with the widget.
             *
             * This function is only useful in widget implementations.
             */
            unrealize(): void;
            /**
             * Turns off flag values for the current widget state.
             *
             * See [method`Gtk`.Widget.set_state_flags].
             *
             * This function is for use in widget implementations.
             * @param flags state flags to turn off
             */
            unset_state_flags(flags: Gtk.StateFlags | null): void;
            /**
             * Computes whether a container should give this
             *   widget extra space when possible.
             * @param hexpand_p
             * @param vexpand_p
             */
            vfunc_compute_expand(hexpand_p: boolean, vexpand_p: boolean): void;
            /**
             * Tests if a given point is contained in the widget.
             *
             * The coordinates for (x, y) must be in widget coordinates, so
             * (0, 0) is assumed to be the top left of `widget'`s content area.
             * @param x X coordinate to test, relative to @widget's origin
             * @param y Y coordinate to test, relative to @widget's origin
             */
            vfunc_contains(x: number, y: number): boolean;
            /**
             * Vfunc called when the CSS used by widget was changed. Widgets
             *   should then discard their caches that depend on CSS and queue resizes or
             *   redraws accordingly. The default implementation will take care of this for
             *   all the default CSS properties, so implementations must chain up.
             * @param change
             */
            vfunc_css_changed(change: Gtk.CssStyleChange): void;
            /**
             * Signal emitted when the text direction of a
             *   widget changes.
             * @param previous_direction
             */
            vfunc_direction_changed(previous_direction: Gtk.TextDirection): void;
            /**
             * Vfunc for gtk_widget_child_focus()
             * @param direction
             */
            vfunc_focus(direction: Gtk.DirectionType): boolean;
            /**
             * Gets whether the widget prefers a height-for-width layout
             * or a width-for-height layout.
             *
             * Single-child widgets generally propagate the preference of
             * their child, more complex widgets need to request something
             * either in context of their children or in context of their
             * allocation capabilities.
             */
            vfunc_get_request_mode(): Gtk.SizeRequestMode;
            /**
             * Causes `widget` to have the keyboard focus for the window
             * that it belongs to.
             *
             * If `widget` is not focusable, or its [vfunc`Gtk`.Widget.grab_focus]
             * implementation cannot transfer the focus to a descendant of `widget`
             * that is focusable, it will not take focus and false will be returned.
             *
             * Calling [method`Gtk`.Widget.grab_focus] on an already focused widget
             * is allowed, should not have an effect, and return true.
             */
            vfunc_grab_focus(): boolean;
            /**
             * Reverses the effects of [method.Gtk.Widget.show].
             *
             * This is causing the widget to be hidden (invisible to the user).
             */
            vfunc_hide(): void;
            /**
             * Emits the [signal`Gtk`.Widget::keynav-failed] signal on the widget.
             *
             * This function should be called whenever keyboard navigation
             * within a single widget hits a boundary.
             *
             * The return value of this function should be interpreted
             * in a way similar to the return value of
             * [method`Gtk`.Widget.child_focus]. When true is returned,
             * stay in the widget, the failed keyboard navigation is ok
             * and/or there is nowhere we can/should move the focus to.
             * When false is returned, the caller should continue with
             * keyboard navigation outside the widget, e.g. by calling
             * [method`Gtk`.Widget.child_focus] on the widget’s toplevel.
             *
             * The default [signal`Gtk`.Widget::keynav-failed] handler returns
             * false for [enum`Gtk`.DirectionType.tab-forward] and
             * [enum`Gtk`.DirectionType.tab-backward]. For the other values
             * of [enum`Gtk`.DirectionType] it returns true.
             *
             * Whenever the default handler returns true, it also calls
             * [method`Gtk`.Widget.error_bell] to notify the user of the
             * failed keyboard navigation.
             *
             * A use case for providing an own implementation of `::keynav-failed`
             * (either by connecting to it or by overriding it) would be a row of
             * [class`Gtk`.Entry] widgets where the user should be able to navigate
             * the entire row with the cursor keys, as e.g. known from user
             * interfaces that require entering license keys.
             * @param direction direction of focus movement
             */
            vfunc_keynav_failed(direction: Gtk.DirectionType): boolean;
            /**
             * Causes a widget to be mapped if it isn’t already.
             *
             * This function is only for use in widget implementations.
             */
            vfunc_map(): void;
            /**
             * Measures `widget` in the orientation `orientation` and for the given `for_size`.
             *
             * As an example, if `orientation` is %GTK_ORIENTATION_HORIZONTAL and `for_size`
             * is 300, this functions will compute the minimum and natural width of `widget`
             * if it is allocated at a height of 300 pixels.
             *
             * See [GtkWidget’s geometry management section](class.Widget.html#height-for-width-geometry-management) for
             * a more details on implementing `GtkWidgetClass.measure()`.
             * @param orientation the orientation to measure
             * @param for_size Size for the opposite of @orientation, i.e.   if @orientation is %GTK_ORIENTATION_HORIZONTAL, this is   the height the widget should be measured with. The %GTK_ORIENTATION_VERTICAL   case is analogous. This way, both height-for-width and width-for-height   requests can be implemented. If no size is known, -1 can be passed.
             */
            vfunc_measure(orientation: Gtk.Orientation, for_size: number): [number, number, number, number];
            /**
             * Emits the [signal`Gtk`.Widget::mnemonic-activate] signal.
             * @param group_cycling true if there are other widgets with the same mnemonic
             */
            vfunc_mnemonic_activate(group_cycling: boolean): boolean;
            /**
             * Signal emitted when a change of focus is requested
             * @param direction
             */
            vfunc_move_focus(direction: Gtk.DirectionType): void;
            /**
             * Signal emitted when “has-tooltip” is %TRUE and the
             *   hover timeout has expired with the cursor hovering “above”
             *   widget; or emitted when widget got focus in keyboard mode.
             * @param x
             * @param y
             * @param keyboard_tooltip
             * @param tooltip
             */
            vfunc_query_tooltip(x: number, y: number, keyboard_tooltip: boolean, tooltip: Gtk.Tooltip): boolean;
            /**
             * Creates the GDK resources associated with a widget.
             *
             * Normally realization happens implicitly; if you show a widget
             * and all its parent containers, then the widget will be realized
             * and mapped automatically.
             *
             * Realizing a widget requires all the widget’s parent widgets to be
             * realized; calling this function realizes the widget’s parents
             * in addition to `widget` itself. If a widget is not yet inside a
             * toplevel window when you realize it, bad things will happen.
             *
             * This function is primarily used in widget implementations, and
             * isn’t very useful otherwise. Many times when you think you might
             * need it, a better approach is to connect to a signal that will be
             * called after the widget is realized automatically, such as
             * [signal`Gtk`.Widget::realize].
             */
            vfunc_realize(): void;
            /**
             * Called when the widget gets added to a `GtkRoot` widget. Must
             *   chain up
             */
            vfunc_root(): void;
            /**
             * Set the focus child of the widget.
             *
             * This function is only suitable for widget implementations.
             * If you want a certain widget to get the input focus, call
             * [method`Gtk`.Widget.grab_focus] on it.
             * @param child a direct child widget of @widget   or `NULL` to unset the focus child
             */
            vfunc_set_focus_child(child?: Gtk.Widget | null): void;
            /**
             * Flags a widget to be displayed.
             *
             * Any widget that isn’t shown will not appear on the screen.
             *
             * Remember that you have to show the containers containing a widget,
             * in addition to the widget itself, before it will appear onscreen.
             *
             * When a toplevel widget is shown, it is immediately realized and
             * mapped; other shown widgets are realized and mapped when their
             * toplevel widget is realized and mapped.
             */
            vfunc_show(): void;
            /**
             * Called to set the allocation, if the widget does
             *   not have a layout manager.
             * @param width
             * @param height
             * @param baseline
             */
            vfunc_size_allocate(width: number, height: number, baseline: number): void;
            /**
             * Vfunc called when a new snapshot of the widget has to be taken.
             * @param snapshot
             */
            vfunc_snapshot(snapshot: Gtk.Snapshot): void;
            /**
             * Signal emitted when the widget state changes,
             *   see gtk_widget_get_state_flags().
             * @param previous_state_flags
             */
            vfunc_state_flags_changed(previous_state_flags: Gtk.StateFlags): void;
            /**
             * Emitted when a system setting was changed. Must chain up.
             * @param settings
             */
            vfunc_system_setting_changed(settings: Gtk.SystemSetting): void;
            /**
             * Causes a widget to be unmapped if it’s currently mapped.
             *
             * This function is only for use in widget implementations.
             */
            vfunc_unmap(): void;
            /**
             * Causes a widget to be unrealized.
             *
             * This frees all GDK resources associated with the widget.
             *
             * This function is only useful in widget implementations.
             */
            vfunc_unrealize(): void;
            /**
             * Called when the widget is about to be removed from its
             *   `GtkRoot` widget. Must chain up
             */
            vfunc_unroot(): void;
        }

        namespace WifiDialog {
            // Signal signatures
            interface SignalSignatures extends Gtk.Dialog.SignalSignatures {
                'notify::use-header-bar': (pspec: GObject.ParamSpec) => void;
                'notify::application': (pspec: GObject.ParamSpec) => void;
                'notify::child': (pspec: GObject.ParamSpec) => void;
                'notify::decorated': (pspec: GObject.ParamSpec) => void;
                'notify::default-height': (pspec: GObject.ParamSpec) => void;
                'notify::default-widget': (pspec: GObject.ParamSpec) => void;
                'notify::default-width': (pspec: GObject.ParamSpec) => void;
                'notify::deletable': (pspec: GObject.ParamSpec) => void;
                'notify::destroy-with-parent': (pspec: GObject.ParamSpec) => void;
                'notify::display': (pspec: GObject.ParamSpec) => void;
                'notify::focus-visible': (pspec: GObject.ParamSpec) => void;
                'notify::focus-widget': (pspec: GObject.ParamSpec) => void;
                'notify::fullscreened': (pspec: GObject.ParamSpec) => void;
                'notify::gravity': (pspec: GObject.ParamSpec) => void;
                'notify::handle-menubar-accel': (pspec: GObject.ParamSpec) => void;
                'notify::hide-on-close': (pspec: GObject.ParamSpec) => void;
                'notify::icon-name': (pspec: GObject.ParamSpec) => void;
                'notify::is-active': (pspec: GObject.ParamSpec) => void;
                'notify::maximized': (pspec: GObject.ParamSpec) => void;
                'notify::mnemonics-visible': (pspec: GObject.ParamSpec) => void;
                'notify::modal': (pspec: GObject.ParamSpec) => void;
                'notify::resizable': (pspec: GObject.ParamSpec) => void;
                'notify::startup-id': (pspec: GObject.ParamSpec) => void;
                'notify::suspended': (pspec: GObject.ParamSpec) => void;
                'notify::title': (pspec: GObject.ParamSpec) => void;
                'notify::titlebar': (pspec: GObject.ParamSpec) => void;
                'notify::transient-for': (pspec: GObject.ParamSpec) => void;
                'notify::can-focus': (pspec: GObject.ParamSpec) => void;
                'notify::can-target': (pspec: GObject.ParamSpec) => void;
                'notify::css-classes': (pspec: GObject.ParamSpec) => void;
                'notify::css-name': (pspec: GObject.ParamSpec) => void;
                'notify::cursor': (pspec: GObject.ParamSpec) => void;
                'notify::focus-on-click': (pspec: GObject.ParamSpec) => void;
                'notify::focusable': (pspec: GObject.ParamSpec) => void;
                'notify::halign': (pspec: GObject.ParamSpec) => void;
                'notify::has-default': (pspec: GObject.ParamSpec) => void;
                'notify::has-focus': (pspec: GObject.ParamSpec) => void;
                'notify::has-tooltip': (pspec: GObject.ParamSpec) => void;
                'notify::height-request': (pspec: GObject.ParamSpec) => void;
                'notify::hexpand': (pspec: GObject.ParamSpec) => void;
                'notify::hexpand-set': (pspec: GObject.ParamSpec) => void;
                'notify::layout-manager': (pspec: GObject.ParamSpec) => void;
                'notify::limit-events': (pspec: GObject.ParamSpec) => void;
                'notify::margin-bottom': (pspec: GObject.ParamSpec) => void;
                'notify::margin-end': (pspec: GObject.ParamSpec) => void;
                'notify::margin-start': (pspec: GObject.ParamSpec) => void;
                'notify::margin-top': (pspec: GObject.ParamSpec) => void;
                'notify::name': (pspec: GObject.ParamSpec) => void;
                'notify::opacity': (pspec: GObject.ParamSpec) => void;
                'notify::overflow': (pspec: GObject.ParamSpec) => void;
                'notify::parent': (pspec: GObject.ParamSpec) => void;
                'notify::receives-default': (pspec: GObject.ParamSpec) => void;
                'notify::root': (pspec: GObject.ParamSpec) => void;
                'notify::scale-factor': (pspec: GObject.ParamSpec) => void;
                'notify::sensitive': (pspec: GObject.ParamSpec) => void;
                'notify::tooltip-markup': (pspec: GObject.ParamSpec) => void;
                'notify::tooltip-text': (pspec: GObject.ParamSpec) => void;
                'notify::valign': (pspec: GObject.ParamSpec) => void;
                'notify::vexpand': (pspec: GObject.ParamSpec) => void;
                'notify::vexpand-set': (pspec: GObject.ParamSpec) => void;
                'notify::visible': (pspec: GObject.ParamSpec) => void;
                'notify::width-request': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps
                extends Gtk.Dialog.ConstructorProps,
                    Gtk.Accessible.ConstructorProps,
                    Gtk.Buildable.ConstructorProps,
                    Gtk.ConstraintTarget.ConstructorProps,
                    Gtk.Native.ConstructorProps,
                    Gtk.Root.ConstructorProps,
                    Gtk.ShortcutManager.ConstructorProps {}
        }

        class WifiDialog
            extends Gtk.Dialog
            implements Gtk.Accessible, Gtk.Buildable, Gtk.ConstraintTarget, Gtk.Native, Gtk.Root, Gtk.ShortcutManager
        {
            static $gtype: GObject.GType<WifiDialog>;

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: WifiDialog.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<WifiDialog.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](
                client: NM.Client,
                connection: NM.Connection,
                device: NM.Device,
                ap: NM.AccessPoint,
                secrets_only: boolean,
            ): WifiDialog;
            // Conflicted with Gtk.Dialog.new

            static ['new'](...args: never[]): any;

            static new_for_create(client: NM.Client): WifiDialog;

            static new_for_hidden(client: NM.Client): WifiDialog;

            static new_for_other(client: NM.Client): WifiDialog;

            static new_for_secrets(
                client: NM.Client,
                connection: NM.Connection,
                secrets_setting_name: string,
                secrets_hints: string,
            ): WifiDialog;

            // Signals

            connect<K extends keyof WifiDialog.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, WifiDialog.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof WifiDialog.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, WifiDialog.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof WifiDialog.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<WifiDialog.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            get_connection(): [NM.Connection, NM.Device, NM.AccessPoint];
            get_nag_ignored(): boolean;
            nag_user(): Gtk.Widget;
            set_nag_ignored(ignored: boolean): void;

            // Inherited properties
            /**
             * Whether the widget or any of its descendents can accept
             * the input focus.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get can_focus(): boolean;
            set can_focus(val: boolean);
            /**
             * Whether the widget or any of its descendents can accept
             * the input focus.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get canFocus(): boolean;
            set canFocus(val: boolean);
            /**
             * Whether the widget can receive pointer events.
             */
            get can_target(): boolean;
            set can_target(val: boolean);
            /**
             * Whether the widget can receive pointer events.
             */
            get canTarget(): boolean;
            set canTarget(val: boolean);
            /**
             * A list of css classes applied to this widget.
             */
            get css_classes(): string[];
            set css_classes(val: string[]);
            /**
             * A list of css classes applied to this widget.
             */
            get cssClasses(): string[];
            set cssClasses(val: string[]);
            /**
             * The name of this widget in the CSS tree.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get css_name(): string;
            /**
             * The name of this widget in the CSS tree.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get cssName(): string;
            /**
             * The cursor used by `widget`.
             */
            get cursor(): Gdk.Cursor;
            set cursor(val: Gdk.Cursor);
            /**
             * Whether the widget should grab focus when it is clicked with the mouse.
             *
             * This property is only relevant for widgets that can take focus.
             */
            get focus_on_click(): boolean;
            set focus_on_click(val: boolean);
            /**
             * Whether the widget should grab focus when it is clicked with the mouse.
             *
             * This property is only relevant for widgets that can take focus.
             */
            get focusOnClick(): boolean;
            set focusOnClick(val: boolean);
            /**
             * Whether this widget itself will accept the input focus.
             */
            get focusable(): boolean;
            set focusable(val: boolean);
            /**
             * How to distribute horizontal space if widget gets extra space.
             */
            get halign(): Gtk.Align;
            set halign(val: Gtk.Align);
            /**
             * Whether the widget is the default widget.
             */
            get has_default(): boolean;
            /**
             * Whether the widget is the default widget.
             */
            get hasDefault(): boolean;
            /**
             * Whether the widget has the input focus.
             */
            get has_focus(): boolean;
            /**
             * Whether the widget has the input focus.
             */
            get hasFocus(): boolean;
            /**
             * Enables or disables the emission of the [signal`Gtk`.Widget::query-tooltip]
             * signal on `widget`.
             *
             * A true value indicates that `widget` can have a tooltip, in this case
             * the widget will be queried using [signal`Gtk`.Widget::query-tooltip] to
             * determine whether it will provide a tooltip or not.
             */
            get has_tooltip(): boolean;
            set has_tooltip(val: boolean);
            /**
             * Enables or disables the emission of the [signal`Gtk`.Widget::query-tooltip]
             * signal on `widget`.
             *
             * A true value indicates that `widget` can have a tooltip, in this case
             * the widget will be queried using [signal`Gtk`.Widget::query-tooltip] to
             * determine whether it will provide a tooltip or not.
             */
            get hasTooltip(): boolean;
            set hasTooltip(val: boolean);
            /**
             * Overrides for height request of the widget.
             *
             * If this is -1, the natural request will be used.
             */
            get height_request(): number;
            set height_request(val: number);
            /**
             * Overrides for height request of the widget.
             *
             * If this is -1, the natural request will be used.
             */
            get heightRequest(): number;
            set heightRequest(val: number);
            /**
             * Whether to expand horizontally.
             */
            get hexpand(): boolean;
            set hexpand(val: boolean);
            /**
             * Whether to use the `hexpand` property.
             */
            get hexpand_set(): boolean;
            set hexpand_set(val: boolean);
            /**
             * Whether to use the `hexpand` property.
             */
            get hexpandSet(): boolean;
            set hexpandSet(val: boolean);
            /**
             * The [class`Gtk`.LayoutManager] instance to use to compute
             * the preferred size of the widget, and allocate its children.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get layout_manager(): Gtk.LayoutManager;
            set layout_manager(val: Gtk.LayoutManager);
            /**
             * The [class`Gtk`.LayoutManager] instance to use to compute
             * the preferred size of the widget, and allocate its children.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get layoutManager(): Gtk.LayoutManager;
            set layoutManager(val: Gtk.LayoutManager);
            /**
             * Makes this widget act like a modal dialog, with respect to
             * event delivery.
             *
             * Global event controllers will not handle events with targets
             * inside the widget, unless they are set up to ignore propagation
             * limits. See [method`Gtk`.EventController.set_propagation_limit].
             */
            get limit_events(): boolean;
            set limit_events(val: boolean);
            /**
             * Makes this widget act like a modal dialog, with respect to
             * event delivery.
             *
             * Global event controllers will not handle events with targets
             * inside the widget, unless they are set up to ignore propagation
             * limits. See [method`Gtk`.EventController.set_propagation_limit].
             */
            get limitEvents(): boolean;
            set limitEvents(val: boolean);
            /**
             * Margin on bottom side of widget.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get margin_bottom(): number;
            set margin_bottom(val: number);
            /**
             * Margin on bottom side of widget.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get marginBottom(): number;
            set marginBottom(val: number);
            /**
             * Margin on end of widget, horizontally.
             *
             * This property supports left-to-right and right-to-left text
             * directions.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get margin_end(): number;
            set margin_end(val: number);
            /**
             * Margin on end of widget, horizontally.
             *
             * This property supports left-to-right and right-to-left text
             * directions.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get marginEnd(): number;
            set marginEnd(val: number);
            /**
             * Margin on start of widget, horizontally.
             *
             * This property supports left-to-right and right-to-left text
             * directions.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get margin_start(): number;
            set margin_start(val: number);
            /**
             * Margin on start of widget, horizontally.
             *
             * This property supports left-to-right and right-to-left text
             * directions.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get marginStart(): number;
            set marginStart(val: number);
            /**
             * Margin on top side of widget.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get margin_top(): number;
            set margin_top(val: number);
            /**
             * Margin on top side of widget.
             *
             * This property adds margin outside of the widget's normal size
             * request, the margin will be added in addition to the size from
             * [method`Gtk`.Widget.set_size_request] for example.
             */
            get marginTop(): number;
            set marginTop(val: number);
            /**
             * The name of the widget.
             */
            get name(): string;
            set name(val: string);
            /**
             * The requested opacity of the widget.
             */
            get opacity(): number;
            set opacity(val: number);
            /**
             * How content outside the widget's content area is treated.
             *
             * This property is meant to be set by widget implementations,
             * typically in their instance init function.
             */
            get overflow(): Gtk.Overflow;
            set overflow(val: Gtk.Overflow);
            /**
             * The parent widget of this widget.
             */
            get parent(): Gtk.Widget;
            /**
             * Whether the widget will receive the default action when it is focused.
             */
            get receives_default(): boolean;
            set receives_default(val: boolean);
            /**
             * Whether the widget will receive the default action when it is focused.
             */
            get receivesDefault(): boolean;
            set receivesDefault(val: boolean);
            /**
             * The `GtkRoot` widget of the widget tree containing this widget.
             *
             * This will be `NULL` if the widget is not contained in a root widget.
             */
            get root(): Gtk.Root;
            /**
             * The scale factor of the widget.
             */
            get scale_factor(): number;
            /**
             * The scale factor of the widget.
             */
            get scaleFactor(): number;
            /**
             * Whether the widget responds to input.
             */
            get sensitive(): boolean;
            set sensitive(val: boolean);
            /**
             * Sets the text of tooltip to be the given string, which is marked up
             * with Pango markup.
             *
             * Also see [method`Gtk`.Tooltip.set_markup].
             *
             * This is a convenience property which will take care of getting the
             * tooltip shown if the given string is not `NULL`:
             * [property`Gtk`.Widget:has-tooltip] will automatically be set to true
             * and there will be taken care of [signal`Gtk`.Widget::query-tooltip] in
             * the default signal handler.
             *
             * Note that if both [property`Gtk`.Widget:tooltip-text] and
             * [property`Gtk`.Widget:tooltip-markup] are set, the last one wins.
             */
            get tooltip_markup(): string;
            set tooltip_markup(val: string);
            /**
             * Sets the text of tooltip to be the given string, which is marked up
             * with Pango markup.
             *
             * Also see [method`Gtk`.Tooltip.set_markup].
             *
             * This is a convenience property which will take care of getting the
             * tooltip shown if the given string is not `NULL`:
             * [property`Gtk`.Widget:has-tooltip] will automatically be set to true
             * and there will be taken care of [signal`Gtk`.Widget::query-tooltip] in
             * the default signal handler.
             *
             * Note that if both [property`Gtk`.Widget:tooltip-text] and
             * [property`Gtk`.Widget:tooltip-markup] are set, the last one wins.
             */
            get tooltipMarkup(): string;
            set tooltipMarkup(val: string);
            /**
             * Sets the text of tooltip to be the given string.
             *
             * Also see [method`Gtk`.Tooltip.set_text].
             *
             * This is a convenience property which will take care of getting the
             * tooltip shown if the given string is not `NULL`:
             * [property`Gtk`.Widget:has-tooltip] will automatically be set to true
             * and there will be taken care of [signal`Gtk`.Widget::query-tooltip] in
             * the default signal handler.
             *
             * Note that if both [property`Gtk`.Widget:tooltip-text] and
             * [property`Gtk`.Widget:tooltip-markup] are set, the last one wins.
             */
            get tooltip_text(): string;
            set tooltip_text(val: string);
            /**
             * Sets the text of tooltip to be the given string.
             *
             * Also see [method`Gtk`.Tooltip.set_text].
             *
             * This is a convenience property which will take care of getting the
             * tooltip shown if the given string is not `NULL`:
             * [property`Gtk`.Widget:has-tooltip] will automatically be set to true
             * and there will be taken care of [signal`Gtk`.Widget::query-tooltip] in
             * the default signal handler.
             *
             * Note that if both [property`Gtk`.Widget:tooltip-text] and
             * [property`Gtk`.Widget:tooltip-markup] are set, the last one wins.
             */
            get tooltipText(): string;
            set tooltipText(val: string);
            /**
             * How to distribute vertical space if widget gets extra space.
             */
            get valign(): Gtk.Align;
            set valign(val: Gtk.Align);
            /**
             * Whether to expand vertically.
             */
            get vexpand(): boolean;
            set vexpand(val: boolean);
            /**
             * Whether to use the `vexpand` property.
             */
            get vexpand_set(): boolean;
            set vexpand_set(val: boolean);
            /**
             * Whether to use the `vexpand` property.
             */
            get vexpandSet(): boolean;
            set vexpandSet(val: boolean);
            /**
             * Whether the widget is visible.
             */
            get visible(): boolean;
            set visible(val: boolean);
            /**
             * Overrides for width request of the widget.
             *
             * If this is -1, the natural request will be used.
             */
            get width_request(): number;
            set width_request(val: number);
            /**
             * Overrides for width request of the widget.
             *
             * If this is -1, the natural request will be used.
             */
            get widthRequest(): number;
            set widthRequest(val: number);

            // Inherited methods
            /**
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target`.
             *
             * Whenever the `source_property` is changed the `target_property` is
             * updated using the same value. For instance:
             *
             *
             * ```c
             *   g_object_bind_property (action, "active", widget, "sensitive", 0);
             * ```
             *
             *
             * Will result in the "sensitive" property of the widget #GObject instance to be
             * updated with the same value of the "active" property of the action #GObject
             * instance.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well.
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. To remove the binding without affecting the
             * `source` and the `target` you can just call g_object_unref() on the returned
             * #GBinding instance.
             *
             * Removing the binding by calling g_object_unref() on it must only be done if
             * the binding, `source` and `target` are only used from a single thread and it
             * is clear that both `source` and `target` outlive the binding. Especially it
             * is not safe to rely on this if the binding, `source` or `target` can be
             * finalized from different threads. Keep another reference to the binding and
             * use g_binding_unbind() instead to be on the safe side.
             *
             * A #GObject can have multiple bindings.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
            ): GObject.Binding;
            /**
             * Complete version of g_object_bind_property().
             *
             * Creates a binding between `source_property` on `source` and `target_property`
             * on `target,` allowing you to set the transformation functions to be used by
             * the binding.
             *
             * If `flags` contains %G_BINDING_BIDIRECTIONAL then the binding will be mutual:
             * if `target_property` on `target` changes then the `source_property` on `source`
             * will be updated as well. The `transform_from` function is only used in case
             * of bidirectional bindings, otherwise it will be ignored
             *
             * The binding will automatically be removed when either the `source` or the
             * `target` instances are finalized. This will release the reference that is
             * being held on the #GBinding instance; if you want to hold on to the
             * #GBinding instance, you will need to hold a reference to it.
             *
             * To remove the binding, call g_binding_unbind().
             *
             * A #GObject can have multiple bindings.
             *
             * The same `user_data` parameter will be used for both `transform_to`
             * and `transform_from` transformation functions; the `notify` function will
             * be called once, when the binding is removed. If you need different data
             * for each transformation function, please use
             * g_object_bind_property_with_closures() instead.
             * @param source_property the property on @source to bind
             * @param target the target #GObject
             * @param target_property the property on @target to bind
             * @param flags flags to pass to #GBinding
             * @param transform_to the transformation function     from the @source to the @target, or %NULL to use the default
             * @param transform_from the transformation function     from the @target to the @source, or %NULL to use the default
             * @param notify a function to call when disposing the binding, to free     resources used by the transformation functions, or %NULL if not required
             * @returns the #GBinding instance representing the     binding between the two #GObject instances. The binding is released     whenever the #GBinding reference count reaches zero.
             */
            bind_property_full(
                source_property: string,
                target: GObject.Object,
                target_property: string,
                flags: GObject.BindingFlags | null,
                transform_to?: GObject.BindingTransformFunc | null,
                transform_from?: GObject.BindingTransformFunc | null,
                notify?: GLib.DestroyNotify | null,
            ): GObject.Binding;
            // Conflicted with GObject.Object.bind_property_full
            bind_property_full(...args: never[]): any;
            /**
             * This function is intended for #GObject implementations to re-enforce
             * a [floating][floating-ref] object reference. Doing this is seldom
             * required: all #GInitiallyUnowneds are created with a floating reference
             * which usually just needs to be sunken by calling g_object_ref_sink().
             */
            force_floating(): void;
            /**
             * Increases the freeze count on `object`. If the freeze count is
             * non-zero, the emission of "notify" signals on `object` is
             * stopped. The signals are queued until the freeze count is decreased
             * to zero. Duplicate notifications are squashed so that at most one
             * #GObject::notify signal is emitted for each property modified while the
             * object is frozen.
             *
             * This is necessary for accessors that modify multiple properties to prevent
             * premature notification while the object is still being modified.
             */
            freeze_notify(): void;
            /**
             * Gets a named field from the objects table of associations (see g_object_set_data()).
             * @param key name of the key for that association
             * @returns the data if found,          or %NULL if no such data exists.
             */
            get_data(key: string): any | null;
            /**
             * Gets a property of an object.
             *
             * The value can be:
             * - an empty GObject.Value initialized by G_VALUE_INIT, which will be automatically initialized with the expected type of the property (since GLib 2.60)
             * - a GObject.Value initialized with the expected type of the property
             * - a GObject.Value initialized with a type to which the expected type of the property can be transformed
             *
             * In general, a copy is made of the property contents and the caller is responsible for freeing the memory by calling GObject.Value.unset.
             *
             * Note that GObject.Object.get_property is really intended for language bindings, GObject.Object.get is much more convenient for C programming.
             * @param property_name The name of the property to get
             * @param value Return location for the property value. Can be an empty GObject.Value initialized by G_VALUE_INIT (auto-initialized with expected type since GLib 2.60), a GObject.Value initialized with the expected property type, or a GObject.Value initialized with a transformable type
             */
            get_property(property_name: string, value: GObject.Value | any): any;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            get_qdata(quark: GLib.Quark): any | null;
            /**
             * Gets `n_properties` properties for an `object`.
             * Obtained properties will be set to `values`. All properties must be valid.
             * Warnings will be emitted and undefined behaviour may result if invalid
             * properties are passed in.
             * @param names the names of each property to get
             * @param values the values of each property to get
             */
            getv(names: string[], values: (GObject.Value | any)[]): void;
            /**
             * Checks whether `object` has a [floating][floating-ref] reference.
             * @returns %TRUE if @object has a floating reference
             */
            is_floating(): boolean;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param property_name the name of a property installed on the class of @object.
             */
            notify(property_name: string): void;
            /**
             * Emits a "notify" signal for the property specified by `pspec` on `object`.
             *
             * This function omits the property name lookup, hence it is faster than
             * g_object_notify().
             *
             * One way to avoid using g_object_notify() from within the
             * class that registered the properties, and using g_object_notify_by_pspec()
             * instead, is to store the GParamSpec used with
             * g_object_class_install_property() inside a static array, e.g.:
             *
             *
             * ```c
             *   typedef enum
             *   {
             *     PROP_FOO = 1,
             *     PROP_LAST
             *   } MyObjectProperty;
             *
             *   static GParamSpec *properties[PROP_LAST];
             *
             *   static void
             *   my_object_class_init (MyObjectClass *klass)
             *   {
             *     properties[PROP_FOO] = g_param_spec_int ("foo", NULL, NULL,
             *                                              0, 100,
             *                                              50,
             *                                              G_PARAM_READWRITE | G_PARAM_STATIC_STRINGS);
             *     g_object_class_install_property (gobject_class,
             *                                      PROP_FOO,
             *                                      properties[PROP_FOO]);
             *   }
             * ```
             *
             *
             * and then notify a change on the "foo" property with:
             *
             *
             * ```c
             *   g_object_notify_by_pspec (self, properties[PROP_FOO]);
             * ```
             *
             * @param pspec the #GParamSpec of a property installed on the class of @object.
             */
            notify_by_pspec(pspec: GObject.ParamSpec): void;
            /**
             * Increases the reference count of `object`.
             *
             * Since GLib 2.56, if `GLIB_VERSION_MAX_ALLOWED` is 2.56 or greater, the type
             * of `object` will be propagated to the return type (using the GCC typeof()
             * extension), so any casting the caller needs to do on the return type must be
             * explicit.
             * @returns the same @object
             */
            ref(): GObject.Object;
            /**
             * Increase the reference count of `object,` and possibly remove the
             * [floating][floating-ref] reference, if `object` has a floating reference.
             *
             * In other words, if the object is floating, then this call "assumes
             * ownership" of the floating reference, converting it to a normal
             * reference by clearing the floating flag while leaving the reference
             * count unchanged.  If the object is not floating, then this call
             * adds a new normal reference increasing the reference count by one.
             *
             * Since GLib 2.56, the type of `object` will be propagated to the return type
             * under the same conditions as for g_object_ref().
             * @returns @object
             */
            ref_sink(): GObject.Object;
            /**
             * Releases all references to other objects. This can be used to break
             * reference cycles.
             *
             * This function should only be called from object system implementations.
             */
            run_dispose(): void;
            /**
             * Each object carries around a table of associations from
             * strings to pointers.  This function lets you set an association.
             *
             * If the object already had an association with that name,
             * the old association will be destroyed.
             *
             * Internally, the `key` is converted to a #GQuark using g_quark_from_string().
             * This means a copy of `key` is kept permanently (even after `object` has been
             * finalized) — so it is recommended to only use a small, bounded set of values
             * for `key` in your program, to avoid the #GQuark storage growing unbounded.
             * @param key name of the key
             * @param data data to associate with that key
             */
            set_data(key: string, data?: any | null): void;
            /**
             * Sets a property on an object.
             * @param property_name The name of the property to set
             * @param value The value to set the property to
             */
            set_property(property_name: string, value: GObject.Value | any): void;
            /**
             * Remove a specified datum from the object's data associations,
             * without invoking the association's destroy handler.
             * @param key name of the key
             * @returns the data if found, or %NULL          if no such data exists.
             */
            steal_data(key: string): any | null;
            /**
             * This function gets back user data pointers stored via
             * g_object_set_qdata() and removes the `data` from object
             * without invoking its destroy() function (if any was
             * set).
             * Usually, calling this function is only required to update
             * user data pointers with a destroy notifier, for example:
             *
             * ```c
             * void
             * object_add_to_user_list (GObject     *object,
             *                          const gchar *new_string)
             * {
             *   // the quark, naming the object data
             *   GQuark quark_string_list = g_quark_from_static_string ("my-string-list");
             *   // retrieve the old string list
             *   GList *list = g_object_steal_qdata (object, quark_string_list);
             *
             *   // prepend new string
             *   list = g_list_prepend (list, g_strdup (new_string));
             *   // this changed 'list', so we need to set it again
             *   g_object_set_qdata_full (object, quark_string_list, list, free_string_list);
             * }
             * static void
             * free_string_list (gpointer data)
             * {
             *   GList *node, *list = data;
             *
             *   for (node = list; node; node = node->next)
             *     g_free (node->data);
             *   g_list_free (list);
             * }
             * ```
             *
             * Using g_object_get_qdata() in the above example, instead of
             * g_object_steal_qdata() would have left the destroy function set,
             * and thus the partial string list would have been freed upon
             * g_object_set_qdata_full().
             * @param quark A #GQuark, naming the user data pointer
             * @returns The user data pointer set, or %NULL
             */
            steal_qdata(quark: GLib.Quark): any | null;
            /**
             * Reverts the effect of a previous call to
             * g_object_freeze_notify(). The freeze count is decreased on `object`
             * and when it reaches zero, queued "notify" signals are emitted.
             *
             * Duplicate notifications for each property are squashed so that at most one
             * #GObject::notify signal is emitted for each property, in the reverse order
             * in which they have been queued.
             *
             * It is an error to call this function when the freeze count is zero.
             */
            thaw_notify(): void;
            /**
             * Decreases the reference count of `object`. When its reference count
             * drops to 0, the object is finalized (i.e. its memory is freed).
             *
             * If the pointer to the #GObject may be reused in future (for example, if it is
             * an instance variable of another object), it is recommended to clear the
             * pointer to %NULL rather than retain a dangling pointer to a potentially
             * invalid #GObject instance. Use g_clear_object() for this.
             */
            unref(): void;
            /**
             * This function essentially limits the life time of the `closure` to
             * the life time of the object. That is, when the object is finalized,
             * the `closure` is invalidated by calling g_closure_invalidate() on
             * it, in order to prevent invocations of the closure with a finalized
             * (nonexisting) object. Also, g_object_ref() and g_object_unref() are
             * added as marshal guards to the `closure,` to ensure that an extra
             * reference count is held on `object` during invocation of the
             * `closure`.  Usually, this function will be called on closures that
             * use this `object` as closure data.
             * @param closure #GClosure to watch
             */
            watch_closure(closure: GObject.Closure): void;
            /**
             * the `constructed` function is called by g_object_new() as the
             *  final step of the object creation process.  At the point of the call, all
             *  construction properties have been set on the object.  The purpose of this
             *  call is to allow for object initialisation steps that can only be performed
             *  after construction properties have been set.  `constructed` implementors
             *  should chain up to the `constructed` call of their parent class to allow it
             *  to complete its initialisation.
             */
            vfunc_constructed(): void;
            /**
             * emits property change notification for a bunch
             *  of properties. Overriding `dispatch_properties_changed` should be rarely
             *  needed.
             * @param n_pspecs
             * @param pspecs
             */
            vfunc_dispatch_properties_changed(n_pspecs: number, pspecs: GObject.ParamSpec): void;
            /**
             * the `dispose` function is supposed to drop all references to other
             *  objects, but keep the instance otherwise intact, so that client method
             *  invocations still work. It may be run multiple times (due to reference
             *  loops). Before returning, `dispose` should chain up to the `dispose` method
             *  of the parent class.
             */
            vfunc_dispose(): void;
            /**
             * instance finalization function, should finish the finalization of
             *  the instance begun in `dispose` and chain up to the `finalize` method of the
             *  parent class.
             */
            vfunc_finalize(): void;
            /**
             * the generic getter for all properties of this type. Should be
             *  overridden for every type with properties.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_get_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Emits a "notify" signal for the property `property_name` on `object`.
             *
             * When possible, eg. when signaling a property change from within the class
             * that registered the property, you should use g_object_notify_by_pspec()
             * instead.
             *
             * Note that emission of the notify signal may be blocked with
             * g_object_freeze_notify(). In this case, the signal emissions are queued
             * and will be emitted (in reverse order) when g_object_thaw_notify() is
             * called.
             * @param pspec
             */
            vfunc_notify(pspec: GObject.ParamSpec): void;
            /**
             * the generic setter for all properties of this type. Should be
             *  overridden for every type with properties. If implementations of
             *  `set_property` don't emit property change notification explicitly, this will
             *  be done implicitly by the type system. However, if the notify signal is
             *  emitted explicitly, the type system will not emit it a second time.
             * @param property_id
             * @param value
             * @param pspec
             */
            vfunc_set_property(property_id: number, value: GObject.Value | any, pspec: GObject.ParamSpec): void;
            /**
             * Disconnects a handler from an instance so it will not be called during any future or currently ongoing emissions of the signal it has been connected to.
             * @param id Handler ID of the handler to be disconnected
             */
            disconnect(id: number): void;
            /**
             * Sets multiple properties of an object at once. The properties argument should be a dictionary mapping property names to values.
             * @param properties Object containing the properties to set
             */
            set(properties: { [key: string]: any }): void;
            /**
             * Blocks a handler of an instance so it will not be called during any signal emissions
             * @param id Handler ID of the handler to be blocked
             */
            block_signal_handler(id: number): void;
            /**
             * Unblocks a handler so it will be called again during any signal emissions
             * @param id Handler ID of the handler to be unblocked
             */
            unblock_signal_handler(id: number): void;
            /**
             * Stops a signal's emission by the given signal name. This will prevent the default handler and any subsequent signal handlers from being invoked.
             * @param detailedName Name of the signal to stop emission of
             */
            stop_emission_by_name(detailedName: string): void;
            /**
             * Enables or disables an action installed with
             * [method`Gtk`.WidgetClass.install_action].
             * @param action_name action name, such as "clipboard.paste"
             * @param enabled whether the action is now enabled
             */
            action_set_enabled(action_name: string, enabled: boolean): void;
            /**
             * Activates the widget.
             *
             * The activation will emit the signal set using
             * [method`Gtk`.WidgetClass.set_activate_signal]
             * during class initialization.
             *
             * Activation is what happens when you press <kbd>Enter</kbd>
             * on a widget.
             *
             * If you wish to handle the activation keybinding yourself,
             * it is recommended to use [method`Gtk`.WidgetClass.add_shortcut]
             * with an action created with [ctor`Gtk`.SignalAction.new].
             *
             * If `widget` is not activatable, the function returns false.
             * @returns true if the widget was activated
             */
            activate(): boolean;
            /**
             * Activates an action for the widget.
             *
             * The action is looked up in the action groups associated with
             * `widget` and its ancestors.
             *
             * If the action is in an action group added with
             * [method`Gtk`.Widget.insert_action_group], the `name` is expected
             * to be prefixed with the prefix that was used when the group was
             * inserted.
             *
             * The arguments must match the actions expected parameter type,
             * as returned by [method`Gio`.Action.get_parameter_type].
             * @param name the name of the action to activate
             * @param args parameters to use
             * @returns true if the action was activated
             */
            activate_action(name: string, args?: GLib.Variant | null): boolean;
            /**
             * Activates the `default.activate` action for the widget.
             *
             * The action is looked up in the same was as for
             * [method`Gtk`.Widget.activate_action].
             */
            activate_default(): void;
            /**
             * Adds an event controller to the widget.
             *
             * The event controllers of a widget handle the events that are
             * propagated to the widget.
             *
             * You will usually want to call this function right after
             * creating any kind of [class`Gtk`.EventController].
             * @param controller an event controller that hasn't been   added to a widget yet
             */
            add_controller(controller: Gtk.EventController): void;
            /**
             * Adds a style class to the widget.
             *
             * After calling this function, the widget’s style will match
             * for `css_class,` according to CSS matching rules.
             *
             * Use [method`Gtk`.Widget.remove_css_class] to remove the
             * style again.
             * @param css_class style class to add to @widget, without the leading period
             */
            add_css_class(css_class: string): void;
            /**
             * Adds a widget to the list of mnemonic labels for this widget.
             *
             * See [method`Gtk`.Widget.list_mnemonic_labels].
             *
             * Note that the list of mnemonic labels for the widget is cleared
             * when the widget is destroyed, so the caller must make sure
             * to update its internal state at this point as well.
             * @param label a widget that acts as a mnemonic label for @widget
             */
            add_mnemonic_label(label: Gtk.Widget): void;
            /**
             * Queues an animation frame update and adds a callback to be called
             * before each frame.
             *
             * Until the tick callback is removed, it will be called frequently
             * (usually at the frame rate of the output device or as quickly as
             * the application can be repainted, whichever is slower). For this
             * reason, is most suitable for handling graphics that change every
             * frame or every few frames.
             *
             * The tick callback does not automatically imply a relayout or repaint.
             * If you want a repaint or relayout, and aren’t changing widget properties
             * that would trigger that (for example, changing the text of a label),
             * then you will have to call [method`Gtk`.Widget.queue_resize] or
             * [method`Gtk`.Widget.queue_draw] yourself.
             *
             * [method`Gdk`.FrameClock.get_frame_time] should generally be used
             * for timing continuous animations and
             * [method`Gdk`.FrameTimings.get_predicted_presentation_time] should be
             * used if you are trying to display isolated frames at particular times.
             *
             * This is a more convenient alternative to connecting directly to the
             * [signal`Gdk`.FrameClock::update] signal of the frame clock, since you
             * don't have to worry about when a frame clock is assigned to a widget.
             *
             * To remove a tick callback, pass the ID that is returned by this function
             * to [method`Gtk`.Widget.remove_tick_callback].
             * @param callback function   to call for updating animations
             * @returns an ID for this callback
             */
            add_tick_callback(callback: Gtk.TickCallback): number;
            /**
             * Assigns size, position, (optionally) a baseline and transform
             * to a child widget.
             *
             * In this function, the allocation and baseline may be adjusted.
             * The given allocation will be forced to be bigger than the
             * widget's minimum size, as well as at least 0×0 in size.
             *
             * This function is only used by widget implementations.
             *
             * For a version that does not take a transform, see
             * [method`Gtk`.Widget.size_allocate].
             * @param width new width
             * @param height new height
             * @param baseline new baseline, or -1
             * @param transform transformation to be applied
             */
            allocate(width: number, height: number, baseline: number, transform?: Gsk.Transform | null): void;
            /**
             * Called by widgets as the user moves around the window using
             * keyboard shortcuts.
             *
             * The `direction` argument indicates what kind of motion is taking
             * place (up, down, left, right, tab forward, tab backward).
             *
             * This function calls the [vfunc`Gtk`.Widget.focus] virtual function;
             * widgets can override the virtual function in order to implement
             * appropriate focus behavior.
             *
             * The default `focus()` virtual function for a widget should return
             * true if moving in `direction` left the focus on a focusable location
             * inside that widget, and false if moving in `direction` moved the focus
             * outside the widget. When returning true, widgets normally call
             * [method`Gtk`.Widget.grab_focus] to place the focus accordingly;
             * when returning false, they don’t modify the current focus location.
             *
             * This function is used by custom widget implementations; if you're
             * writing an app, you’d use [method`Gtk`.Widget.grab_focus] to move
             * the focus to a particular widget.
             * @param direction direction of focus movement
             * @returns true if focus ended up inside @widget
             */
            child_focus(direction: Gtk.DirectionType | null): boolean;
            /**
             * Computes the bounds for `widget` in the coordinate space of `target`.
             *
             * The bounds of widget are (the bounding box of) the region that it is
             * expected to draw in. See the [coordinate system](coordinates.html)
             * overview to learn more.
             *
             * If the operation is successful, true is returned. If `widget` has no
             * bounds or the bounds cannot be expressed in `target'`s coordinate space
             * (for example if both widgets are in different windows), false is
             * returned and `bounds` is set to the zero rectangle.
             *
             * It is valid for `widget` and `target` to be the same widget.
             * @param target the target widget
             * @returns true if the bounds could be computed
             */
            compute_bounds(target: Gtk.Widget): [boolean, Graphene.Rect];
            /**
             * Computes whether a parent widget should give this widget
             * extra space when possible.
             *
             * Widgets with children should check this, rather than looking at
             * [method`Gtk`.Widget.get_hexpand] or [method`Gtk`.Widget.get_vexpand].
             *
             * This function already checks whether the widget is visible, so
             * visibility does not need to be checked separately. Non-visible
             * widgets are not expanded.
             *
             * The computed expand value uses either the expand setting explicitly
             * set on the widget itself, or, if none has been explicitly set,
             * the widget may expand if some of its children do.
             * @param orientation expand direction
             * @returns whether widget tree rooted here should be expanded
             */
            compute_expand(orientation: Gtk.Orientation | null): boolean;
            /**
             * Translates the given `point` in `widget'`s coordinates to coordinates
             * in `target’`s coordinate system.
             *
             * In order to perform this operation, both widgets must share a
             * a common ancestor. If that is not the case, `out_point` is set
             * to (0, 0) and false is returned.
             * @param target the widget to transform into
             * @param point a point in @widget's coordinate system
             * @returns true if @src_widget and @dest_widget have a common   ancestor, false otherwise
             */
            compute_point(target: Gtk.Widget, point: Graphene.Point): [boolean, Graphene.Point];
            /**
             * Computes a matrix suitable to describe a transformation from
             * `widget'`s coordinate system into `target'`s coordinate system.
             *
             * The transform can not be computed in certain cases, for example
             * when `widget` and `target` do not share a common ancestor. In that
             * case `out_transform` gets set to the identity matrix.
             *
             * To learn more about widget coordinate systems, see the coordinate
             * system [overview](coordinates.html).
             * @param target the target widget that the matrix will transform to
             * @returns true if the transform could be computed
             */
            compute_transform(target: Gtk.Widget): [boolean, Graphene.Matrix];
            /**
             * Tests if a given point is contained in the widget.
             *
             * The coordinates for (x, y) must be in widget coordinates, so
             * (0, 0) is assumed to be the top left of `widget'`s content area.
             * @param x X coordinate to test, relative to @widget's origin
             * @param y Y coordinate to test, relative to @widget's origin
             * @returns true if @widget contains the point (x, y)
             */
            contains(x: number, y: number): boolean;
            /**
             * Creates a new `PangoContext` that is configured for the widget.
             *
             * The `PangoContext` will have the appropriate font map,
             * font options, font description, and base direction set.
             *
             * See also [method`Gtk`.Widget.get_pango_context].
             * @returns the new `PangoContext`
             */
            create_pango_context(): Pango.Context;
            /**
             * Creates a new `PangoLayout` that is configured for the widget.
             *
             * The `PangoLayout` will have the appropriate font map,
             * font description, and base direction set.
             *
             * If you keep a `PangoLayout` created in this way around,
             * you need to re-create it when the widgets `PangoContext`
             * is replaced. This can be tracked by listening to changes
             * of the [property`Gtk`.Widget:root] property on the widget.
             * @param text text to set on the layout
             * @returns the new `PangoLayout`
             */
            create_pango_layout(text?: string | null): Pango.Layout;
            /**
             * Clears the template children for the widget.
             *
             * This function is the opposite of [method`Gtk`.Widget.init_template],
             * and it is used to clear all the template children from a widget
             * instance. If you bound a template child to a field in the instance
             * structure, or in the instance private data structure, the field will
             * be set to `NULL` after this function returns.
             *
             * You should call this function inside the `GObjectClass.dispose()`
             * implementation of any widget that called [method`Gtk`.Widget.init_template].
             * Typically, you will want to call this function last, right before
             * chaining up to the parent type's dispose implementation, e.g.
             *
             * ```c
             * static void
             * some_widget_dispose (GObject *gobject)
             * {
             *   SomeWidget *self = SOME_WIDGET (gobject);
             *
             *   // Clear the template data for SomeWidget
             *   gtk_widget_dispose_template (GTK_WIDGET (self), SOME_TYPE_WIDGET);
             *
             *   G_OBJECT_CLASS (some_widget_parent_class)->dispose (gobject);
             * }
             * ```
             * @param widget_type the type of the widget to finalize the template for
             */
            dispose_template(widget_type: GObject.GType): void;
            /**
             * Checks to see if a drag movement has passed the GTK drag threshold.
             * @param start_x X coordinate of start of drag
             * @param start_y Y coordinate of start of drag
             * @param current_x current X coordinate
             * @param current_y current Y coordinate
             * @returns true if the drag threshold has been passed
             */
            drag_check_threshold(start_x: number, start_y: number, current_x: number, current_y: number): boolean;
            /**
             * Notifies the user about an input-related error on the widget.
             *
             * If the [property`Gtk`.Settings:gtk-error-bell] setting is true,
             * it calls [method`Gdk`.Surface.beep], otherwise it does nothing.
             *
             * Note that the effect of [method`Gdk`.Surface.beep] can be configured
             * in many ways, depending on the windowing backend and the desktop
             * environment or window manager that is used.
             */
            error_bell(): void;
            /**
             * Returns the baseline that has currently been allocated to the widget.
             *
             * This function is intended to be used when implementing handlers
             * for the `GtkWidget`Class.snapshot() function, and when allocating
             * child widgets in `GtkWidget`Class.size_allocate().
             * @returns the baseline of the @widget, or -1 if none
             */
            get_allocated_baseline(): number;
            /**
             * Returns the height that has currently been allocated to the widget.
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @returns the height of the @widget
             */
            get_allocated_height(): number;
            /**
             * Returns the width that has currently been allocated to the widget.
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @returns the width of the @widget
             */
            get_allocated_width(): number;
            /**
             * Retrieves the widget’s allocation.
             *
             * Note, when implementing a layout widget: a widget’s allocation
             * will be its “adjusted” allocation, that is, the widget’s parent
             * typically calls [method`Gtk`.Widget.size_allocate] with an allocation,
             * and that allocation is then adjusted (to handle margin
             * and alignment for example) before assignment to the widget.
             * [method`Gtk`.Widget.get_allocation] returns the adjusted allocation that
             * was actually assigned to the widget. The adjusted allocation is
             * guaranteed to be completely contained within the
             * [method`Gtk`.Widget.size_allocate] allocation, however.
             *
             * So a layout widget is guaranteed that its children stay inside
             * the assigned bounds, but not that they have exactly the bounds the
             * widget assigned.
             */
            get_allocation(): Gtk.Allocation;
            /**
             * Gets the first ancestor of the widget with type `widget_type`.
             *
             * For example, `gtk_widget_get_ancestor (widget, GTK_TYPE_BOX)`
             * gets the first `GtkBox` that’s an ancestor of `widget`. No
             * reference will be added to the returned widget; it should
             * not be unreferenced.
             *
             * Note that unlike [method`Gtk`.Widget.is_ancestor], this function
             * considers `widget` to be an ancestor of itself.
             * @param widget_type ancestor type
             * @returns the ancestor widget
             */
            get_ancestor(widget_type: GObject.GType): Gtk.Widget | null;
            /**
             * Returns the baseline that has currently been allocated to the widget.
             *
             * This function is intended to be used when implementing handlers
             * for the `GtkWidgetClass.snapshot()` function, and when allocating
             * child widgets in `GtkWidgetClass.size_allocate()`.
             * @returns the baseline of the @widget, or -1 if none
             */
            get_baseline(): number;
            /**
             * Determines whether the input focus can enter the widget or any
             * of its children.
             *
             * See [method`Gtk`.Widget.set_can_focus].
             * @returns true if the input focus can enter @widget
             */
            get_can_focus(): boolean;
            /**
             * Queries whether the widget can be the target of pointer events.
             * @returns true if @widget can receive pointer events
             */
            get_can_target(): boolean;
            /**
             * Gets the value set with [method`Gtk`.Widget.set_child_visible].
             *
             * If you feel a need to use this function, your code probably
             * needs reorganization.
             *
             * This function is only useful for widget implementations
             * and should never be called by an application.
             * @returns true if the widget is mapped with the parent
             */
            get_child_visible(): boolean;
            /**
             * Gets the clipboard object for the widget.
             *
             * This is a utility function to get the clipboard object for the
             * display that `widget` is using.
             *
             * Note that this function always works, even when `widget` is not
             * realized yet.
             * @returns the appropriate clipboard object
             */
            get_clipboard(): Gdk.Clipboard;
            /**
             * Gets the current foreground color for the widget’s style.
             *
             * This function should only be used in snapshot
             * implementations that need to do custom drawing
             * with the foreground color.
             */
            get_color(): Gdk.RGBA;
            /**
             * Returns the list of style classes applied to the widget.
             * @returns a `NULL`-terminated list of   css classes currently applied to @widget
             */
            get_css_classes(): string[];
            /**
             * Returns the CSS name of the widget.
             * @returns the CSS name
             */
            get_css_name(): string;
            /**
             * Gets the cursor set on the widget.
             *
             * See [method`Gtk`.Widget.set_cursor] for details.
             * @returns the cursor   that is set on @widget
             */
            get_cursor(): Gdk.Cursor | null;
            /**
             * Gets the reading direction for the widget.
             *
             * See [method`Gtk`.Widget.set_direction].
             * @returns the reading direction for the widget
             */
            get_direction(): Gtk.TextDirection;
            /**
             * Get the display for the window that the widget belongs to.
             *
             * This function can only be called after the widget has been
             * added to a widget hierarchy with a `GtkRoot` at the top.
             *
             * In general, you should only create display-specific
             * resources when a widget has been realized, and you should
             * free those resources when the widget is unrealized.
             * @returns the display for this widget
             */
            get_display(): Gdk.Display;
            /**
             * Returns the widget’s first child.
             *
             * This function is primarily meant for widget implementations.
             * @returns the widget's first child
             */
            get_first_child(): Gtk.Widget | null;
            /**
             * Returns the focus child of the widget.
             * @returns the current focus   child of @widget
             */
            get_focus_child(): Gtk.Widget | null;
            /**
             * Returns whether the widget should grab focus when it is clicked
             * with the mouse.
             *
             * See [method`Gtk`.Widget.set_focus_on_click].
             * @returns true if the widget should grab focus when it is   clicked with the mouse
             */
            get_focus_on_click(): boolean;
            /**
             * Determines whether the widget can own the input focus.
             *
             * See [method`Gtk`.Widget.set_focusable].
             * @returns true if @widget can own the input focus
             */
            get_focusable(): boolean;
            /**
             * Gets the font map of the widget.
             *
             * See [method`Gtk`.Widget.set_font_map].
             * @returns the font map of @widget
             */
            get_font_map(): Pango.FontMap | null;
            /**
             * Returns the `cairo_font_options_t` of the widget.
             *
             * Seee [method`Gtk`.Widget.set_font_options].
             * @returns the `cairo_font_options_t` of widget
             */
            get_font_options(): cairo.FontOptions | null;
            /**
             * Obtains the frame clock for a widget.
             *
             * The frame clock is a global “ticker” that can be used to drive
             * animations and repaints. The most common reason to get the frame
             * clock is to call [method`Gdk`.FrameClock.get_frame_time], in order
             * to get a time to use for animating. For example you might record
             * the start of the animation with an initial value from
             * [method`Gdk`.FrameClock.get_frame_time], and then update the animation
             * by calling [method`Gdk`.FrameClock.get_frame_time] again during each repaint.
             *
             * [method`Gdk`.FrameClock.request_phase] will result in a new frame on the
             * clock, but won’t necessarily repaint any widgets. To repaint a widget,
             * you have to use [method`Gtk`.Widget.queue_draw] which invalidates the
             * widget (thus scheduling it to receive a draw on the next frame).
             * [method`Gtk`.Widget.queue_draw] will also end up requesting a frame
             * on the appropriate frame clock.
             *
             * A widget’s frame clock will not change while the widget is mapped.
             * Reparenting a widget (which implies a temporary unmap) can change
             * the widget’s frame clock.
             *
             * Unrealized widgets do not have a frame clock.
             * @returns the frame clock
             */
            get_frame_clock(): Gdk.FrameClock | null;
            /**
             * Gets the horizontal alignment of the widget.
             *
             * For backwards compatibility reasons this method will never return
             * one of the baseline alignments, but instead it will convert it to
             * [enum`Gtk`.Align.fill] or [enum`Gtk`.Align.center].
             *
             * Baselines are not supported for horizontal alignment.
             * @returns the horizontal alignment of @widget
             */
            get_halign(): Gtk.Align;
            /**
             * Returns the current value of the `has-tooltip` property.
             * @returns current value of `has-tooltip` on @widget
             */
            get_has_tooltip(): boolean;
            /**
             * Returns the content height of the widget.
             *
             * This function returns the height passed to its
             * size-allocate implementation, which is the height you
             * should be using in [vfunc`Gtk`.Widget.snapshot].
             *
             * For pointer events, see [method`Gtk`.Widget.contains].
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @returns The height of @widget
             */
            get_height(): number;
            /**
             * Gets whether the widget would like any available extra horizontal
             * space.
             *
             * When a user resizes a window, widgets with expand set to true generally
             * receive the extra space. For example, a list or scrollable area
             * or document in your window would often be set to expand.
             *
             * Widgets with children should use [method`Gtk`.Widget.compute_expand]
             * rather than this function, to see whether any of its children,
             * has the expand flag set. If any child of a widget wants to
             * expand, the parent may ask to expand also.
             *
             * This function only looks at the widget’s own hexpand flag, rather
             * than computing whether the entire widget tree rooted at this widget
             * wants to expand.
             * @returns whether hexpand flag is set
             */
            get_hexpand(): boolean;
            /**
             * Gets whether the `hexpand` flag has been explicitly set.
             *
             * If [property`Gtk`.Widget:hexpand] property is set, then it
             * overrides any computed expand value based on child widgets.
             * If `hexpand` is not set, then the expand value depends on
             * whether any children of the widget would like to expand.
             *
             * There are few reasons to use this function, but it’s here
             * for completeness and consistency.
             * @returns whether hexpand has been explicitly set
             */
            get_hexpand_set(): boolean;
            /**
             * Returns the widget’s last child.
             *
             * This function is primarily meant for widget implementations.
             * @returns the widget's last child
             */
            get_last_child(): Gtk.Widget | null;
            /**
             * Retrieves the layout manager of the widget.
             *
             * See [method`Gtk`.Widget.set_layout_manager].
             * @returns the layout manager of @widget
             */
            get_layout_manager(): Gtk.LayoutManager | null;
            /**
             * Gets the value of the [property`Gtk`.Widget:limit-events] property.
             */
            get_limit_events(): boolean;
            /**
             * Returns whether the widget is mapped.
             * @returns true if the widget is mapped
             */
            get_mapped(): boolean;
            /**
             * Gets the bottom margin of the widget.
             * @returns The bottom margin of @widget
             */
            get_margin_bottom(): number;
            /**
             * Gets the end margin of the widget.
             * @returns The end margin of @widget
             */
            get_margin_end(): number;
            /**
             * Gets the start margin of the widget.
             * @returns The start margin of @widget
             */
            get_margin_start(): number;
            /**
             * Gets the top margin of the widget.
             * @returns The top margin of @widget
             */
            get_margin_top(): number;
            /**
             * Retrieves the name of a widget.
             *
             * See [method`Gtk`.Widget.set_name] for the significance of widget names.
             * @returns name of the widget
             */
            get_name(): string;
            /**
             * Returns the nearest `GtkNative` ancestor of the widget.
             *
             * This function will return `NULL` if the widget is not
             * contained inside a widget tree with a native ancestor.
             *
             * `GtkNative` widgets will return themselves here.
             * @returns the `GtkNative` ancestor of @widget
             */
            get_native(): Gtk.Native | null;
            /**
             * Returns the widget’s next sibling.
             *
             * This function is primarily meant for widget implementations.
             * @returns the widget's next sibling
             */
            get_next_sibling(): Gtk.Widget | null;
            /**
             * Fetches the requested opacity for the widget.
             *
             * See [method`Gtk`.Widget.set_opacity].
             * @returns the requested opacity for this widget
             */
            get_opacity(): number;
            /**
             * Returns the widget’s overflow value.
             * @returns The widget's overflow value
             */
            get_overflow(): Gtk.Overflow;
            /**
             * Gets a `PangoContext` that is configured for the widget.
             *
             * The `PangoContext` will have the appropriate font map, font description,
             * and base direction set.
             *
             * Unlike the context returned by [method`Gtk`.Widget.create_pango_context],
             * this context is owned by the widget (it can be used until the screen
             * for the widget changes or the widget is removed from its toplevel),
             * and will be updated to match any changes to the widget’s attributes.
             * This can be tracked by listening to changes of the
             * [property`Gtk`.Widget:root] property on the widget.
             * @returns the `PangoContext` for the widget
             */
            get_pango_context(): Pango.Context;
            /**
             * Returns the parent widget of the widget.
             * @returns the parent widget of @widget
             */
            get_parent(): Gtk.Widget | null;
            /**
             * Retrieves the minimum and natural size of a widget, taking
             * into account the widget’s preference for height-for-width management.
             *
             * This is used to retrieve a suitable size by container widgets which do
             * not impose any restrictions on the child placement. It can be used
             * to deduce toplevel window and menu sizes as well as child widgets in
             * free-form containers such as `GtkFixed`.
             *
             * Handle with care. Note that the natural height of a height-for-width
             * widget will generally be a smaller size than the minimum height, since
             * the required height for the natural width is generally smaller than the
             * required height for the minimum width.
             *
             * Use [method`Gtk`.Widget.measure] if you want to support baseline alignment.
             */
            get_preferred_size(): [Gtk.Requisition | null, Gtk.Requisition | null];
            /**
             * Returns the widget’s previous sibling.
             *
             * This function is primarily meant for widget implementations.
             * @returns the widget's previous sibling
             */
            get_prev_sibling(): Gtk.Widget | null;
            /**
             * Gets the primary clipboard of the widget.
             *
             * This is a utility function to get the primary clipboard object
             * for the display that `widget` is using.
             *
             * Note that this function always works, even when `widget` is not
             * realized yet.
             * @returns the appropriate clipboard object
             */
            get_primary_clipboard(): Gdk.Clipboard;
            /**
             * Determines whether the widget is realized.
             * @returns true if @widget is realized
             */
            get_realized(): boolean;
            /**
             * Determines whether the widget is always treated as the default widget
             * within its toplevel when it has the focus, even if another widget
             * is the default.
             *
             * See [method`Gtk`.Widget.set_receives_default].
             * @returns true if @widget acts as the default widget when focused
             */
            get_receives_default(): boolean;
            /**
             * Gets whether the widget prefers a height-for-width layout
             * or a width-for-height layout.
             *
             * Single-child widgets generally propagate the preference of
             * their child, more complex widgets need to request something
             * either in context of their children or in context of their
             * allocation capabilities.
             * @returns The `GtkSizeRequestMode` preferred by @widget.
             */
            get_request_mode(): Gtk.SizeRequestMode;
            /**
             * Returns the `GtkRoot` widget of the widget.
             *
             * This function will return `NULL` if the widget is not contained
             * inside a widget tree with a root widget.
             *
             * `GtkRoot` widgets will return themselves here.
             * @returns the root widget of @widget
             */
            get_root(): Gtk.Root | null;
            /**
             * Retrieves the internal scale factor that maps from window
             * coordinates to the actual device pixels.
             *
             * On traditional systems this is 1, on high density outputs,
             * it can be a higher value (typically 2).
             *
             * See [method`Gdk`.Surface.get_scale_factor].
             *
             * Note that modern systems may support *fractional* scaling,
             * where the scale factor is not an integer. On such systems,
             * this function will return the next higher integer value,
             * but you probably want to use [method`Gdk`.Surface.get_scale]
             * to get the fractional scale value.
             * @returns the scale factor for @widget
             */
            get_scale_factor(): number;
            /**
             * Returns the widget’s sensitivity.
             *
             * This function returns the value that has been set using
             * [method`Gtk`.Widget.set_sensitive]).
             *
             * The effective sensitivity of a widget is however determined
             * by both its own and its parent widget’s sensitivity.
             * See [method`Gtk`.Widget.is_sensitive].
             * @returns true if the widget is sensitive
             */
            get_sensitive(): boolean;
            /**
             * Gets the settings object holding the settings used for the widget.
             *
             * Note that this function can only be called when the `GtkWidget`
             * is attached to a toplevel, since the settings object is specific
             * to a particular display. If you want to monitor the widget for
             * changes in its settings, connect to the `notify::display` signal.
             * @returns the relevant settings object
             */
            get_settings(): Gtk.Settings;
            /**
             * Returns the content width or height of the widget.
             *
             * Which dimension is returned depends on `orientation`.
             *
             * This is equivalent to calling [method`Gtk`.Widget.get_width]
             * for [enum`Gtk`.Orientation.horizontal] or [method`Gtk`.Widget.get_height]
             * for [enum`Gtk`.Orientation.vertical], but can be used when
             * writing orientation-independent code, such as when
             * implementing [iface`Gtk`.Orientable] widgets.
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @param orientation the orientation to query
             * @returns the size of @widget in @orientation
             */
            get_size(orientation: Gtk.Orientation | null): number;
            /**
             * Gets the size request that was explicitly set for the widget.
             *
             * A value of -1 stored in `width` or `height` indicates that that
             * dimension has not been set explicitly and the natural requisition
             * of the widget will be used instead.
             *
             * See [method`Gtk`.Widget.set_size_request].
             *
             * To get the size a widget will actually request, call
             * [method`Gtk`.Widget.measure] instead of this function.
             */
            get_size_request(): [number, number];
            /**
             * Returns the widget state as a flag set.
             *
             * It is worth mentioning that the effective [flags`Gtk`.StateFlags.insensitive]
             * state will be returned, that is, also based on parent insensitivity,
             * even if `widget` itself is sensitive.
             *
             * Also note that if you are looking for a way to obtain the
             * [flags`Gtk`.StateFlags] to pass to a [class`Gtk`.StyleContext]
             * method, you should look at [method`Gtk`.StyleContext.get_state].
             * @returns the state flags of widget
             */
            get_state_flags(): Gtk.StateFlags;
            /**
             * Returns the style context associated to the widget.
             *
             * The returned object is guaranteed to be the same
             * for the lifetime of `widget`.
             * @returns the widgets style context
             */
            get_style_context(): Gtk.StyleContext;
            /**
             * Fetches an object build from the template XML for `widget_type` in
             * the widget.
             *
             * This will only report children which were previously declared
             * with [method`Gtk`.WidgetClass.bind_template_child_full] or one of its
             * variants.
             *
             * This function is only meant to be called for code which is private
             * to the `widget_type` which declared the child and is meant for language
             * bindings which cannot easily make use of the GObject structure offsets.
             * @param widget_type The `GType` to get a template child for
             * @param name ID of the child defined in the template XML
             * @returns the object built in the template XML with   the id @name
             */
            get_template_child<T = GObject.Object>(widget_type: GObject.GType, name: string): T;
            /**
             * Gets the contents of the tooltip for the widget.
             *
             * If the tooltip has not been set using
             * [method`Gtk`.Widget.set_tooltip_markup], this
             * function returns `NULL`.
             * @returns the tooltip text
             */
            get_tooltip_markup(): string | null;
            /**
             * Gets the contents of the tooltip for the widget.
             *
             * If the `widget'`s tooltip was set using
             * [method`Gtk`.Widget.set_tooltip_markup],
             * this function will return the escaped text.
             * @returns the tooltip text
             */
            get_tooltip_text(): string | null;
            /**
             * Gets the vertical alignment of the widget.
             * @returns the vertical alignment of @widget
             */
            get_valign(): Gtk.Align;
            /**
             * Gets whether the widget would like any available extra vertical
             * space.
             *
             * See [method`Gtk`.Widget.get_hexpand] for more detail.
             * @returns whether vexpand flag is set
             */
            get_vexpand(): boolean;
            /**
             * Gets whether the `vexpand` flag has been explicitly set.
             *
             * See [method`Gtk`.Widget.get_hexpand_set] for more detail.
             * @returns whether vexpand has been explicitly set
             */
            get_vexpand_set(): boolean;
            /**
             * Determines whether the widget is visible.
             *
             * If you want to take into account whether the widget’s
             * parent is also marked as visible, use
             * [method`Gtk`.Widget.is_visible] instead.
             *
             * This function does not check if the widget is
             * obscured in any way.
             *
             * See [method`Gtk`.Widget.set_visible].
             * @returns true if the widget is visible
             */
            get_visible(): boolean;
            /**
             * Returns the content width of the widget.
             *
             * This function returns the width passed to its
             * size-allocate implementation, which is the width you
             * should be using in [vfunc`Gtk`.Widget.snapshot].
             *
             * For pointer events, see [method`Gtk`.Widget.contains].
             *
             * To learn more about widget sizes, see the coordinate
             * system [overview](coordinates.html).
             * @returns The width of @widget
             */
            get_width(): number;
            /**
             * Causes `widget` to have the keyboard focus for the window
             * that it belongs to.
             *
             * If `widget` is not focusable, or its [vfunc`Gtk`.Widget.grab_focus]
             * implementation cannot transfer the focus to a descendant of `widget`
             * that is focusable, it will not take focus and false will be returned.
             *
             * Calling [method`Gtk`.Widget.grab_focus] on an already focused widget
             * is allowed, should not have an effect, and return true.
             * @returns true if focus is now inside @widget
             */
            grab_focus(): boolean;
            /**
             * Returns whether a style class is currently applied to the widget.
             * @param css_class style class, without the leading period
             * @returns true if @css_class is currently applied to @widget
             */
            has_css_class(css_class: string): boolean;
            /**
             * Determines if the widget should show a visible indication that
             * it has the global input focus.
             *
             * This is a convenience function that takes into account whether
             * focus indication should currently be shown in the toplevel window
             * of `widget`. See [method`Gtk`.Window.get_focus_visible] for more
             * information about focus indication.
             *
             * To find out if the widget has the global input focus, use
             * [method`Gtk`.Widget.has_focus].
             * @returns true if the widget should display a “focus rectangle”
             */
            has_visible_focus(): boolean;
            /**
             * Reverses the effects of [method.Gtk.Widget.show].
             *
             * This is causing the widget to be hidden (invisible to the user).
             */
            hide(): void;
            /**
             * Returns whether the widget is currently being destroyed.
             *
             * This information can sometimes be used to avoid doing
             * unnecessary work.
             * @returns true if @widget is being destroyed
             */
            in_destruction(): boolean;
            /**
             * Creates and initializes child widgets defined in templates.
             *
             * This function must be called in the instance initializer
             * for any class which assigned itself a template using
             * [method`Gtk`.WidgetClass.set_template].
             *
             * It is important to call this function in the instance initializer
             * of a widget subclass and not in `GObject.constructed()` or
             * `GObject.constructor()` for two reasons:
             *
             *  - derived widgets will assume that the composite widgets
             *    defined by its parent classes have been created in their
             *    relative instance initializers
             *  - when calling `g_object_new()` on a widget with composite templates,
             *    it’s important to build the composite widgets before the construct
             *    properties are set. Properties passed to `g_object_new()` should
             *    take precedence over properties set in the private template XML
             *
             * A good rule of thumb is to call this function as the first thing in
             * an instance initialization function.
             */
            init_template(): void;
            /**
             * Inserts an action group into the widget's actions.
             *
             * Children of `widget` that implement [iface`Gtk`.Actionable] can
             * then be associated with actions in `group` by setting their
             * “action-name” to `prefix`.`action-name`.
             *
             * Note that inheritance is defined for individual actions. I.e.
             * even if you insert a group with prefix `prefix,` actions with
             * the same prefix will still be inherited from the parent, unless
             * the group contains an action with the same name.
             *
             * If `group` is `NULL`, a previously inserted group for `name` is
             * removed from `widget`.
             * @param name the prefix for actions in @group
             * @param group an action group
             */
            insert_action_group(name: string, group?: Gio.ActionGroup | null): void;
            /**
             * Sets the parent widget of the widget.
             *
             * In contrast to [method`Gtk`.Widget.set_parent], this function
             * inserts `widget` at a specific position into the list of children
             * of the `parent` widget.
             *
             * It will be placed after `previous_sibling,` or at the beginning if
             * `previous_sibling` is `NULL`.
             *
             * After calling this function, `gtk_widget_get_prev_sibling (widget)`
             * will return `previous_sibling`.
             *
             * If `parent` is already set as the parent widget of `widget,` this
             * function can also be used to reorder `widget` in the child widget
             * list of `parent`.
             *
             * This function is primarily meant for widget implementations; if you are
             * just using a widget, you *must* use its own API for adding children.
             * @param parent the parent widget to insert @widget into
             * @param previous_sibling the new previous sibling of @widget
             */
            insert_after(parent: Gtk.Widget, previous_sibling?: Gtk.Widget | null): void;
            /**
             * Sets the parent widget of the widget.
             *
             * In contrast to [method`Gtk`.Widget.set_parent], this function
             * inserts `widget` at a specific position into the list of children
             * of the `parent` widget.
             *
             * It will be placed before `next_sibling,` or at the end if
             * `next_sibling` is `NULL`.
             *
             * After calling this function, `gtk_widget_get_next_sibling (widget)`
             * will return `next_sibling`.
             *
             * If `parent` is already set as the parent widget of `widget,` this function
             * can also be used to reorder `widget` in the child widget list of `parent`.
             *
             * This function is primarily meant for widget implementations; if you are
             * just using a widget, you *must* use its own API for adding children.
             * @param parent the parent widget to insert @widget into
             * @param next_sibling the new next sibling of @widget
             */
            insert_before(parent: Gtk.Widget, next_sibling?: Gtk.Widget | null): void;
            /**
             * Determines whether the widget is a descendent of `ancestor`.
             * @param ancestor another `GtkWidget`
             * @returns true if @ancestor contains @widget as a child,   grandchild, great grandchild, etc
             */
            is_ancestor(ancestor: Gtk.Widget): boolean;
            /**
             * Determines whether the widget can be drawn to.
             *
             * A widget can be drawn if it is mapped and visible.
             * @returns true if @widget is drawable
             */
            is_drawable(): boolean;
            /**
             * Determines if the widget is the focus widget within its
             * toplevel.
             *
             * This does not mean that the [property`Gtk`.Widget:has-focus]
             * property is necessarily set; [property`Gtk`.Widget:has-focus]
             * will only be set if the toplevel widget additionally has the
             * global input focus.
             * @returns true if the widget is the focus widget
             */
            is_focus(): boolean;
            /**
             * Returns the widget’s effective sensitivity.
             *
             * This means it is sensitive itself and also its
             * parent widget is sensitive.
             * @returns true if the widget is effectively sensitive
             */
            is_sensitive(): boolean;
            /**
             * Determines whether the widget and all its parents are marked as
             * visible.
             *
             * This function does not check if the widget is obscured in any way.
             *
             * See also [method`Gtk`.Widget.get_visible] and
             * [method`Gtk`.Widget.set_visible].
             * @returns true if the widget and all its parents are visible
             */
            is_visible(): boolean;
            /**
             * Emits the [signal`Gtk`.Widget::keynav-failed] signal on the widget.
             *
             * This function should be called whenever keyboard navigation
             * within a single widget hits a boundary.
             *
             * The return value of this function should be interpreted
             * in a way similar to the return value of
             * [method`Gtk`.Widget.child_focus]. When true is returned,
             * stay in the widget, the failed keyboard navigation is ok
             * and/or there is nowhere we can/should move the focus to.
             * When false is returned, the caller should continue with
             * keyboard navigation outside the widget, e.g. by calling
             * [method`Gtk`.Widget.child_focus] on the widget’s toplevel.
             *
             * The default [signal`Gtk`.Widget::keynav-failed] handler returns
             * false for [enum`Gtk`.DirectionType.tab-forward] and
             * [enum`Gtk`.DirectionType.tab-backward]. For the other values
             * of [enum`Gtk`.DirectionType] it returns true.
             *
             * Whenever the default handler returns true, it also calls
             * [method`Gtk`.Widget.error_bell] to notify the user of the
             * failed keyboard navigation.
             *
             * A use case for providing an own implementation of `::keynav-failed`
             * (either by connecting to it or by overriding it) would be a row of
             * [class`Gtk`.Entry] widgets where the user should be able to navigate
             * the entire row with the cursor keys, as e.g. known from user
             * interfaces that require entering license keys.
             * @param direction direction of focus movement
             * @returns true if stopping keyboard navigation is fine, false   if the emitting widget should try to handle the keyboard   navigation attempt in its parent widget
             */
            keynav_failed(direction: Gtk.DirectionType | null): boolean;
            /**
             * Returns the widgets for which this widget is the target of a
             * mnemonic.
             *
             * Typically, these widgets will be labels. See, for example,
             * [method`Gtk`.Label.set_mnemonic_widget].
             *
             * The widgets in the list are not individually referenced.
             * If you want to iterate through the list and perform actions
             * involving callbacks that might destroy the widgets, you
             * must call `g_list_foreach (result, (GFunc)g_object_ref, NULL)`
             * first, and then unref all the widgets afterwards.
             * @returns the list   of mnemonic labels
             */
            list_mnemonic_labels(): Gtk.Widget[];
            /**
             * Causes a widget to be mapped if it isn’t already.
             *
             * This function is only for use in widget implementations.
             */
            map(): void;
            /**
             * Measures `widget` in the orientation `orientation` and for the given `for_size`.
             *
             * As an example, if `orientation` is %GTK_ORIENTATION_HORIZONTAL and `for_size`
             * is 300, this functions will compute the minimum and natural width of `widget`
             * if it is allocated at a height of 300 pixels.
             *
             * See [GtkWidget’s geometry management section](class.Widget.html#height-for-width-geometry-management) for
             * a more details on implementing `GtkWidgetClass.measure()`.
             * @param orientation the orientation to measure
             * @param for_size Size for the opposite of @orientation, i.e.   if @orientation is %GTK_ORIENTATION_HORIZONTAL, this is   the height the widget should be measured with. The %GTK_ORIENTATION_VERTICAL   case is analogous. This way, both height-for-width and width-for-height   requests can be implemented. If no size is known, -1 can be passed.
             */
            measure(orientation: Gtk.Orientation | null, for_size: number): [number, number, number, number];
            /**
             * Emits the [signal`Gtk`.Widget::mnemonic-activate] signal.
             * @param group_cycling true if there are other widgets with the same mnemonic
             * @returns true if the signal has been handled
             */
            mnemonic_activate(group_cycling: boolean): boolean;
            /**
             * Returns a list model to track the children of the widget.
             *
             * Calling this function will enable extra internal bookkeeping
             * to track children and emit signals on the returned listmodel.
             * It may slow down operations a lot.
             *
             * Applications should try hard to avoid calling this function
             * because of the slowdowns.
             * @returns a list model tracking @widget's children
             */
            observe_children(): Gio.ListModel;
            /**
             * Returns a list model to track the event controllers of the widget.
             *
             * Calling this function will enable extra internal bookkeeping
             * to track controllers and emit signals on the returned listmodel.
             * It may slow down operations a lot.
             *
             * Applications should try hard to avoid calling this function
             * because of the slowdowns.
             * @returns a list model tracking @widget's controllers
             */
            observe_controllers(): Gio.ListModel;
            /**
             * Finds the descendant of the widget closest to a point.
             *
             * The point (x, y) must be given in widget coordinates, so (0, 0)
             * is assumed to be the top left of `widget'`s content area.
             *
             * Usually widgets will return `NULL` if the given coordinate is not
             * contained in `widget` checked via [method`Gtk`.Widget.contains].
             * Otherwise they will recursively try to find a child that does
             * not return `NULL`. Widgets are however free to customize their
             * picking algorithm.
             *
             * This function is used on the toplevel to determine the widget
             * below the mouse cursor for purposes of hover highlighting and
             * delivering events.
             * @param x x coordinate to test, relative to @widget's origin
             * @param y y coordinate to test, relative to @widget's origin
             * @param flags flags to influence what is picked
             * @returns the widget's descendant at (x, y)
             */
            pick(x: number, y: number, flags: Gtk.PickFlags | null): Gtk.Widget | null;
            /**
             * Flags the widget for a rerun of the [vfunc`Gtk`.Widget.size_allocate]
             * function.
             *
             * Use this function instead of [method`Gtk`.Widget.queue_resize]
             * when the `widget'`s size request didn't change but it wants to
             * reposition its contents.
             *
             * An example user of this function is [method`Gtk`.Widget.set_halign].
             *
             * This function is only for use in widget implementations.
             */
            queue_allocate(): void;
            /**
             * Schedules this widget to be redrawn.
             *
             * The redraw will happen in the paint phase
             * of the current or the next frame.
             *
             * This means `widget'`s [vfunc`Gtk`.Widget.snapshot]
             * implementation will be called.
             */
            queue_draw(): void;
            /**
             * Flags a widget to have its size renegotiated.
             *
             * This should be called when a widget for some reason has a new
             * size request. For example, when you change the text in a
             * [class`Gtk`.Label], the label queues a resize to ensure there’s
             * enough space for the new text.
             *
             * Note that you cannot call gtk_widget_queue_resize() on a widget
             * from inside its implementation of the [vfunc`Gtk`.Widget.size_allocate]
             * virtual method. Calls to gtk_widget_queue_resize() from inside
             * [vfunc`Gtk`.Widget.size_allocate] will be silently ignored.
             *
             * This function is only for use in widget implementations.
             */
            queue_resize(): void;
            /**
             * Creates the GDK resources associated with a widget.
             *
             * Normally realization happens implicitly; if you show a widget
             * and all its parent containers, then the widget will be realized
             * and mapped automatically.
             *
             * Realizing a widget requires all the widget’s parent widgets to be
             * realized; calling this function realizes the widget’s parents
             * in addition to `widget` itself. If a widget is not yet inside a
             * toplevel window when you realize it, bad things will happen.
             *
             * This function is primarily used in widget implementations, and
             * isn’t very useful otherwise. Many times when you think you might
             * need it, a better approach is to connect to a signal that will be
             * called after the widget is realized automatically, such as
             * [signal`Gtk`.Widget::realize].
             */
            realize(): void;
            /**
             * Removes an event controller from the widget.
             *
             * The removed event controller will not receive any more events,
             * and should not be used again.
             *
             * Widgets will remove all event controllers automatically when they
             * are destroyed, there is normally no need to call this function.
             * @param controller an event controller
             */
            remove_controller(controller: Gtk.EventController): void;
            /**
             * Removes a style from the widget.
             *
             * After this, the style of `widget` will stop matching for `css_class`.
             * @param css_class style class to remove from @widget, without the leading period
             */
            remove_css_class(css_class: string): void;
            /**
             * Removes a widget from the list of mnemonic labels for this widget.
             *
             * See [method`Gtk`.Widget.list_mnemonic_labels].
             *
             * The widget must have previously been added to the list with
             * [method`Gtk`.Widget.add_mnemonic_label].
             * @param label a widget that is a mnemonic label for @widget
             */
            remove_mnemonic_label(label: Gtk.Widget): void;
            /**
             * Removes a tick callback previously registered with
             * [method`Gtk`.Widget.add_tick_callback].
             * @param id an ID returned by [method@Gtk.Widget.add_tick_callback]
             */
            remove_tick_callback(id: number): void;
            /**
             * Sets whether the input focus can enter the widget or
             * any of its children.
             *
             * Applications should set `can_focus` to false to mark a
             * widget as for pointer/touch use only.
             *
             * Note that having `can_focus` be true is only one of the
             * necessary conditions for being focusable. A widget must
             * also be sensitive and focusable and not have an ancestor
             * that is marked as not can-focus in order to receive input
             * focus.
             *
             * See [method`Gtk`.Widget.grab_focus] for actually setting
             * the input focus on a widget.
             * @param can_focus whether the input focus can enter   the widget or any of its children
             */
            set_can_focus(can_focus: boolean): void;
            /**
             * Sets whether the widget can be the target of pointer events.
             * @param can_target whether this widget should be able to   receive pointer events
             */
            set_can_target(can_target: boolean): void;
            /**
             * Sets whether the widget should be mapped along with its parent.
             *
             * The child visibility can be set for widget before it is added
             * to a container with [method`Gtk`.Widget.set_parent], to avoid
             * mapping children unnecessary before immediately unmapping them.
             * However it will be reset to its default state of true when the
             * widget is removed from a container.
             *
             * Note that changing the child visibility of a widget does not
             * queue a resize on the widget. Most of the time, the size of
             * a widget is computed from all visible children, whether or
             * not they are mapped. If this is not the case, the container
             * can queue a resize itself.
             *
             * This function is only useful for widget implementations
             * and should never be called by an application.
             * @param child_visible whether @widget should be mapped along   with its parent
             */
            set_child_visible(child_visible: boolean): void;
            /**
             * Replaces the current style classes of the widget with `classes`.
             * @param classes `NULL`-terminated list of style classes
             */
            set_css_classes(classes: string[]): void;
            /**
             * Sets the cursor to be shown when the pointer hovers over
             * the widget.
             *
             * If the `cursor` is `NULL`, `widget` will use the cursor
             * inherited from its parent.
             * @param cursor the new cursor
             */
            set_cursor(cursor?: Gdk.Cursor | null): void;
            /**
             * Sets the cursor to be shown when the pointer hovers over
             * the widget.
             *
             * This is a utility function that creates a cursor via
             * [ctor`Gdk`.Cursor.new_from_name] and then sets it on `widget`
             * with [method`Gtk`.Widget.set_cursor]. See those functions for
             * details.
             *
             * On top of that, this function allows `name` to be `NULL`, which
             * will do the same as calling [method`Gtk`.Widget.set_cursor]
             * with a `NULL` cursor.
             * @param name the name of the cursor
             */
            set_cursor_from_name(name?: string | null): void;
            /**
             * Sets the reading direction on the widget.
             *
             * This direction controls the primary direction for widgets
             * containing text, and also the direction in which the children
             * of a container are packed. The ability to set the direction is
             * present in order so that correct localization into languages with
             * right-to-left reading directions can be done.
             *
             * Generally, applications will let the default reading direction
             * prevail, except for widgets where the children are arranged in
             * an order that is explicitly visual rather than logical (such as
             * buttons for text justification).
             *
             * If the direction is set to [enum`Gtk`.TextDirection.none], then
             * the value set by [func`Gtk`.Widget.set_default_direction] will be used.
             * @param dir the new direction
             */
            set_direction(dir: Gtk.TextDirection | null): void;
            /**
             * Set the focus child of the widget.
             *
             * This function is only suitable for widget implementations.
             * If you want a certain widget to get the input focus, call
             * [method`Gtk`.Widget.grab_focus] on it.
             * @param child a direct child widget of @widget   or `NULL` to unset the focus child
             */
            set_focus_child(child?: Gtk.Widget | null): void;
            /**
             * Sets whether the widget should grab focus when it is clicked
             * with the mouse.
             *
             * Making mouse clicks not grab focus is useful in places like
             * toolbars where you don’t want the keyboard focus removed from
             * the main area of the application.
             * @param focus_on_click whether the widget should grab focus when clicked   with the mouse
             */
            set_focus_on_click(focus_on_click: boolean): void;
            /**
             * Sets whether the widget can own the input focus.
             *
             * Widget implementations should set `focusable` to true in
             * their init() function if they want to receive keyboard input.
             *
             * Note that having `focusable` be true is only one of the
             * necessary conditions for being focusable. A widget must
             * also be sensitive and can-focus and not have an ancestor
             * that is marked as not can-focus in order to receive input
             * focus.
             *
             * See [method`Gtk`.Widget.grab_focus] for actually setting
             * the input focus on a widget.
             * @param focusable whether or not @widget can own the input focus
             */
            set_focusable(focusable: boolean): void;
            /**
             * Sets the font map to use for text rendering in the widget.
             *
             * The font map is the object that is used to look up fonts.
             * Setting a custom font map can be useful in special situations,
             * e.g. when you need to add application-specific fonts to the set
             * of available fonts.
             *
             * When not set, the widget will inherit the font map from its parent.
             * @param font_map a `PangoFontMap`
             */
            set_font_map(font_map?: Pango.FontMap | null): void;
            /**
             * Sets the `cairo_font_options_t` used for text rendering
             * in the widget.
             *
             * When not set, the default font options for the `GdkDisplay`
             * will be used.
             * @param options a `cairo_font_options_t` struct   to unset any previously set default font options
             */
            set_font_options(options?: cairo.FontOptions | null): void;
            /**
             * Sets the horizontal alignment of the widget.
             * @param align the horizontal alignment
             */
            set_halign(align: Gtk.Align | null): void;
            /**
             * Sets the `has-tooltip` property on the widget.
             * @param has_tooltip whether or not @widget has a tooltip
             */
            set_has_tooltip(has_tooltip: boolean): void;
            /**
             * Sets whether the widget would like any available extra horizontal
             * space.
             *
             * When a user resizes a window, widgets with expand set to true generally
             * receive the extra space. For example, a list or scrollable area
             * or document in your window would often be set to expand.
             *
             * Call this function to set the expand flag if you would like your
             * widget to become larger horizontally when the window has extra
             * room.
             *
             * By default, widgets automatically expand if any of their children
             * want to expand. (To see if a widget will automatically expand given
             * its current children and state, call [method`Gtk`.Widget.compute_expand].
             * A widget can decide how the expandability of children affects its
             * own expansion by overriding the `compute_expand` virtual method on
             * `GtkWidget`.).
             *
             * Setting hexpand explicitly with this function will override the
             * automatic expand behavior.
             *
             * This function forces the widget to expand or not to expand,
             * regardless of children. The override occurs because
             * [method`Gtk`.Widget.set_hexpand] sets the hexpand-set property (see
             * [method`Gtk`.Widget.set_hexpand_set]) which causes the widget’s hexpand
             * value to be used, rather than looking at children and widget state.
             * @param expand whether to expand
             */
            set_hexpand(expand: boolean): void;
            /**
             * Sets whether the hexpand flag will be used.
             *
             * The [property`Gtk`.Widget:hexpand-set] property will be set
             * automatically when you call [method`Gtk`.Widget.set_hexpand]
             * to set hexpand, so the most likely reason to use this function
             * would be to unset an explicit expand flag.
             *
             * If hexpand is set, then it overrides any computed
             * expand value based on child widgets. If hexpand is not
             * set, then the expand value depends on whether any
             * children of the widget would like to expand.
             *
             * There are few reasons to use this function, but it’s here
             * for completeness and consistency.
             * @param set value for hexpand-set property
             */
            set_hexpand_set(set: boolean): void;
            /**
             * Sets the layout manager to use for measuring and allocating children
             * of the widget.
             * @param layout_manager a layout manager
             */
            set_layout_manager(layout_manager?: Gtk.LayoutManager | null): void;
            /**
             * Sets whether the widget acts like a modal dialog,
             * with respect to event delivery.
             * @param limit_events whether to limit events
             */
            set_limit_events(limit_events: boolean): void;
            /**
             * Sets the bottom margin of the widget.
             * @param margin the bottom margin
             */
            set_margin_bottom(margin: number): void;
            /**
             * Sets the end margin of the widget.
             * @param margin the end margin
             */
            set_margin_end(margin: number): void;
            /**
             * Sets the start margin of the widget.
             * @param margin the start margin
             */
            set_margin_start(margin: number): void;
            /**
             * Sets the top margin of the widget.
             * @param margin the top margin
             */
            set_margin_top(margin: number): void;
            /**
             * Sets a widgets name.
             *
             * Setting a name allows you to refer to the widget from a
             * CSS file. You can apply a style to widgets with a particular name
             * in the CSS file. See the documentation for the CSS syntax (on the
             * same page as the docs for [class`Gtk`.StyleContext].
             *
             * Note that the CSS syntax has certain special characters to delimit
             * and represent elements in a selector (period, #, >, *...), so using
             * these will make your widget impossible to match by name. Any combination
             * of alphanumeric symbols, dashes and underscores will suffice.
             * @param name name for the widget
             */
            set_name(name: string): void;
            /**
             * Requests the widget to be rendered partially transparent.
             *
             * An opacity of 0 is fully transparent and an opacity of 1
             * is fully opaque.
             *
             * Opacity works on both toplevel widgets and child widgets, although
             * there are some limitations: For toplevel widgets, applying opacity
             * depends on the capabilities of the windowing system. On X11, this
             * has any effect only on X displays with a compositing manager, see
             * [method`Gdk`.Display.is_composited]. On Windows and Wayland it will
             * always work, although setting a window’s opacity after the window
             * has been shown may cause some flicker.
             *
             * Note that the opacity is inherited through inclusion — if you set
             * a toplevel to be partially translucent, all of its content will
             * appear translucent, since it is ultimatively rendered on that
             * toplevel. The opacity value itself is not inherited by child
             * widgets (since that would make widgets deeper in the hierarchy
             * progressively more translucent). As a consequence, [class`Gtk`.Popover]
             * instances and other [iface`Gtk`.Native] widgets with their own surface
             * will use their own opacity value, and thus by default appear
             * non-translucent, even if they are attached to a toplevel that
             * is translucent.
             * @param opacity desired opacity, between 0 and 1
             */
            set_opacity(opacity: number): void;
            /**
             * Sets how the widget treats content that is drawn outside the
             * it's content area.
             *
             * See the definition of [enum`Gtk`.Overflow] for details.
             *
             * This setting is provided for widget implementations and
             * should not be used by application code.
             *
             * The default value is [enum`Gtk`.Overflow.visible].
             * @param overflow desired overflow value
             */
            set_overflow(overflow: Gtk.Overflow | null): void;
            /**
             * Sets the parent widget of the widget.
             *
             * This takes care of details such as updating the state and style
             * of the child to reflect its new location and resizing the parent.
             * The opposite function is [method`Gtk`.Widget.unparent].
             *
             * This function is useful only when implementing subclasses of
             * `GtkWidget`.
             * @param parent parent widget
             */
            set_parent(parent: Gtk.Widget): void;
            /**
             * Sets whether the widget will be treated as the default
             * widget within its toplevel when it has the focus, even if
             * another widget is the default.
             * @param receives_default whether or not @widget can be a default widget
             */
            set_receives_default(receives_default: boolean): void;
            /**
             * Sets the sensitivity of the widget.
             *
             * A widget is sensitive if the user can interact with it.
             * Insensitive widgets are “grayed out” and the user can’t
             * interact with them. Insensitive widgets are known as
             * “inactive”, “disabled”, or “ghosted” in some other toolkits.
             * @param sensitive true to make the widget sensitive
             */
            set_sensitive(sensitive: boolean): void;
            /**
             * Sets the minimum size of the widget.
             *
             * That is, the widget’s size request will be at least `width`
             * by `height`. You can use this function to force a widget to
             * be larger than it normally would be.
             *
             * In most cases, [method`Gtk`.Window.set_default_size] is a better
             * choice for toplevel windows than this function; setting the default
             * size will still allow users to shrink the window. Setting the size
             * request will force them to leave the window at least as large as
             * the size request.
             *
             * Note the inherent danger of setting any fixed size - themes,
             * translations into other languages, different fonts, and user action
             * can all change the appropriate size for a given widget. So, it is
             * basically impossible to hardcode a size that will always work.
             *
             * The size request of a widget is the smallest size a widget can
             * accept while still functioning well and drawing itself correctly.
             * However in some strange cases a widget may be allocated less than
             * its requested size, and in many cases a widget may be allocated more
             * space than it requested.
             *
             * If the size request in a given direction is -1 (unset), then
             * the “natural” size request of the widget will be used instead.
             *
             * The size request set here does not include any margin from the
             * properties
             * [property`Gtk`.Widget:margin-start],
             * [property`Gtk`.Widget:margin-end],
             * [property`Gtk`.Widget:margin-top], and
             * [property`Gtk`.Widget:margin-bottom], but it does include pretty
             * much all other padding or border properties set by any subclass
             * of `GtkWidget`.
             * @param width width @widget should request, or -1 to unset
             * @param height height @widget should request, or -1 to unset
             */
            set_size_request(width: number, height: number): void;
            /**
             * Turns on flag values in the current widget state.
             *
             * Typical widget states are insensitive, prelighted, etc.
             *
             * This function accepts the values [flags`Gtk`.StateFlags.dir-ltr] and
             * [flags`Gtk`.StateFlags.dir-rtl] but ignores them. If you want to set
             * the widget's direction, use [method`Gtk`.Widget.set_direction].
             *
             * This function is for use in widget implementations.
             * @param flags state flags to turn on
             * @param clear whether to clear state before turning on @flags
             */
            set_state_flags(flags: Gtk.StateFlags | null, clear: boolean): void;
            /**
             * Sets the contents of the tooltip for widget.
             *
             * `markup` must contain Pango markup.
             *
             * This function will take care of setting the
             * [property`Gtk`.Widget:has-tooltip] as a side effect, and of the
             * default handler for the [signal`Gtk`.Widget::query-tooltip] signal.
             *
             * See also [method`Gtk`.Tooltip.set_markup].
             * @param markup the contents of the tooltip for @widget
             */
            set_tooltip_markup(markup?: string | null): void;
            /**
             * Sets the contents of the tooltip for the widget.
             *
             * If `text` contains any markup, it will be escaped.
             *
             * This function will take care of setting
             * [property`Gtk`.Widget:has-tooltip] as a side effect,
             * and of the default handler for the
             * [signal`Gtk`.Widget::query-tooltip] signal.
             *
             * See also [method`Gtk`.Tooltip.set_text].
             * @param text the contents of the tooltip for @widget
             */
            set_tooltip_text(text?: string | null): void;
            /**
             * Sets the vertical alignment of the widget.
             * @param align the vertical alignment
             */
            set_valign(align: Gtk.Align | null): void;
            /**
             * Sets whether the widget would like any available extra vertical
             * space.
             *
             * See [method`Gtk`.Widget.set_hexpand] for more detail.
             * @param expand whether to expand
             */
            set_vexpand(expand: boolean): void;
            /**
             * Sets whether the vexpand flag will be used.
             *
             * See [method`Gtk`.Widget.set_hexpand_set] for more detail.
             * @param set value for vexpand-set property
             */
            set_vexpand_set(set: boolean): void;
            /**
             * Sets the visibility state of `widget`.
             *
             * Note that setting this to true doesn’t mean the widget is
             * actually viewable, see [method`Gtk`.Widget.get_visible].
             * @param visible whether the widget should be shown or not
             */
            set_visible(visible: boolean): void;
            /**
             * Returns whether the widget should contribute to
             * the measuring and allocation of its parent.
             *
             * This is false for invisible children, but also
             * for children that have their own surface, such
             * as [class`Gtk`.Popover] instances.
             * @returns true if child should be included in   measuring and allocating
             */
            should_layout(): boolean;
            /**
             * Flags a widget to be displayed.
             *
             * Any widget that isn’t shown will not appear on the screen.
             *
             * Remember that you have to show the containers containing a widget,
             * in addition to the widget itself, before it will appear onscreen.
             *
             * When a toplevel widget is shown, it is immediately realized and
             * mapped; other shown widgets are realized and mapped when their
             * toplevel widget is realized and mapped.
             */
            show(): void;
            /**
             * Allocates widget with a transformation that translates
             * the origin to the position in `allocation`.
             *
             * This is a simple form of [method`Gtk`.Widget.allocate].
             * @param allocation position and size to be allocated to @widget
             * @param baseline the baseline of the child, or -1
             */
            size_allocate(allocation: Gtk.Allocation, baseline: number): void;
            /**
             * Snapshots a child of the widget.
             *
             * When a widget receives a call to the snapshot function,
             * it must send synthetic [vfunc`Gtk`.Widget.snapshot] calls
             * to all children. This function provides a convenient way
             * of doing this. A widget, when it receives a call to its
             * [vfunc`Gtk`.Widget.snapshot] function, calls
             * gtk_widget_snapshot_child() once for each child, passing in
             * the `snapshot` the widget received.
             *
             * This function takes care of translating the origin of `snapshot,`
             * and deciding whether the child needs to be snapshot.
             *
             * It does nothing for children that implement `GtkNative`.
             * @param child a child of @widget
             * @param snapshot snapshot as passed to the widget. In particular, no   calls to [method@Gtk.Snapshot.translate] or other transform calls   should have been made
             */
            snapshot_child(child: Gtk.Widget, snapshot: Gtk.Snapshot): void;
            /**
             * Translates coordinates relative to `src_widget’`s allocation
             * to coordinates relative to `dest_widget’`s allocations.
             *
             * In order to perform this operation, both widget must share
             * a common ancestor. If that is not the case, `dest_x` and `dest_y`
             * are set to 0 and false is returned.
             * @param dest_widget another widget
             * @param src_x X position in widget coordinates of @src_widget
             * @param src_y Y position in widget coordinates of @src_widget
             * @returns true if @src_widget and @dest_widget have a common   ancestor, false otherwise
             */
            translate_coordinates(dest_widget: Gtk.Widget, src_x: number, src_y: number): [boolean, number, number];
            /**
             * Triggers a tooltip query on the display of the widget.
             */
            trigger_tooltip_query(): void;
            /**
             * Causes a widget to be unmapped if it’s currently mapped.
             *
             * This function is only for use in widget implementations.
             */
            unmap(): void;
            /**
             * Removes `widget` from its parent.
             *
             * This function is only for use in widget implementations,
             * typically in dispose.
             */
            unparent(): void;
            /**
             * Causes a widget to be unrealized.
             *
             * This frees all GDK resources associated with the widget.
             *
             * This function is only useful in widget implementations.
             */
            unrealize(): void;
            /**
             * Turns off flag values for the current widget state.
             *
             * See [method`Gtk`.Widget.set_state_flags].
             *
             * This function is for use in widget implementations.
             * @param flags state flags to turn off
             */
            unset_state_flags(flags: Gtk.StateFlags | null): void;
            /**
             * Computes whether a container should give this
             *   widget extra space when possible.
             * @param hexpand_p
             * @param vexpand_p
             */
            vfunc_compute_expand(hexpand_p: boolean, vexpand_p: boolean): void;
            /**
             * Tests if a given point is contained in the widget.
             *
             * The coordinates for (x, y) must be in widget coordinates, so
             * (0, 0) is assumed to be the top left of `widget'`s content area.
             * @param x X coordinate to test, relative to @widget's origin
             * @param y Y coordinate to test, relative to @widget's origin
             */
            vfunc_contains(x: number, y: number): boolean;
            /**
             * Vfunc called when the CSS used by widget was changed. Widgets
             *   should then discard their caches that depend on CSS and queue resizes or
             *   redraws accordingly. The default implementation will take care of this for
             *   all the default CSS properties, so implementations must chain up.
             * @param change
             */
            vfunc_css_changed(change: Gtk.CssStyleChange): void;
            /**
             * Signal emitted when the text direction of a
             *   widget changes.
             * @param previous_direction
             */
            vfunc_direction_changed(previous_direction: Gtk.TextDirection): void;
            /**
             * Vfunc for gtk_widget_child_focus()
             * @param direction
             */
            vfunc_focus(direction: Gtk.DirectionType): boolean;
            /**
             * Gets whether the widget prefers a height-for-width layout
             * or a width-for-height layout.
             *
             * Single-child widgets generally propagate the preference of
             * their child, more complex widgets need to request something
             * either in context of their children or in context of their
             * allocation capabilities.
             */
            vfunc_get_request_mode(): Gtk.SizeRequestMode;
            /**
             * Causes `widget` to have the keyboard focus for the window
             * that it belongs to.
             *
             * If `widget` is not focusable, or its [vfunc`Gtk`.Widget.grab_focus]
             * implementation cannot transfer the focus to a descendant of `widget`
             * that is focusable, it will not take focus and false will be returned.
             *
             * Calling [method`Gtk`.Widget.grab_focus] on an already focused widget
             * is allowed, should not have an effect, and return true.
             */
            vfunc_grab_focus(): boolean;
            /**
             * Reverses the effects of [method.Gtk.Widget.show].
             *
             * This is causing the widget to be hidden (invisible to the user).
             */
            vfunc_hide(): void;
            /**
             * Emits the [signal`Gtk`.Widget::keynav-failed] signal on the widget.
             *
             * This function should be called whenever keyboard navigation
             * within a single widget hits a boundary.
             *
             * The return value of this function should be interpreted
             * in a way similar to the return value of
             * [method`Gtk`.Widget.child_focus]. When true is returned,
             * stay in the widget, the failed keyboard navigation is ok
             * and/or there is nowhere we can/should move the focus to.
             * When false is returned, the caller should continue with
             * keyboard navigation outside the widget, e.g. by calling
             * [method`Gtk`.Widget.child_focus] on the widget’s toplevel.
             *
             * The default [signal`Gtk`.Widget::keynav-failed] handler returns
             * false for [enum`Gtk`.DirectionType.tab-forward] and
             * [enum`Gtk`.DirectionType.tab-backward]. For the other values
             * of [enum`Gtk`.DirectionType] it returns true.
             *
             * Whenever the default handler returns true, it also calls
             * [method`Gtk`.Widget.error_bell] to notify the user of the
             * failed keyboard navigation.
             *
             * A use case for providing an own implementation of `::keynav-failed`
             * (either by connecting to it or by overriding it) would be a row of
             * [class`Gtk`.Entry] widgets where the user should be able to navigate
             * the entire row with the cursor keys, as e.g. known from user
             * interfaces that require entering license keys.
             * @param direction direction of focus movement
             */
            vfunc_keynav_failed(direction: Gtk.DirectionType): boolean;
            /**
             * Causes a widget to be mapped if it isn’t already.
             *
             * This function is only for use in widget implementations.
             */
            vfunc_map(): void;
            /**
             * Measures `widget` in the orientation `orientation` and for the given `for_size`.
             *
             * As an example, if `orientation` is %GTK_ORIENTATION_HORIZONTAL and `for_size`
             * is 300, this functions will compute the minimum and natural width of `widget`
             * if it is allocated at a height of 300 pixels.
             *
             * See [GtkWidget’s geometry management section](class.Widget.html#height-for-width-geometry-management) for
             * a more details on implementing `GtkWidgetClass.measure()`.
             * @param orientation the orientation to measure
             * @param for_size Size for the opposite of @orientation, i.e.   if @orientation is %GTK_ORIENTATION_HORIZONTAL, this is   the height the widget should be measured with. The %GTK_ORIENTATION_VERTICAL   case is analogous. This way, both height-for-width and width-for-height   requests can be implemented. If no size is known, -1 can be passed.
             */
            vfunc_measure(orientation: Gtk.Orientation, for_size: number): [number, number, number, number];
            /**
             * Emits the [signal`Gtk`.Widget::mnemonic-activate] signal.
             * @param group_cycling true if there are other widgets with the same mnemonic
             */
            vfunc_mnemonic_activate(group_cycling: boolean): boolean;
            /**
             * Signal emitted when a change of focus is requested
             * @param direction
             */
            vfunc_move_focus(direction: Gtk.DirectionType): void;
            /**
             * Signal emitted when “has-tooltip” is %TRUE and the
             *   hover timeout has expired with the cursor hovering “above”
             *   widget; or emitted when widget got focus in keyboard mode.
             * @param x
             * @param y
             * @param keyboard_tooltip
             * @param tooltip
             */
            vfunc_query_tooltip(x: number, y: number, keyboard_tooltip: boolean, tooltip: Gtk.Tooltip): boolean;
            /**
             * Creates the GDK resources associated with a widget.
             *
             * Normally realization happens implicitly; if you show a widget
             * and all its parent containers, then the widget will be realized
             * and mapped automatically.
             *
             * Realizing a widget requires all the widget’s parent widgets to be
             * realized; calling this function realizes the widget’s parents
             * in addition to `widget` itself. If a widget is not yet inside a
             * toplevel window when you realize it, bad things will happen.
             *
             * This function is primarily used in widget implementations, and
             * isn’t very useful otherwise. Many times when you think you might
             * need it, a better approach is to connect to a signal that will be
             * called after the widget is realized automatically, such as
             * [signal`Gtk`.Widget::realize].
             */
            vfunc_realize(): void;
            /**
             * Called when the widget gets added to a `GtkRoot` widget. Must
             *   chain up
             */
            vfunc_root(): void;
            /**
             * Set the focus child of the widget.
             *
             * This function is only suitable for widget implementations.
             * If you want a certain widget to get the input focus, call
             * [method`Gtk`.Widget.grab_focus] on it.
             * @param child a direct child widget of @widget   or `NULL` to unset the focus child
             */
            vfunc_set_focus_child(child?: Gtk.Widget | null): void;
            /**
             * Flags a widget to be displayed.
             *
             * Any widget that isn’t shown will not appear on the screen.
             *
             * Remember that you have to show the containers containing a widget,
             * in addition to the widget itself, before it will appear onscreen.
             *
             * When a toplevel widget is shown, it is immediately realized and
             * mapped; other shown widgets are realized and mapped when their
             * toplevel widget is realized and mapped.
             */
            vfunc_show(): void;
            /**
             * Called to set the allocation, if the widget does
             *   not have a layout manager.
             * @param width
             * @param height
             * @param baseline
             */
            vfunc_size_allocate(width: number, height: number, baseline: number): void;
            /**
             * Vfunc called when a new snapshot of the widget has to be taken.
             * @param snapshot
             */
            vfunc_snapshot(snapshot: Gtk.Snapshot): void;
            /**
             * Signal emitted when the widget state changes,
             *   see gtk_widget_get_state_flags().
             * @param previous_state_flags
             */
            vfunc_state_flags_changed(previous_state_flags: Gtk.StateFlags): void;
            /**
             * Emitted when a system setting was changed. Must chain up.
             * @param settings
             */
            vfunc_system_setting_changed(settings: Gtk.SystemSetting): void;
            /**
             * Causes a widget to be unmapped if it’s currently mapped.
             *
             * This function is only for use in widget implementations.
             */
            vfunc_unmap(): void;
            /**
             * Causes a widget to be unrealized.
             *
             * This frees all GDK resources associated with the widget.
             *
             * This function is only useful in widget implementations.
             */
            vfunc_unrealize(): void;
            /**
             * Called when the widget is about to be removed from its
             *   `GtkRoot` widget. Must chain up
             */
            vfunc_unroot(): void;
        }

        type BarCodeClass = typeof BarCode;
        type BarCodeWidgetClass = typeof BarCodeWidget;
        type CertChooserClass = typeof CertChooser;
        abstract class CountryInfo {
            static $gtype: GObject.GType<CountryInfo>;

            // Constructors

            _init(...args: any[]): void;

            // Methods

            get_country_code(): string;
            get_country_name(): string;
            get_providers(): MobileProvider[];
            ref(): CountryInfo;
            unref(): void;
        }

        abstract class MobileAccessMethod {
            static $gtype: GObject.GType<MobileAccessMethod>;

            // Constructors

            _init(...args: any[]): void;

            // Methods

            get_3gpp_apn(): string;
            get_dns(): string[];
            get_family(): MobileFamily;
            get_gateway(): string;
            get_name(): string;
            get_password(): string;
            get_username(): string;
            ref(): MobileAccessMethod;
            unref(): void;
        }

        abstract class MobileProvider {
            static $gtype: GObject.GType<MobileProvider>;

            // Constructors

            _init(...args: any[]): void;

            // Methods

            get_3gpp_mcc_mnc(): string[];
            get_cdma_sid(): number[];
            get_methods(): MobileAccessMethod[];
            get_name(): string;
            ref(): MobileProvider;
            unref(): void;
        }

        type MobileProvidersDatabaseClass = typeof MobileProvidersDatabase;
        abstract class MobileProvidersDatabasePrivate {
            static $gtype: GObject.GType<MobileProvidersDatabasePrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        /**
         * Network access method details.
         */
        class MobileWizardAccessMethod {
            static $gtype: GObject.GType<MobileWizardAccessMethod>;

            // Fields

            provider_name: string;
            plan_name: string;
            devtype: NM.DeviceModemCapabilities;
            username: string;
            password: string;
            gsm_apn: string;

            // Constructors

            _init(...args: any[]): void;
        }

        type MobileWizardClass = typeof MobileWizard;
        type VpnPasswordDialogClass = typeof VpnPasswordDialog;
        type WifiDialogClass = typeof WifiDialog;
        abstract class Ws {
            static $gtype: GObject.GType<Ws>;

            // Constructors

            _init(...args: any[]): void;

            // Methods

            adhoc_compatible(): boolean;
            hotspot_compatible(): boolean;
            validate(): boolean;
        }

        abstract class Ws8021x {
            static $gtype: GObject.GType<Ws8021x>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class Ws8021xClass {
            static $gtype: GObject.GType<Ws8021xClass>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsDynamicWep {
            static $gtype: GObject.GType<WsDynamicWep>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsDynamicWepClass {
            static $gtype: GObject.GType<WsDynamicWepClass>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsInterface {
            static $gtype: GObject.GType<WsInterface>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsLeap {
            static $gtype: GObject.GType<WsLeap>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsLeapClass {
            static $gtype: GObject.GType<WsLeapClass>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsOwe {
            static $gtype: GObject.GType<WsOwe>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsOweClass {
            static $gtype: GObject.GType<WsOweClass>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsSae {
            static $gtype: GObject.GType<WsSae>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsSaeClass {
            static $gtype: GObject.GType<WsSaeClass>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsWepKey {
            static $gtype: GObject.GType<WsWepKey>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsWepKeyClass {
            static $gtype: GObject.GType<WsWepKeyClass>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsWpaEap {
            static $gtype: GObject.GType<WsWpaEap>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsWpaEapClass {
            static $gtype: GObject.GType<WsWpaEapClass>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsWpaPsk {
            static $gtype: GObject.GType<WsWpaPsk>;

            // Constructors

            _init(...args: any[]): void;
        }

        abstract class WsWpaPskClass {
            static $gtype: GObject.GType<WsWpaPskClass>;

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

    export default NMA4;
}

declare module 'gi://NMA4' {
    import NMA410 from 'gi://NMA4?version=1.0';
    export default NMA410;
}
// END
