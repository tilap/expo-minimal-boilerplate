import { useFeatureFlags } from "@contexts/config";
import { useT } from "@contexts/i18n/index";
import { useTheme } from "@contexts/theme";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@screens/Home";
import React, { lazy } from "react";
import { Dimensions } from "react-native";
import { enableScreens } from "react-native-screens";
import { AppStackParams, Routes } from "../routes";
import { NavbarHeadLeft } from "./NavbarHeadLeft";
import { NavbarHeadRightHome } from "./NavbarHeadRightHome";

const SettingsScreen = lazy(() =>
  import("@screens/Settings").then((module) => ({ default: module.SettingsScreen })),
);
const SettingsDarkmodeScreen = lazy(() =>
  import("@screens/SettingsDarkmode").then((module) => ({
    default: module.SettingsDarkmodeScreen,
  })),
);
const SettingsLocaleScreen = lazy(() =>
  import("@screens/SettingsLocale").then((module) => ({ default: module.SettingsLocaleScreen })),
);
const SettingsThemeVariantScreen = lazy(() =>
  import("@screens/SettingsThemeVariant").then((module) => ({
    default: module.SettingsThemeVariantScreen,
  })),
);
const PermissionRequiredScreen = lazy(() =>
  import("@screens/PermissionRequired").then((module) => ({
    default: module.PermissionRequiredScreen,
  })),
);
const LegalWebviewScreen = lazy(() =>
  import("@screens/LegalWebview").then((module) => ({
    default: module.LegalWebviewScreen,
  })),
);
const DebugConfigScreen = lazy(() =>
  import("@screens/DebugConfig").then((module) => ({
    default: module.DebugConfigScreen,
  })),
);
const DebugUiScreen = lazy(() =>
  import("@screens/DebugUi").then((module) => ({
    default: module.DebugUiScreen,
  })),
);
const AboutScreen = lazy(() =>
  import("@screens/About").then((module) => ({
    default: module.AboutScreen,
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
        component={HomeScreen}
        options={{
          headerTitle: t("screens.home.navigationTitle"),
          headerRight: NavbarHeadRightHome,
        }}
      />

      <Stack.Screen
        name={Routes.Settings}
        component={SettingsScreen}
        options={{
          headerTitle: t("screens.settings.navigationTitle"),
        }}
      />
      <Stack.Screen
        name={Routes.SettingsDarkmode}
        component={SettingsDarkmodeScreen}
        options={{
          headerTitle: t("screens.settingsDarkmode.navigationTitle"),
        }}
      />
      <Stack.Screen
        name={Routes.SettingsThemeVariant}
        component={SettingsThemeVariantScreen}
        options={{
          headerTitle: t("screens.settingsThemeVariant.navigationTitle"),
        }}
      />
      <Stack.Screen
        name={Routes.SettingsLocale}
        component={SettingsLocaleScreen}
        options={{
          headerTitle: t("screens.settingsLocale.navigationTitle"),
        }}
      />
      {featureFlags.debugScreen && (
        <Stack.Screen
          name={Routes.DebugConfig}
          component={DebugConfigScreen}
          options={{
            headerTitle: t("screens.debugConfig.navigationTitle"),
          }}
        />
      )}
      {featureFlags.debugScreen && (
        <Stack.Screen
          name={Routes.DebugUi}
          component={DebugUiScreen}
          options={{
            headerTitle: t("screens.debugUi.navigationTitle"),
          }}
        />
      )}
      {featureFlags.debugScreen && (
        <Stack.Screen
          name={Routes.PermissionRequired}
          component={PermissionRequiredScreen}
          options={{
            headerTitle: t("screens.permissionRequired.navigationTitle"),
          }}
        />
      )}
      <Stack.Screen
        name={Routes.About}
        component={AboutScreen}
        options={{
          headerTitle: t("screens.about.navigationTitle"),
        }}
      />
      <Stack.Screen name={Routes.LegalWebview} component={LegalWebviewScreen} />
    </Stack.Navigator>
  );
}

export default React.memo(AppStack);
