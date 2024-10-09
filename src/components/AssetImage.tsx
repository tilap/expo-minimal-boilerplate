import { ActivityIndicator } from "@components/ActivityIndicator";
import { Box } from "@components/Box";
import { Theme, useThemedStyles } from "@contexts/theme";
import { type Asset, getAssetInfoAsync } from "expo-media-library";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  DimensionValue,
  type ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
} from "react-native";

const styles = (theme: Theme, width: DimensionValue, height: DimensionValue) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.components.AssetImage.backgroundColor,
      justifyContent: "center",
      alignItems: "center",
      width,
      height,
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
  width?: number;
  height?: number;
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
  const themedStyles = useThemedStyles<typeof styles>(styles, width, height);
  const [localUri, setLocalUri] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(disableAnimation ? 1 : 0)).current;

  useEffect(() => {
    let isMounted = true;
    getAssetInfoAsync(id).then((info) => {
      if (isMounted) {
        setLocalUri(info.localUri);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

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
