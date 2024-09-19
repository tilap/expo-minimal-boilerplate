import { withBoxStyle } from "@utils/boxStyles/hoc";
import { type BoxStyleProps } from "@utils/boxStyles/useBoxStyle";
import React from "react";
import { ScrollView } from "react-native";

export type BoxProps = BoxStyleProps;

export const ExtendedScrollView = withBoxStyle((props: BoxProps) => {
  const { style, ...rest } = props;
  return <ScrollView style={[style]} {...rest} />;
});
