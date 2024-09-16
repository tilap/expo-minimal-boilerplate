import { type DarkMode } from "@contexts/darkmode";
import { type Locale } from "@contexts/i18n";
import { type ThemeVariant } from "@contexts/theme";

import { OrientationLock } from "expo-screen-orientation";

const defaultDarkMode: DarkMode = "system";
const defaultLocale: Locale = "en";
const defaultThemeVariant: ThemeVariant = "stitch";

const config = {
  defaultLocale,
  defaultDarkMode,
  defaultThemeVariant,
  stores: {
    preferences: { name: "preferences-store" },
  },
  featureFlags: {
    debugScreen: process.env.NODE_ENV === "development",
  },
  ui: {
    lockScreenOrientation: OrientationLock.PORTRAIT_UP, // Changing it requires to update the `app.config.ts` > `orientation`
  },
  urls: {
    privacy: "https://unsplash.com/", // leave empty to hide the screen
    terms: "https://codepen.io/", // leave empty to hide the screen
  },
} as const;

export default config;

export type Config = typeof config;
