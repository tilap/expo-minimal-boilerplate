import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { Box } from "./Box";

const presetStyles = StyleSheet.create({
  page: {
    display: "flex",
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 3 * 4,
    paddingVertical: 5 * 4,
  },
  full: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
  },
});

export function ScreenContainer({
  children,
  preset = "full",
  style,
}: React.PropsWithChildren<{
  preset?: keyof typeof presetStyles;
  style?: ViewStyle | ViewStyle[];
}>) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box style={[presetStyles[preset], style]}>{children}</Box>
    </SafeAreaView>
  );
}
