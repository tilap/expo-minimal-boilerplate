import { Box } from "@components/Box";
import { SettingsIcon } from "@components/Icon";
import { NavbarIconButton } from "@components/NavbarIconButton";
import { useGoToSettings } from "@navigation/helpers";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  root: {
    marginRight: 8,
  },
});

export function NavbarHeadRightSettings() {
  const goToSettings = useGoToSettings();
  return (
    <Box flexDirection="row" gap={12} style={styles.root}>
      <NavbarIconButton onPress={goToSettings} Icon={SettingsIcon} />
    </Box>
  );
}
