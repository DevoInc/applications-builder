import processStructure from '@devoinc/applications-data-library/structures/pieLayered';
import downloads from '@devoinc/applications-builder/libs/downloads';
import HCP from './helpers/exportDataSeries';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const PieLayeredWidget = dependencies.require('widgets').PieLayeredWidget;

/**
 * The layered pie chart is a pie chart with concentric layers to show
 * successive levels of data.
 * The size of each item represents its contribution to the inner parent
 * category.
 *
 * @category Widgets
 * @module PieLayered
 * @see [base](module-base.html)
 * @see [collapser](module-collapser.html)
 * @see [dataSearch](module-dataSearch.html)
 * @see [download](module-download.html)
 * @see [info](module-info.html)
 * @see [lifeCycle](module-lifeCycle.html)
 * @see [listeners](module-listeners.html)
 * @see [loading](module-loading.html)
 * @see [menu](module-menu.html)
 * @see [screenshot](module-screenshot.html)
 * @see [zoom](module-zoom.html)
 * @tutorial widgets-pie-layered
 */
function mixin(self) {
  HCP.highcharts();

  return {
    /**
     * Set the keys to show.
     * @param {string[]} keys - Keys to be displayed.
     * @instance
     */
    setKeys(keys) {
      self.settings.keysToShow = keys;
    },

    /**
     * Set the value to show.
     * @param {string} val - Value to be displayed.
     * @instance
     */
    setValue(val) {
      self.settings.valToShow = val;
    },

    /**
     * Set hierarchy character.
     * @param {string} char
     * @instance
     */
    setHierarchyChar(char) {
      self.settings.hierarchyChar = char;
    },

    /**
     * Set the responsiveness of the widget.
     * @param {boolean} bool - keyResponsive
     * @instance
     */
    setIsKeyResponsive(bool) {
      self.isKeyResponsive = bool;
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Download in CSV format
     * @ignore
     */
    downloadCSV() {
      let s = self.widget.chart.getCSV();
      downloads.downloadCSV(s, `${self.id}-data`);
    },

    /**
     * Resize function
     * @internal
     * @ignore
     */
    resize() {
      if (self.widget) {
        self.widget.drawData($(self.graphic).width(), $(self.graphic).height());
      }
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render the data
     * @param {Object} orig Object of data
     * @ignore
     */
    render(orig) {
      if (!self.el) return; // If not have element not render
      let cfg = self.settings;
      let data = processStructure(
        orig,
        cfg.hierarchyChar,
        cfg.keysToShow,
        cfg.valToShow
      );

      if (data) {
        self.widget = new PieLayeredWidget(cfg);
        self.widget.setData(data);
        self.widget.display({
          force: true,
          data: true,
        });
      } else {
        this.debugError({
          msg: 'NO DATA',
          console: {
            method: 'error',
            msg: 'No data arrive to render function',
          },
        });
      }
    },
  };
}

export default widgetFactory(mixin);
