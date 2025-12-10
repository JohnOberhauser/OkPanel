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

declare module 'gi://AstalMpris?version=0.1' {
    // Module dependencies
    import type GLib from 'gi://GLib?version=2.0';
    import type Gio from 'gi://Gio?version=2.0';
    import type GObject from 'gi://GObject?version=2.0';
    import type GModule from 'gi://GModule?version=2.0';

    export namespace AstalMpris {
        /**
         * AstalMpris-0.1
         */

        export namespace PlaybackStatus {
            export const $gtype: GObject.GType<PlaybackStatus>;
        }

        enum PlaybackStatus {
            PLAYING,
            PAUSED,
            STOPPED,
        }

        export namespace Loop {
            export const $gtype: GObject.GType<Loop>;
        }

        enum Loop {
            UNSUPPORTED,
            /**
             * The playback will stop when there are no more tracks to play.
             */
            NONE,
            /**
             * The current track will start again from the begining once it has finished playing.
             */
            TRACK,
            /**
             * The playback loops through a list of tracks.
             */
            PLAYLIST,
        }

        export namespace Shuffle {
            export const $gtype: GObject.GType<Shuffle>;
        }

        enum Shuffle {
            UNSUPPORTED,
            /**
             * Playback is progressing through a playlist in some other order.
             */
            ON,
            /**
             * Playback is progressing linearly through a playlist.
             */
            OFF,
        }
        const MAJOR_VERSION: number;
        const MINOR_VERSION: number;
        const MICRO_VERSION: number;
        const VERSION: string;
        /**
         * Gets the default singleton Mpris instance.
         */
        function get_default(): Mpris;
        namespace Mpris {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'player-added': (arg0: Player) => void;
                'player-closed': (arg0: Player) => void;
                'notify::players': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps<A extends GObject.Object = GObject.Object>
                extends GObject.Object.ConstructorProps,
                    Gio.ListModel.ConstructorProps {
                players: Player[];
            }
        }

        /**
         * Manager object that monitors the session DBus for Mpris players to appear and disappear.
         */
        class Mpris<A extends GObject.Object = GObject.Object> extends GObject.Object implements Gio.ListModel<A> {
            static $gtype: GObject.GType<Mpris>;

            // Properties

            /**
             * List of currently available players.
             */
            get players(): Player[];

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Mpris.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Mpris.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](): Mpris;

            // Signals

            connect<K extends keyof Mpris.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Mpris.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Mpris.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Mpris.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Mpris.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Mpris.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Static methods

            /**
             * Gets the default singleton Mpris instance.
             */
            static get_default(): Mpris;

            // Methods

            get_players(): Player[];

            // Inherited methods
            /**
             * Gets the type of the items in `list`.
             *
             * All items returned from g_list_model_get_item() are of the type
             * returned by this function, or a subtype, or if the type is an
             * interface, they are an implementation of that interface.
             *
             * The item type of a #GListModel can not change during the life of the
             * model.
             * @returns the #GType of the items contained in @list.
             */
            get_item_type(): GObject.GType;
            /**
             * Gets the number of items in `list`.
             *
             * Depending on the model implementation, calling this function may be
             * less efficient than iterating the list with increasing values for
             * `position` until g_list_model_get_item() returns %NULL.
             * @returns the number of items in @list.
             */
            get_n_items(): number;
            /**
             * Get the item at `position`.
             *
             * If `position` is greater than the number of items in `list,` %NULL is
             * returned.
             *
             * %NULL is never returned for an index that is smaller than the length
             * of the list.
             *
             * This function is meant to be used by language bindings in place
             * of g_list_model_get_item().
             *
             * See also: g_list_model_get_n_items()
             * @param position the position of the item to fetch
             * @returns the object at @position.
             */
            get_item(position: number): A | null;
            /**
             * Emits the #GListModel::items-changed signal on `list`.
             *
             * This function should only be called by classes implementing
             * #GListModel. It has to be called after the internal representation
             * of `list` has been updated, because handlers connected to this signal
             * might query the new state of the list.
             *
             * Implementations must only make changes to the model (as visible to
             * its consumer) in places that will not cause problems for that
             * consumer.  For models that are driven directly by a write API (such
             * as #GListStore), changes can be reported in response to uses of that
             * API.  For models that represent remote data, changes should only be
             * made from a fresh mainloop dispatch.  It is particularly not
             * permitted to make changes in response to a call to the #GListModel
             * consumer API.
             *
             * Stated another way: in general, it is assumed that code making a
             * series of accesses to the model via the API, without returning to the
             * mainloop, and without calling other code, will continue to view the
             * same contents of the model.
             * @param position the position at which @list changed
             * @param removed the number of items removed
             * @param added the number of items added
             */
            items_changed(position: number, removed: number, added: number): void;
            /**
             * Get the item at `position`. If `position` is greater than the number of
             * items in `list,` %NULL is returned.
             *
             * %NULL is never returned for an index that is smaller than the length
             * of the list.  See g_list_model_get_n_items().
             *
             * The same #GObject instance may not appear more than once in a #GListModel.
             * @param position the position of the item to fetch
             */
            vfunc_get_item(position: number): A | null;
            /**
             * Gets the type of the items in `list`.
             *
             * All items returned from g_list_model_get_item() are of the type
             * returned by this function, or a subtype, or if the type is an
             * interface, they are an implementation of that interface.
             *
             * The item type of a #GListModel can not change during the life of the
             * model.
             */
            vfunc_get_item_type(): GObject.GType;
            /**
             * Gets the number of items in `list`.
             *
             * Depending on the model implementation, calling this function may be
             * less efficient than iterating the list with increasing values for
             * `position` until g_list_model_get_item() returns %NULL.
             */
            vfunc_get_n_items(): number;
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

        namespace Player {
            // Signal signatures
            interface SignalSignatures extends GObject.Object.SignalSignatures {
                'notify::bus-name': (pspec: GObject.ParamSpec) => void;
                'notify::available': (pspec: GObject.ParamSpec) => void;
                'notify::can-quit': (pspec: GObject.ParamSpec) => void;
                'notify::fullscreen': (pspec: GObject.ParamSpec) => void;
                'notify::can-set-fullscreen': (pspec: GObject.ParamSpec) => void;
                'notify::can-raise': (pspec: GObject.ParamSpec) => void;
                'notify::identity': (pspec: GObject.ParamSpec) => void;
                'notify::entry': (pspec: GObject.ParamSpec) => void;
                'notify::supported-uri-schemes': (pspec: GObject.ParamSpec) => void;
                'notify::supported-mime-types': (pspec: GObject.ParamSpec) => void;
                'notify::loop-status': (pspec: GObject.ParamSpec) => void;
                'notify::shuffle-status': (pspec: GObject.ParamSpec) => void;
                'notify::rate': (pspec: GObject.ParamSpec) => void;
                'notify::volume': (pspec: GObject.ParamSpec) => void;
                'notify::position': (pspec: GObject.ParamSpec) => void;
                'notify::playback-status': (pspec: GObject.ParamSpec) => void;
                'notify::minimum-rate': (pspec: GObject.ParamSpec) => void;
                'notify::maximum-rate': (pspec: GObject.ParamSpec) => void;
                'notify::can-go-next': (pspec: GObject.ParamSpec) => void;
                'notify::can-go-previous': (pspec: GObject.ParamSpec) => void;
                'notify::can-play': (pspec: GObject.ParamSpec) => void;
                'notify::can-pause': (pspec: GObject.ParamSpec) => void;
                'notify::can-seek': (pspec: GObject.ParamSpec) => void;
                'notify::can-control': (pspec: GObject.ParamSpec) => void;
                'notify::metadata': (pspec: GObject.ParamSpec) => void;
                'notify::trackid': (pspec: GObject.ParamSpec) => void;
                'notify::length': (pspec: GObject.ParamSpec) => void;
                'notify::art-url': (pspec: GObject.ParamSpec) => void;
                'notify::album': (pspec: GObject.ParamSpec) => void;
                'notify::album-artist': (pspec: GObject.ParamSpec) => void;
                'notify::artist': (pspec: GObject.ParamSpec) => void;
                'notify::lyrics': (pspec: GObject.ParamSpec) => void;
                'notify::title': (pspec: GObject.ParamSpec) => void;
                'notify::composer': (pspec: GObject.ParamSpec) => void;
                'notify::comments': (pspec: GObject.ParamSpec) => void;
                'notify::cover-art': (pspec: GObject.ParamSpec) => void;
            }

            // Constructor properties interface

            interface ConstructorProps extends GObject.Object.ConstructorProps {
                bus_name: string;
                busName: string;
                available: boolean;
                can_quit: boolean;
                canQuit: boolean;
                fullscreen: boolean;
                can_set_fullscreen: boolean;
                canSetFullscreen: boolean;
                can_raise: boolean;
                canRaise: boolean;
                identity: string;
                entry: string;
                supported_uri_schemes: string[];
                supportedUriSchemes: string[];
                supported_mime_types: string[];
                supportedMimeTypes: string[];
                loop_status: Loop;
                loopStatus: Loop;
                shuffle_status: Shuffle;
                shuffleStatus: Shuffle;
                rate: number;
                volume: number;
                position: number;
                playback_status: PlaybackStatus;
                playbackStatus: PlaybackStatus;
                minimum_rate: number;
                minimumRate: number;
                maximum_rate: number;
                maximumRate: number;
                can_go_next: boolean;
                canGoNext: boolean;
                can_go_previous: boolean;
                canGoPrevious: boolean;
                can_play: boolean;
                canPlay: boolean;
                can_pause: boolean;
                canPause: boolean;
                can_seek: boolean;
                canSeek: boolean;
                can_control: boolean;
                canControl: boolean;
                metadata: GLib.Variant;
                trackid: string;
                length: number;
                art_url: string;
                artUrl: string;
                album: string;
                album_artist: string;
                albumArtist: string;
                artist: string;
                lyrics: string;
                title: string;
                composer: string;
                comments: string;
                cover_art: string;
                coverArt: string;
            }
        }

        /**
         * Object which tracks players through their mpris DBus interface. The most simple way is to use [class`AstalMpris`.Mpris] which tracks
         * every player, but [class`AstalMpris`.Player] can be constructed for dedicated players too.
         */
        class Player extends GObject.Object {
            static $gtype: GObject.GType<Player>;

            // Properties

            /**
             * Full dbus nama of this player.
             */
            get bus_name(): string;
            set bus_name(val: string);
            /**
             * Full dbus nama of this player.
             */
            get busName(): string;
            set busName(val: string);
            /**
             * Indicates if [property`AstalMpris`.Player:bus_name] is available on dbus.
             */
            get available(): boolean;
            set available(val: boolean);
            /**
             * Indicates if [method`AstalMpris`.Player.quit] has any effect.
             */
            get can_quit(): boolean;
            set can_quit(val: boolean);
            /**
             * Indicates if [method`AstalMpris`.Player.quit] has any effect.
             */
            get canQuit(): boolean;
            set canQuit(val: boolean);
            /**
             * Indicates if the player is occupying the fullscreen. This is typically used for videos. Use [method`AstalMpris`.Player.toggle_fullscreen]
             * to toggle fullscreen state.
             */
            get fullscreen(): boolean;
            set fullscreen(val: boolean);
            /**
             * Indicates if [method`AstalMpris`.Player.toggle_fullscreen] has any effect.
             */
            get can_set_fullscreen(): boolean;
            set can_set_fullscreen(val: boolean);
            /**
             * Indicates if [method`AstalMpris`.Player.toggle_fullscreen] has any effect.
             */
            get canSetFullscreen(): boolean;
            set canSetFullscreen(val: boolean);
            /**
             * Indicates if [method`AstalMpris`.Player.raise] has any effect.
             */
            get can_raise(): boolean;
            set can_raise(val: boolean);
            /**
             * Indicates if [method`AstalMpris`.Player.raise] has any effect.
             */
            get canRaise(): boolean;
            set canRaise(val: boolean);
            /**
             * A human friendly name to identify the player.
             */
            get identity(): string;
            set identity(val: string);
            /**
             * The base name of a .desktop file
             */
            get entry(): string;
            set entry(val: string);
            /**
             * The URI schemes supported by the media player. This can be viewed as protocols supported by the player in almost all cases. Almost every media
             * player will include support for the "file" scheme. Other common schemes are "http" and "rtsp".
             */
            get supported_uri_schemes(): string[];
            set supported_uri_schemes(val: string[]);
            /**
             * The URI schemes supported by the media player. This can be viewed as protocols supported by the player in almost all cases. Almost every media
             * player will include support for the "file" scheme. Other common schemes are "http" and "rtsp".
             */
            get supportedUriSchemes(): string[];
            set supportedUriSchemes(val: string[]);
            /**
             * The mime-types supported by the player.
             */
            get supported_mime_types(): string[];
            set supported_mime_types(val: string[]);
            /**
             * The mime-types supported by the player.
             */
            get supportedMimeTypes(): string[];
            set supportedMimeTypes(val: string[]);
            /**
             * The current loop/repeat status.
             */
            get loop_status(): Loop;
            set loop_status(val: Loop);
            /**
             * The current loop/repeat status.
             */
            get loopStatus(): Loop;
            set loopStatus(val: Loop);
            /**
             * The current shuffle status.
             */
            get shuffle_status(): Shuffle;
            set shuffle_status(val: Shuffle);
            /**
             * The current shuffle status.
             */
            get shuffleStatus(): Shuffle;
            set shuffleStatus(val: Shuffle);
            /**
             * The current playback rate.
             */
            get rate(): number;
            set rate(val: number);
            /**
             * The current volume level between 0 and 1 or -1 when it is unsupported.
             */
            get volume(): number;
            set volume(val: number);
            /**
             * The current position of the track in seconds or -1 when it is unsupported. To get a progress percentage simply divide this with [property
             * `AstalMpris`.Player:length].
             */
            get position(): number;
            set position(val: number);
            /**
             * The current playback status.
             */
            get playback_status(): PlaybackStatus;
            set playback_status(val: PlaybackStatus);
            /**
             * The current playback status.
             */
            get playbackStatus(): PlaybackStatus;
            set playbackStatus(val: PlaybackStatus);
            /**
             * The minimum value which the [property`AstalMpris`.Player:rate] can take.
             */
            get minimum_rate(): number;
            set minimum_rate(val: number);
            /**
             * The minimum value which the [property`AstalMpris`.Player:rate] can take.
             */
            get minimumRate(): number;
            set minimumRate(val: number);
            /**
             * The maximum value which the [property`AstalMpris`.Player:rate] can take.
             */
            get maximum_rate(): number;
            set maximum_rate(val: number);
            /**
             * The maximum value which the [property`AstalMpris`.Player:rate] can take.
             */
            get maximumRate(): number;
            set maximumRate(val: number);
            /**
             * Indicates if invoking [method`AstalMpris`.Player.next] has effect.
             */
            get can_go_next(): boolean;
            set can_go_next(val: boolean);
            /**
             * Indicates if invoking [method`AstalMpris`.Player.next] has effect.
             */
            get canGoNext(): boolean;
            set canGoNext(val: boolean);
            /**
             * Indicates if invoking [method`AstalMpris`.Player.previous] has effect.
             */
            get can_go_previous(): boolean;
            set can_go_previous(val: boolean);
            /**
             * Indicates if invoking [method`AstalMpris`.Player.previous] has effect.
             */
            get canGoPrevious(): boolean;
            set canGoPrevious(val: boolean);
            /**
             * Indicates if invoking [method`AstalMpris`.Player.play] has effect.
             */
            get can_play(): boolean;
            set can_play(val: boolean);
            /**
             * Indicates if invoking [method`AstalMpris`.Player.play] has effect.
             */
            get canPlay(): boolean;
            set canPlay(val: boolean);
            /**
             * Indicates if invoking [method`AstalMpris`.Player.pause] has effect.
             */
            get can_pause(): boolean;
            set can_pause(val: boolean);
            /**
             * Indicates if invoking [method`AstalMpris`.Player.pause] has effect.
             */
            get canPause(): boolean;
            set canPause(val: boolean);
            /**
             * Indicates if setting [property`AstalMpris`.Player:position] has effect.
             */
            get can_seek(): boolean;
            set can_seek(val: boolean);
            /**
             * Indicates if setting [property`AstalMpris`.Player:position] has effect.
             */
            get canSeek(): boolean;
            set canSeek(val: boolean);
            /**
             * Indicates if the player can be controlled with methods such as [method`AstalMpris`.Player.play_pause].
             */
            get can_control(): boolean;
            set can_control(val: boolean);
            /**
             * Indicates if the player can be controlled with methods such as [method`AstalMpris`.Player.play_pause].
             */
            get canControl(): boolean;
            set canControl(val: boolean);
            /**
             * Metadata of this player.
             */
            get metadata(): GLib.Variant;
            set metadata(val: GLib.Variant);
            /**
             * Currently playing track's id.
             */
            get trackid(): string;
            set trackid(val: string);
            /**
             * Length of the currently playing track in seconds.
             */
            get length(): number;
            set length(val: number);
            /**
             * The location of an image representing the track or album. You might prefer using [property`AstalMpris`.Player:cover_art].
             */
            get art_url(): string;
            set art_url(val: string);
            /**
             * The location of an image representing the track or album. You might prefer using [property`AstalMpris`.Player:cover_art].
             */
            get artUrl(): string;
            set artUrl(val: string);
            /**
             * Title of the currently playing album.
             */
            get album(): string;
            set album(val: string);
            /**
             * Artists of the currently playing album.
             */
            get album_artist(): string;
            set album_artist(val: string);
            /**
             * Artists of the currently playing album.
             */
            get albumArtist(): string;
            set albumArtist(val: string);
            /**
             * Artists of the currently playing track.
             */
            get artist(): string;
            set artist(val: string);
            /**
             * Lyrics of the currently playing track.
             */
            get lyrics(): string;
            set lyrics(val: string);
            /**
             * Title of the currently playing track.
             */
            get title(): string;
            set title(val: string);
            /**
             * Composers of the currently playing track.
             */
            get composer(): string;
            set composer(val: string);
            /**
             * Comments of the currently playing track.
             */
            get comments(): string;
            set comments(val: string);
            /**
             * Path of the cached [property`AstalMpris`.Player:art_url].
             */
            get cover_art(): string;
            set cover_art(val: string);
            /**
             * Path of the cached [property`AstalMpris`.Player:art_url].
             */
            get coverArt(): string;
            set coverArt(val: string);

            /**
             * Compile-time signal type information.
             *
             * This instance property is generated only for TypeScript type checking.
             * It is not defined at runtime and should not be accessed in JS code.
             * @internal
             */
            $signals: Player.SignalSignatures;

            // Constructors

            constructor(properties?: Partial<Player.ConstructorProps>, ...args: any[]);

            _init(...args: any[]): void;

            static ['new'](name: string): Player;

            // Signals

            connect<K extends keyof Player.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Player.SignalSignatures[K]>,
            ): number;
            connect(signal: string, callback: (...args: any[]) => any): number;
            connect_after<K extends keyof Player.SignalSignatures>(
                signal: K,
                callback: GObject.SignalCallback<this, Player.SignalSignatures[K]>,
            ): number;
            connect_after(signal: string, callback: (...args: any[]) => any): number;
            emit<K extends keyof Player.SignalSignatures>(
                signal: K,
                ...args: GObject.GjsParameters<Player.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never
            ): void;
            emit(signal: string, ...args: any[]): void;

            // Methods

            /**
             * Brings the player's user interface to the front using any appropriate mechanism available. The media player may be unable to control how
             * its user interface is displayed, or it may not have a graphical user interface at all. In this case, the [property@
             * AstalMpris.Player:can_raise] is `false` and this method does nothing.
             */
            raise(): void;
            /**
             * Causes the media player to stop running. The media player may refuse to allow clients to shut it down. In this case, the [property@
             * AstalMpris.Player:can_quit] property is false and this method does nothing.
             */
            quit(): void;
            /**
             * Toggle [property`AstalMpris`.Player:fullscreen] state.
             */
            toggle_fullscreen(): void;
            /**
             * Skips to the next track in the tracklist. If there is no next track (and endless playback and track repeat are both off), stop
             * playback. If [property`AstalMpris`.Player:can_go_next] is `false` this method has no effect.
             */
            next(): void;
            /**
             * Skips to the previous track in the tracklist. If there is no previous track (and endless playback and track repeat are both off),
             * stop playback. If [property`AstalMpris`.Player:can_go_previous] is `false` this method has no effect.
             */
            previous(): void;
            /**
             * Pauses playback. If playback is already paused, this has no effect. If [property`AstalMpris`.Player:can_pause] is `false` this method has
             * no effect.
             */
            pause(): void;
            /**
             * Pauses playback. If playback is already paused, resumes playback. If playback is stopped, starts playback.
             */
            play_pause(): void;
            /**
             * Stops playback. If playback is already stopped, this has no effect. If [property`AstalMpris`.Player:can_control] is `false` this method
             * has no effect.
             */
            stop(): void;
            /**
             * Starts or resumes playback. If already playing, this has no effect. If paused, playback resumes from the current position. If [property@
             * AstalMpris.Player:can_play] is `false` this method has no effect.
             */
            play(): void;
            /**
             * uri scheme should be an element of [property`AstalMpris`.Player:supported_uri_schemes] and the mime-type should match one of the elements
             * of [property`AstalMpris`.Player:supported_mime_types].
             * @param uri Uri of the track to load.
             */
            open_uri(uri: string): void;
            /**
             * Change [property`AstalMpris`.Player:loop_status] from none to track, from track to playlist, from playlist to none.
             */
            loop(): void;
            /**
             * Toggle [property`AstalMpris`.Player:shuffle_status].
             */
            shuffle(): void;
            /**
             * Lookup a key from [property`AstalMpris`.Player:metadata]. This method is useful for languages that fail to introspect hashtables.
             * @param key
             */
            get_meta(key: string): GLib.Variant | null;
            get_bus_name(): string;
            get_available(): boolean;
            get_can_quit(): boolean;
            get_fullscreen(): boolean;
            get_can_set_fullscreen(): boolean;
            get_can_raise(): boolean;
            get_identity(): string;
            get_entry(): string;
            get_supported_uri_schemes(): string[];
            get_supported_mime_types(): string[];
            get_loop_status(): Loop;
            set_loop_status(value: Loop | null): void;
            get_shuffle_status(): Shuffle;
            set_shuffle_status(value: Shuffle | null): void;
            get_rate(): number;
            set_rate(value: number): void;
            get_volume(): number;
            set_volume(value: number): void;
            get_position(): number;
            set_position(value: number): void;
            get_playback_status(): PlaybackStatus;
            get_minimum_rate(): number;
            get_maximum_rate(): number;
            get_can_go_next(): boolean;
            get_can_go_previous(): boolean;
            get_can_play(): boolean;
            get_can_pause(): boolean;
            get_can_seek(): boolean;
            get_can_control(): boolean;
            get_metadata(): GLib.Variant;
            get_trackid(): string;
            get_length(): number;
            get_art_url(): string;
            get_album(): string;
            get_album_artist(): string;
            get_artist(): string;
            get_lyrics(): string;
            get_title(): string;
            get_composer(): string;
            get_comments(): string;
            get_cover_art(): string;
        }

        type MprisClass = typeof Mpris;
        abstract class MprisPrivate {
            static $gtype: GObject.GType<MprisPrivate>;

            // Constructors

            _init(...args: any[]): void;
        }

        type PlayerClass = typeof Player;
        abstract class PlayerPrivate {
            static $gtype: GObject.GType<PlayerPrivate>;

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

    export default AstalMpris;
}

declare module 'gi://AstalMpris' {
    import AstalMpris01 from 'gi://AstalMpris?version=0.1';
    export default AstalMpris01;
}
// END
