import { type configLoggerType, consoleTransport, logger } from "react-native-logs";

const config: configLoggerType = {
  transport: consoleTransport,
  enabledExtensions: ["ROOT", "LIB", "CONTEXT"],
};

const log = logger.createLogger(config);

export type Logger = typeof log;

export const root = log.extend("ROOT");
export const lib = log.extend("LIB");
