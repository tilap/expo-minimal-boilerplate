import { Theme, useThemedStyles } from "@contexts/theme";
import { BoxStyleProps, withBoxStyle } from "@utils/boxStyles/hoc";
import React from "react";
import { StyleSheet, Text, TextStyle } from "react-native";

type TypographyVariant = "h1" | "h2" | "h3" | "text" | "list" | "annotation";
type TypographyAlignment = "start" | "center" | "end";
type Palette = "text" | "primary" | "subtle" | "danger" | "navigation";

enum FontFamily {
  Light = "Light",
  Regular = "Regular",
  Bold = "Bold",
  Black = "Black",
}

const palettesStyles = (theme: Theme) =>
  StyleSheet.create<Record<string, TextStyle>>({
    primary: theme.components.Typography.primary,
    text: theme.components.Typography.text,
    subtle: theme.components.Typography.subtle,
    danger: theme.components.Typography.danger,
    navigation: theme.components.Typography.navigation,
  });

const variantsStyles = StyleSheet.create<Record<string, TextStyle>>({
  h1: {
    fontFamily: FontFamily.Black,
    fontSize: 24,
  },
  h2: {
    fontFamily: FontFamily.Bold,
    fontSize: 20,
  },
  h3: {
    fontFamily: FontFamily.Bold,
    fontSize: 18,
  },
  text: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
  },
  annotation: {
    fontFamily: FontFamily.Light,
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    fontFamily: FontFamily.Regular,
    fontSize: 16,
  },
});

type TypographyProps = BoxStyleProps & {
  variant?: TypographyVariant;
  align?: TypographyAlignment;
  style?: TextStyle | TextStyle[];
  children: React.ReactNode;
  palette?: Palette;
};

export const Typography = withBoxStyle(
  ({ variant = "text", align = "start", children, style, palette = "text" }: TypographyProps) => {
    const paletteStyle = useThemedStyles<typeof palettesStyles>(palettesStyles);
    const variantStyle = variantsStyles[variant];
    const alignmentStyle: TextStyle = {
      textAlign: align === "start" ? "left" : align === "end" ? "right" : "center",
    };

    return (
      <Text style={[paletteStyle[palette], variantStyle, alignmentStyle, style]}>{children}</Text>
    );
  },
);
