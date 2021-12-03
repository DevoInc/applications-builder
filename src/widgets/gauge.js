import processStructure from '@devo/applications-data-library/structures/gauge';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import downloads from '@devo/applications-builder/libs/downloads';
import dependencies from '../data/dependencies';

const GaugeWidget = dependencies.require('widgets').GaugeWidget;

/**
 * The gauge meter widget illustrates the proportion of the indicated sets of values as portions of a wheel.
 *
 * @category Widgets
 * @module Gauge
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
 * @tutorial widgets-gauge
 */
function mixin(self) {
  return {
    /**
     * Set the index of the data array to limit processing.
     * @param {number} limit - Index number.
     * @instance
     */
    setLastIndex: (limit) => {
      self.settings.lastIndex = limit;
    },

    /**
     * Set the column with the value.
     * @param {string} value - Value to show.
     * @instance
     */
    setValue: (value) => {
      self.settings.valToShow = value;
    },

    /**
     * Set the auto scale.
     * @param {boolean} autoScale - Enable or disable.
     * @instance
     */
    setAutoScale: (autoScale) => {
      self.settings.isAutoScale = autoScale;
    },

    /**
     * Set the scale as reseverse.
     * @param {boolean} bool - Enable or disable.
     * @instance
     */
    setReverseScale: (bool) => {
      self.settings.isReverseScale = bool;
    },

    /**
     * Set the minimum value of the scale.
     * @param {number} value - Minimun value.
     * @instance
     */
    setMinScaleVal: (value) => {
      self.settings.minScaleVal = value;
    },

    /**
     * Set the maximum value of the scale.
     * @param {number} value - Minimun value.
     * @instance
     */
    setMaxScaleVal: (value) => {
      self.settings.maxScaleVal = value;
    },

    /**
     * Set the precision number.
     * @param {number} precision - Precision value.
     * @default 2
     * @instance
     */
    setPrecission: (precision) => {
      self.settings.precission = precision;
    },

    /**
     * Set the unit for the values.
     * @param {string} unit - Unit value.
     * @instance
     */
    setUnits: (unit) => {
      self.settings.units = unit;
    },

    /**
     * Set the color for label.
     * @param {string} color - Color value.
     * @default '#FFFFFF
     * @instance
     */
    setLabelColor: (color) => {
      self.settings.labelColor = color;
    },

    /**
     * Conditions to show in the center of the gauge.
     * @param {Object} where - Key value object.
     * @instance
     */
    setWhere: (where = {}) => {
      self.settings.whereToShow = where;
    },

    /**
     * Set a multiplier for the data.
     * @param {number} multiplier - Value.
     * @default 1
     * @instance
     */
    setMultiplier: (multiplier) => {
      self.settings.multiplier = multiplier;
    },

    /**
     * Set a format to number.
     *
     * The following values are supported:
     * - <b>dot</b>
     * - <b>comma</b>
     * - <b>bytes</b>
     * - <b>scientific</b>
     * @param {Number} format - Number format.
     * @default 'comma'
     * @instance
     */
    setNumberFormat: (format) => {
      self.settings.numberFormat = format;
    },

    // Life Cycle
    // ---------------------------------------------------------------------------

    /**
     * Download CSV
     * @ignore
     */
    downloadCSV() {
      let s = null;
      let isCorrectData = self.widget.dataIsOk();
      if (isCorrectData) {
        let data = self.widget.data;
        let header = '';
        let content = '';
        for (let key in data) {
          header += `${key},`;
          content += `${data[key]},`;
        }
        header = header.substring(0, header.length - 1);
        header += '\n';
        content = content.substring(0, content.length - 1);
        content += '\n';
        s = header + content;
      } else {
        console.error(`No data for download in widget "${self.id}"`);
      }
      if (s) downloads.downloadCSV(s, `${self.id}-data`);
    },

    /**
     * Render function
     * @param {object} orig - Data for process
     * @ignore
     */
    render: (orig) => {
      if (!self.el) return; // If not have element not render
      let cfg = Object.assign({ where: {} }, self.settings);
      cfg.dom = $(self.el).find('.lt-vapp-widget-graphic');
      let data = processStructure(orig, cfg.valToShow, cfg.lastIndex);
      if (data) {
        self.widget = new GaugeWidget(cfg);
        self.widget.setData(data);
        self.widget.display({ force: true, data: true });
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
