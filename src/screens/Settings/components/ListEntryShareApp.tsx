import { ShareIcon } from "@components/Icon";
import { ListEntryText } from "@components/ListEntryText";
import React from "react";
import { Share } from "react-native";

export function ListEntryShareApp({
  url,
  label,
  message,
}: {
  url: string;
  label: string;
  message: string;
}) {
  if (!url) {
    return null;
  }

  const handleShareApp = async () => {
    try {
      await Share.share({
        message,
        url,
      });
    } catch (error) {
      console.error("Error sharing app:", error);
    }
  };

  return <ListEntryText label={label} onPress={handleShareApp} Icon={ShareIcon} />;
}
