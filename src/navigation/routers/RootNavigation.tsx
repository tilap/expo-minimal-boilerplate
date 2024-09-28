import { useTheme } from "@contexts/theme";
import { NavigationContainer } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { enableScreens } from "react-native-screens";
import { merge } from "ts-deepmerge";
import { defaultConfig } from "../config";
import { RootStackParams, Routes } from "../routes";
import AppStack from "./AppStack";

enableScreens();

const Stack = createStackNavigator<RootStackParams>();

export function RootNavigation() {
  const theme = useTheme();

  return (
    <NavigationContainer theme={theme.navigation}>
      <Stack.Navigator
        initialRouteName={Routes.App}
        screenOptions={{
          ...merge(defaultConfig, theme.screenOptions),
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <Stack.Screen
          name={Routes.App}
          component={AppStack}
          options={{
            gestureEnabled: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
