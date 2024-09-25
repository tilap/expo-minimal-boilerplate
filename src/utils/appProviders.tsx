import config from "@config";
import { AppLoaderProvider } from "@contexts/app-loader";
import { ConfigProvider } from "@contexts/config";
import { DarkmodeContext, DarkmodeProvider } from "@contexts/darkmode";
import { type Locale, locales } from "@contexts/i18n";
import { I18nProvider } from "@contexts/i18n";
import { ThemeProvider } from "@contexts/theme";
import { useCorePreferences } from "@utils/stores/preferences";
import * as Localization from "expo-localization";
import React from "react";

const deviceLanguage = Localization.getLocales()?.[0]?.languageCode as unknown as Locale;

export function AppProviders({ children }: React.PropsWithChildren) {
  const preferences = useCorePreferences();
  return (
    <ConfigProvider config={config}>
      <AppLoaderProvider forceLoadingState={!preferences.initialized}>
        <I18nProvider
          defaultLocale={locales.includes(deviceLanguage) ? deviceLanguage : config.defaultLocale}
          initialLocale={preferences.locale}
          onLocaleChange={preferences.setLocale}
        >
          <DarkmodeProvider
            defaultMode={config.defaultDarkMode}
            initialMode={preferences.darkMode}
            onDarkmodeChange={preferences.setDarkMode}
          >
            <DarkmodeContext.Consumer>
              {({ resolvedDarkMode }) => (
                <ThemeProvider
                  darkMode={resolvedDarkMode}
                  defaultThemeVariant={config.defaultThemeVariant}
                  initialThemeVariant={preferences.themeVariant}
                  onThemeVariantChange={preferences.setThemeVariant}
                >
                  {children}
                </ThemeProvider>
              )}
            </DarkmodeContext.Consumer>
          </DarkmodeProvider>
        </I18nProvider>
      </AppLoaderProvider>
    </ConfigProvider>
  );
}
