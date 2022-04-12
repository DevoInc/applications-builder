import processStructure from '@devoinc/applications-data-library/structures/punchCard';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const PunchCardWidget = dependencies.require('widgets').PunchCardWidget;

/**
 *
 * Punchcards widget let you visualize trends data in a period of time.
 *
 * @category Widgets
 * @module Punchcard
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
 * @tutorial widgets-punchcard
 */
function mixin(self) {
  return {
    /**
     * Set the value to show.
     * @param {string} value - Value to show.
     * @internal
     */
    setValue(val) {
      self.settings.valToShow = val;
    },

    /**
     * Set the key to represent.
     * @param {string} key - Key to show.
     * @internal
     */
    setKeys(key) {
      self.settings.keyToShow = key;
    },

    /**
     * Set the max length to display in the legend.
     * @param {number} num - Max length.
     * @internal
     */
    setLegendLength(num) {
      self.settings.legendLength = num;
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render function
     * @param {object} orig - Data for process
     * @ignore
     */
    render(orig) {
      if (!self.el) return; // If not have element not render
      let cfg = Object.assign({}, self.settings);
      let data = processStructure(orig, cfg.keyToShow, cfg.valToShow);
      self.withDownloadButton = false;
      if (data) {
        self.widget = new PunchCardWidget(cfg);
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
