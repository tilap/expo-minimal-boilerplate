import config from "@config";
import { DarkmodeContext, DarkmodeProvider } from "@contexts/darkmode";
import { type Locale, locales } from "@contexts/i18n";
import { ThemeProvider } from "@contexts/theme";
import { preferencesStorage } from "@utils/storages/preferences";
import * as Localization from "expo-localization";
import React from "react";
import { AppLoaderProvider } from "../contexts/app-loader";
import { ConfigProvider } from "../contexts/config";
import { I18nProvider } from "../contexts/i18n";
import { PreferencesContext, PreferencesProvider } from "../contexts/preferences";

const deviceLanguage = Localization.getLocales()?.[0]?.languageCode as unknown as Locale;

export function AppProviders({ children }: React.PropsWithChildren) {
  return (
    <ConfigProvider config={config}>
      <PreferencesProvider storage={preferencesStorage}>
        <PreferencesContext.Consumer>
          {(preferences) => {
            return (
              <AppLoaderProvider forceLoadingState={preferences.isLoading}>
                <I18nProvider
                  defaultLocale={
                    locales.includes(deviceLanguage) ? deviceLanguage : config.defaultLocale
                  }
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
            );
          }}
        </PreferencesContext.Consumer>
      </PreferencesProvider>
    </ConfigProvider>
  );
}
