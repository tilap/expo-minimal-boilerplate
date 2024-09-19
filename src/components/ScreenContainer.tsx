import React from "react";
import { SafeAreaView, StyleSheet, ViewStyle } from "react-native";
import { Box } from "./Box";
import { ExtendedScrollView } from "./ExtendedScrollView";

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
  withScrollView = false,
}: React.PropsWithChildren<{
  preset?: keyof typeof presetStyles;
  style?: ViewStyle | ViewStyle[];
  withScrollView?: boolean;
}>) {
  const content = <Box style={[presetStyles[preset], style]}>{children}</Box>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {withScrollView ? <ExtendedScrollView fullWidth>{content}</ExtendedScrollView> : content}
    </SafeAreaView>
  );
}
