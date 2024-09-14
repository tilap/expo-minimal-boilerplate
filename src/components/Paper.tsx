import { Theme, useThemedStyles } from "@contexts/theme";
import { withBoxStyle } from "@utils/boxStyles/hoc";
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Box, BoxProps } from "./Box";

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      borderRadius: theme.rounded.base,
      overflow: "hidden",
      width: "100%",
    },
    withBackground: {
      backgroundColor: theme.components.Paper.backgroundColor,
    },
  });

export type PaperProps = BoxProps & {
  noBackground?: boolean;
  style?: ViewStyle;
};

export const Paper = withBoxStyle(
  ({ children, noBackground, style }: React.PropsWithChildren<PaperProps>) => {
    const themedStyles = useThemedStyles<typeof styles>(styles);
    return (
      <Box style={[themedStyles.root, !noBackground && themedStyles.withBackground, style]}>
        {children}
      </Box>
    );
  },
);
