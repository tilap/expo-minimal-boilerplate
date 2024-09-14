export enum Routes {
  About = "About",
  App = "App",
  Debug = "Debug",
  Home = "Home",
  LegalWebview = "LegalWebview",
  PermissionsRequired = "PermissionsRequired",
  Settings = "Settings",
  SettingsDarkmode = "SettingsDarkmode",
  SettingsLocale = "SettingsLocale",
  SettingsThemeVariant = "SettingsThemeVariant",
}

type LegalWebviewType = "privacy" | "terms";

export type RootStackParams = {
  [Routes.App]: undefined;
  [Routes.PermissionsRequired]: undefined;
};

export type AppStackParams = {
  [Routes.About]: undefined;
  [Routes.Debug]: undefined;
  [Routes.Home]: undefined;
  [Routes.LegalWebview]: { type: LegalWebviewType };
  [Routes.Settings]: undefined;
  [Routes.SettingsDarkmode]: undefined;
  [Routes.SettingsLocale]: undefined;
  [Routes.SettingsThemeVariant]: undefined;
};
