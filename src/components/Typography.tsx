import fonts from "@assets/font";
import { type Theme, useThemedStyles } from "@contexts/theme";
import { type BoxStyleProps, withBoxStyle } from "@utils/ui/boxStyles/hoc";
import React from "react";
import { type StyleProp, StyleSheet, Text, type TextStyle, View } from "react-native";

export type FontFamily = keyof typeof fonts;
export type Palette = "text" | "primary" | "subtle" | "danger" | "navigation";
export type Direction = "start" | "end";

export type TypographyAlignment = Direction | TextStyle["textAlign"];

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "text"
  | "list"
  | "annotation"
  | "button";

export type TypographyVariantProps = Pick<
  TextStyle,
  "fontSize" | "fontStyle" | "letterSpacing" | "lineHeight" | "textTransform"
> & {
  fontFamily?: FontFamily;
};

const palettesStyles = (theme: Theme) =>
  StyleSheet.create<Record<Palette, TextStyle>>({
    primary: theme.components.Typography.palette.primary,
    text: theme.components.Typography.palette.text,
    subtle: theme.components.Typography.palette.subtle,
    danger: theme.components.Typography.palette.danger,
    navigation: theme.components.Typography.palette.navigation,
  });

function castFontFamily(fontFamily: string | undefined): FontFamily | undefined {
  if (typeof fontFamily === "undefined") {
    return undefined;
  }
  if (!(fontFamily in fonts)) {
    throw new Error(`Font family ${fontFamily} not found`);
  }
  return fontFamily as FontFamily;
}

function castFontStyle(fontStyle: string | undefined): TextStyle["fontStyle"] | undefined {
  if (typeof fontStyle === "undefined") {
    return undefined;
  }
  if (!["normal", "italic"].includes(fontStyle)) {
    throw new Error(`Invalid font style ${fontStyle}`);
  }
  return fontStyle as TextStyle["fontStyle"];
}

function castTextTransform(
  textTransform: string | undefined,
): TextStyle["textTransform"] | undefined {
  if (typeof textTransform === "undefined") {
    return undefined;
  }
  if (!["uppercase", "none", "capitalize", "lowercase"].includes(textTransform)) {
    throw new Error(`Invalid text transform ${textTransform}`);
  }
  return textTransform as TextStyle["textTransform"];
}

/**
 * Casts the theme typography props to the correct type to avoid bad configuration
 * @param configStyle - The theme typography props
 * @returns The typography props
 */
function castThemeTypographyProps(
  configStyle: Omit<TypographyVariantProps, "fontFamily" | "fontStyle" | "textTransform"> & {
    fontFamily?: string;
    fontStyle?: string;
    textTransform?: string;
  },
): TypographyVariantProps {
  return {
    ...configStyle,
    fontFamily: castFontFamily(configStyle.fontFamily),
    fontStyle: castFontStyle(configStyle.fontStyle),
    textTransform: castTextTransform(configStyle.textTransform),
  };
}

function convertTypographyAlignToTextAlign(
  textAlign: TextStyle["textAlign"] | Direction | undefined,
): TextStyle["textAlign"] | undefined {
  if (typeof textAlign === "undefined") {
    return undefined;
  }
  switch (textAlign) {
    case "start":
      return "left";
    case "end":
      return "right";
    default:
      return textAlign;
  }
}

const variantsStyles = (theme: Theme) =>
  StyleSheet.create<Record<TypographyVariant, TypographyVariantProps>>({
    h1: castThemeTypographyProps(theme.components.Typography.variants.h1),
    h2: castThemeTypographyProps(theme.components.Typography.variants.h2),
    h3: castThemeTypographyProps(theme.components.Typography.variants.h3),
    h4: castThemeTypographyProps(theme.components.Typography.variants.h4),
    text: castThemeTypographyProps(theme.components.Typography.variants.text),
    annotation: castThemeTypographyProps(theme.components.Typography.variants.annotation),
    list: castThemeTypographyProps(theme.components.Typography.variants.list),
    button: castThemeTypographyProps(theme.components.Typography.variants.button),
  });

export type TypographyProps = BoxStyleProps & {
  variant?: TypographyVariant;
  align?: TypographyAlignment;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  palette?: Palette;
};

export const Typography = withBoxStyle(
  ({ align = "start", children, style, palette = "text", variant = "text" }: TypographyProps) => {
    const paletteStyle = useThemedStyles<typeof palettesStyles>(palettesStyles);
    const variantStyles = useThemedStyles<typeof variantsStyles>(variantsStyles);
    const textAlign = convertTypographyAlignToTextAlign(align);

    return (
      <Text style={[paletteStyle[palette], variantStyles[variant], { textAlign }, style]}>
        {children}
      </Text>
    );
  },
);

export const Demo = () => (
  /* eslint-disable react-native/no-inline-styles -- demo purpose */
  <View style={{ gap: 16 }}>
    <Typography>Default text</Typography>
    <Typography variant="h1">Variant h1</Typography>
    <Typography variant="h2">Variant h2</Typography>
    <Typography variant="h3">Variant h3</Typography>
    <Typography variant="h4">Variant h4</Typography>
    <Typography variant="text">Variant text</Typography>
    <Typography variant="annotation">Variant annotation</Typography>
    <Typography variant="list">Variant list</Typography>
    <Typography variant="button">Variant button</Typography>
    <Typography align="left">Align left</Typography>
    <Typography align="center">Align center</Typography>
    <Typography align="right">Align right</Typography>
    <Typography palette="danger">Palette danger</Typography>
    <Typography palette="primary">Palette primary</Typography>
    <Typography palette="subtle">Palette subtle</Typography>
    <Typography palette="text">Palette text</Typography>
    <Typography palette="navigation">Palette navigation</Typography>
  </View>
  /* eslint-enable react-native/no-inline-styles -- demo purpose */
);
