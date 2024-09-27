import { useConfig } from "@contexts/config";

export function useShortDeviceName() {
  const config = useConfig();
  switch (config.Platform.OS) {
    case "ios":
      switch (config.Device.deviceType) {
        case config.Device.DeviceType.PHONE:
          return "iPhone";
        case config.Device.DeviceType.TABLET:
          return "iPad";
        default:
          return "iDevice";
      }
    case "android":
      return "Android";
    default:
      return "Device";
  }
}
