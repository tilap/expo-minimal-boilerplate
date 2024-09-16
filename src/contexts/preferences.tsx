import { type DarkMode } from "@contexts/darkmode";
import { type Locale } from "@contexts/i18n";
import { type ThemeVariant } from "@contexts/theme";
import React, { createContext, useContext } from "react";

type Store = {
  darkMode: DarkMode | null;
  locale: Locale | null;
  themeVariant: ThemeVariant | null;
  loading: boolean;
  setDarkMode: (mode: DarkMode | null) => void;
  setLocale: (loc: Locale | null) => void;
  setThemeVariant: (v: ThemeVariant | null) => void;
};

type Context = Store;

export const PreferencesContext = createContext<Context>({} as unknown as Context);

export function PreferencesProvider({
  children,
  store,
}: React.PropsWithChildren<{
  store: Store;
}>) {
  const { ...context } = store;

  return <PreferencesContext.Provider value={context}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  return useContext(PreferencesContext);
}
