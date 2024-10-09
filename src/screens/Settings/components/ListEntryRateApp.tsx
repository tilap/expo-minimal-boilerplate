import { RateIcon } from "@components/Icon";
import { ListEntryText } from "@components/ListEntryText";
import * as StoreReview from "expo-store-review";
import React, { useEffect, useState } from "react";

export function ListEntryRateApp({ label, url }: { label: string; url: string }) {
  const [isStoreReviewAvailable, setIsStoreReviewAvailable] = useState<boolean>(false);

  useEffect(() => {
    const checkStoreReviewAvailability = async () => {
      const available = await StoreReview.isAvailableAsync();
      setIsStoreReviewAvailable(available);
    };

    checkStoreReviewAvailability();
  }, []);

  if (!url || !isStoreReviewAvailable) {
    return null;
  }

  const handleRateApp = () => {
    if (!url) return;
    StoreReview.requestReview();
  };

  return <ListEntryText label={label} onPress={handleRateApp} Icon={RateIcon} />;
}
