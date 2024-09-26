import React from "react";
import { ViewStyle } from "react-native";
import { ShadowStyleProps, useShadowStyle } from "./useShadowStyle";

export { type ShadowStyleProps } from "./useShadowStyle";

export function withShadowStyle<P extends ShadowStyleProps & { style?: ViewStyle }>(
  WrappedComponent: React.ComponentType<P>,
) {
  return function WithShadowStyle(props: P) {
    const { shadow, style, ...rest } = props;
    const shadowStyles = useShadowStyle({ shadow });
    return <WrappedComponent {...(rest as P)} style={[shadowStyles, style]} />;
  };
}
