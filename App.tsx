import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { enableScreens } from "react-native-screens";
import { ErrorBoundary } from "./src/components/ErrorBoundary";
import config from "./src/config/index";
import { RootNavigation } from "./src/navigation/routers/RootNavigation";
import { AppErrorScreen } from "./src/screens/AppError";
import { AppProviders } from "./src/utils/appProviders";
import { root as logger } from "./src/utils/loggers";

enableScreens();

function handleError(error: unknown, errorInfo: unknown) {
  logger.error("error", error, errorInfo);
}

function App() {
  useEffect(() => {
    if (Platform.OS !== "web" && config.ui.lockScreenOrientation) {
      ScreenOrientation.lockAsync(config.ui.lockScreenOrientation);
    }
  }, []);

  return (
    <ErrorBoundary ErrorScreen={AppErrorScreen} handleError={handleError}>
      <AppProviders>
        <RootNavigation />
      </AppProviders>
    </ErrorBoundary>
  );
}

export default App;
