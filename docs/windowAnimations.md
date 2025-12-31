# Window Animations and Blur

Animations and blur can be controlled via hyprland layer rules.
You can read about layer rules [here](https://wiki.hyprland.org/Configuring/Window-Rules/#layer-rules) and 
animations [here](https://wiki.hyprland.org/Configuring/Animations/#general)

You can also [change the way the blur looks](https://wiki.hyprland.org/Configuring/Variables/#blur).

## Window namespaces

These are the namespace names of the available windows and bars.

```
okpanel-frame
okpanel-notifications
okpanel-alerts
```

## Example rule set

```
layerrule {
  name = layerrule-1
  blur = on
  ignore_alpha = 0
  match:namespace = okpanel-frame
}

layerrule {
  name = layerrule-2
  blur = on
  ignore_alpha = 0
  match:namespace = okpanel-notifications
}

layerrule {
  name = layerrule-3
  blur = on
  ignore_alpha = 0
  animation = slide left
  match:namespace = okpanel-alerts
}

```
