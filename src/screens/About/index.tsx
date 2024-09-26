import { StartToEndIcon } from "@components/Icon";
import { List } from "@components/List";
import { ListEntryText } from "@components/ListEntryText";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { useFeatureFlags, useUrls } from "@contexts/config";
import { useT } from "@contexts/i18n/index";
import {
  useGoToDebugConfig,
  useGoToLegalWebview,
  useGoToPermissionRequired,
} from "@navigation/helpers";
import { getAppVersion } from "@utils/appVersion";
import React from "react";

export function About() {
  const t = useT();
  const featureFlags = useFeatureFlags();
  const gotoLegal = useGoToLegalWebview();
  const gotoDebugConfig = useGoToDebugConfig();
  const gotoPermissionRequired = useGoToPermissionRequired();
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
      {featureFlags.debugScreen && (
        <>
          <Typography mt={8} px={3} variant="h4" palette="subtle">
            {t("screens.about.debug.title")}
          </Typography>
          <Paper mt={2}>
            <List
              items={[
                <ListEntryText
                  label={t("screens.about.entries.debugConfig.label")}
                  onPress={gotoDebugConfig}
                  Icon={StartToEndIcon}
                />,
                <ListEntryText
                  label={`${t("screens.about.entries.debugPermissionRequired.label")} (mediaLibrary)`}
                  onPress={() => gotoPermissionRequired("mediaLibrary")}
                  Icon={StartToEndIcon}
                />,
                <ListEntryText
                  label={`${t("screens.about.entries.debugPermissionRequired.label")} (location)`}
                  onPress={() => gotoPermissionRequired("location")}
                  Icon={StartToEndIcon}
                />,
              ]}
            />
          </Paper>
        </>
      )}
    </ScreenContainer>
  );
}
