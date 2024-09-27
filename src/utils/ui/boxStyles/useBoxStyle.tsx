import { type Theme, useTheme } from "@contexts/theme";
import { type BoxProps, createStyles } from "@lib/createBoxStyles";

export type BoxStyleProps = BoxProps<Theme>;

export function useBoxStyle(props: BoxStyleProps) {
  const theme = useTheme();
  return createStyles<Theme>(props, theme);
}
