import { ListEntryGeneric } from "@components/ListEntryGeneric";
import { Typography } from "@components/Typography";
import { useT } from "@contexts/i18n";
import { useResetPreferences } from "@utils/useResetPreferences";
import React from "react";
import { Alert } from "react-native";

export function ListEntryResetPreferences() {
  const resetPreferences = useResetPreferences();
  const t = useT();

  const confirmClearDataAction = () =>
    Alert.alert(
      t("screens.settings.entries.resetPreferences.confirm.title"),
      t("screens.settings.entries.resetPreferences.confirm.message"),
      [
        {
          text: t("screens.settings.entries.resetPreferences.confirm.cancelLabel"),
          style: "cancel",
        },
        {
          text: t("screens.settings.entries.resetPreferences.confirm.confirmLabel"),
          onPress: () => resetPreferences(),
        },
      ],
    );

  return (
    <ListEntryGeneric onPress={confirmClearDataAction}>
      <Typography variant="list" palette="danger">
        {t("screens.settings.entries.resetPreferences.label")}
      </Typography>
    </ListEntryGeneric>
  );
}
