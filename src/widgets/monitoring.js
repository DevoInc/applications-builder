import { i18n } from '@devo/applications-builder/i18n';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import LTstatus from './helpers/monitoring';

/**
 * This is a custom widget that is used to monitor the single result value,
 * coloring the background depending on its value and settings.
 * @category Widgets
 * @module Monitoring
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
 * @tutorial widgets-monitoring
 **/
function mixin(self) {
  return {
    /**
     * Set custom colors for the background.
     * The order of colors are important to determinate the status.
     * First color represents the OK status.
     * The second color represents a  regular status.
     * And the third color represents an fail status.
     * @param {string[]} colors - Custom colors.
     * @instance
     */
    setColors(colors) {
      self.settings.ds.colors = colors;
    },

    /**
     * Indicate the number of elements to show by row.
     * @param {number} val - Number of elements.
     * @default 4
     * @instance
     */
    setItemsByRow(val) {
      self.settings.ds.itemsbyrow = val;
    },

    /**
     * Set custom icons.
     * The order of icons are important to determinate the status.
     * First icon represents the OK status.
     * The second icon represents a  regular status.
     * And the third icon represents an fail status.
     * @param {string[]} icons - Custom icons.
     * @instance
     */
    setIcons(arr) {
      self.settings.ds.icons = icons;
    },

    /**
     * Set a custom height of each element status to show.
     * @param {number} height - Height value.
     * @instance
     */
    setHeight(height) {
      self.settings.ds.heightdefault = height;
    },

    /**
     * Set the rules to define the status.
     *
     * Operators availables are:
     * - <i>'>'</i>
     * - <i>'<'</i>
     * - <i>'=='</i>
     * - <i>'<='</i>
     * - <i>'=>'</i>
     * - <i>'!='</i>
     *
     * By default, values are in percentage, so its value should be between 0 and 100.
     * To change this behavior use <i>setIsPercent</i> with <i>false</i> value.
     * @param {Object} success
     * @param {string} success.operator - Comparator operator.
     * @param {number} success.value - Limit value.
     * @param {Object} fail
     * @param {string} fail.operator - Comparator operator.
     * @param {number} fail.value - Limit value.
     * @instance
     */
    setRules(success, fail) {
      self.settings.ds.rules = [success, fail];
    },

    /**
     * Indicate if the comparation of rules must be with percent.
     * @default true
     * @param {boolean} bool - Comparation of values as a percentage.
     * @instance
     */
    setIsPercent(bool) {
      self.settings.ds.is_percent = bool;
    },

    /**
     * Set the column value to show.
     * @param {value} value - Column name.
     * @instance
     */
    setValue(value) {
      self.settings.ds.valToShow = value;
    },

    /**
     * Set the key to be displayed.
     * @param {string} key - Key to show.
     * @instance
     */
    setKey(key) {
      self.settings.ds.keyToShow = key;
    },

    // Life Cycle
    // ---------------------------------------------------------------------------

    /**
     * Render of the widget
     * @param {arr} orig - Data for the widget
     * @ignore
     */
    render(orig) {
      if (!self.el) return; // If not have element not render
      let cfg = self.settings;

      if (
        orig &&
        orig.dataMatrix &&
        Array.isArray(orig.dataMatrix) &&
        orig.keys &&
        Array.isArray(orig.keys) &&
        orig.dataMatrix.length > 0
      ) {
        let container = document.createElement('div');
        self.graphic.append(container);

        // Create the widget
        self.widget = new LTstatus(container, orig, cfg.ds);
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
