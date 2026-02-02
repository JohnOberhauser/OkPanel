# Example configs

## Example Global Config

An example global config placed at `~/.config/OkPanel/okpanel.yaml`
These are things that you probably want the same in all your config files (if you use multiple)

```
configUpdateScript: "/home/john/workspace/scripts/setTheme.sh"
wallpaperUpdateScript: "/home/john/workspace/scripts/setWallpaper.sh"

weather:
  latitude: "47.5432"
  longitude: "-89.9034"
  
systemCommands:
  logout: "uwsm stop"
  lock: "uwsm app -- hyprlock"
  restart: "systemctl reboot"
  shutdown: "systemctl poweroff"
  
barWidgets:
  dock:
    pinnedApps:
      - kitty
      - firefox-nightly
      - jetbrains-idea
      - jetbrains-studio
      - org.signal.Signal
      - Darktable
      - steam
    glyphOverride:
      - "kitty|"
      - "jetbrains-idea|"
      - "org.signal.Signal|󰭹"
      - "Darktable|󰄄"
```

## Example Config 1

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/examples/bloodrust.png)

```
icon: "󰚌"
iconOffset: 2
wallpaper:
  wallpaperDir: /home/john/workspace/Varda-Theme/themes/bloodrust/wallpaper

frame:
  topThickness: 0
  menu:
    position: "right"
  calendar:
    position: "right"
  clipboardManager:
    position: "right"

topBar:
  paddingTop: 2
  paddingBottom: 0
  paddingEnd: 6
  leftWidgets:
    - dock
  centerWidgets:
    - cavaWaveform
    - mprisControls
    - mprisPrimaryPlayerSwitcher
    - mprisTrackInfo
  rightWidgets:
    - clipboardManager
    - logout
    - lock
    - restart
    - shutdown
    - menu

rightBar:
  topWidgets:
    - workspaces
  bottomWidgets:
    - timer
    - recordingIndicator
    - vpnIndicator
    - powerProfile
    - audioOut
    - audioIn
    - bluetooth
    - network
    - battery
    - clock

barWidgets:
  widgetBorderRadius: 20
  cavaWaveform:
    position: end
    foreground: "#7C545F"
  mprisTrackInfo:
    textAlignment: "start"
    foreground: "#7C545F"

systemMenu:
  widgets:
    - clock
    - quickActions1
    - network
    - bluetooth
    - audioOut
    - audioIn
    - powerProfile
    - lookAndFeel
    - mprisPlayers

theme:
  name: bloodrust
  colors:
    background: "#1F2932"
    foreground: "#AFB3BD"
    primary: "#7C545F"
    buttonPrimary: "#7C545F"
    warning: "#7C7C54"
    barBorder: "#7C545F"
    windowBorder: "#AFB3BD"
    alertBorder: "#7C545F"
```

## Example Config 2

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/examples/desertpower.png)

```
icon: "󱥒"
iconOffset: 3
wallpaper:
  wallpaperDir: /home/john/workspace/Varda-Theme/themes/desertpower/wallpaper

frame:
  borderWidth: 0
  topThickness: 0
  rightThickness: 0
  leftThickness: 0
  calendar:
    position: "right"

bottomBar:
  marginBottom: 5
  marginStart: 5
  marginEnd: 5
  leftWidgets:
    - menu
    - shortcut1
    - shortcut2
    - shortcut3
    - shortcut4
    - shortcut5
    - shortcut6
    - shortcut7
  centerWidgets:
    - workspaces
  rightWidgets:
    - timer
    - recordingIndicator
    - vpnIndicator
    - powerProfile
    - audioOut
    - audioIn
    - bluetooth
    - network
    - battery
    - clock

barWidgets:
  workspaces:
    inactiveIcon: ""
    activeIcon: ""
    foreground: "#11100F"
    background: "#55504D"
  clock:
    marginEnd: 4
    background: "#55504D"
  shortcut1:
    icon: ""
    iconOffset: 2
    launch: "kitty -d ~/"
    newWindow: "kitty -d ~/"
    class: "kitty"
  shortcut2:
    icon: "󰈹"
    iconOffset: 2
    launch: "/home/john/.local/share/firefox-nightly/firefox"
    newWindow: "/home/john/.local/share/firefox-nightly/firefox"
    class: "firefox-nightly"
  shortcut3:
    icon: ""
    iconOffset: 3
    launch: "/home/john/.local/share/JetBrains/Toolbox/apps/intellij-idea-ultimate/bin/idea"
    class: "jetbrains-idea"
  shortcut4:
    icon: "󰀴"
    launch: "/home/john/.local/share/JetBrains/Toolbox/apps/android-studio/bin/studio.sh"
    class: "jetbrains-studio"
  shortcut5:
    icon: "󰭹"
    launch: "flatpak run org.signal.Signal"
    class: "org.signal.Signal"
  shortcut6:
    icon: "󰄄"
    launch: "darktable"
    class: "Darktable"
  shortcut7:
    icon: ""
    launch: "steam"
    class: "steam"

theme:
  name: desertpower
  colors:
    background: "#11100F"
    foreground: "#A1A09F"
    primary: "#55504D"
    buttonPrimary: "#55504D"
    warning: "#E0974B"
    barBorder: "#55504D"
    windowBorder: "#A1A09F"
    alertBorder: "#55504D"

```

## Example config 3

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/examples/everforest.png)

```
icon: "󰌪"
iconOffset: 1
wallpaper:
  wallpaperDir: /home/john/workspace/Varda-Theme/themes/everforest/wallpaper

frame:
  rightThickness: 0
  bottomThickness: 0
  leftThickness: 0
  topThickness: 0

topBar:
  paddingTop: 4
  paddingBottom: 4
  leftWidgets:
    - menu
    - notificationHistory
    - clipboardManager
    - colorPicker
    - workspaces
  centerWidgets:
    - shortcut1
    - shortcut2
    - shortcut3
    - shortcut4
    - clock
    - logout
    - lock
    - restart
    - shutdown
  rightWidgets:
    - timer
    - recordingIndicator
    - vpnIndicator
    - powerProfile
    - audioOut
    - audioIn
    - bluetooth
    - network
    - battery

barWidgets:
  workspaces:
    inactiveIcon: ""
    activeIcon: ""
    borderRadius: 90
    marginStart: 12
    foreground: "#1E2326"
    background: "#7A8478"
  clock:
    marginStart: 12
    marginEnd: 12
    borderRadius: 90
    foreground: "#1E2326"
    background: "#7A8478"
   shortcut1:
    icon: ""
    iconOffset: 2
    launch: "kitty -d ~/"
    newWindow: "kitty -d ~/"
    class: "kitty"
  shortcut2:
    icon: "󰈹"
    iconOffset: 2
    launch: "/home/john/.local/share/firefox-nightly/firefox"
    newWindow: "/home/john/.local/share/firefox-nightly/firefox"
    class: "firefox-nightly"
  shortcut3:
    icon: ""
    iconOffset: 3
    launch: "/home/john/.local/share/JetBrains/Toolbox/apps/intellij-idea-ultimate/bin/idea"
    class: "jetbrains-idea"
  shortcut4:
    icon: "󰀴"
    launch: "/home/john/.local/share/JetBrains/Toolbox/apps/android-studio/bin/studio.sh"
    class: "jetbrains-studio"

systemMenu:
  widgets:
    - clock
    - quickActions1
    - network
    - bluetooth
    - audioOut
    - audioIn
    - powerProfile
    - lookAndFeel
    - mprisPlayers

theme:
  name: everforest
  colors:
    background: "#1E2326"
    foreground: "#D3C6AA"
    primary: "#7A8478"
    buttonPrimary: "#384B55"
    warning: "#E67E80"
    barBorder: "#7A8478"
    windowBorder: "#D3C6AA"
    alertBorder: "#7A8478"
```

## Example config 4

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/examples/nord.png)

```
icon: ""
iconOffset: 2
wallpaper:
  wallpaperDir: /home/john/workspace/Varda-Theme/themes/nord/wallpaper

frame:
  drawFrame: false
  topThickness: 0
  rightThickness: 0
  leftThickness: 0
  bottomThickness: 0
  enableLeftSpacer: false
  enableRightSpacer: false
  enableBottomSpacer: false
  margin: 0
  borderWidth: 0

topBar:
  borderWidth: 2
  marginTop: 5
  marginStart: 5
  marginEnd: 5
  leftWidgets:
    - menu
    - workspaces
  centerWidgets:
    - clock
  rightWidgets:
    - timer
    - recordingIndicator
    - vpnIndicator
    - powerProfile
    - audioOut
    - audioIn
    - bluetooth
    - network
    - battery

leftBar:
  borderWidth: 2
  marginStart: 5
  marginBottom: 5
  marginTop: 6

barWidgets:
  widgetBorderRadius: 0

theme:
  name: nord
  colors:
    background: "#2e3440"
    foreground: "#d8dee9"
    primary: "#81a1c1"
    buttonPrimary: "#5e81ac"
    warning: "#BF616A"
    barBorder: "#81a1c1"
    windowBorder: "#d8dee9"
    alertBorder: "#81a1c1"
  windows:
    borderRadius: 0
```

## Example config 5

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/examples/rosepine.png)

```
icon: ""
iconOffset: 5
wallpaper:
  wallpaperDir: /home/john/workspace/Varda-Theme/themes/rosepine/wallpaper

frame:
  calendar:
    position: "right"

bottomBar:
  marginBottom: 5
  marginStart: 5
  marginEnd: 5
  leftWidgets:
    - menu
    - dock
  centerWidgets:
    - workspaces
  rightWidgets:
    - timer
    - recordingIndicator
    - vpnIndicator
    - clipboardManager
    - powerProfile
    - audioOut
    - audioIn
    - bluetooth
    - network
    - battery
    - clock

systemMenu:
  quickActions1:
    maxPerRow: 5
    actions:
      - bluetoothToggle
      - airplaneModeToggle
      - nightlightToggle
      - doNotDisturbToggle
      - colorPicker

theme:
  name: rosepine
  colors:
    background: "#191724"
    foreground: "#E0DEF4"
    primary: "#403D52"
    buttonPrimary: "#26233A"
    warning: "#EB6F92"
    barBorder: "#403D52"
    windowBorder: "#E0DEF4"
    alertBorder: "#403D52"
```

## Example config 6

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/examples/varda.png)

```
icon: ""
iconOffset: 3
wallpaper:
  wallpaperDir: /home/john/workspace/Varda-Theme/themes/varda/wallpaper

leftBar:
  topWidgets:
    - menu
    - workspaces
  centerWidgets:
    - dock
  bottomWidgets:
    - tray
    - clipboardManager
    - audioOut
    - audioIn
    - bluetooth
    - vpnIndicator
    - network
    - battery
    - clock

theme:
  name: varda
  colors:
    background: "#0C0E11"
    foreground: "#D0EBEE"
    primary: "#52677C"
    buttonPrimary: "#52677C"
    warning: "#733447"
    barBorder: "#52677C"
    windowBorder: "#D0EBEE"
    alertBorder: "#52677C"

```