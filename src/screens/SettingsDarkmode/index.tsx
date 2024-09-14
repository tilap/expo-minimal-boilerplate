import { Box } from "@components/Box";
import { DarkmmodeAutomaticIcon, DarkmodeDarkIcon, DarkmodeLightIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryGeneric } from "@components/ListEntryGeneric";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { DarkMode, useDarkmode, useSetDarkmode } from "@contexts/darkmode";
import { useT } from "@contexts/i18n/index";
import React from "react";

const iconMap: Record<DarkMode, any> = {
  dark: DarkmodeDarkIcon,
  light: DarkmodeLightIcon,
  system: DarkmmodeAutomaticIcon,
};

export function SettingsDarkmode() {
  const darkMode = useDarkmode();
  const setDarkMode = useSetDarkmode();
  const t = useT();

  return (
    <ScreenContainer preset="page">
      <Paper>
        <List
          items={(["dark", "light", "system"] as DarkMode[]).map((v) => (
            <ListEntryGeneric
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
          {t("screens.settingsLocale.acknoledgement")}
        </Typography>
      </Box>
    </ScreenContainer>
  );
}
