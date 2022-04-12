/**
 * @category Utils
 * @subcategory Bootstrap
 * @module bootstrap */

import createDefaultSettings from './settings';
import { i18n } from '@devoinc/applications-builder/i18n'; // Need to be used from index for Singleton
import FullScreenShotBtn from './FullScreenShotBtn';
import TvBtn from './TvBtn';
import dataTree from '@devoinc/applications-builder/data/dataTree';

export default {
  /**
   * Bootstrap languages, this process process the index.html for convert any
   * language string to the right language.
   *
   * This process replace the current object .lt-vapp from the DOM so must be
   * the first.
   *
   * The default language if multilanguage support is not
   * required could be setted passing the force argument.
   * This argument is a string with the locale in the
   * xx_XX format
   * @param {Object} obj - Languages object
   * @param {String} [force=null] - Force one language
   */
  langs(obj, force = null) {
    i18n.addLocales(obj);
    i18n.init(force);
  },

  /**
   * Bootstrap an App with the default configurations.
   * @param {App} app - The app to bootstrap
   * @param {Object} [conf={}] - Extra configuration
   * @param {Boolean} [conf.defaultSettingsPanel=true] - Panel por defecto
   * @param {Boolean} [conf.tvBtn=true] - TV Button
   * @param {Boolean} [conf.fsBtn=true] - Fullscreen button
   * @param {String} [conf.theme='theme-light'] - Default theme
   * @param {String} [conf.titleSize=''] - Title size
   * @param {Boolean} [conf.displayCompact=true] - Display compact
   * @param {Boolean} [conf.displayBordered=true] - Display bordered
   * @param {Boolean} [conf.displayCollapsibles=true] - Display collapsibles
   * @param {Boolean} [conf.displayDescription=true] - Display description
   * @param {Boolean} [conf.displayMenuWidgetsExpanded=true] - Display Menu Widgets Expanded
   * @param {Function} conf.datesCallback - Show dates on input after update
   */
  app(app, conf = {}) {
    conf = Object.assign(
      {
        defaultSettingsPanel: true,
        tvBtn: true,
        fsBtn: true,
        theme: 'theme-light',
        titleSize: '',
        displayCompact: false,
        displayBordered: false,
        displayCollapsibles: true,
        displayDescription: true,
        displayMenuWidgetsExpanded: false,
        dates: {
          from: moment().subtract(1, 'day').valueOf(),
          to: moment().valueOf(),
        },
        datesCallback(dates) {
          // By default only update dates from this ids
          $('#calfrom').html(moment(dates.from).format('YYYY-MM-DD HH:mm'));
          $('#calto').html(moment(dates.to).format('YYYY-MM-DD HH:mm'));
        },
      },
      conf
    );

    // Create settings
    if (conf.defaultSettingsPanel) {
      let settings = createDefaultSettings(conf);
      app.setSettingsPanel(settings);
      settings.applyInitialChanges();
    }

    // Create Toolbar Buttons
    if (conf.fsBtn) app.tabsBar.addButton(new FullScreenShotBtn());
    if (conf.tvBtn) app.tabsBar.addButton(new TvBtn());

    // Default DateRange
    if (conf.dates !== false) {
      app.data.set('dates', conf.dates);
      dataTree.root.subscribe('dates', conf.datesCallback);
      conf.datesCallback(conf.dates);
    }
  },
};
