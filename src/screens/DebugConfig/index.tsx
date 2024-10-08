import { Box } from "@components/Box";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { useConfig } from "@contexts/config";
import { useCorePreferences } from "@utils/stores/preferences";
import React from "react";

export function DebugConfigScreen() {
  const config = useConfig();
  const preferences = useCorePreferences();

  return (
    <ScreenContainer preset="page" withScrollView>
      <Box px={2} pb={2}>
        <Typography variant="h3">Configuration</Typography>
      </Box>
      <Paper>
        <Box p={2}>
          <Typography variant="text">{JSON.stringify(config, null, 4)}</Typography>
        </Box>
      </Paper>
      <Box px={2} pb={2} mt={6}>
        <Typography variant="h3">Preferences</Typography>
      </Box>
      <Paper>
        <Box p={2}>
          <Typography variant="text">{JSON.stringify(preferences, null, 4)}</Typography>
        </Box>
      </Paper>
    </ScreenContainer>
  );
}
