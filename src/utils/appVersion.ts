import { lib as logger } from "@utils/loggers";
import * as Application from "expo-application";

export function getAppVersion(): string | null {
  try {
    return Application.nativeApplicationVersion;
  } catch (error: unknown) {
    logger.warn("getAppVersion error", { error });
    return null;
  }
}
