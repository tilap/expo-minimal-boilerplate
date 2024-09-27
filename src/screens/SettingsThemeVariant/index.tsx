import { BrushIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryText } from "@components/ListEntryText";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { useT } from "@contexts/i18n/index";
import { themeVariants, useSetThemeVariant, useThemeVariant } from "@contexts/theme";
import React from "react";

export function SettingsThemeVariantScreen() {
  const themeVariant = useThemeVariant();
  const setThemeVariant = useSetThemeVariant();
  const t = useT();

  return (
    <ScreenContainer preset="page" withScrollView>
      <Paper>
        <List
          items={themeVariants.map((v) => (
            <ListEntryText
              label={t(`screens.settingsThemeVariant.options.${v}`)}
              onPress={() => {
                setThemeVariant(v);
              }}
              Icon={BrushIcon}
              highlightIcon={v === themeVariant}
            />
          ))}
        />
      </Paper>
    </ScreenContainer>
  );
}
