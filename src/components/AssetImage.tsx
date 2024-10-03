import { ActivityIndicator } from "@components/ActivityIndicator";
import { Box } from "@components/Box";
import { Theme, useThemedStyles } from "@contexts/theme";
import { type Asset, getAssetInfoAsync } from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";
import { Animated, type ImageProps, ImageStyle, StyleProp, StyleSheet } from "react-native";

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.components.AssetImage.backgroundColor,
      justifyContent: "center",
      alignItems: "center",
    },
    smRoundedContainer: {
      borderRadius: theme.rounded.sm,
      overflow: "hidden",
    },
    baseRoundedContainer: {
      borderRadius: theme.rounded.base,
      overflow: "hidden",
    },
    image: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
  });

type AssetImageProps = Pick<ImageProps, "resizeMode"> & {
  id: Asset["id"];
  width?: string | number;
  height?: string | number;
  disableAnimation?: boolean;
  animationDuration?: number;
  style?: StyleProp<ImageStyle>;
  rounded?: keyof Theme["rounded"];
};

export function AssetImage({
  id,
  width,
  height,
  disableAnimation,
  animationDuration = 200,
  resizeMode = "cover",
  rounded = "base",
  style,
}: AssetImageProps) {
  const themedStyles = useThemedStyles<typeof styles>(styles);
  const [localUri, setLocalUri] = useState<string | undefined>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(disableAnimation ? 1 : 0)).current;

  useEffect(() => {
    getAssetInfoAsync(id).then((info) => {
      setLocalUri(info.localUri);
    });
  }, [animationDuration, disableAnimation, fadeAnim, id]);

  return (
    <Box
      style={[
        themedStyles.container,
        rounded && themedStyles[`${rounded}RoundedContainer`],
        { width, height },
        style,
      ]}
    >
      <ActivityIndicator size="large" animating={isLoading} />
      <Animated.Image
        source={localUri ? { uri: localUri } : undefined}
        style={[themedStyles.image, { opacity: fadeAnim }]}
        resizeMode={resizeMode}
        onLoad={() => {
          setIsLoading(false);
          if (!disableAnimation) {
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: animationDuration,
              useNativeDriver: true,
            }).start();
          }
        }}
      />
    </Box>
  );
}
