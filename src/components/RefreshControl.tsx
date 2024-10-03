import React from "react";
import { RefreshControl as RNRefreshControl, RefreshControlProps } from "react-native";

export function RefreshControl(props: RefreshControlProps) {
  return <RNRefreshControl {...props} />;
}
