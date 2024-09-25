import { useResetDarkmode } from "@contexts/darkmode";
import { useResetLocale } from "@contexts/i18n";
import { useResetThemeVariant } from "@contexts/theme";
import { useCallback } from "react";

export function useResetPreferences() {
  const resetLocale = useResetLocale();
  const resetThemeVariant = useResetThemeVariant();
  const resetDarkMode = useResetDarkmode();

  const resetPreferences = useCallback(() => {
    resetLocale();
    resetThemeVariant();
    resetDarkMode();
  }, [resetLocale, resetThemeVariant, resetDarkMode]);

  return resetPreferences;
}
