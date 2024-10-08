import React, { useContext, useState } from "react";
import { StatusBar } from "react-native";
import {
  type DarkMode,
  type Theme,
  type ThemeVariant,
  buildTheme,
  themeVariants,
} from "./buildTheme";

export { type Theme, type ThemeVariant, themeVariants } from "./buildTheme";

type Context = {
  theme: Theme;
  themeVariant: ThemeVariant;
  setThemeVariant: (_v: ThemeVariant) => void;
  resetThemeVariant: () => void; // Add reset function type
};
const ThemeContext = React.createContext<Context>({} as unknown as Context);

export function ThemeProvider({
  children,
  darkMode,
  defaultThemeVariant,
  initialThemeVariant,
  onThemeVariantChange,
}: React.PropsWithChildren<{
  darkMode: DarkMode;
  defaultThemeVariant: ThemeVariant;
  initialThemeVariant: ThemeVariant | null;
  onThemeVariantChange?: (_v: string | null) => void;
}>) {
  const [themeVariant, _setThemeVariant] = useState<ThemeVariant>(
    initialThemeVariant || defaultThemeVariant,
  );
  const theme = buildTheme(themeVariant, darkMode);

  function setThemeVariant(v: ThemeVariant) {
    const newVariant = (themeVariants.includes(v) ? v : themeVariants[0]) as ThemeVariant;
    _setThemeVariant(newVariant);
    onThemeVariantChange?.(newVariant);
  }

  function resetThemeVariant() {
    _setThemeVariant(defaultThemeVariant);
    onThemeVariantChange?.(defaultThemeVariant);
  }

  return (
    <ThemeContext.Provider value={{ theme, themeVariant, setThemeVariant, resetThemeVariant }}>
      <StatusBar {...theme.StatusBar} />
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const { theme } = useContext(ThemeContext);
  return theme;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- just so generic
export const useThemedStyles = <T extends (..._args: any) => any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- just so generic
  styles: any,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- just so generic
  ...extras: any
): ReturnType<T> => styles(useTheme(), ...extras);

export function useThemeVariant() {
  const { themeVariant } = useContext(ThemeContext);
  return themeVariant;
}

export function useSetThemeVariant() {
  const { setThemeVariant } = useContext(ThemeContext);
  return setThemeVariant;
}

export function useResetThemeVariant() {
  const { resetThemeVariant } = useContext(ThemeContext);
  return resetThemeVariant;
}

export function useSpacings() {
  const { theme } = useContext(ThemeContext);
  return theme.spacings;
}
