# Usage

---

### Starting the panel

```
okpanel run
```

---

### Stopping the panel

```
okpanel quit
```

---

### Toggling the app launcher

Bind this command to whatever keybind you want

```
okpanel launcher
```

---

### Taking a screenshot or recording the screen

```
okpanel screenshot
```

To stop screen recording, open the screenshot tool again and click stop, or click the recording button that appears in your bar if you enabled it.

---

### Toggling the menu

```
okpanel menu
```

---

### Toggling notification history

```
okpanel notifications
```

---

### Toggling the clipboard manager

```
okpanel clipboard
```

---

### Toggling the calendar

```
okpanel calendar
```

---

### Close all opened menus

This will close the menu, notifications, calendar, app launcher, clipboard manager, screenshot tool, and screenshare tool

```
okpanel closeAll
```

---

### Changing volume

If you want your system to make a clicking sound when adjusting volume, bind these.  It is not required though.

```
okpanel volume-up
okpanel volume-down
okpanel mute
```

---

### Using the Hyprland share picker for [XDPH](https://wiki.hyprland.org/Hypr-Ecosystem/xdg-desktop-portal-hyprland/)

Create the file `xdph.conf` in your `~/.config/hypr/` directory and apply this config

```
screencopy {
    custom_picker_binary = okpanel-share
}
```

### Updating a custom bar widget's label

```
okpanel custom <n> <string>
```

---
