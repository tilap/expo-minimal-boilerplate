import React from "react";
import { ScrollView, type ScrollViewProps, StyleSheet, ViewStyle } from "react-native";
import { Box } from "./Box";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

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
    paddingBottom: 22,
  },
});

type Preset = keyof typeof presetStyles;

export function ScreenContainer({
  children,
  preset = "page",
  scrollViewProps,
  style,
}: React.PropsWithChildren<{
  preset?: Preset;
  scrollViewProps?: ScrollViewProps;
  style?: ViewStyle | ViewStyle[];
}>) {
  return (
    <ScrollView contentContainerStyle={styles.scrollView} {...scrollViewProps}>
      <Box style={[presetStyles[preset], style]}>{children}</Box>
    </ScrollView>
  );
}
