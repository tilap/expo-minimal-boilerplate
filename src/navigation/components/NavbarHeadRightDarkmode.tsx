import { DarkmodeDarkIcon, DarkmodeLightIcon } from "@components/Icon";
import { NavbarIconButton } from "@components/NavbarIconButton";
import { type ResolvedDarkMode, useResolvedDarkmode, useSetDarkmode } from "@contexts/darkmode";
import React from "react";

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

export function NavbarHeadRightDarkmode() {
  const resolvedDarkMode = useResolvedDarkmode();
  const setDarkMode = useSetDarkmode();
  const Icon = iconMap[resolvedDarkMode];

  return (
    <NavbarIconButton
      onPress={() => setDarkMode(resolvedDarkMode === "light" ? "dark" : "light")}
      Icon={Icon}
      side="right"
    />
  );
}
