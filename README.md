# `@expo/ui` BottomSheet: content can't scroll under the Android navigation bar

Minimal reproduction for `@expo/ui` 58.0.29 (Expo SDK 58), Android, edge-to-edge.

## Steps

1. `npm install`
2. `npx expo run:android`
3. Tap **Open sheet**, drag the sheet up to expand it, and scroll the list.

## Expected

The rows scroll under the navigation bar, as content does in the rest of an
edge-to-edge app, and the list can pad its own end with the bottom inset.

## Actual

When the sheet is expanded, the list stops above the navigation bar
(on a 1080×2400 screen with 3-button navigation, the `ScrollView` ends at
y=2274), and a strip of the sheet's container colour (orange here) sits under it. When the sheet is
partially expanded, the list does reach the bottom of the screen.

Material3's `ModalBottomSheet` pads its content with `contentWindowInsets`,
which defaults to `BottomSheetDefaults.windowInsets` (the system bars and the
display cutout). `ModalBottomSheetView.kt` doesn't pass `contentWindowInsets`, and
neither `ModalBottomSheet` from `@expo/ui/jetpack-compose` nor the community
`BottomSheet` lets you change it. The `modifiers` prop can't change it either,
because it is a parameter of `ModalBottomSheet`, not a modifier.

Before:

![before](media/before-3-button.gif)

After, with `contentWindowInsets={{ top: StatusBar.currentHeight }}` from the
proposed fix and the list padding its own end:

![after](media/after-3-button.gif)
