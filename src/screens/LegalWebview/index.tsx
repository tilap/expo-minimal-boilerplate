import { Box } from "@components/Box";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { useUrls } from "@contexts/config";
import { useT } from "@contexts/i18n/index";
import { AppStackParams, Routes } from "@navigation/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nestedContainer: {
    flex: 1,
  },
});

export function LegalWebview() {
  const t = useT();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<AppStackParams, Routes.LegalWebview>>();
  const { type } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const opacity = useSharedValue(0);
  const urls = useUrls();

  useEffect(() => {
    navigation.setOptions({
      title: t(`screens.legalWebview.${type}.title`),
    });
  }, [navigation, type, t]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const handleLoadEnd = () => {
    setIsLoading(false);
    opacity.value = withTiming(1, { duration: 400 });
  };

  return (
    <ScreenContainer preset="full" style={styles.container}>
      {(isLoading || hasError) && (
        <Box flex={1} alignItems="center" justifyContent="center">
          {isLoading && (
            <>
              <ActivityIndicator size="large" />
              <Box p={3}>
                <Typography palette="subtle" variant="annotation">
                  {t("screens.legalWebview.loading")}
                </Typography>
              </Box>
            </>
          )}
          {hasError && (
            <Typography variant="text" palette="danger">
              {t("screens.legalWebview.error")}
            </Typography>
          )}
        </Box>
      )}

      <Animated.View style={[!isLoading && styles.nestedContainer, animatedStyle]}>
        <WebView
          source={{ uri: urls[type] }}
          style={styles.nestedContainer}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={handleLoadEnd}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </Animated.View>
    </ScreenContainer>
  );
}
