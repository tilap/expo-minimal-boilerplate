import { type DarkMode, darkModes } from "@contexts/darkmode";
import { type Locale, locales } from "@contexts/i18n";
import { type ThemeVariant, themeVariants } from "@contexts/theme";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

interface IStorage<T> {
  get(): Promise<T | null>;
  set(_data: T): Promise<boolean>;
}

type StorageData = {
  locale: Context["locale"];
  darkMode: Context["darkMode"];
  themeVariant: Context["themeVariant"];
};

type PreferencesState = {
  darkMode: DarkMode | null;
  locale: Locale | null;
  themeVariant: ThemeVariant | null;
};

type Context = PreferencesState & {
  setDarkMode: (mode: DarkMode) => void;
  setLocale: (loc: Locale) => void;
  setThemeVariant: (v: ThemeVariant) => void;
  isLoading: boolean;
};

export const PreferencesContext = createContext<Context>({} as unknown as Context);

export function PreferencesProvider({
  children,
  storage,
}: React.PropsWithChildren<{ storage?: IStorage<StorageData> }>) {
  const [preferences, setPreferences] = useState<PreferencesState>({
    darkMode: null,
    locale: null,
    themeVariant: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const updatePreferences = useCallback(
    (newPrefs: Partial<PreferencesState>) => {
      setPreferences((prev) => {
        const updatedPreferences = { ...prev, ...newPrefs };
        if (storage) {
          storage.set(updatedPreferences);
        }
        return updatedPreferences;
      });
    },
    [storage],
  );

  const setDarkMode = (mode: string) => {
    const newMode = darkModes.includes(mode as DarkMode) ? (mode as DarkMode) : null;
    updatePreferences({ darkMode: newMode });
  };

  const setLocale = (loc: string) => {
    const newLocale = locales.includes(loc as Locale) ? (loc as Locale) : null;
    updatePreferences({ locale: newLocale });
  };

  const setThemeVariant = (v: string) => {
    const newVariant = themeVariants.includes(v as ThemeVariant) ? (v as ThemeVariant) : null;
    updatePreferences({ themeVariant: newVariant });
  };

  useEffect(() => {
    if (storage) {
      storage.get().then((store) => {
        if (store) {
          updatePreferences({
            darkMode: store.darkMode || null,
            locale: store.locale || null,
            themeVariant: store.themeVariant || null,
          });
        }
        setIsLoading(false);
      });
    }
  }, [storage, updatePreferences]);

  return (
    <PreferencesContext.Provider
      value={{
        ...preferences,
        setDarkMode,
        setLocale,
        setThemeVariant,
        isLoading,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
