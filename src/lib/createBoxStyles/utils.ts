import { DimensionValue } from "react-native";

// Apply multiplier to numeric values
export const applyMultiplier = (
  multiplier: number,
  value: DimensionValue | undefined,
): DimensionValue | undefined => {
  if (typeof value === "number") {
    return value * multiplier;
  }
  return value;
};
