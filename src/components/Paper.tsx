import { Theme, useThemedStyles } from "@contexts/theme";
import { withBoxStyle } from "@utils/ui/boxStyles/hoc";
import { withShadowStyle } from "@utils/ui/shadowStyles/hoc";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Box } from "./Box";

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      borderRadius: theme.rounded.base,
      width: "100%",
    },
    withBackground: {
      backgroundColor: theme.components.Paper.backgroundColor,
    },
  });

export type PaperProps = {
  noBackground?: boolean;
  style?: ViewStyle;
};

export const Paper = withShadowStyle(
  withBoxStyle(({ children, noBackground, style }: React.PropsWithChildren<PaperProps>) => {
    const themedStyles = useThemedStyles<typeof styles>(styles);
    return (
      <Box style={[themedStyles.root, !noBackground && themedStyles.withBackground, style]}>
        {children}
      </Box>
    );
  }),
);

export const Demo = () => (
  /* eslint-disable react-native/no-inline-styles -- demo purpose */
  <View style={{ gap: 24, marginLeft: 24, marginRight: 24 }}>
    <Paper style={{ height: 80, width: "100%" }} shadow="low" />
    <Paper style={{ height: 80, width: "100%" }} shadow="base" />
    <Paper style={{ height: 80, width: "100%" }} shadow="high" />
  </View>
  /* eslint-enable react-native/no-inline-styles -- demo purpose */
);
