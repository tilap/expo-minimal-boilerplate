import { type Theme, useThemedStyles } from "@contexts/theme";
import React from "react";
import { StyleSheet } from "react-native";
import { ListEntryGeneric, ListEntryGenericProps } from "./ListEntryGeneric";
import { Typography } from "./Typography";

const styles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      color: theme.components.ListEntryText.label.color,
    },
  });

export type ListEntryTextProps = Omit<ListEntryGenericProps, "children"> & {
  label: string;
};

export const ListEntryText: React.FC<ListEntryTextProps> = ({ label, ...props }) => {
  const themedStyles = useThemedStyles(styles);
  return (
    <ListEntryGeneric {...props}>
      <Typography variant="list" style={themedStyles.label}>
        {label}
      </Typography>
    </ListEntryGeneric>
  );
};
