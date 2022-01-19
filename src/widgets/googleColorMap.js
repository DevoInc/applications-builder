import processStructure from '@devo/applications-data-library/structures/googleColorMap';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const ColorWorldMapWidget = dependencies.require('widgets').ColorWorldMapWidget;

/**
 *
 * @category Widgets
 * @module GoogleColormap
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
 * @tutorial widgets-google-colormap
 */
function mixin(self) {
  return {
    /**
     * Ste the column name to representate.
     * It should contain the country code.
     * @param {string} key - Column name.
     * @instance
     */
    setKeys: (key) => (self.settings.keyToShow = key),

    /**
     * Set the column with the value.
     * @param {string} value - Column name.
     * @instance
     */
    setValue: (value) => (self.settings.valueToShow = value),

    /**
     * Set the title for the chart.
     * @param {string} title - Title text.
     * @instance
     */
    setTitle(title) {
      self.settings.title = title;
    },

    /**
     * Set the unit of the values.
     * @param {string} unit - Unit text.
     * @default 'units'
     * @instance
     */
    setUnits(unit) {
      self.settings.units = unit;
    },

    /**
     * Sets the name of the study variable.
     * @param {string} variable - Text.
     * @default 'var.'
     * @instance
     */
    setVariable(variable) {
      self.settings.variable = variable;
    },

    /**
     * Set the operation method to discard events.
     *
     * The following values are supported:
     * - <b>none</b>
     * - <b>stdDev</b>
     * @param {string} method - Method name.
     * @default 'none'
     * @instance
     */
    setDiscardMethod(method) {
      self.settings.discardMethod = method;
    },

    /**
     * Set the operation to apply to the data.
     *
     * The following values are supported:
     * - <b>linear</b>
     * - <b>logarithmic</b>
     * @param {string} operation - Operation name.
     * @default 'linear'
     * @instance
     */
    setDataOperation(operation) {
      self.settings.dataOperation = operation;
    },

    /**
     * Set the color for the minimum value in the scale.
     * @param {string} color - Color.
     * @default '#fdea6d'
     * @instance
     */
    setScaleMinColor(color) {
      self.settings.scaleMinColor = color;
    },

    /**
     * Set the color for the maximun value in the scale.
     * @param {string} color - Color.
     * @default '#c25d0c'
     * @instance
     */
    setScaleMaxColor(color) {
      self.settings.scaleMaxColor = color;
    },

    /**
     * Set the color for the minimun standard deviation value.
     * @param {string} color - Color.
     * @default '#7cae2d'
     * @instance
     */
    setStdDevMinColor(color) {
      self.settings.stdDevMinColor = color;
    },

    /**
     * Set the color for the Maximum standard deviation value.
     * @param {String} color - Color.
     * @default '#b40000'
     * @instance
     */
    setStdDevMaxColor(color) {
      self.settings.stdDevMaxColor = color;
    },

    /**
     * Enable the selectors.
     * @param {Boolean} bool - Enable or disable.
     * @default true
     * @instance
     */
    setDisplaySelectors(bool) {
      self.settings.displaySelectors = bool;
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
        {},
        {
          scrollwheel: true,
        },
        self.settings
      );
      let data = processStructure(orig, cfg.keyToShow, cfg.valueToShow);
      if (data) {
        self.widget = new ColorWorldMapWidget(cfg);
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
