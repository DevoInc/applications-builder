import processStructure from '@devo/applications-data-library/structures/funnel';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const FunnelWidget = dependencies.require('widgets').FunnelWidget;

/**
 * The funnel widget shows the progressive reduction of data as it goes
 * from one phase to another.
 * In each of the phases, data is represented as different portions
 * of a whole.
 * @category Widgets
 * @module Funnel
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
 * @tutorial widgets-funnel
 */
function mixin(self) {
  return {
    /**
     * Set the value to show.
     * @param {string} value - Value to show.
     * @instance
     */
    setValue: (val) => {
      self.settings.valToShow = val;
    },

    /**
     * Set the keys to show.
     * @param {string[]} keys - Keys to show.
     * @instance
     */
    setKeys: (keys) => {
      self.settings.keysToShow = keys;
    },

    /**
     * Set is there is relationship between the displayed fields.
     * @param {boolean} isRelated - Enable or disable.
     * @default true
     * @instance
     */
    setIsFieldRelated: (isRelated) => {
      self.settings.isFieldsRelated = isRelated;
    },

    /**
     * Set a unit to values.
     * @param {string} unit - Unit name.
     * @instance
     */
    seUnits: (unit) => {
      self.settings.unit = unit;
    },

    // Life Cycle
    // ---------------------------------------------------------------------------

    /**
     * Render function
     * @param {object} orig - Data for process
     * @ignore
     */
    render: function (orig) {
      if (!self.el) return; // If not have element not render
      let cfg = Object.assign({}, self.settings);
      let data = processStructure(orig, cfg.keysToShow, cfg.valToShow);
      self.withDownloadButton = false;
      if (data) {
        self.widget = new FunnelWidget(cfg);

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
