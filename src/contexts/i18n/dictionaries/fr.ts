import { type Dictionary } from "./en";
import { localeValues, themeValues } from "./shared";

const darkmodeValues = {
  dark: "Activé",
  light: "Désactivé",
  system: "Automatique",
};

export const dictionary: Dictionary = {
  navigation: {
    headerBackTitle: "Retour",
  },
  screens: {
    about: {
      navigationTitle: "À propos",
      entries: {
        version: { label: "Version" },
        privacy: { label: "Politique de confidentialité" },
        terms: { label: "Conditions d'utilisations" },
      },
    },
    debug: {
      navigationTitle: "Debug",
    },
    home: {
      navigationTitle: "Accueil",
    },
    legalWebview: {
      privacy: {
        title: "Politique de confidentialité",
      },
      terms: {
        title: "Conditions d'utilisation",
      },
      loading: "Chargement...",
      error: "Impossible d'ouvrir la page web",
    },
    settings: {
      navigationTitle: "Préférences",
      options: {
        darkmode: {
          label: "Mode sombre",
          values: darkmodeValues,
        },
        locale: {
          label: "Langue",
          values: localeValues,
        },
        themeVariant: {
          label: "Thème",
          values: themeValues,
        },
        about: {
          label: "À propos",
        },
        debug: {
          label: "Debug",
        },
      },
      acknoledgement:
        "Vos préférences seront sauvegardées uniquement sur cet appareil. Si vous réinstallez l'application, vos préférences seront réinitialisées.",
    },
    settingsDarkmode: {
      navigationTitle: "Mode sombre",
      options: darkmodeValues,
    },
    settingsLocale: {
      navigationTitle: "Langue",
      options: localeValues,
      acknoledgement:
        "Si vous choisissez automatique, le thème s'ajustera en fonction de la configuration de votre appareil.",
    },
    settingsThemeVariant: {
      navigationTitle: "Theme",
      options: themeValues,
    },
  },
};
