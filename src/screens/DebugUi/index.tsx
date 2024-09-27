import { Box } from "@components/Box";
import { Button, Demo as ButtonDemo } from "@components/Button";
import { Demo as IconDemo } from "@components/Icon";
import { Demo as PaperDemo } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Demo as TypographyDemo } from "@components/Typography";
import { NavbarHeadRightDarkmode } from "@navigation/components/NavbarHeadRightDarkmode";
import { useGoToDebugUi } from "@navigation/helpers";
import { type AppStackParams, Routes } from "@navigation/routes";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export function DebugUiScreen() {
  const route = useRoute<RouteProp<AppStackParams, Routes.DebugUi>>();
  const { item } = route.params;
  const SectionToRender = item && items[item as keyof typeof items];
  const gotoDebugUi = useGoToDebugUi();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components -- required to keep hook calls order
      headerRight: () => <NavbarHeadRightDarkmode />,
    });
  }, [navigation]);

  return (
    <ScreenContainer preset="full">
      <Box fullWidth p={4}>
        {SectionToRender && <Button mb={2} onPress={() => gotoDebugUi("")} text="Retour" />}
        {!SectionToRender && (
          <Box gap={16}>
            {Object.keys(items).map((entry) => (
              <Button key={entry} mb={2} onPress={() => gotoDebugUi(entry)} text={entry} />
            ))}
          </Box>
        )}
      </Box>
      {SectionToRender && (
        <ScrollView style={styles.scrollView}>
          <Box fullWidth p={4}>
            <SectionToRender />
          </Box>
        </ScrollView>
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
