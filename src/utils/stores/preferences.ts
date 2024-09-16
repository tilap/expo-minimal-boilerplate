import config from "@config";
import { type DarkMode } from "@contexts/darkmode";
import { type Locale } from "@contexts/i18n";
import { type ThemeVariant } from "@contexts/theme";
import { createAsyncPersistStorage } from "@lib/zustand/createAsyncPersistStorage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type PreferencesState = {
  loading: boolean;

  darkMode: DarkMode | null;
  locale: Locale | null;
  themeVariant: ThemeVariant | null;

  setLoading: (loading: boolean) => void;
  setDarkMode: (mode: DarkMode | null) => void;
  setLocale: (loc: Locale | null) => void;
  setThemeVariant: (v: ThemeVariant | null) => void;

  getPreferences: () => {
    darkMode: DarkMode | null;
    locale: Locale | null;
    themeVariant: ThemeVariant | null;
  };
};

const storage = createAsyncPersistStorage<PreferencesState>();

export const usePreferencesStore = create<PreferencesState>()(
  persist<PreferencesState>(
    (set, get) => ({
      darkMode: null,
      locale: null,
      themeVariant: null,
      loading: true,
      setLoading: (loading: boolean) => set({ loading }),
      setDarkMode: (darkMode: DarkMode) => set({ darkMode }),
      setLocale: (locale: Locale) => set({ locale }),
      setThemeVariant: (v: ThemeVariant | null) => set({ themeVariant: v }),
      getPreferences: () => ({
        darkMode: get().darkMode,
        locale: get().locale,
        themeVariant: get().themeVariant,
      }),
    }),
    {
      name: config.stores.preferences.name,
      storage,
      onRehydrateStorage: (state) => (newState) => {
        if (state) {
          newState?.setLoading(false);
        }
      },
    },
  ),
);
