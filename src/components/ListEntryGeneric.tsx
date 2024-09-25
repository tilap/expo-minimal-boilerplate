import { ExtendedPressable } from "@components/ExtendedPressable";
import { type Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Box } from "./Box";
import { Typography } from "./Typography";

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.components.ListEntryGeneric.container.backgroundColor,
    },
    label: {
      color: theme.components.ListEntryGeneric.label.color,
    },
    value: {
      color: theme.components.ListEntryGeneric.value.color,
    },
    icon: {
      color: theme.components.ListEntryGeneric.icon.default.color,
      marginStart: 4,
    },
    iconHighlighted: {
      color: theme.components.ListEntryGeneric.icon.highlight.color,
      marginStart: 4,
    },
  });

export type ListEntryMenuProps = {
  label: string;
  value?: string;
  onPress?: () => void;
  Icon?: React.ComponentType<{
    size?: number;
    color?: string;
    style?: ViewStyle | TextStyle;
  }>;
  highlightIcon?: boolean;
};

export const ListEntryGeneric: React.FC<ListEntryMenuProps> = ({
  highlightIcon,
  Icon,
  label,
  value,
  onPress,
}) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <ExtendedPressable onPress={onPress} style={themedStyles.root}>
      <Box py={3} px={3} flexDirection="row" justifyContent="space-between" alignItems="center">
        <Typography variant="list" style={themedStyles.label}>
          {label}
        </Typography>
        <Box flexDirection="row" alignItems="center">
          {value && (
            <Typography variant="list" style={themedStyles.value}>
              {value}
            </Typography>
          )}
          {Icon && (
            <Icon
              size={24}
              style={highlightIcon ? themedStyles.iconHighlighted : themedStyles.icon}
            />
          )}
        </Box>
      </Box>
    </ExtendedPressable>
  );
};
