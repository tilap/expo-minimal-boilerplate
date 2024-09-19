import { I18n, TranslateOptions } from "i18n-js";
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

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export type TypedScope = NestedKeyOf<Dictionary>;

type Context = {
  locale: Locale;
  locales: Locale[];
  t: (_key: TypedScope, _props?: TranslateOptions) => string;
  setLocale: (_locale: Locale) => void;
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
  const t = (key: TypedScope, props?: TranslateOptions): string => i18n.t(key, props);

  return (
    <I18nContext.Provider
      value={{
        locale,
        locales,
        setLocale: (loc: Locale) => {
          _setLocale(loc);
          onLocaleChange?.(loc);
        },
        t,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

function useI18n() {
  return useContext(I18nContext);
}

export const useT = () => {
  const { t } = useI18n();
  return t as (_key: TypedScope, _props?: TranslateOptions) => string;
};

export const useLocale = () => {
  const { locale } = useI18n();
  return locale;
};

export const useLocales = () => {
  const context = useI18n();
  return context.locales;
};

export const useSetLocale = () => {
  const { setLocale } = useI18n();
  return setLocale;
};
