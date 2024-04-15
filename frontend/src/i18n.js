import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend"; // For loading translations from files
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      // ... other English translations
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      // ... other Spanish translations
    },
  },
};

i18n
  .use(Backend) // Load translations from JSON files below
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en", // Default language if not detected in the browser
    debug: true, // Turn on to see console logs for debugging

    interpolation: {
      escapeValue: false, // Prevent XSS attacks
    },
  });

export default i18n;
