import Apps from "gi://AstalApps"
import Pango from "gi://Pango?version=1.0";
import {Gdk, Gtk} from "ags/gtk4";
import {createComputed, createState, For, Accessor, onCleanup} from "ags";
import {integratedAppLauncherRevealed, toggleIntegratedAppLauncher} from "./IntegratedAppLauncher";
import {launchDesktopApp} from "../utils/launch";
import {variableConfig} from "../../config/config";

interface AppButtonProps {
    app: Apps.Application;
    isSelected: Accessor<boolean>;
}

function ensureChildVisible(scrolledWindow: Gtk.ScrolledWindow, index: number): void {
    const vAdj = scrolledWindow.get_vadjustment();
    const container = scrolledWindow.get_child();
    if (!container || !vAdj) return;

    // Magic number, height of each child
    const height = 48
    const viewStart = vAdj.get_value();
    const viewEnd = viewStart + vAdj.get_page_size();

    const childTop = (height) * index;
    const childBottom = (height * index) + height;

    if (childTop < viewStart) {
        vAdj.set_value(childTop);
    } else if (childBottom > viewEnd) {
        const newValue = childBottom - vAdj.get_page_size();
        vAdj.set_value(Math.min(newValue, vAdj.get_upper() - vAdj.get_page_size()));
    }
}

function AppButton({ app, isSelected }: AppButtonProps) {
    return <button
        canFocus={false}
        cssClasses={isSelected.as(sel => sel ? ["appButton", "selectedAppButton"] : ["appButton"])}
        onClicked={() => {
            toggleIntegratedAppLauncher()
            launchDesktopApp(app)
        }}>
        <box>
            <box
                valign={Gtk.Align.CENTER}
                orientation={Gtk.Orientation.HORIZONTAL}
            >
                <image
                    visible={variableConfig.appLauncher.showAppIcons.asAccessor()}
                    marginEnd={12}
                    iconName={app.iconName}/>
                <label
                    cssClasses={["name"]}
                    xalign={0}
                    label={app.name}
                    ellipsize={Pango.EllipsizeMode.END}
                />
            </box>
        </box>
    </button>
}

export default function () {
    const { CENTER } = Gtk.Align
    let apps = new Apps.Apps()

    const [selectedIndex, selectedIndexSetter] = createState(0)
    const [text, textSetter] = createState("")
    const list = text(text => {
        let listApps = apps
            .exact_query(text)
            .filter((app) => app.name.toLowerCase().includes(text.toLowerCase()))
            .sort((a, b) => {
                if (a.name === b.name) {
                    return 0
                }
                let aMatch = a.name.toLowerCase().startsWith(text.toLowerCase())
                let bMatch = b.name.toLowerCase().startsWith(text.toLowerCase())
                if (aMatch && bMatch) {
                    if (a.name > b.name) {
                        return 1
                    } else {
                        return -1
                    }
                } else if (aMatch) {
                    return -1
                } else {
                    return 1
                }
            })
        if (listApps.length - 1 < selectedIndex.get()) {
            if (listApps.length === 0) {
                selectedIndexSetter(0)
            } else {
                selectedIndexSetter(listApps.length - 1)
            }
        }
        return listApps
    })
    const onEnter = () => {
        if (list.get().length > 0) {
            const app = list.get()?.[selectedIndex.get()]
            if (app !== null) {
                launchDesktopApp(app)
            }
        }
        toggleIntegratedAppLauncher()
    }
    let textEntryBox: Gtk.Entry | null = null

    const scrolledWindow = (
        <Gtk.ScrolledWindow
            class="scrollWindow"
            vscrollbarPolicy={Gtk.PolicyType.AUTOMATIC}
            propagateNaturalHeight={true}
            canFocus={false}
        >
            <box
                spacing={6}
                orientation={Gtk.Orientation.VERTICAL}
                marginBottom={6}>
                <For each={list} id={(it) => it.name}>
                    {(app, index) => {
                        let indexes = createComputed([
                            selectedIndex,
                            index
                        ])
                        return <AppButton
                            app={app}
                            isSelected={indexes(s => s[1] === s[0])}/>
                    }}
                </For>
                <box
                    halign={CENTER}
                    orientation={Gtk.Orientation.VERTICAL}
                    marginBottom={8}
                    visible={list.as(l => l.length === 0)}>
                    <label
                        cssClasses={["labelSmall"]}
                        label="No match found"/>
                </box>
            </box>
        </Gtk.ScrolledWindow>
    ) as Gtk.ScrolledWindow

    const unsub = integratedAppLauncherRevealed.subscribe(() => {
        if (integratedAppLauncherRevealed.get()) {
            apps = new Apps.Apps()
            textSetter("")
            selectedIndexSetter(0)
            if (textEntryBox != null) {
                textEntryBox.text = ""
                console.log("app launcher grabbing focus")
                textEntryBox.grab_focus()
            }
        }
    })
    onCleanup(unsub)

    return <box
        $={(self) => {
            let keyController = new Gtk.EventControllerKey()

            keyController.connect("key-pressed", (_, key) => {
                if (key === Gdk.KEY_Escape) {
                    toggleIntegratedAppLauncher()
                } else if (key === Gdk.KEY_Down && list.get().length - 1 > selectedIndex.get()) {
                    selectedIndexSetter(selectedIndex.get() + 1)
                    ensureChildVisible(scrolledWindow, selectedIndex.get())
                    return true
                } else if (key === Gdk.KEY_Up && selectedIndex.get() != 0) {
                    selectedIndexSetter(selectedIndex.get() - 1)
                    ensureChildVisible(scrolledWindow, selectedIndex.get())
                    return true
                }
                return false
            })

            self.add_controller(keyController)
        }}
        orientation={Gtk.Orientation.VERTICAL}>
        <box
            widthRequest={500}
            cssClasses={["appLauncher"]}
            orientation={Gtk.Orientation.VERTICAL}>
            <box
                orientation={Gtk.Orientation.HORIZONTAL}>
                <label
                    cssClasses={["searchIcon"]}
                    label=""/>
                <entry
                    cssClasses={["searchField"]}
                    placeholderText="Search"
                    onActivate={onEnter}
                    hexpand={true}
                    $={(self) => {
                        textEntryBox = self
                        self.connect('changed', () => textSetter(self.text))
                    }}
                />
            </box>
            {scrolledWindow}
        </box>
        <box
            vexpand={true}/>
    </box>
}