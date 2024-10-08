import { withBoxStyle } from "@utils/ui/boxStyles/hoc";
import { type BoxStyleProps as BoxProps } from "@utils/ui/boxStyles/useBoxStyle";
import React from "react";
import { View } from "react-native";

export { type BoxStyleProps as BoxProps } from "@utils/ui/boxStyles/useBoxStyle";

export const Box = withBoxStyle((props: BoxProps) => {
  const { style, ...rest } = props;
  return <View style={[style]} {...rest} />;
});
