import { Box } from "@components/Box";
import { Button, Demo as ButtonDemo } from "@components/Button";
import { Demo as IconDemo } from "@components/Icon";
import { Demo as PaperDemo } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Demo as TypographyDemo } from "@components/Typography";
import { useGoToDebugUi } from "@navigation/helpers";
import { AppStackParams, Routes } from "@navigation/routes";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { ScrollView } from "react-native";

export function DebugUiScreen() {
  const route = useRoute<RouteProp<AppStackParams, Routes.DebugUi>>();
  const { item } = route.params;
  const SectionToRender = item && items[item as keyof typeof items];
  const gotoDebugUi = useGoToDebugUi();

  return (
    <ScreenContainer preset="full">
      <Box fullWidth p={4}>
        {SectionToRender && <Button mb={2} onPress={() => gotoDebugUi("")} text="Retour" />}
        {!SectionToRender && (
          <Box gap={16}>
            {Object.keys(items).map((item) => (
              <Button key={item} mb={2} onPress={() => gotoDebugUi(item)} text={item} />
            ))}
          </Box>
        )}
      </Box>
      {SectionToRender && (
        <ScrollView style={{ flex: 1 }}>
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
