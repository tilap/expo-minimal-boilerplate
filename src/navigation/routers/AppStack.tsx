import { useFeatureFlags } from "@contexts/config";
import { useT } from "@contexts/i18n/index";
import { useTheme } from "@contexts/theme";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { Home } from "@screens/Home";
import React, { lazy } from "react";
import { Dimensions } from "react-native";
import { enableScreens } from "react-native-screens";
import { AppStackParams, Routes } from "../routes";
import { NavbarHeadLeft } from "./NavbarHeadLeft";
import { NavbarHeadRightHome } from "./NavbarHeadRightHome";

const Settings = lazy(() =>
  import("@screens/Settings").then((module) => ({ default: module.Settings })),
);
const SettingsDarkmode = lazy(() =>
  import("@screens/SettingsDarkmode").then((module) => ({ default: module.SettingsDarkmode })),
);
const SettingsLocale = lazy(() =>
  import("@screens/SettingsLocale").then((module) => ({ default: module.SettingsLocale })),
);
const SettingsThemeVariant = lazy(() =>
  import("@screens/SettingsThemeVariant").then((module) => ({
    default: module.SettingsThemeVariant,
  })),
);
const PermissionRequired = lazy(() =>
  import("@screens/PermissionRequired").then((module) => ({
    default: module.PermissionRequired,
  })),
);
const LegalWebview = lazy(() =>
  import("@screens/LegalWebview").then((module) => ({
    default: module.LegalWebview,
  })),
);
const DebugConfig = lazy(() =>
  import("@screens/DebugConfig").then((module) => ({
    default: module.DebugConfig,
  })),
);
const About = lazy(() =>
  import("@screens/About").then((module) => ({
    default: module.About,
  })),
);

enableScreens();

const Stack = createStackNavigator<AppStackParams>();

function AppStack() {
  const t = useT();
  const theme = useTheme();
  const featureFlags = useFeatureFlags();

  return (
    <Stack.Navigator
      initialRouteName={Routes.Home}
      screenOptions={{
        gestureEnabled: true,
        gestureResponseDistance: Dimensions.get("screen").width,
        headerShown: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerLeft: NavbarHeadLeft,
        ...theme.screenOptions,
      }}
    >
      <Stack.Screen
        name={Routes.Home}
        component={Home}
        options={{
          headerTitle: t("screens.home.navigationTitle"),
          headerRight: NavbarHeadRightHome,
        }}
      />

      <Stack.Screen
        name={Routes.Settings}
        component={Settings}
        options={{
          headerTitle: t("screens.settings.navigationTitle"),
        }}
      />
      <Stack.Screen
        name={Routes.SettingsDarkmode}
        component={SettingsDarkmode}
        options={{
          headerTitle: t("screens.settingsDarkmode.navigationTitle"),
        }}
      />
      <Stack.Screen
        name={Routes.SettingsThemeVariant}
        component={SettingsThemeVariant}
        options={{
          headerTitle: t("screens.settingsThemeVariant.navigationTitle"),
        }}
      />
      <Stack.Screen
        name={Routes.SettingsLocale}
        component={SettingsLocale}
        options={{
          headerTitle: t("screens.settingsLocale.navigationTitle"),
        }}
      />
      {featureFlags.debugScreen && (
        <Stack.Screen
          name={Routes.DebugConfig}
          component={DebugConfig}
          options={{
            headerTitle: t("screens.debugConfig.navigationTitle"),
          }}
        />
      )}
      {featureFlags.debugScreen && (
        <Stack.Screen
          name={Routes.PermissionRequired}
          component={PermissionRequired}
          options={{
            headerTitle: t("screens.permissionRequired.navigationTitle"),
          }}
        />
      )}
      <Stack.Screen
        name={Routes.About}
        component={About}
        options={{
          headerTitle: t("screens.about.navigationTitle"),
        }}
      />
      <Stack.Screen name={Routes.LegalWebview} component={LegalWebview} />
    </Stack.Navigator>
  );
}

export default React.memo(AppStack);
