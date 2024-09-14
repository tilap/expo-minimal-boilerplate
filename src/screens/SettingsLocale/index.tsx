import { CheckmarkIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryGeneric } from "@components/ListEntryGeneric";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { useLocale, useLocales, useSetLocale, useT } from "@contexts/i18n/index";

import React from "react";

export function SettingsLocale() {
  const locale = useLocale();
  const locales = useLocales();
  const setLocale = useSetLocale();
  const t = useT();

  return (
    <ScreenContainer preset="page">
      <Paper>
        <List
          items={locales.map((v) => (
            <ListEntryGeneric
              label={t(`screens.settingsLocale.options.${v}`)}
              onPress={() => {
                setLocale(v);
              }}
              Icon={CheckmarkIcon}
              highlightIcon={v === locale}
            />
          ))}
        />
      </Paper>
    </ScreenContainer>
  );
}
