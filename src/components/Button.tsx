import { type Theme, useThemedStyles } from "@contexts/theme";
import { type BoxStyleProps, withBoxStyle } from "@utils/boxStyles/hoc";
import React, { useRef } from "react";
import { Animated, StyleSheet, View, ViewStyle } from "react-native";
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
    typography: {},
  });

const stylesScheme = (theme: Theme) =>
  StyleSheet.create({
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

const stylesDisable = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.components.Button.disabled.backgroundColor,
      borderColor: theme.components.Button.disabled.borderColor,
    },
    typography: {
      color: theme.components.Button.disabled.color,
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
  const schemeStyle = useThemedStyles<typeof stylesScheme>(stylesScheme);
  const disableStyle = useThemedStyles<typeof stylesDisable>(stylesDisable);
  const scaleAnim = useRef(new Animated.Value(1)).current;

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
              schemeStyle[`${scheme}Container`],
              props.disabled && disableStyle.container,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Typography
              variant="button"
              style={[
                themedStyles.typography,
                schemeStyle[`${scheme}Typography`],
                props.disabled && disableStyle.typography,
              ]}
            >
              {text}
            </Typography>
          </Animated.View>
        );
      }}
    </ExtendedPressable>
  );
};

export const Button = withBoxStyle(ButtonComponent);

export const Demo = () => (
  <View style={{ gap: 16 }}>
    <Button text="Default" />
    <Button text="Schema Primary" scheme="primary" />
    <Button text="Schema Default" scheme="default" />
    <Button text="Disabled" disabled />
  </View>
);
