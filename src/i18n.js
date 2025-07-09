import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Your translation files
import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';
import translationDE from './locales/de/translation.json';
import translationES from './locales/es/translation.json';
import translationIT from './locales/it/translation.json';
import translationZH from './locales/zh/translation.json';
import translationPT from './locales/pt/translation.json';

const resources = {
  EN: { translation: translationEN },
  FR: { translation: translationFR },
  DE: { translation: translationDE },
  ES: { translation: translationES },
  IT: { translation: translationIT },
  ZH: { translation: translationZH },
  PT: { translation: translationPT },

};

i18n
  .use(LanguageDetector) // Detects user's language from browser
  .use(initReactI18next) // Connects with React
  .init({
    resources,
    fallbackLng: 'EN', // Fallback if detection fails
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // So user’s choice is remembered
    },
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
