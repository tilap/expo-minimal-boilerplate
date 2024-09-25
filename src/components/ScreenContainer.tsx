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
  fullWithPadding: {
    display: "flex",
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 4 * 4,
    paddingVertical: 3 * 4,
  },
});

export type ScreenContainerProps = React.PropsWithChildren<{
  preset?: keyof typeof presetStyles;
  style?: ViewStyle | ViewStyle[];
  withScrollView?: boolean;
}>;
export function ScreenContainer({
  children,
  preset = "full",
  style,
  withScrollView = false,
}: ScreenContainerProps) {
  const content = <Box style={[presetStyles[preset], style]}>{children}</Box>;
  return (
    <SafeAreaView style={styles.container}>
      {withScrollView ? <ExtendedScrollView fullWidth>{content}</ExtendedScrollView> : content}
    </SafeAreaView>
  );
}
