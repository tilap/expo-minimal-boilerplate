import { ExtendedPressable } from "@components/ExtendedPressable";
import { Theme, useTheme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleSheet } from "react-native";

type GenericIconProps = {
  color: string;
  size: number;
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      alignItems: "center",
      justifyContent: "center",
      minWidth: 42,
      minHeight: 32,
      borderRadius: theme.rounded.sm,
      backgroundColor: theme.components.NavbarIconButton.root.backgroundColor,
    },
  });

export function NavbarIconButton({
  Icon,
  onPress,
}: {
  onPress: () => void;
  Icon: React.ComponentType<GenericIconProps>;
}) {
  const theme = useTheme();
  const themedStyles = useThemedStyles<typeof styles>(styles);

  return (
    <ExtendedPressable onPress={onPress} style={themedStyles.root}>
      <Icon size={26} color={theme.components.NavbarIconButton.Icon.color} />
    </ExtendedPressable>
  );
}
