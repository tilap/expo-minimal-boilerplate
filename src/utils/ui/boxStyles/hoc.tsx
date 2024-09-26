import React from "react";
import { ViewStyle } from "react-native";
import { BoxStyleProps, useBoxStyle } from "./useBoxStyle";

export { type BoxStyleProps } from "./useBoxStyle";

export function withBoxStyle<P extends BoxStyleProps>(WrappedComponent: React.ComponentType<P>) {
  return function WithBoxStyle(props: P) {
    const { sx, style, ...rest } = props;
    const boxStyles = useBoxStyle({ sx, ...rest });

    return <WrappedComponent {...(rest as P)} style={[boxStyles, style as ViewStyle]} />;
  };
}
