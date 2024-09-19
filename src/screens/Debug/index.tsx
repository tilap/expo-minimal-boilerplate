import { Box } from "@components/Box";
import { Paper } from "@components/Paper";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import { useConfig } from "@contexts/config";
import { usePreferences } from "@utils/stores/preferences";
import React from "react";

export function Debug() {
  const config = useConfig();
  const preferences = usePreferences();
  return (
    <ScreenContainer preset="page" withScrollView>
      <Box p={2}>
        <Typography variant="h3">Configuration</Typography>
      </Box>
      <Paper>
        <Box p={2}>
          <Typography variant="text">{JSON.stringify(config, null, 4)}</Typography>
        </Box>
      </Paper>
      <Box p={2} mt={4}>
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
