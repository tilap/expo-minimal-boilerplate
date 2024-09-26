import { Box } from "@components/Box";
import { DarkmodeAutomaticIcon, DarkmodeDarkIcon, DarkmodeLightIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryText } from "@components/ListEntryText";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { DarkMode, useDarkmode, useSetDarkmode } from "@contexts/darkmode";
import { useT } from "@contexts/i18n/index";
import React from "react";
import { TextStyle, ViewStyle } from "react-native";

const iconMap: Record<
  DarkMode,
  React.ComponentType<{
    size?: number | undefined;
    color?: string | undefined;
    style?: ViewStyle | TextStyle | undefined;
  }>
> = {
  dark: DarkmodeDarkIcon,
  light: DarkmodeLightIcon,
  system: DarkmodeAutomaticIcon,
};

export function SettingsDarkmodeScreen() {
  const darkMode = useDarkmode();
  const setDarkMode = useSetDarkmode();
  const t = useT();

  return (
    <ScreenContainer preset="page" withScrollView>
      <Paper>
        <List
          items={(["dark", "light", "system"] as DarkMode[]).map((v) => (
            <ListEntryText
              label={t(`screens.settingsDarkmode.options.${v}`)}
              onPress={() => {
                setDarkMode(v);
              }}
              Icon={iconMap[v]}
              highlightIcon={v === darkMode}
            />
          ))}
        />
      </Paper>
      <Box my={4} px={3}>
        <Typography variant="annotation" palette="subtle" mx={3}>
          {t("screens.settingsDarkmode.acknowledgement")}
        </Typography>
      </Box>
    </ScreenContainer>
  );
}
