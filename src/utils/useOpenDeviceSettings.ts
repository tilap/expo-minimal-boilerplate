import { useConfig } from "@contexts/config";
import { Linking } from "react-native";

export function useOpenDeviceSettings() {
  const config = useConfig();
  if (config.Platform.OS === "ios") {
    return () => {
      Linking.openURL("app-settings:");
    };
  }
  return () => {
    Linking.openSettings();
  };
}
