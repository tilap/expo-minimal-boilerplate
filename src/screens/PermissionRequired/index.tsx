import { Box } from "@components/Box";
import { Button } from "@components/Button";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { useT } from "@contexts/i18n";
import { useOpenDeviceSettings } from "@utils/useOpenDeviceSettings";
import { useShortDeviceName } from "@utils/useShortDeviceName";
import React from "react";
import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  paper: {
    maxWidth: 400,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 3.05,
    elevation: 4,
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

export type PermissionRequiredProps = {
  type: PermissionType;
};

export function PermissionRequired({ type = "mediaLibrary" }: PermissionRequiredProps) {
  const t = useT();
  const openDeviceSettings = useOpenDeviceSettings();
  const device = useShortDeviceName();
  return (
    <ScreenContainer preset="fullWithPadding">
      <Box flex={1} justifyContent="center" alignItems="center" fullWidth>
        <Paper p={6} style={style.paper}>
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
