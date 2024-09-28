import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { Box } from "./Box";
import { ExtendedScrollView } from "./ExtendedScrollView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const presetStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preset: {
    display: "flex",
    flex: 1,
    width: "100%",
  },
  fullPreset: {
    height: "100%",
  },
  pagePreset: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  withPadding: {
    padding: 4 * 4,
  },
});

type Preset = "page" | "full";

export type ScreenContainerProps = React.PropsWithChildren<{
  preset?: Preset;
  style?: ViewStyle | ViewStyle[];
  disablePadding?: boolean;
  withScrollView?: boolean;
}>;

export function ScreenContainer({
  children,
  preset = "full",
  style,
  disablePadding,
  withScrollView,
}: ScreenContainerProps) {
  const content = (
    <Box
      style={[presetStyles[`${preset}Preset`], !disablePadding && presetStyles.withPadding, style]}
    >
      {children}
    </Box>
  );
  return (
    <SafeAreaView style={styles.container}>
      {withScrollView ? <ExtendedScrollView fullWidth>{content}</ExtendedScrollView> : content}
    </SafeAreaView>
  );
}
