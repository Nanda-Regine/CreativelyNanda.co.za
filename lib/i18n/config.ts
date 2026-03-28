export const locales = ['en', 'af', 'zu'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  af: 'Afrikaans',
  zu: 'isiZulu',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  af: '🇿🇦',
  zu: '🇿🇦',
};

// Cookie name for storing locale preference
export const LOCALE_COOKIE = 'NEXT_LOCALE';

// Check if a string is a valid locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}
