# Features

## Bar and Frame

Bars can be configured with various widgets.  The frame can be hidden if you would rather have a normal bar.  You can have a top, bottom, right and/or left bar.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/examples/simple_frame.png)

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/examples/simple_bar.png)


## System Menu

### Network management

In the network section you can connect and disconnect from Wi-Fi and VPNs.  For a VPN connection to show up
it must be added to network manager.  Wireguard and OpenVPN connections will show.  You can add wireguard
connections by clicking the "Add Wireguard VPN" button and selecting your wireguard conf file.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/network.png)

---

### Bluetooth device management

Scan and connect to bluetooth devices.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/bluetooth.png)

---

### Audio controls

In the audio section you can adjust the volume sliders or click the icon button to mute.
You can swap the default input/output.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/audio.png)

---

### Power profiles

Change the current power profile.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/power_saver.png)

---

### Look and Feel controls for theme, bar position, and wallpaper

Here you can switch between predefined themes.  The `themeUpdateScript` will be called
when switching themes.  The theme name you defined will be the first argument passed to the script.

You can choose your wallpaper.  The wallpapers listed here are the ones found in the
directory defined in the theme's config.  JPG and PNGs in that directory will show up.
When selecting a wallpaper, the `wallpaperUpdateScript` will be called with the wallpaper
path as the argument.  That update script is in charge of setting the wallpaper with whatever
wallpaper program you use.

OkPanel will remember which wallpaper you last selected for each configured theme.  When
switching themes, the `wallpaperUpdateScript` will be called as well.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/look_and_feel.png)

---

### Mpris media controls

Mpris controls will show up when available.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/menu.png)

---

### Notification popups and history

To enter "Do not disturb" mode, click the notification bell icon.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/notifications.png)

---

## Screenshot and screen recording tool

The `okpanel screenshot` command must be key-bound for this to show up.

When screen recording, you can set your encoding speed and CRF.  CRF will impact
quality and file size.  Choose a higher number (further down the list) for a lower
quality and smaller file size.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/screenshot.png)

---

## App launcher

The `okpanel launcher` command must be key-bound for this to show up.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/app_launcher.png)

---

## Calendar

Click the Clock widget in the bar to show the calendar.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/calendar.png)

---

## Clipboard Manager

Click the Clipboard widget in the bar to show the clipboard manager.  The manager is backed by `cliphist`.  
Cliphist will only run if the clipboard manager widget is added to the bar.  Sensitive information like
passwords, api keys, private keys, etc should be filtered out.  Check the [script](https://github.com/JohnOberhauser/OkPanel/blob/main/ags/shellScripts/cliphistStore.sh)
or disable the widget if you have concerns.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/clipboard.png)

## Volume and brightness OSD

The OSD shows automatically when changing volume or brightness.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/osd.png)

---

## Screen share portal

The screen share portal only works with Hyprland's XDPH.  See the usage page for more info.

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/screenshare.png)

## Lock screen

Set the hyprland config

```
misc:session_lock_xray = true
```

for a better locking animation

![screenshot](https://raw.githubusercontent.com/JohnOberhauser/OkPanelScreenshots/refs/heads/main/lock_screen.png)