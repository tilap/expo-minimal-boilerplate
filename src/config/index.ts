import { type DarkMode } from "@contexts/darkmode";
import { type Locale } from "@contexts/i18n";
import { type ThemeVariant } from "@contexts/theme";
import { DeviceType, deviceType } from "expo-device";
import { OrientationLock } from "expo-screen-orientation";
import { Platform } from "react-native";

const defaultDarkMode: DarkMode = "system";
const defaultLocale: Locale = "en";
const defaultThemeVariant: ThemeVariant = "stitch";

const castEnvToBoolean = (value: string | undefined): boolean => {
  if (!value) return false;
  return value.toLowerCase() === "true";
};

const config = {
  defaultLocale,
  defaultDarkMode,
  defaultThemeVariant,
  stores: {
    preferences: { name: `preferences-store-${process.env.EXPO_PUBLIC_STORES_KEY}` },
  },
  featureFlags: {
    debugScreen: castEnvToBoolean(process.env.EXPO_PUBLIC_FEATURE_DEBUG_SCREEN),
    resetPreferences: castEnvToBoolean(process.env.EXPO_PUBLIC_FEATURE_RESET_PREFERENCES),
    shareApp: castEnvToBoolean(process.env.EXPO_PUBLIC_FEATURE_SHARE_APP),
    rateApp: castEnvToBoolean(process.env.EXPO_PUBLIC_FEATURE_RATE_APP),
  },
  Platform: {
    OS: Platform.OS,
  },
  Device: {
    deviceType,
    DeviceType,
  },
  ui: {
    lockScreenOrientation: OrientationLock.PORTRAIT_UP, // Changing it requires to update the `app.config.ts` > `orientation`
  },
  urls: {
    privacy: process.env.EXPO_PUBLIC_URL_PRIVACY || "", // leave empty to hide the screen
    terms: process.env.EXPO_PUBLIC_URL_TERMS || "", // leave empty to hide the screen
    shareApp: process.env.EXPO_PUBLIC_SHARE_APP_URL || "", // leave empty will disable the share button
    rateApp: process.env.EXPO_PUBLIC_RATE_APP_URL || "", // leave empty will disable the rate button
  },
  feedbackEmail: process.env.EXPO_PUBLIC_FEEDBACK_EMAIL || "", // leave empty will disable the feedback button
} as const;

export default config;

export type Config = typeof config;
