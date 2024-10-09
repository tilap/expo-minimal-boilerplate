import { Box } from "@components/Box";
import { StartToEndIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryText } from "@components/ListEntryText";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { useFeatureFlags, useRateAppUrl, useShareAppUrl } from "@contexts/config";
import { useDarkmode } from "@contexts/darkmode";
import { useLocale, useT } from "@contexts/i18n/index";
import { useThemeVariant } from "@contexts/theme";
import {
  useGoToAbout,
  useGoToSettingsDarkmode,
  useGoToSettingsLocale,
  useGoToSettingsThemeVariant,
} from "@navigation/helpers";
import React, { lazy } from "react";

const ListEntryResetPreferences = lazy(() =>
  import("./ListEntryResetPreferences").then((module) => ({
    default: module.ListEntryResetPreferences,
  })),
);
const ListEntryShareApp = lazy(() =>
  import("./components/ListEntryShareApp").then((module) => ({
    default: module.ListEntryShareApp,
  })),
);
const ListEntryRateApp = lazy(() =>
  import("./components/ListEntryRateApp").then((module) => ({
    default: module.ListEntryRateApp,
  })),
);

export function SettingsScreen() {
  const locale = useLocale();
  const darkMode = useDarkmode();
  const themeVariant = useThemeVariant();
  const t = useT();
  const featureFlags = useFeatureFlags();

  const gotoAbout = useGoToAbout();

  const goToSettingsDarkmode = useGoToSettingsDarkmode();
  const goToSettingsLocale = useGoToSettingsLocale();
  const gotoSettingsThemeVariant = useGoToSettingsThemeVariant();

  const rateUrl = useRateAppUrl();
  const shareUrl = useShareAppUrl();

  return (
    <ScreenContainer preset="page" withScrollView>
      <Paper mb={2}>
        <List
          items={[
            <ListEntryText
              label={t("screens.settings.entries.darkmode.label")}
              value={t(`screens.settings.entries.darkmode.values.${darkMode}`)}
              onPress={goToSettingsDarkmode}
              Icon={StartToEndIcon}
            />,
            <ListEntryText
              label={t("screens.settings.entries.themeVariant.label")}
              value={t(`screens.settings.entries.themeVariant.values.${themeVariant}`)}
              onPress={gotoSettingsThemeVariant}
              Icon={StartToEndIcon}
            />,
            <ListEntryText
              label={t("screens.settings.entries.locale.label")}
              value={t(`screens.settings.entries.locale.values.${locale as "fr" | "en"}`)}
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

      {featureFlags.resetPreferences && (
        <Paper mb={8}>
          <List items={[<ListEntryResetPreferences />]} />
        </Paper>
      )}

      <Paper>
        <List
          items={[
            <ListEntryText
              label={t("screens.settings.entries.about.label")}
              onPress={gotoAbout}
              Icon={StartToEndIcon}
            />,
            rateUrl ? (
              <ListEntryRateApp url={rateUrl} label={t("screens.settings.entries.rateApp.label")} />
            ) : (
              false
            ),
            shareUrl ? (
              <ListEntryShareApp
                url={shareUrl}
                label={t("screens.settings.entries.shareApp.label")}
                message={t("screens.settings.entries.shareApp.message")}
              />
            ) : (
              false
            ),
          ].filter((v) => v !== false)}
        />
      </Paper>
    </ScreenContainer>
  );
}
