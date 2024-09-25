import config from "@config";
import { type DarkMode } from "@contexts/darkmode";
import { type Locale } from "@contexts/i18n";
import { type ThemeVariant } from "@contexts/theme";
import { createAsyncPersistStorage } from "@lib/zustand/createAsyncPersistStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferencesState = {
  initialized: boolean;
  darkMode: DarkMode | null;
  locale: Locale | null;
  themeVariant: ThemeVariant | null;
};

type PreferencesActions = {
  setDarkMode: (mode: DarkMode | null) => void;
  setLocale: (loc: Locale | null) => void;
  setThemeVariant: (v: ThemeVariant | null) => void;

  setInitialized: () => void;
};

const storage = createAsyncPersistStorage<PreferencesState>();

export const usePreferencesStore = create<PreferencesState & PreferencesActions>()(
  persist(
    (set) => ({
      initialized: false,
      darkMode: null,
      locale: null,
      themeVariant: null,
      uiExpandStats: true,
      setUiExpandStats: (expand: boolean) => set({ uiExpandStats: expand }),
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

export const usePreferences = (): Pick<
  PreferencesState,
  "darkMode" | "locale" | "themeVariant"
> => {
  return usePreferencesStore((store) => ({
    darkMode: store.darkMode,
    locale: store.locale,
    themeVariant: store.themeVariant,
  }));
};
