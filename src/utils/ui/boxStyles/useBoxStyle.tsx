import { useTheme } from "@contexts/theme";
import { type BoxProps as BoxStyleProps, createStyles } from "@lib/createBoxStyles";

export { type BoxProps as BoxStyleProps } from "@lib/createBoxStyles";

export function useBoxStyle(props: BoxStyleProps) {
  const theme = useTheme();
  return createStyles(props, theme.boxMultiplier);
}
