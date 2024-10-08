import { Box } from "@components/Box";
import { Button } from "@components/Button";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { useT } from "@contexts/i18n";
import { type Theme, useThemedStyles } from "@contexts/theme";
import { useOpenDeviceSettings } from "@utils/useOpenDeviceSettings";
import { useShortDeviceName } from "@utils/useShortDeviceName";
import React from "react";
import { StyleSheet } from "react-native";

const styles = (theme: Theme) =>
  StyleSheet.create({
    paper: {
      maxWidth: 400,
      ...theme.shadows.base,
    },
  });

/**
 * Screen that is displayed when the user has not granted the necessary permissions.
 *
 * @example
 * import { withMediaLibraryPermission } from "@lib/withMediaLibraryPermission";
 * const PermissionRequired = lazy(() =>
 *   import("@screens/PermissionRequired/index").then((module) => ({
 *     default: module.PermissionRequired,
 *   })),
 * );
 *
 * export function FinalPage() {
 *   return <Page fallback={<PermissionRequired type="mediaLibrary" />} />;
 * }
 *
 * const Page = withMediaLibraryPermission(() => {
 *   return ...
 * });
 *
 * @returns {JSX.Element} The PermissionRequired screen component.
 */

export type PermissionType =
  | "camera"
  | "location"
  | "mediaLibrary"
  | "contacts"
  | "notifications"
  | "microphone"
  | "calendar"
  | "reminders"
  | "motion"
  | "bluetooth"
  | "health"
  | "faceId";

export type PermissionRequiredScreenProps = {
  type: PermissionType;
};

export function PermissionRequiredScreen({ type = "mediaLibrary" }: PermissionRequiredScreenProps) {
  const t = useT();
  const openDeviceSettings = useOpenDeviceSettings();
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const device = useShortDeviceName();
  return (
    <ScreenContainer preset="full">
      <Box flex={1} justifyContent="center" alignItems="center" fullWidth>
        <Paper p={6} style={themedStyles.paper}>
          <Typography variant="h2" mb={6}>
            {t(`screens.permissionRequired.${type}.title`)}
          </Typography>
          <Typography mb={6} variant="text">
            {t(`screens.permissionRequired.${type}.message`, { device })}
          </Typography>
          <Button
            scheme="primary"
            onPress={openDeviceSettings}
            text={t(`screens.permissionRequired.${type}.button`)}
          />
        </Paper>
      </Box>
    </ScreenContainer>
  );
}
