import { ExtendedPressable } from "@components/ExtendedPressable";
import { Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { Typography } from "./Typography";

type Side = "right" | "left";

export type GenericIconProps = {
  size: number;
  style?: StyleProp<TextStyle>;
};

export type NavbarIcon = React.ComponentType<GenericIconProps>;

const styles = (theme: Theme, side?: Side) =>
  StyleSheet.create({
    root: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 42,
      minHeight: theme.components.NavbarIconButton.root.minHeight,
      borderRadius: theme.rounded.sm,
      backgroundColor: theme.components.NavbarIconButton.root.backgroundColor,
      marginLeft: side === "left" ? theme.spacings.screen : undefined,
      marginRight: side === "right" ? theme.spacings.screen : undefined,
    },
    icon: {
      color: theme.components.NavbarIconButton.Icon.color,
    },
  });

export type NavbarIconButtonProps = {
  onPress?: () => void;
  Icon: React.ComponentType<GenericIconProps>;
  side?: Side;
  label?: string;
};

export function NavbarIconButton({ Icon, onPress, label, side }: NavbarIconButtonProps) {
  const themedStyles = useThemedStyles<typeof styles>(styles, side);

  return (
    <ExtendedPressable onPress={onPress} style={themedStyles.root}>
      <Icon size={26} style={themedStyles.icon} />
      {label && (
        <Typography variant="text" palette="navigation">
          {label}
        </Typography>
      )}
    </ExtendedPressable>
  );
}
