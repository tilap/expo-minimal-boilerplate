import { ExtendedPressable } from "@components/ExtendedPressable";
import { Theme, useTheme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleSheet } from "react-native";

export type GenericIconProps = {
  color: string;
  size: number;
};

export type NavbarIcon = React.ComponentType<GenericIconProps>;

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      alignItems: "center",
      justifyContent: "center",
      minWidth: 42,
      minHeight: 32, // TODO: depends on navigation height, so in percent or in thme would be better
      borderRadius: theme.rounded.sm,
      backgroundColor: theme.components.NavbarIconButton.root.backgroundColor,
    },
  });

export type NavbarIconButtonProps = {
  onPress: () => void;
  Icon: React.ComponentType<GenericIconProps>;
};
export function NavbarIconButton({ Icon, onPress }: NavbarIconButtonProps) {
  const theme = useTheme();
  const themedStyles = useThemedStyles<typeof styles>(styles);

  return (
    <ExtendedPressable onPress={onPress} style={themedStyles.root}>
      <Icon size={26} color={theme.components.NavbarIconButton.Icon.color} />
    </ExtendedPressable>
  );
}
