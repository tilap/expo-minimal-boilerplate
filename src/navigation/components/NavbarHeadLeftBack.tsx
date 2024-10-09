import { EndToStartIcon } from "@components/Icon";
import { NavbarIconButton } from "@components/NavbarIconButton";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import React from "react";

export function NavbarHeadLeftBack() {
  const navigation = useNavigation();
  const canGoPrevious = useNavigationState((state) => state.routes.length > 1);

  if (!canGoPrevious) {
    return null;
  }

  return <NavbarIconButton Icon={EndToStartIcon} side="left" onPress={() => navigation.goBack()} />;
}
