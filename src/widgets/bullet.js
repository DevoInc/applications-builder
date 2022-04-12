import processStructure from '@devoinc/applications-data-library/structures/bullet';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';

/**
 * The bullet chart displays a single measure and compares that
 * measure to one or more measures to complement its meaning and
 * displays it in the context of qualitative ranges (as varying
 * intensities of a single hue) of performance, such as poor,
 * satisfactory and good.
 *
 * @category Widgets
 * @module Bullet
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
 * @tutorial widgets-bullet
 */
function mixin(self) {
  return {
    /**
     * Set the column name with the field to be measured.
     * @param {string} key - Column name.
     * @instance
     */
    setKey(key) {
      self.settings.key = key;
    },

    /**
     * Set the qualitatives ranges. It's an array of three numbers.
     * The qualitative ranges are displayed as varying intensities
     * of a single hue.
     *
     * If this value is not specified, it takes the maximum value
     * of the data and applies the following calculations:
     * - maximum/3 for the poor value.
     * - 2*maximum/3 for the average value.
     * - maximum*1.1 for the good value.
     * @param {number[]} ranges
     * @param {number} ranges.0 - Represents a poor value.
     * @param {number} ranges.1 - Represents a average value.
     * @param {number} ranges.2 - Represents a good value.
     * @default [max/3, 2*max/3, max * 1.1]
     * @instance
     */
    setRanges(ranges) {
      self.settings.ranges = ranges;
    },

    /**
     * Set the column name with the value to be measured.
     * @param {string} value - Column name.
     * @instance
     */
    setValue(value) {
      self.settings.value = value;
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Resize function
     * @ignore
     */
    resize() {
      //TODO
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
      let data = processStructure(orig, cfg.key, cfg.value, cfg.ranges);

      if (data && data.result && data.result.length) {
        let marginLeft = 120 + ((data.longestTitle.length - 15) / 15) * 100;
        let margin = { top: 20, right: 50, bottom: 20, left: marginLeft },
          width = $(self.el).width() - margin.left - margin.right,
          height = 70 - margin.top - margin.bottom;

        let chart = d3.bullet().width(width).height(height);

        d3.selectAll('#' + self.id + ' .lt-vapp-widget-graphic svg').remove();

        var svg = d3
          .select('#' + self.id + ' .lt-vapp-widget-graphic')
          .selectAll('svg')
          .data(data.result)
          .enter()
          .append('svg')
          .attr('class', 'bullet')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr(
            'transform',
            'translate(' + margin.left + ',' + margin.top + ')'
          )
          .call(chart);

        let title = svg
          .append('g')
          .style('text-anchor', 'end')
          .attr('transform', 'translate(-6,' + height / 2 + ')');

        title
          .append('text')
          .attr('class', 'title')
          .text(function (d) {
            return d.title;
          });

        self.widget = svg;
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
