import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../public/locales/en/translation.json';
import ar from '../public/locales/ar/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      }
    }
  });

export default i18n;
