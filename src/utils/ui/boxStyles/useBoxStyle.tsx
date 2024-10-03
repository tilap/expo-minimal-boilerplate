import { useTheme } from "@contexts/theme";
import { type BoxProps, createStyles } from "@lib/createBoxStyles";

export { type BoxProps } from "@lib/createBoxStyles";

export function useBoxStyle(props: BoxProps) {
  const theme = useTheme();
  return createStyles(props, theme.boxMultiplier);
}
