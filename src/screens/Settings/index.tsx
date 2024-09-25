import { Box } from "@components/Box";
import { StartToEndIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryGeneric } from "@components/ListEntryGeneric";
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
import { useResetPreferences } from "@utils/useResetPreferences";
import React from "react";
import { Alert } from "react-native";

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
  const resetPreferences = useResetPreferences();

  const confirmClearDataAction = () =>
    Alert.alert(
      t("screens.settings.options.resetPreferences.confirm.title"),
      t("screens.settings.options.resetPreferences.confirm.message"),
      [
        {
          text: t("screens.settings.options.resetPreferences.confirm.cancelLabel"),
          // onPress: () => clearAppData(),
          style: "cancel",
        },
        { text: "OK", onPress: () => resetPreferences() },
      ],
    );

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

      {featureFlags.resetPreferences && (
        <Paper mb={0}>
          <List
            items={[
              <ListEntryGeneric onPress={confirmClearDataAction}>
                <Typography variant="list" palette="danger">
                  {t("screens.settings.options.resetPreferences.label")}
                </Typography>
              </ListEntryGeneric>,
            ]}
          />
        </Paper>
      )}

      <Paper mt={8}>
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
