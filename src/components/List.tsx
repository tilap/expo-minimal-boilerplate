import { Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { Box, BoxProps } from "./Box";
import { Paper, PaperProps } from "./Paper";

const styles = (theme: Theme) =>
  StyleSheet.create({
    root: {},
    itemContainer: {},
    itemContainerWithBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme.components.List.item.borderBottomColor,
    },
    itemContainerFirst: {
      borderTopLeftRadius: theme.rounded.base,
      borderTopRightRadius: theme.rounded.base,
      overflow: "hidden",
    },
    itemContainerLast: {
      borderBottomLeftRadius: theme.rounded.base,
      borderBottomRightRadius: theme.rounded.base,
      overflow: "hidden",
    },
  });

export type ListProps = PaperProps & {
  items: React.ReactNode[];
  itemBoxProps?: BoxProps;
};

export const List = ({ items, itemBoxProps, ...props }: ListProps): React.ReactElement => {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  return (
    <Paper {...props}>
      {items.map((item, index) => (
        <Box
          {...itemBoxProps}
          key={index}
          style={[
            themedStyles.itemContainer,
            index !== items.length - 1 && themedStyles.itemContainerWithBorder,
            itemBoxProps?.style,
            index === 0 && themedStyles.itemContainerFirst,
            index === items.length - 1 && themedStyles.itemContainerLast,
          ]}
        >
          {item}
        </Box>
      ))}
    </Paper>
  );
};
