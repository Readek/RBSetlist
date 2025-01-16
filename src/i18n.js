import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { enLang } from "./lang/en.mjs";
import { esLang } from "./lang/es.mjs";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
        en: {
            translation: enLang
        },
        es: {
            translation: esLang
        },
    },
  });

export default i18n;
