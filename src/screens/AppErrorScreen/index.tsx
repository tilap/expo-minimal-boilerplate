/* Keep this screen very basic */
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});

export const AppErrorScreen = () => {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.container}>
        <Text style={styles.title}>Error</Text>

        <Text style={styles.text}>An unexpected error occured.</Text>
      </View>
    </SafeAreaView>
  );
};
