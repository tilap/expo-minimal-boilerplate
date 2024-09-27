import FeatherIcons from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { ComponentProps } from "react";
import { View } from "react-native";

export type IconProps = Omit<ComponentProps<typeof Ionicons>, "name">;

export const StartToEndIcon = (props: IconProps) => (
  <MaterialIcons name="chevron-right" {...props} />
);
export const EndToStartIcon = (props: IconProps) => (
  <MaterialIcons name="chevron-left" {...props} />
);

export const CheckmarkIcon = (props: IconProps) => <FeatherIcons name="check" {...props} />;
export const BrushIcon = (props: IconProps) => <FontAwesome5 name="brush" {...props} />;

export const DarkmodeAutomaticIcon = (props: IconProps) => (
  <MaterialCommunityIcons name="theme-light-dark" {...props} />
);
export const DarkmodeDarkIcon = (props: IconProps) => <MaterialIcons name="dark-mode" {...props} />;
export const DarkmodeLightIcon = (props: IconProps) => (
  <MaterialIcons name="light-mode" {...props} />
);

export const SettingsIcon = (props: IconProps) => <Ionicons name="settings-outline" {...props} />;

export const Demo = () => (
  <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
    <EndToStartIcon size={36} />
    <StartToEndIcon size={36} />
    <CheckmarkIcon size={36} />
    <BrushIcon size={36} />
    <DarkmodeAutomaticIcon size={36} />
    <DarkmodeDarkIcon size={36} />
    <DarkmodeLightIcon size={36} />
    <SettingsIcon size={36} />
  </View>
);
