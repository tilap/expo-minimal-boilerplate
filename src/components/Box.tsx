import { withBoxStyle } from "@utils/ui/boxStyles/hoc";
import { type BoxStyleProps } from "@utils/ui/boxStyles/useBoxStyle";
import React from "react";
import { View } from "react-native";

export type BoxProps = BoxStyleProps;

export const Box = withBoxStyle((props: BoxProps) => {
  const { style, ...rest } = props;
  return <View style={[style]} {...rest} />;
});
