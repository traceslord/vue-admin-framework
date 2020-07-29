import Vue from "vue";
import VueI18n from "vue-i18n";
import enUS from "./element/en-US";
import zhCN from "./element/zh-CN";
import frFR from "./element/fr-FR";

Vue.use(VueI18n);

const LOCALE = "jk_locale";
export const SUPPORTED_LANGS = ["en-US", "zh-CN", "fr-FR"];
const DEFAULT_LANG = SUPPORTED_LANGS[0];

export const setLocale = lang => localStorage.setItem(LOCALE, lang);
export const getLocale = () => {
  const lang = localStorage.getItem(LOCALE);
  return lang && SUPPORTED_LANGS.includes(lang) ? lang : DEFAULT_LANG;
};

const ELEMENT_LANG = {
  "en-US": enUS,
  "zh-CN": zhCN,
  "fr-FR": frFR
};

function loadLocaleMessages() {
  const locales = require.context(
    "./project",
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = {
        ...locales(key),
        ...ELEMENT_LANG[locale]
      };
    }
  });
  return messages;
}

export default new VueI18n({
  locale: getLocale(),
  fallbackLocale: DEFAULT_LANG,
  messages: loadLocaleMessages()
});
