import { localeValues, localeValuesWithFlags, themeValues } from "./shared";

const darkmodeValues = {
  dark: "Enabled",
  light: "Disabled",
  system: "System",
};

export const dictionary = {
  navigation: {
    headerBackTitle: "Back",
  },
  screens: {
    about: {
      navigationTitle: "About",
      entries: {
        version: { label: "Version" },
        privacy: { label: "Privacy policy" },
        terms: { label: "Terms and conditions" },
        debug: { label: "Debug" },
      },
    },
    debug: {
      navigationTitle: "Debug",
    },
    home: {
      navigationTitle: "Home",
    },
    legalWebview: {
      privacy: {
        title: "Privacy",
      },
      terms: {
        title: "Terms and conditions",
      },
      loading: "Loading...",
      error: "Unable to open the webpage",
    },
    settings: {
      navigationTitle: "Preferences",
      entries: {
        darkmode: {
          label: "Dark mode",
          values: darkmodeValues,
        },
        locale: {
          label: "Language",
          values: localeValues,
        },
        themeVariant: {
          label: "Theme",
          values: themeValues,
        },
        about: { label: "About" },
        resetPreferences: {
          label: "Reset all your preferences",
          confirm: {
            title: "Reset preferences",
            message: "Are you sure you want to reset all your preferences?",
            confirmLabel: "Reset",
            cancelLabel: "Cancel",
          },
        },
      },
      acknoledgement:
        "Your preferences will be saved on this device only, but will be reset if you reinstall the app.",
    },
    settingsDarkmode: {
      navigationTitle: "Dark mode",
      options: darkmodeValues,
      acknowledgement:
        "If you choose automatic, the mode will adjust based on your device settings.",
    },
    settingsLocale: {
      navigationTitle: "Language",
      options: localeValuesWithFlags,
    },
    settingsThemeVariant: {
      navigationTitle: "Theme",
      options: themeValues,
    },
  },
};

export type Dictionary = typeof dictionary;
