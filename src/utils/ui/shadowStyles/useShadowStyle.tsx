import { useTheme } from "@contexts/theme";
import { ViewStyle } from "react-native";

type Shadow = "low" | "base" | "high";

export type ShadowStyleProps = {
  shadow?: Shadow;
} & { style?: ViewStyle };

export function useShadowStyle(props: ShadowStyleProps) {
  const theme = useTheme();
  if (!props?.shadow) {
    return {};
  }
  if (!theme?.shadows) {
    // eslint-disable-next-line no-console -- for developper usage
    console.warn("Theme does not handle shadow styles");
    return {};
  }
  if (props.shadow === "low") {
    if (!theme.shadows?.low) {
      // eslint-disable-next-line no-console -- for developper usage
      console.warn("Theme does not handle low shadow style");
      return {};
    }
    return theme.shadows.low;
  }
  if (props.shadow === "base") {
    if (!theme.shadows?.base) {
      // eslint-disable-next-line no-console -- for developper usage
      console.warn("Theme does not handle low shadow style");
      return {};
    }
    return theme.shadows.base;
  }
  if (props.shadow === "high") {
    if (!theme.shadows?.high) {
      // eslint-disable-next-line no-console -- for developper usage
      console.warn("Theme does not handle low shadow style");
      return {};
    }
    return theme.shadows.high;
  }
  return {};
}
