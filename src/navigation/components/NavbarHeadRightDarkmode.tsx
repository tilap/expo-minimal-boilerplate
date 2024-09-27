import { Box } from "@components/Box";
import { DarkmodeDarkIcon, DarkmodeLightIcon } from "@components/Icon";
import { NavbarIconButton } from "@components/NavbarIconButton";
import { type ResolvedDarkMode, useResolvedDarkmode, useSetDarkmode } from "@contexts/darkmode";
import React from "react";
import { StyleSheet } from "react-native";

const iconMap: Record<
  ResolvedDarkMode,
  React.ComponentType<{
    size: number;
    color: string;
  }>
> = {
  dark: DarkmodeDarkIcon,
  light: DarkmodeLightIcon,
};

const styles = StyleSheet.create({
  root: {
    marginRight: 8,
  },
});

export function NavbarHeadRightDarkmode() {
  const resolvedDarkMode = useResolvedDarkmode();
  const setDarkMode = useSetDarkmode();
  const Icon = iconMap[resolvedDarkMode];

  return (
    <Box flexDirection="row" gap={12} style={styles.root}>
      <NavbarIconButton
        onPress={() => setDarkMode(resolvedDarkMode === "light" ? "dark" : "light")}
        Icon={Icon}
      />
    </Box>
  );
}
