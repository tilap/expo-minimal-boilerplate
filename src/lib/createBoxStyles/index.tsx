import { DimensionValue, ViewProps, ViewStyle } from "react-native";
import { applyMultiplier } from "./utils";

// Define props for margin and padding
type MarginPaddingProps = {
  m?: DimensionValue;
  mt?: DimensionValue;
  mr?: DimensionValue;
  mb?: DimensionValue;
  ml?: DimensionValue;
  mx?: DimensionValue;
  my?: DimensionValue;
  p?: DimensionValue;
  pt?: DimensionValue;
  pr?: DimensionValue;
  pb?: DimensionValue;
  pl?: DimensionValue;
  px?: DimensionValue;
  py?: DimensionValue;
};

// Define props for flexbox properties
type FlexboxProps = {
  flex?: number | "auto" | "none";
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: DimensionValue;
};

// Combine all props for the Box component, now using a generic type T for theme
export interface BoxProps extends ViewProps, MarginPaddingProps, FlexboxProps {
  fullWidth?: boolean;
  display?: ViewStyle["display"];
}

// Apply margin and padding styles to a ViewStyle object
const applyMarginPadding = (
  styles: ViewStyle,
  props: MarginPaddingProps,
  multiplier: number,
): ViewStyle => {
  const { m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py } = props;

  const marginPaddingStyles: ViewStyle = {
    ...(m !== undefined && { margin: applyMultiplier(multiplier, m) }),
    ...(mt !== undefined && { marginTop: applyMultiplier(multiplier, mt) }),
    ...(mr !== undefined && { marginRight: applyMultiplier(multiplier, mr) }),
    ...(mb !== undefined && { marginBottom: applyMultiplier(multiplier, mb) }),
    ...(ml !== undefined && { marginLeft: applyMultiplier(multiplier, ml) }),
    ...(mx !== undefined && { marginHorizontal: applyMultiplier(multiplier, mx) }),
    ...(my !== undefined && { marginVertical: applyMultiplier(multiplier, my) }),
    ...(p !== undefined && { padding: applyMultiplier(multiplier, p) }),
    ...(pt !== undefined && { paddingTop: applyMultiplier(multiplier, pt) }),
    ...(pr !== undefined && { paddingRight: applyMultiplier(multiplier, pr) }),
    ...(pb !== undefined && { paddingBottom: applyMultiplier(multiplier, pb) }),
    ...(pl !== undefined && { paddingLeft: applyMultiplier(multiplier, pl) }),
    ...(px !== undefined && { paddingHorizontal: applyMultiplier(multiplier, px) }),
    ...(py !== undefined && { paddingVertical: applyMultiplier(multiplier, py) }),
  };

  return {
    ...styles,
    ...marginPaddingStyles,
  };
};

// Create styles based on props and theme
// Now using a generic type Theme with a default of object
export function createStyles(props: BoxProps, multiplier: number = 4): ViewStyle {
  const {
    flex,
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    gap, // Destructure gap
    fullWidth,
    display,
    ...marginPaddingProps
  } = props;

  // Create base styles from flexbox props
  const baseStyles: ViewStyle = {
    ...(flex === "auto" && { flex: 1 }),
    ...(flex === "none" || typeof flex !== "number" ? {} : { flex }),
    ...(flexDirection && { flexDirection }),
    ...(flexWrap && { flexWrap }),
    ...(justifyContent && { justifyContent }),
    ...(alignItems && { alignItems }),
    ...(fullWidth && { width: "100%" }),
    ...(display && { display }),
    ...(gap !== undefined && { gap: Number(applyMultiplier(multiplier, gap) || 0) }),
  };

  // Apply margin and padding to base styles
  return applyMarginPadding(baseStyles, marginPaddingProps, multiplier);
}

// Usage example (commented out)
//
// export const Box: React.FC<BoxProps> = ({ children, style, sx, ...props }) => {
//   const theme = useTheme();
//   const boxStyles = createStyles({...props }, 4);
//   return <View style={[boxStyles, style]}>{children}</View>;
// };
//
// Usage: <Box my={10} fullWidth sx={{ p: 2 }}>....</Box>
//
