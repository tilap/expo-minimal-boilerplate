import { ExtendedPressable, type ExtendedPressableProps } from "@components/ExtendedPressable";
import { type IconProps } from "@components/Icon";
import { type Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { Box } from "./Box";
import { Typography } from "./Typography";

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {
      backgroundColor: theme.components.ListEntryGeneric.container.backgroundColor,
    },
    value: {
      color: theme.components.ListEntryGeneric.value.color,
    },
    icon: {
      color: theme.components.ListEntryGeneric.icon.default.color,
      marginStart: theme.spacings.base,
    },
    iconHighlighted: {
      color: theme.components.ListEntryGeneric.icon.highlight.color,
      marginStart: theme.spacings.base,
    },
  });

export type ListEntryGenericProps = React.PropsWithChildren<
  ExtendedPressableProps & {
    value?: string;
    Icon?: React.ComponentType<Pick<IconProps, "size" | "style">>;
    highlightIcon?: boolean;
  }
>;

export const ListEntryGeneric: React.FC<ListEntryGenericProps> = ({
  highlightIcon,
  Icon,
  value,
  children,
  ...pressableProps
}) => {
  const themedStyles = useThemedStyles(styles);

  return (
    <ExtendedPressable {...pressableProps} style={[pressableProps?.style, themedStyles.root]}>
      <Box py={3} px={3} flexDirection="row" justifyContent="space-between" alignItems="center">
        {children}
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
