import { type FormatNumberOptions, I18n } from "i18n-js";
import moment from "moment";
import React, { createContext, useContext, useMemo, useState } from "react";
import { type Dictionary } from "./dictionaries/en";
import { dictionary as en } from "./dictionaries/en";
import { dictionary as fr } from "./dictionaries/fr";

// eslint-disable-next-line import/no-unassigned-import -- normal usecase
import "moment/min/locales";

export type Locale = "fr" | "en";
export const locales = ["en", "fr"] as Locale[];
const dictionaries: Record<Locale, Dictionary> = { en, fr };

const numberFormats: Record<Locale, Pick<FormatNumberOptions, "delimiter" | "separator">> = {
  fr: { delimiter: " ", separator: "," },
  en: { delimiter: ",", separator: "." },
};

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TypedScope = NestedKeyOf<Dictionary>;

type Context = {
  locale: Locale;
  locales: Locale[];
  setLocale: (_locale: Locale) => void;
  resetLocale: () => void;
  i18n: I18n;
};

const I18nContext = createContext<Context>(null as unknown as Context);

export function I18nProvider({
  children,
  defaultLocale,
  initialLocale,
  onLocaleChange,
}: React.PropsWithChildren<{
  defaultLocale: Locale;
  initialLocale: Locale | null;
  onLocaleChange?: (_locale: Locale) => void;
}>) {
  const [locale, _setLocale] = useState<Locale>(initialLocale || defaultLocale);
  moment.locale(locale);

  const i18n = useMemo(
    () =>
      new I18n(dictionaries, {
        locale,
        enableFallback: true,
        defaultLocale,
      }),
    [locale, defaultLocale],
  );

  return (
    <I18nContext.Provider
      value={{
        locale,
        locales,
        setLocale: (loc: Locale) => {
          _setLocale(loc);
          onLocaleChange?.(loc);
        },
        resetLocale: () => {
          _setLocale(defaultLocale);
          onLocaleChange?.(defaultLocale);
        },
        i18n,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

function useI18n() {
  return useContext(I18nContext);
}

export function useLocale() {
  const { locale } = useI18n();
  return locale;
}

export function useLocales() {
  const context = useI18n();
  return context.locales;
}

export function useSetLocale() {
  const { setLocale } = useI18n();
  return setLocale;
}

export function useResetLocale() {
  const { resetLocale } = useI18n();
  return resetLocale;
}

// i18n binding
export function useT(): I18n["t"] {
  const { i18n } = useI18n();
  return i18n.t.bind(i18n);
}

export function useFormatNumber(): (v: string | number) => string {
  const { i18n, locale } = useI18n();
  const format = i18n.numberToDelimited.bind(i18n);
  return (v) => format(v, numberFormats[locale]);
}

export function useInterpolate(): I18n["interpolate"] {
  const { i18n } = useI18n();
  return i18n.interpolate.bind(i18n);
}
