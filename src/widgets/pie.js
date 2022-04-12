import processStructure from '@devoinc/applications-data-library/structures/pie';
import { set } from '@devoinc/applications-builder/utils/objects';
import downloads from '@devoinc/applications-builder/libs/downloads';
import hcp from './helpers/exportDataSeries';
import { __ } from '@devoinc/applications-builder/i18n';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const PieWidget = dependencies.require('widgets').PieWidget;

/**
 * A pie chart is a circular graph that contains slices that correspond
 * to parts of the whole. The different slices of the chart and their
 * proportions are defined by two given fields in your query.
 * @category Widgets
 * @module Pie
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
 * @tutorial widgets-pie
 */
function mixin(self) {
  hcp.highcharts();

  return {
    /**
     * Set the keys to be displayed.
     * @param {string[]} keys - Keys to show.
     * @instance
     */
    setKeys(keys) {
      self.settings.keysToShow = keys;
    },

    /**
     * Set the value to show.
     * @param {string} val - Value to show.
     * @instance
     */
    setValue(val) {
      self.settings.valToShow = val;
    },

    /**
     * Make the legend visible
     * @param {boolean} bool - Enable the legend.
     * @instance
     */
    setLegend(bool) {
      self.settings.legend = bool;
    },

    /**
     * Set the tooltip legend format.
     * For more info, visit
     * [Highcharts doc]{@link https://api.highcharts.com/highcharts/tooltip.formatter}.
     * @param {function} func - Callback JavaScript function.
     * @instance
     */
    setDefaultFormaterTooltip(func) {
      self.settings.defaultformaterTooltip = func;
    },

    /**
     * Set the legend format.
     *
     * For more info, visit
     * [Highcharts doc.]{@link https://api.highcharts.com/highcharts/plotOptions.pie.dataLabels.formatter}.
     * @param {function} func - Callback JavaScript function.
     * @instance
     */
    setDefaultFormater(func) {
      self.settings.defaultformater = func;
    },

    /**
     * Set any settings of the highcharts library.
     * @param {string} path - Property name to add as path to the settings.
     * @param {*} val - Value to set.
     * @instance
     */
    setHighchartsProperty(path, val) {
      set(self.settings, 'widgetTemplate.' + path, val);
    },

    /**
     * Show decimal values.
     * If _false_, the decimal part of the value will be truncated.
     * @param {boolean} allowDecimals - Enable decimal values.
     * @instance
     */
    setAllowDecimals(allowDecimals) {
      self.settings.allowDecimals = allowDecimals;
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Download in CSV format
     * @internal
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
      setTimeout(() => {
        if (self.widget !== null && self.widget.chart !== null) {
          self.widget.chart.reflow();
        }
      }, 1);
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render function
     * @param {Object} orig - Data for process
     * @ignore
     */
    render(orig) {
      if (!self.el) return; // If not have element not render
      let cfg = self.settings;
      let data = processStructure(
        orig,
        cfg.keysToShow,
        cfg.valToShow,
        cfg.allowDecimals
      );

      set(
        cfg,
        'widgetTemplate.chart.renderTo',
        self.el.querySelector('.lt-vapp-widget-graphic')
      );
      for (let item of data) item.name = __(item.name);
      if (data) {
        self.widget = new PieWidget(cfg);
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
