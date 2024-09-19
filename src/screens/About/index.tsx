import { StartToEndIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryGeneric } from "@components/ListEntryGeneric";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { useUrls } from "@contexts/config";
import { useT } from "@contexts/i18n/index";
import { useGoToLegalWebview } from "@navigation/helpers";
import { getAppVersion } from "@utils/appVersion";
import React from "react";

export function About() {
  const t = useT();
  const gotoLegal = useGoToLegalWebview();
  const urls = useUrls();
  return (
    <ScreenContainer preset="page" withScrollView>
      <Paper>
        <List
          items={[
            <ListEntryGeneric
              label={t("screens.about.entries.version.label")}
              value={getAppVersion() || "N/A"}
            />,
            urls.privacy && (
              <ListEntryGeneric
                label={t("screens.about.entries.privacy.label")}
                onPress={() => gotoLegal("privacy")}
                Icon={StartToEndIcon}
              />
            ),
            urls.terms && (
              <ListEntryGeneric
                label={t("screens.about.entries.terms.label")}
                onPress={() => gotoLegal("terms")}
                Icon={StartToEndIcon}
              />
            ),
          ]}
        />
      </Paper>
    </ScreenContainer>
  );
}
