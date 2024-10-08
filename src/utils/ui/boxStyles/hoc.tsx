import React from "react";
import { ViewStyle } from "react-native";
import { BoxStyleProps, useBoxStyle } from "./useBoxStyle";

export { type BoxStyleProps } from "./useBoxStyle";

export function withBoxStyle<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithBoxStyle(props: P & BoxStyleProps) {
    const { style, ...rest } = props;
    const boxStyles = useBoxStyle({ ...rest });

    return <WrappedComponent {...(rest as P)} style={[boxStyles, style as ViewStyle]} />;
  };
}
