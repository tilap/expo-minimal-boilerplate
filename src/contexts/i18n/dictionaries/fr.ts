import { type Dictionary } from "./en";
import { localeValues, localeValuesWithFlags, themeValues } from "./shared";

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
        debug: { label: "Debug" },
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
      entries: {
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
        about: { label: "À propos" },
        resetPreferences: {
          label: "Réinitialiser vos préférences",
          confirm: {
            title: "Réinitialisation",
            message: "Êtes-vous sur de vouloire réinitialiser toutes vos préférences?",
            confirmLabel: "Oui",
            cancelLabel: "Non",
          },
        },
      },
      acknoledgement:
        "Vos préférences seront sauvegardées uniquement sur cet appareil. Si vous réinstallez l'application, vos préférences seront réinitialisées.",
    },
    settingsDarkmode: {
      navigationTitle: "Mode sombre",
      options: darkmodeValues,
      acknowledgement:
        "Si vous choisissez automatique, le mode s'ajustera en fonction de la configuration de votre appareil.",
    },
    settingsLocale: {
      navigationTitle: "Langue",
      options: localeValuesWithFlags,
    },
    settingsThemeVariant: {
      navigationTitle: "Theme",
      options: themeValues,
    },
  },
};
