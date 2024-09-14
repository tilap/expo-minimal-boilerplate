import FeatherIcons from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { ComponentProps } from "react";

type IoniconsProps = ComponentProps<typeof Ionicons>;
type Props = Omit<IoniconsProps, "name">;

export const StartToEndIcon = (props: Props) => <MaterialIcons name="chevron-right" {...props} />;
export const EndToStartIcon = (props: Props) => <MaterialIcons name="chevron-left" {...props} />;

export const CheckmarkIcon = (props: Props) => <FeatherIcons name="check" {...props} />;
export const BrushIcon = (props: Props) => <FontAwesome5 name="brush" {...props} />;

export const DarkmmodeAutomaticIcon = (props: Props) => (
  <MaterialCommunityIcons name="theme-light-dark" {...props} />
);
export const DarkmodeDarkIcon = (props: Props) => <MaterialIcons name="dark-mode" {...props} />;
export const DarkmodeLightIcon = (props: Props) => <MaterialIcons name="light-mode" {...props} />;

export const SettingsIcon = (props: Props) => <Ionicons name="settings-outline" {...props} />;
