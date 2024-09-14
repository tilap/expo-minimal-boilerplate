import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useCallback } from "react";
import { AppStackParams, Routes } from "./routes";

export function useGoToSettings() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.Settings), [navigation]);
}

export function useGoToSettingsDarkmode() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.SettingsDarkmode), [navigation]);
}

export function useGoToSettingsLocale() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.SettingsLocale), [navigation]);
}

export function useGoToLegalWebview() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(
    (type: "privacy" | "terms") => navigation.navigate(Routes.LegalWebview, { type }),
    [navigation],
  );
}

export function useGoToAbout() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.About), [navigation]);
}

export function useGoToSettingsThemeVariant() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.SettingsThemeVariant), [navigation]);
}

export function useGoToDebug() {
  const navigation = useNavigation<StackNavigationProp<AppStackParams>>();
  return useCallback(() => navigation.navigate(Routes.Debug), [navigation]);
}
