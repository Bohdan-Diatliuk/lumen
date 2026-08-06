import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ua from "./locales/ua.json";

export default createI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "ua",
  messages: {
    en,
    ua,
  },
});
