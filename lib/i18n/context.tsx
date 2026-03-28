'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { type Locale, defaultLocale, locales, isValidLocale, LOCALE_COOKIE } from './config';
import { getTranslations, getTranslation, type Translations } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
  translate: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || defaultLocale);

  // Initialize locale from cookie on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const cookieLocale = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${LOCALE_COOKIE}=`))
        ?.split('=')[1];

      if (cookieLocale && isValidLocale(cookieLocale)) {
        setLocaleState(cookieLocale);
      } else {
        // Try to get from browser preference
        const browserLang = navigator.language.split('-')[0];
        if (isValidLocale(browserLang)) {
          setLocaleState(browserLang);
        }
      }
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (locales.includes(newLocale)) {
      setLocaleState(newLocale);
      // Save to cookie
      document.cookie = `${LOCALE_COOKIE}=${newLocale};path=/;max-age=31536000`; // 1 year
    }
  }, []);

  const t = getTranslations(locale);
  const translate = useCallback(
    (key: string) => getTranslation(locale, key),
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, translate }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Convenience hook for just getting translations
export function useTranslations() {
  const { t } = useI18n();
  return t;
}
