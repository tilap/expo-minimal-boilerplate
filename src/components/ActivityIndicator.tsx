import { useTheme } from "@contexts/theme";
import React from "react";
import {
  type ActivityIndicatorProps,
  ActivityIndicator as RNActivityIndicator,
} from "react-native";

export function ActivityIndicator({ size = "large", color, ...rest }: ActivityIndicatorProps) {
  const theme = useTheme();
  return (
    <RNActivityIndicator
      size={size}
      color={color || theme.components.ActivityIndicator.color}
      {...rest}
    />
  );
}
