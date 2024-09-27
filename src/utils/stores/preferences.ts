import config from "@config";
import { type DarkMode } from "@contexts/darkmode";
import { type Locale } from "@contexts/i18n";
import { type ThemeVariant } from "@contexts/theme";
import { createAsyncPersistStorage } from "@lib/zustand/createAsyncPersistStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferencesState = {
  darkMode: DarkMode | null;
  locale: Locale | null;
  themeVariant: ThemeVariant | null;

  initialized: boolean;
};

type PreferencesActions = {
  setDarkMode: (mode: DarkMode | null) => void;
  setLocale: (loc: Locale | null) => void;
  setThemeVariant: (v: ThemeVariant | null) => void;

  setInitialized: () => void;
};

const storage = createAsyncPersistStorage<PreferencesState>();

const usePreferencesStore = create<PreferencesState & PreferencesActions>()(
  persist(
    (set) => ({
      initialized: false,
      darkMode: null,
      locale: null,
      themeVariant: null,
      setDarkMode: (darkMode: DarkMode) => set({ darkMode }),
      setLocale: (locale: Locale) => set({ locale }),
      setThemeVariant: (v: ThemeVariant | null) => set({ themeVariant: v }),
      setInitialized: () => set({ initialized: true }),
    }),
    {
      name: config.stores.preferences.name,
      storage,
      onRehydrateStorage: (state) => {
        return (newState) => {
          if (state && newState) {
            newState.setInitialized();
          }
          return newState;
        };
      },
    },
  ),
);

export const useCorePreferences = (): Pick<
  PreferencesState,
  "darkMode" | "locale" | "themeVariant" | "initialized"
> &
  Pick<PreferencesActions, "setDarkMode" | "setLocale" | "setThemeVariant"> => {
  const store = usePreferencesStore();
  return {
    darkMode: store.darkMode,
    initialized: store.initialized,
    locale: store.locale,
    themeVariant: store.themeVariant,
    setDarkMode: store.setDarkMode,
    setLocale: store.setLocale,
    setThemeVariant: store.setThemeVariant,
  };
};
