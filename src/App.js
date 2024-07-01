// This import is needed so that webpack adds datatables to the bundle
import psdatatables from './thirdparty/datatables/datatables.min';
import MarkerClusterer from '@google/markerclustererplus';
require('./libs/bullet.js');
import Request from '@devoinc/applications-data-library/requests/Request';

import TabsBar from './TabsBar';
import dataTree from './data/dataTree';
import requests from './data/requests';

import { v4 } from 'uuid';
/**
 * @class
 * This is the main class to create an application.
 *
 * All applications has the same structure:
 * `App → Tabs → Sections → Widgets`
 */
class App {
  /**
   * The default _settings_ configuration is:
   * ```
   * {
   *   firstTabIndex: 0,   // First tab index
   *   transition: {
   *     effect: 'none',   // Effect: 'fade', 'slide' or 'none'.
   *     duration: 0       // Effect duration in milliseconds.
   *   },
   *   onInit: null        // function to call on initialize the application.
   * }
   * ```
   * @constructor
   * @param {string} id - Id of the aplication
   * @param {Object} [settings={}] - Settings object
   */
  constructor(id, settings = {}) {
    this.status = 'loading';
    this.id = id;
    this.data = dataTree.root;
    this.el = document.querySelector('.lt-vapp');

    // Init MarkerClusterer (required for circle map widget)
    if(!window.MarkerClusterer) {
      window.MarkerClusterer = MarkerClusterer;
      window.MarkerClusterer.IMAGE_PATH = "static/assets/img/components/widgets/circleWorldMap/m"
    }

    // Create global namespace for apps framework stuff
    if (!window.vapp_framework) {
      window.vapp_framework = {};
    }

    this.settings = Object.assign(
      {
        firstTabIndex: 0,
        transition: {
          effect: 'none',
          duration: 0,
        },
        onInit: null,
      },
      settings
    );

    this.tabsBar = new TabsBar(this.settings);
    this.tabs = this.tabsBar.tabs; // For quick reference
    this.settingsPanel = null;
    this._setListeners();
  }

  /**
   * Set settings panel.
   * @param {Object} settingsPanel - Set the settings panel.
   */
  setSettingsPanel(settingsPanel) {
    this.settingsPanel = settingsPanel;
  }

  // Set default listeners
  _setListeners() {
    let onChangeContainer = (evt) => {
      evt.preventDefault();
      if (evt.detail.page.endsWith(`/${this.id}`)) {
        evt.currentTarget.removeEventListener(evt.type, onChangeContainer);
        this.status = 'ready';
      }
    };
    document.addEventListener('changeContainer', onChangeContainer);
  }

  /**
   * Add a tab to the aplication.
   * This method add a tab to the TabsBar object of the App.
   * @param {Tab} tab - The tab to add
   */
  addTab(tab) {
    this.data.append(tab.data);
    this.tabsBar.addTab(tab);
  }

  /**
   * Init the app when ready.
   * @param {Function} onInit - Callback Javascript function.
   */
  init(onInit = null) {
    console.log('Devo Applications Builder: Starting vapp framework');

    this._installLoadPageProxy();
    this._checkReady(onInit);
  }

  // Check if the app is ready
  _checkReady(onInit = null) {
    if (this.status === 'ready') {
      this.tabsBar.init();
      if (onInit) onInit(this);
    } else
      setTimeout(() => {
        this._checkReady(onInit);
      }, 0);
  }

  /**
   * Proxy the baseWeb.baseWebUtils.loadPage function. This function
   * is used by the web whenever the user changes from one page to another
   * and it's ideal to install code to free resources like freeing
   * datatables or setIntervals.
   */
  _installLoadPageProxy() {
    console.log(
      'Devo Applications Builder: Installing app change handler on baseWeb.baseWebUtils.loadPage'
    );

    const appID = v4();
    let oldLt;
    if (lt) {
      oldLt = lt;
      lt = Object.assign({}, lt, { app: { appId: appID } });
      console.log(appID);
    }

    const freeResources = (event) => {
      event.preventDefault();

      // abort all queries
      requests.abortAll();

      // Free global datatables stuff
      if ($.fn.psDataTable.tables !== undefined) {
        console.log(
          `Devo Applications Builder: App change detected: freeing ${
            $.fn.psDataTable.tables().length
          } datatables`
        );
        $.fn.psDataTable.tables({ api: true }).destroy();
      }

      // Free any registered setIntervals
      if (window.vapp_framework.registered_intervals !== undefined) {
        console.log(
          `Devo Applications Builder: App change detected: freeing ${window.vapp_framework.registered_intervals.length} setIntervals`
        );
        for (let interval of window.vapp_framework.registered_intervals) {
          clearInterval(interval);
        }
      }

      console.log(`Devo Applications Builder: Resources freed!`);
    };

    document.addEventListener('beforeChangeContainer', freeResources);
  }
}

export default App;
