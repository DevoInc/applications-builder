import processStructure from '@devo/applications-data-library/structures/timeHeatmap';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const TimeHeatmapWidget = dependencies.require('widgets').TimeHeatmapWidget;

/**
 * This widget is a graphical representation of data where the individual
 * values contained in a matrix are represented as colors base on date y time.
 *
 * This widget use [D3]{@link https://d3js.org/} library.
 *
 * @category Widgets
 * @module TimeHeatmap
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
 * @tutorial widgets-time-head-map
 */
function mixin(self) {
  self.settings.callFrom = 'DB';
  return {
    /**
     * Set the value to show.
     * @param {string} value - Value to show.
     * @instance
     */
    setValue(valToShow) {
      self.settings.valToShow = valToShow;
    },

    /**
     * Set the period.
     * @param {number} period - Time in milliseconds.
     * @instance
     */
    setPeriod(period) {
      self.settings.period = period;
    },

    /**
     * Enable selectors.
     * @param {boolean} bool - Indicates if it's enabled.
     * @instance
     */
    setDisplaySelectors(bool) {
      self.settings.displaySelectors = bool;
    },

    /**
     * Shows the first data event.
     * @param {boolean} bool - Indicates if it's showed.
     * @instance
     */
    setShowFirstEvent(bool) {
      self.settings.showFirstEvent = bool;
    },

    /**
     * Shows the last data event.
     * @param {boolean} bool - Indicates if it's showed.
     * @instance
     */
    setShowLastEvent(bool) {
      self.settings.showLastEvent = bool;
    },

    /**
     * Sets the operation to be applied to the data.
     *
     * The following values are supported:
     * - <b>none</b>: No operation.
     * - <b>log</b>: Logarithmic operation.
     * - <b>arctag</b>: Arctangent operation.
     * @param {string} str - Operation name.
     * @instance
     */
    setDataOperation(str) {
      self.settings.dataOperation = str;
    },

    /**
     * Set call from
     * - 'DB'
     * - 'AW'
     * - 'DEMO'
     * @param {String} str
     * @ignore
     */
    setCallFrom(str) {
      self.settings.callFrom = str;
    },

    /**
     * Se the header background color.
     * @param {String} color - Background color.
     * @instance
     */
    setHeadBackgroundColor(color) {
      self.settings.headBackgroundColor = color;
    },

    /**
     * Set the font color.
     * @param {String} color - Font color
     * @instance
     */
    setFontColor(color) {
      self.settings.fontColor = color;
    },

    /**
     * If true show zero values
     * @param {Boolean} bool
     * @instance
     */
    setShowZero(bool) {
      self.settings.showZero = bool;
    },

    // Life Cycle
    // ---------------------------------------------------------------------------

    /**
     * Render function
     * @param {object} orig - Data for process
     * @ignore
     */
    render(orig) {
      if (!self.el) return; // If not have element not render
      let cfg = Object.assign(
        {
          headBackgroundColor: 'white',
        },
        self.settings
      );

      let data = processStructure(
        orig,
        cfg.valToShow,
        cfg.showFirstEvent,
        cfg.showLastEvent,
        cfg.showZero
      );

      if (data) {
        self.widget = new TimeHeatmapWidget(cfg);
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
