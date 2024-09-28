import React from "react";
import { Platform, Pressable, PressableProps, ViewStyle } from "react-native";

type ViewStylePossible = ViewStyle | false | null | undefined;
type ViewStylePossibleWithArr = ViewStylePossible | ViewStylePossible[];

export type ExtendedPressableProps = PressableProps & {
  children: React.ReactNode | ((_props: { pressed: boolean }) => React.ReactNode);
  style?: ViewStylePossibleWithArr | ((_state: { pressed: boolean }) => ViewStylePossibleWithArr);
  pressedOpacity?: number;
  rippleColor?: string;
  pressRetentionOffset?: { top: number; left: number; bottom: number; right: number };
};

export const ExtendedPressable: React.FC<ExtendedPressableProps> = ({
  children,
  style,
  pressedOpacity = 0.8,
  rippleColor = "rgba(0, 0, 0, 0.1)",
  pressRetentionOffset = { top: 10, left: 10, bottom: 10, right: 10 },
  ...props
}) => {
  return (
    <Pressable
      android_ripple={{ color: rippleColor }}
      // TODO: style should be themabled
      style={({ pressed }) =>
        [
          typeof style === "function" ? style({ pressed }) : style,
          Platform.OS === "ios" && {
            opacity: pressed ? pressedOpacity : 1,
          },
        ].filter(Boolean)
      }
      pressRetentionOffset={pressRetentionOffset}
      {...props}
    >
      {({ pressed }) => (typeof children === "function" ? children({ pressed }) : children)}
    </Pressable>
  );
};
