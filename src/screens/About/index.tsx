import { StartToEndIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryText } from "@components/ListEntryText";
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
            <ListEntryText
              label={t("screens.about.entries.version.label")}
              value={getAppVersion() || "N/A"}
            />,
            urls.privacy && (
              <ListEntryText
                label={t("screens.about.entries.privacy.label")}
                onPress={() => gotoLegal("privacy")}
                Icon={StartToEndIcon}
              />
            ),
            urls.terms && (
              <ListEntryText
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
