import { type Theme as NavigationTheme } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StatusBarProps } from "react-native";

export type DarkMode = "dark" | "light";
export const themeVariants = ["stitch", "flamingo", "grinch", "lorax"] as const;
export type ThemeVariant = (typeof themeVariants)[number];

type Palette = {
  primary: string;
  navigation: string;
  text: string;
  subtle: string;
  surface: string;
  border: string;
  background: string;
  danger: string;
};

type ThemeVariantProps = "navigation" | "primary";
const variants: Record<ThemeVariant, Pick<Palette, ThemeVariantProps>> = {
  stitch: {
    navigation: "#0084FF",
    primary: "#0084FF",
  },
  flamingo: {
    navigation: "#FF8DA1",
    primary: "#FF8DA1",
  },
  grinch: {
    navigation: "#009688",
    primary: "#009688",
  },
  lorax: {
    navigation: "#FFA500",
    primary: "#FFA500",
  },
};

const palettes: Record<DarkMode, Omit<Palette, ThemeVariantProps>> = {
  dark: {
    background: "#000000",
    border: "#2C2C2E",
    danger: "#EE3333",
    subtle: "#9A9A9E",
    surface: "#1C1C1E",
    text: "#E5E5E7",
  },
  light: {
    background: "#F2F2F2",
    border: "#E2E2E2",
    danger: "#EE3333",
    subtle: "#8E8E93",
    surface: "#FFFFFF",
    text: "#1C1C1E",
  },
};

const typographyVariants = {
  h1: {
    fontFamily: "Black",
    fontSize: 24,
  },
  h2: {
    fontFamily: "Bold",
    fontSize: 20,
  },
  h3: {
    fontFamily: "Bold",
    fontSize: 18,
  },
  h4: {
    fontFamily: "Regular",
    fontSize: 13,
    textTransform: "uppercase",
  },
  text: {
    fontFamily: "Regular",
    fontSize: 16,
  },
  annotation: {
    fontFamily: "Light",
    fontSize: 14,
    lineHeight: 20,
  },
  list: {
    fontFamily: "Regular",
    fontSize: 16,
  },
  button: {
    fontFamily: "Bold",
    fontSize: 18,
  },
};

export function buildTheme(variant: ThemeVariant, darkMode: DarkMode) {
  const palette = {
    ...variants[variant],
    ...palettes[darkMode],
  };

  const navigation: NavigationTheme = {
    dark: darkMode === "dark",
    colors: {
      primary: palette.primary,
      background: palette.background,
      card: palette.surface,
      text: palette.text,
      border: palette.border,
      notification: "rgb(255, 59, 48)",
    },
  };

  const screenOptions: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: palette.background,
    },
    headerTitleStyle: {
      fontFamily: "Bold",
      color: palette.text,
    },
    headerTintColor: palette.navigation,
  };

  const StatusBar: StatusBarProps = {
    animated: false,
    barStyle: darkMode === "dark" ? "light-content" : "dark-content",
  };

  const rounded = {
    sm: 3,
    base: 6,
  };

  const theme = {
    darkMode: darkMode === "dark",

    navigation,
    screenOptions,
    StatusBar,

    palette,
    rounded,

    components: {
      Button: {
        primary: {
          backgroundColor: palette.primary,
          borderColor: palette.primary,
          color: "#fff",
        },
        default: {
          backgroundColor: palette.surface,
          borderColor: palette.border,
          color: palette.text,
        },
      },
      List: {
        item: {
          borderBottomColor: palette.border,
        },
      },
      ListEntryGeneric: {
        container: {
          backgroundColor: palette.surface,
        },
        value: {
          color: palette.subtle,
        },
        icon: {
          default: { color: palette.subtle },
          highlight: { color: palette.navigation },
        },
      },
      ListEntryText: {
        label: {
          color: palette.text,
        },
      },
      NavbarIconButton: {
        root: {
          backgroundColor: "transparent",
        },
        Icon: {
          color: palette.navigation,
        },
      },
      Paper: {
        backgroundColor: palette.surface,
      },
      Typography: {
        palette: {
          text: { color: palette.text },
          subtle: { color: palette.subtle },
          primary: { color: palette.primary },
          danger: { color: palette.danger },
          navigation: { color: palette.navigation },
        },
        variants: typographyVariants,
      },
    },
  };

  return theme;
}

export type Theme = ReturnType<typeof buildTheme>;
