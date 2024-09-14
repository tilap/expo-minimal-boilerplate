import { SettingsIcon } from "@components/Icon";
import { NavbarIconButton } from "@components/NavbarIconButton";
import { useGoToSettings } from "@navigation/helpers";
import React from "react";
import { StyleSheet, View } from "react-native";

const homeHeaderRightStyles = StyleSheet.create({
  root: { marginRight: 8, display: "flex", flexDirection: "row", gap: 12 },
});

export function NavbarHeadRightHome() {
  const goToSettings = useGoToSettings();
  return (
    <View style={homeHeaderRightStyles.root}>
      <NavbarIconButton onPress={goToSettings} Icon={SettingsIcon} />
    </View>
  );
}
