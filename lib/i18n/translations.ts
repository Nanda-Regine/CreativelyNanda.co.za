import type { Locale } from './config';

// Import translation files
import enCommon from '@/locales/en/common.json';
import afCommon from '@/locales/af/common.json';
import zuCommon from '@/locales/zu/common.json';

const translations: Record<Locale, typeof enCommon> = {
  en: enCommon,
  af: afCommon,
  zu: zuCommon,
};

export function getTranslations(locale: Locale) {
  return translations[locale] || translations.en;
}

// Get a nested translation value by dot-notation key
export function getTranslation(locale: Locale, key: string): string {
  const t = getTranslations(locale);
  const keys = key.split('.');
  let value: unknown = t;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key;
}

export type Translations = typeof enCommon;
