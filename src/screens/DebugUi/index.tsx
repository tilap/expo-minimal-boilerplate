import { Box } from "@components/Box";
import { Button, Demo as ButtonDemo } from "@components/Button";
import { Demo as IconDemo } from "@components/Icon";
import { Demo as PaperDemo } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Demo as TypographyDemo } from "@components/Typography";
import { useT } from "@contexts/i18n";
import { NavbarHeadRightDarkmode } from "@navigation/components/NavbarHeadRightDarkmode";
import { useGoToDebugUi } from "@navigation/helpers";
import { type AppStackParams, Routes } from "@navigation/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export function DebugUiScreen() {
  const route = useRoute<RouteProp<AppStackParams, Routes.DebugUi>>();
  const { item } = route.params;
  const SectionToRender = item && items[item as keyof typeof items];
  const gotoDebugUi = useGoToDebugUi();
  const t = useT();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components -- required to keep hook calls order
      headerRight: () => <NavbarHeadRightDarkmode />,
    });
  }, [navigation]);

  return (
    <ScreenContainer preset="full">
      {!SectionToRender && (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Box fullWidth p={4} gap={16} flex={1} justifyContent="center">
            {Object.keys(items).map((itemName) => (
              <Button key={itemName} mb={2} onPress={() => gotoDebugUi(itemName)} text={itemName} />
            ))}
          </Box>
        </ScrollView>
      )}
      {SectionToRender && (
        <>
          <ScrollView style={styles.scrollView}>
            <Box fullWidth>
              <SectionToRender />
            </Box>
          </ScrollView>

          <Box fullWidth mt={16}>
            <Button
              mt={2}
              scheme="primary"
              onPress={() => gotoDebugUi("")}
              text={t("screens.debugUi.buttons.back.label")}
            />
          </Box>
        </>
      )}
    </ScreenContainer>
  );
}

const items = {
  Typography: () => <TypographyDemo />,
  Button: () => <ButtonDemo />,
  Icon: () => <IconDemo />,
  Paper: () => <PaperDemo />,
};
