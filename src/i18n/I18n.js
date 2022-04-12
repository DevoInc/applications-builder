import template from 'lodash/template';
import { get } from '@devoinc/applications-builder/utils/objects';
import user from '@devoinc/applications-builder/libs/user';

const default_lang = 'en_US';
/**
 * @class
 * This class allows you to manage the translations of the texts contained
 * in the application.
 **/
class I18n {
  /**
   * Constructor
   */
  constructor() {
    this.locales = {};
    // Add defaults locales
    this.addLocale('es_ES', require('./locales/es_ES.json'));
  }

  /**
   * Add locales.
   * @param {string} lang - Language to add, in ISO (es_ES) format.
   * @param {Object} locales - Object with the key/value pairs for locales.
   */
  addLocale(lang, locales) {
    this.locales[lang] = this.locales[lang]
      ? (this.locales[lang] = Object.assign(this.locales[lang], locales))
      : locales;
  }

  /**
   * Add an object of locales.
   * @param {Object} obj - Language object. Key is the language code.
   */
  addLocales(obj) {
    for (let key of Object.keys(obj)) {
      this.addLocale(key, obj[key]);
    }
  }

  /**
   * Translate a string to the current locale.
   * @param {string} str - String to translate.
   * @param {string} [lang=null] - The destination language (Auto if null).
   * @return {string}
   */
  trans(str, lang = null) {
    lang = lang !== null ? lang : this.getLang();
    return get(this.locales, [lang, str], str);
  }

  /**
   * Get the language of the user based on one setted by the platform.
   */
  getLang() {
    if (this.force) return this.force;
    if (user != null) {
      let res = Object.keys(this.locales).filter((s) => {
        return (
          s == user.getLocale() ||
          s == user.getLocale().replace('-', '_') ||
          s.indexOf(user.getLocale()) !== -1
        );
      });
      if (res.length === 0) return default_lang;
      return res[0];
    }
    return default_lang;
  }

  /**
   * Return the locale region code: 'en', 'es', ...
   * @return {string} Region code.
   */
  getRegionCode() {
    return this.getLang().substring(0, 2);
  }

  unescapeExtend(str) {
    str = decodeURI(str);
    str = str.replace('&amp;', '&');
    str = str.replace('&lt;', '<');
    str = str.replace('&gt;', '>');
    str = str.replace('&quot;', '"');
    str = str.replace('&#x27', "'");
    return str;
  }

  /**
   * Initialize translations
   * @param {string|boolean} [force=false] - Force to passed language.
   */
  init(lang = null) {
    let $sel = $('.lt-vapp'); // app-container
    if (lang !== null) this.setLang(lang);
    $sel.html(
      template(
        $sel.html(),
        {}
      )({
        __: (str) => this.trans(this.unescapeExtend(str)),
      })
    );
  }

  /**
   * Set the language.
   * @param {string} [lang='en_US'] Language to force (es_ES, en_US, ...)
   */
  setLang(lang = null) {
    this.force = lang;
  }
}

export default new I18n();
