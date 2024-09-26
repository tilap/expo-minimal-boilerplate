import { type Theme, useThemedStyles } from "@contexts/theme";
import { type BoxStyleProps, withBoxStyle } from "@utils/boxStyles/hoc";
import React, { useRef } from "react";
import { Animated, StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { ExtendedPressable, type ExtendedPressableProps } from "./ExtendedPressable";
import { Typography } from "./Typography";

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: theme.rounded.base,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    primaryContainer: {
      backgroundColor: theme.components.Button.primary.backgroundColor,
      borderColor: theme.components.Button.primary.borderColor,
    },
    primaryTypography: {
      color: theme.components.Button.primary.color,
    },
    defaultContainer: {
      backgroundColor: theme.components.Button.default.backgroundColor,
      borderColor: theme.components.Button.default.borderColor,
    },
    defaultTypography: {
      color: theme.components.Button.default.color,
    },
  });

type ButtonProps = BoxStyleProps &
  Omit<ExtendedPressableProps, "children"> & {
    text: string;
    scheme?: "primary" | "default";
    style?: ViewStyle;
  };

const ButtonComponent: React.FC<ButtonProps> = ({ text, scheme = "default", style, ...props }) => {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const typographyStyle: StyleProp<TextStyle> =
    scheme === "primary" ? themedStyles.primaryTypography : themedStyles.defaultTypography;

  return (
    <ExtendedPressable {...props}>
      {({ pressed }: { pressed: boolean }) => {
        Animated.spring(scaleAnim, {
          toValue: pressed ? 0.92 : 1,
          useNativeDriver: true,
        }).start();

        return (
          <Animated.View
            style={[
              themedStyles.container,
              themedStyles[`${scheme}Container`],
              style,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Typography variant="button" style={typographyStyle}>
              {text}
            </Typography>
          </Animated.View>
        );
      }}
    </ExtendedPressable>
  );
};

export const Button = withBoxStyle(ButtonComponent);
