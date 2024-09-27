import React, { useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

const resolvedDarkModes = ["light", "dark"] as const;
export const darkModes = [...resolvedDarkModes, "system"] as const;

export type ResolvedDarkMode = (typeof resolvedDarkModes)[number];
export type DarkMode = (typeof darkModes)[number];

type Context = {
  darkMode: DarkMode;
  resolvedDarkMode: ResolvedDarkMode;
  setDarkMode: (_mode: DarkMode) => void;
  resetDarkMode: () => void; // Ajout de la fonction de réinitialisation
};

export const DarkmodeContext = React.createContext<Context>(null as unknown as Context);

export function DarkmodeProvider({
  children,
  defaultMode,
  initialMode,
  onDarkmodeChange,
}: React.PropsWithChildren<{
  defaultMode: DarkMode;
  initialMode?: DarkMode | null;
  onDarkmodeChange?: (_mode: DarkMode) => void;
}>) {
  const [darkMode, _setDarkMode] = useState<DarkMode>(initialMode || defaultMode);
  const deviceColorScheme = useColorScheme();
  const resolvedDarkMode = useMemo(() => {
    switch (darkMode) {
      case "light":
        return "light";
      case "dark":
        return "dark";
      case "system":
      default:
        const resolveDevideColorScheme = deviceColorScheme === "dark" ? "dark" : "light";
        return resolveDevideColorScheme;
    }
  }, [darkMode, deviceColorScheme]);

  function setDarkMode(mode: DarkMode) {
    const newMode = (
      resolvedDarkModes.includes(mode as ResolvedDarkMode) ? mode : defaultMode
    ) as DarkMode;
    _setDarkMode(newMode);
    onDarkmodeChange?.(newMode);
  }

  function resetDarkMode() {
    _setDarkMode(defaultMode);
    onDarkmodeChange?.(defaultMode);
  }

  return (
    <DarkmodeContext.Provider
      value={{
        darkMode,
        resolvedDarkMode,
        setDarkMode,
        resetDarkMode, // Ajout de la fonction de réinitialisation au contexte
      }}
    >
      {children}
    </DarkmodeContext.Provider>
  );
}

function useDarkmodeContext() {
  return useContext(DarkmodeContext);
}

export function useDarkmode() {
  const { darkMode } = useDarkmodeContext();
  return darkMode;
}

export function useResolvedDarkmode() {
  const { resolvedDarkMode } = useDarkmodeContext();
  return resolvedDarkMode;
}

export function useSetDarkmode() {
  const { setDarkMode } = useDarkmodeContext();
  return setDarkMode;
}

export function useResetDarkmode() {
  const { resetDarkMode } = useDarkmodeContext();
  return resetDarkMode;
}
