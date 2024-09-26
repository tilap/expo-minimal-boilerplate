import { Box } from "@components/Box";
import { ScreenContainer } from "@components/ScreenContainer";
import { Typography } from "@components/Typography";
import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export function HomeScreen() {
  return (
    <ScreenContainer preset="full" style={styles.container}>
      <Box mb={8}>
        <Typography variant="h1">Hello world :)</Typography>
      </Box>
      <Box>
        <Typography variant="text">Super cali fragilistic expiali docious</Typography>
      </Box>
    </ScreenContainer>
  );
}
