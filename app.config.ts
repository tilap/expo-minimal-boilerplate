import { ConfigContext, ExpoConfig } from "@expo/config";

const makeConfig = ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Tilap Expo BoilerPlate",
  description: "Tilap Expo BoilerPlate",
  slug: "tilap-expo-boilerplate",
  scheme: "com.tilap.expoboilerplate",
  version: "1.0.0",
  sdkVersion: "51.0.0",
  orientation: "portrait",
  icon: "./src/assets/images/icon.png",
  userInterfaceStyle: "automatic",
  runtimeVersion: {
    policy: "sdkVersion",
  },
  assetBundlePatterns: ["./src/assets/images/*"],
  locales: {
    fr: "./src/assets/languages/french.json",
    en: "./src/assets/languages/english.json",
  },
  splash: {
    image: "./src/assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#fff7d3",
  },
  ios: {
    bundleIdentifier: "com.tilap.expoboilerplate",
    buildNumber: "1.0.0",
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
  },
  web: {
    bundler: "metro",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./src/assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.tilap.expoboilerplate",
    versionCode: 1,
  },
  updates: {
    enabled: true,
    url: "https://u.expo.dev/xxxx-xxxx-xxxx-xxxx-xxxx",
  },
  extra: {
    eas: {
      projectId: "xxxx-xxxx-xxxx-xxxx-xxxx",
    },
  },
  plugins: [
    [
      "expo-media-library",
      {
        photosPermission: "Allow $(PRODUCT_NAME) to access your photos.",
        savePhotosPermission: "Allow $(PRODUCT_NAME) to save photos.",
      },
    ],
  ],
});

export default makeConfig;
