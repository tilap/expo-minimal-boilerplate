import React from "react";
import { ShadowStyleProps, useShadowStyle } from "./useShadowStyle";

export { type ShadowStyleProps } from "./useShadowStyle";

export function withShadowStyle<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithShadowStyle(props: P & ShadowStyleProps) {
    const { shadow, style, ...rest } = props;
    const shadowStyles = useShadowStyle({ shadow });
    return <WrappedComponent {...(rest as P)} style={[shadowStyles, style]} />;
  };
}
