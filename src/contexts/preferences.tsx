import { type DarkMode, darkModes } from "@contexts/darkmode";
import { type Locale, locales } from "@contexts/i18n";
import { type ThemeVariant, themeVariants } from "@contexts/theme";
import { type IStorage } from "@lib/storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type StorageData = {
  locale: Context["locale"];
  darkMode: Context["darkMode"];
  themeVariant: Context["themeVariant"];
};

type Context = {
  darkMode: DarkMode | null;
  setDarkMode: (_mode: DarkMode) => void;
  locale: Locale | null;
  setLocale: (_loc: Locale) => void;
  themeVariant: ThemeVariant | null;
  setThemeVariant: (_v: ThemeVariant) => void;
  isLoading: boolean;
};

export const PreferencesContext = createContext<Context>({} as unknown as Context);

export function PreferencesProvider({
  children,
  storage,
}: React.PropsWithChildren<{ storage?: IStorage<StorageData> }>) {
  const [darkMode, _setDarkMode] = useState<DarkMode | null>(null);
  const [locale, _setLocale] = useState<Locale | null>(null);
  const [themeVariant, _setThemeVariant] = useState<ThemeVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setDarkMode = useCallback(
    (mode: string, update = true) => {
      const newMode = darkModes.includes(mode as DarkMode) ? (mode as DarkMode) : null;
      _setDarkMode(newMode);
      update && storage && storage.set({ locale, darkMode: newMode, themeVariant });
    },
    [locale, storage, themeVariant],
  );

  const setLocale = useCallback(
    (loc: string, update = true) => {
      const newLocale = locales.includes(loc as Locale) ? (loc as Locale) : null;
      _setLocale(newLocale);
      update && storage && storage.set({ locale: newLocale, darkMode, themeVariant });
    },
    [darkMode, storage, themeVariant],
  );

  const setThemeVariant = useCallback(
    (v: string, update = true) => {
      const newVariant = themeVariants.includes(v as ThemeVariant) ? (v as ThemeVariant) : null;
      _setThemeVariant(newVariant);
      update && storage && storage.set({ locale, darkMode, themeVariant: newVariant });
    },
    [darkMode, locale, storage],
  );

  useEffect(() => {
    if (storage) {
      storage
        .get()
        .then((store) => {
          if (store) {
            if (store.darkMode && typeof store.darkMode === "string") {
              setDarkMode(store.darkMode, false);
            }
            if (store.locale && typeof store.locale === "string") {
              setLocale(store.locale, false);
            }
            if (store.themeVariant && typeof store.themeVariant === "string") {
              setThemeVariant(store.themeVariant, false);
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [setDarkMode, setLocale, setThemeVariant, storage]);

  return (
    <PreferencesContext.Provider
      value={{ darkMode, setDarkMode, locale, setLocale, themeVariant, setThemeVariant, isLoading }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
