import { SettingsIcon } from "@components/Icon";
import { NavbarIconButton } from "@components/NavbarIconButton";
import { useGoToSettings } from "@navigation/helpers";
import React from "react";

export function NavbarHeadRightSettings() {
  const goToSettings = useGoToSettings();
  return <NavbarIconButton onPress={goToSettings} Icon={SettingsIcon} side="right" />;
}
