import { type DarkMode } from "@contexts/darkmode";
import { type Locale } from "@contexts/i18n";
import { type ThemeVariant } from "@contexts/theme";
import { Storage } from "@lib/storage";

type StorageData = {
  locale: Locale | null;
  darkMode: DarkMode | null;
  themeVariant: ThemeVariant | null;
};

export const preferencesStorage = new Storage<StorageData>("Preferences");
