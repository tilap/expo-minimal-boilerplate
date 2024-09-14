import { useFeatureFlags } from "@contexts/config";
import { useT } from "@contexts/i18n/index";
import { useTheme } from "@contexts/theme";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { About } from "@screens/About";
import { Debug } from "@screens/Debug";
import { Home } from "@screens/Home";
import { LegalWebview } from "@screens/LegalWebview";
import { Settings } from "@screens/Settings";
import { SettingsDarkmode } from "@screens/SettingsDarkmode";
import { SettingsLocale } from "@screens/SettingsLocale";
import { SettingsThemeVariant } from "@screens/SettingsThemeVariant";
import React from "react";
import { Dimensions } from "react-native";
import { enableScreens } from "react-native-screens";
import { AppStackParams, Routes } from "../routes";
import { NavbarHeadLeft } from "./NavbarHeadLeft";
import { NavbarHeadRightHome } from "./NavbarHeadRightHome";

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
          name={Routes.Debug}
          component={Debug}
          options={{
            headerTitle: t("screens.debug.navigationTitle"),
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
