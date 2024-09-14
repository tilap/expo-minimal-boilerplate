import { type Config } from "@config";
import React, { createContext, useContext } from "react";

type Context = {
  config: Config;
};

const ConfigContext = createContext<Context>({} as unknown as Context);

export function ConfigProvider({ children, config }: React.PropsWithChildren<{ config: Config }>) {
  return <ConfigContext.Provider value={{ config }}>{children}</ConfigContext.Provider>;
}

export const useConfig = (): Config => {
  const { config } = useContext(ConfigContext);
  return config;
};

export const useFeatureFlags = () => {
  const config = useConfig();
  return config.featureFlags;
};

export const useUrls = () => {
  const config = useConfig();
  return config.urls;
};
