// src/i18n/index.ts

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources } from "./resources";

const isDev = import.meta.env.DEV;

// Ngăn lỗi "i18n already initialized" khi Vite HMR
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "en",
      supportedLngs: ["en", "vi"],
      debug: isDev,

      interpolation: {
        escapeValue: false, // React đã escape sẵn
      },

      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        caches: ["localStorage"],
      },
    });
}

export default i18n;