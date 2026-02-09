# Installation

This project is quite usable, but still in a pre-release state.  There may be breaking changes as development continues and dependencies may change.

## Arch

---

### AUR package

```
yay -Syu --devel okpanel-git
```

---

### Manual

Install dependencies    

```
yay -Syu --devel aylurs-gtk-shell-git \
bluez \
bluez-utils \
brightnessctl \
cava \
cliphist \
dart-sass \
go-yq \
grim \
gvfs \
hyprland \
hyprpicker \
hyprsunset \
jq \
libnotify \
networkmanager \
pipewire-pulse \
power-profiles-daemon \
slurp \
sox \
ttf-jetbrains-mono-nerd \
upower \
wf-recorder \
wireplumber \
wl-clipboard 
```

Checkout the git repository

```
git checkout git@github.com:JohnOberhauser/OkPanel.git
```

Then run the install.sh file
```
./install.sh
```

To uninstall, run the uninstall.sh file

```
./uninstall.sh
```

## Using without installation

You can run the project without installing if you wish.  This is good for dev work.  Just use the bins in the 
`bin` directory.  Note that if you have okpanel installed and try to run the bin from the checked out project,
the installed version will run.  So make sure you uninstall first.

```
git checkout git@github.com:JohnOberhauser/OkPanel.git
cd OkPanel/bin
./okpanel run
```
