import { Box } from "@components/Box";
import { StartToEndIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryText } from "@components/ListEntryText";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { useFeatureFlags } from "@contexts/config";
import { useDarkmode } from "@contexts/darkmode";
import { useLocale, useT } from "@contexts/i18n/index";
import { useThemeVariant } from "@contexts/theme";
import {
  useGoToAbout,
  useGoToDebug,
  useGoToSettingsDarkmode,
  useGoToSettingsLocale,
  useGoToSettingsThemeVariant,
} from "@navigation/helpers";
import React from "react";

export function Settings() {
  const locale = useLocale();
  const darkMode = useDarkmode();
  const themeVariant = useThemeVariant();
  const t = useT();
  const featureFlags = useFeatureFlags();

  const gotoAbout = useGoToAbout();
  const gotoDebug = useGoToDebug();
  const goToSettingsDarkmode = useGoToSettingsDarkmode();
  const goToSettingsLocale = useGoToSettingsLocale();
  const gotoSettingsThemeVariant = useGoToSettingsThemeVariant();

  return (
    <ScreenContainer preset="page" withScrollView>
      <Paper mb={2}>
        <List
          items={[
            <ListEntryText
              label={t("screens.settings.options.darkmode.label")}
              value={t(`screens.settings.options.darkmode.values.${darkMode}`)}
              onPress={goToSettingsDarkmode}
              Icon={StartToEndIcon}
            />,
            <ListEntryText
              label={t("screens.settings.options.themeVariant.label")}
              value={t(`screens.settings.options.themeVariant.values.${themeVariant}`)}
              onPress={gotoSettingsThemeVariant}
              Icon={StartToEndIcon}
            />,
            <ListEntryText
              label={t("screens.settings.options.locale.label")}
              value={t(`screens.settings.options.locale.values.${locale as "fr" | "en"}`)}
              onPress={goToSettingsLocale}
              Icon={StartToEndIcon}
            />,
          ]}
        />
      </Paper>

      <Box mb={8} px={3} fullWidth>
        <Typography variant="annotation" palette="subtle">
          {t("screens.settings.acknoledgement")}
        </Typography>
      </Box>

      <Paper mb={0}>
        <List
          items={[
            <ListEntryText
              label={t("screens.settings.options.about.label")}
              onPress={gotoAbout}
              Icon={StartToEndIcon}
            />,
          ]}
        />
      </Paper>

      {featureFlags.debugScreen && (
        <Paper mt={8}>
          <List
            items={[
              <ListEntryText
                label={t("screens.settings.options.debug.label")}
                onPress={gotoDebug}
                Icon={StartToEndIcon}
              />,
            ]}
          />
        </Paper>
      )}
    </ScreenContainer>
  );
}
