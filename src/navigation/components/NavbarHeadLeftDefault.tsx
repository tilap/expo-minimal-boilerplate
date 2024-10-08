import { ExtendedPressable } from "@components/ExtendedPressable";
import { EndToStartIcon } from "@components/Icon";
import { Typography } from "@components/Typography";
import { useT } from "@contexts/i18n/index";
import { Theme, useTheme, useThemedStyles } from "@contexts/theme";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 32,
      borderRadius: theme.rounded.sm,
      marginStart: 8,
    },
    icon: {
      color: theme.palette.navigation,
    },
  });

export function NavbarHeadLeftDefault() {
  const navigation = useNavigation();
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const canGoPrevious = useNavigationState((state) => state.routes.length > 1);
  const theme = useTheme();
  const t = useT();

  if (!canGoPrevious) {
    return null;
  }

  return (
    <ExtendedPressable onPress={() => navigation.goBack()} style={themedStyles.container}>
      <EndToStartIcon size={26} style={{ color: theme.palette.navigation }} />
      <Typography variant="text" palette="navigation">
        {t("navigation.headerBackTitle")}
      </Typography>
    </ExtendedPressable>
  );
}
