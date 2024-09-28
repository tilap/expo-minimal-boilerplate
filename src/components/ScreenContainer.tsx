import { type Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { Box } from "./Box";
import { ExtendedScrollView } from "./ExtendedScrollView";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
const presetStyles = (theme: Theme) =>
  StyleSheet.create({
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
      padding: theme.spacings.screen,
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
  const presetThemedStyles = useThemedStyles(presetStyles);
  const content = (
    <Box
      style={[
        presetThemedStyles[`${preset}Preset`],
        !disablePadding && presetThemedStyles.withPadding,
        style,
      ]}
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
