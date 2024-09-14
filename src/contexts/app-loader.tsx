import MontserratFont from "@assets/font";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";

SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export function AppLoaderProvider({
  children,
  forceLoadingState,
}: React.PropsWithChildren<{ forceLoadingState?: boolean }>) {
  const [fontsLoaded, fontError] = useFonts(MontserratFont);

  const onLayoutRootView = useCallback(() => {
    if (forceLoadingState) {
      return;
    }
    if (fontError) {
      console.error("Error loading fonts", fontError);
      SplashScreen.hideAsync();
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError, forceLoadingState]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.root}>
      {children}
    </View>
  );
}
