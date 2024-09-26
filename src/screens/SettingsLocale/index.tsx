import { CheckmarkIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryText } from "@components/ListEntryText";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { useLocale, useLocales, useSetLocale, useT } from "@contexts/i18n/index";

import React from "react";

export function SettingsLocaleScreen() {
  const locale = useLocale();
  const locales = useLocales();
  const setLocale = useSetLocale();
  const t = useT();

  return (
    <ScreenContainer preset="page" withScrollView>
      <Paper>
        <List
          items={locales.map((v) => (
            <ListEntryText
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
