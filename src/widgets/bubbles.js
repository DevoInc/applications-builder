import processStructure from '@devoinc/applications-data-library/structures/bubble';
import { set } from '@devoinc/applications-builder/utils/objects';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const BubbleWidget = dependencies.require('widgets').BubbleWidget;

/**
 * This chart displays three dimensions of data over an X-Y chart,
 * where X and Y are the first 2 dimensions.
 * The third dimension is represented by the disk, whose diameter
 * is proportional to the value of the third parameter.
 * @category Widgets
 * @module Bubbles
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
 * @tutorial widgets-bubbles
 */
function mixin(self) {
  return {
    /**
     * Set the field related to bubble size.
     * @param {string} value - value to show
     * @instance
     */
    setValue(val) {
      self.settings.valToShow = val;
    },

    /**
     * Set Y axis property object.
     * @param {Object} axis
     * @param {string} axis.name - Column name to representate.
     * @param {string} axis.type - Column type.
     * @instance
     */
    setYaxis(axis) {
      self.settings.yAxis = axis;
    },

    /**
     * Set X axis property object.
     * @param {Object} axis
     * @param {string} axis.name - Column name to representate.
     * @param {string} axis.type - Column type.
     * @instance
     */
    setXaxis(axis) {
      self.settings.xAxis = axis;
    },

    /**
     * Set the title of the Y axis.
     * @param {string} title - Text with the title.
     * @instance
     */
    setYaxisTitle(title) {
      self.settings.xaxis_title = title;
    },

    /**
     * Set the title of the X axis.
     * @param {string} title - Text with the title.
     * @instance
     */
    setXaxisTitle(title) {
      self.settings.xaxis_title = title;
    },

    /**
     * Used to partition the bubbles into columns on the plane.
     * @param {string} column - Column name.
     * @instance
     */
    setSeriesBy(column) {
      self.settings.seriesBy = column;
    },

    /**
     * Set the title for the size.
     * @param {string} title - Text with the title.
     * @instance
     */
    setSizeTitle: (title) => {
      self.settings.size_title = title;
    },

    /**
     * Set enable or disable the legend.
     * @param {boolean} bool - Enable or disable.
     * @instance
     */
    setLegend: (bool) => {
      self.settings.legend = bool;
    },

    /**
     * Set a custom function to format the legend.
     * @param {Function} formatter - Callback JavaScript function.
     * @instance
     */
    setDefaultformaterlegend: (formatter) => {
      self.settings.defaultformaterlegend = formatter;
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Resize function
     * @instance
     * @ignore
     */
    resize() {
      setTimeout(() => {
        self?.widget?.chart.reflow();
      }, 100);
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render function
     * @param {object} orig - Data for process
     * @ignore
     */
    render: (orig) => {
      if (!self.el) return; // If not have element not render
      let cfg = self.settings;
      let data = processStructure(
        orig,
        cfg.xAxis,
        cfg.yAxis,
        cfg.valToShow,
        cfg.seriesBy
      );

      set(
        cfg,
        'widgetTemplate.chart.renderTo',
        self.el.querySelector('.lt-vapp-widget-graphic')
      );

      if (data) {
        self.widget = new BubbleWidget(cfg);
        self.graphic.style.width = '';
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
