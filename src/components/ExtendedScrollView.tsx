import { withBoxStyle } from "@utils/ui/boxStyles/hoc";
import { type BoxStyleProps } from "@utils/ui/boxStyles/useBoxStyle";
import React from "react";
import { ScrollView } from "react-native";

export type ExtendedScrollViewProps = BoxStyleProps;

export const ExtendedScrollView = withBoxStyle((props: ExtendedScrollViewProps) => {
  const { style, ...rest } = props;
  return <ScrollView style={[style]} {...rest} />;
});
