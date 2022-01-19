import processStructure from '@devo/applications-data-library/structures/series';
import objects from '@devo/applications-builder/utils/objects';
import highchartsHelper from './helpers/highchartsHelper';
import downloads from '@devo/applications-builder/libs/downloads';
import HCP from '@devo/applications-builder/widgets/helpers/exportDataSeries';
import { __ } from '@devo/applications-builder/i18n';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const LineWidget = dependencies.require('widgets').LineWidget;

/**
 * Here all the methods of the widgets based on the
 * [Highchart]{@link https://www.highcharts.com/} library are available.
 * Most of them are widgets based on the representation of temporal data.
 *
 * The list of widgets that use these same methods is:
 * - [Area](module-area.html)
 * - [Column](module-column.html)
 * - [Histogram](module-histogram.html)
 * - [Lines](module-lines.html)
 * - [Stacked Bars](module-stacked-bars.html)
 *
 * @category Widgets
 * @module Series
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
 */
export function mixin(self) {
  HCP.highcharts();

  return {
    /**
     * Set the keys to show.
     * @param {string[]} key - Keys name.
     * @instance
     */
    setKeys(key) {
      self.settings.keyToShow = key;
    },

    /**
     * Set series names to display.
     * @param {string[]} series - Series names.
     * @instance
     */
    setSeriesNames(series) {
      self.settings.seriesNames = series;
    },

    /**
     * Set the column with timespamp key.
     * @param {string} tsKey - Timestamp column name.
     * @instance
     */
    setTimestampKey(tsKey) {
      self.settings.timestampKey = tsKey;
    },

    /**
     * Set the value to show.
     * @param {string} val - Column name with the value.
     * @instance
     */
    setValue(val) {
      self.settings.valToShow = val;
    },

    /**
     * Set the data grouping.
     *
     * It accepts the moment's get values:
     * - <b>date</b>
     * - <b>year</b>
     * - <b>month</b>
     * - <b>day</b>
     * - <b>hour</b>
     * - <b>minute'</b>
     * - <b>second</b>
     * - <b>millisecond</b>
     * @param {string} grouping - Data grouping.
     * @instance
     */
    setGrouped(grouping) {
      self.settings.groupped = grouping;
    },

    /**
     * Set the Y axis title.
     * @param {string} title - Title text.
     * @instance
     */
    setYAxisTitle(title) {
      self.settings.yaxis_title = title;
    },

    /**
     * Set the X axis title.
     * @param {string} title - Title text.
     * @instance
     */
    setXAxisTitle(title) {
      self.settings.xaxis_title = title;
    },

    /**
     * Fix the data, if it is true data can not be temporarily grouped
     * @param {boolean} bool - Fix the data.
     * @instance
     */
    setFixedData(bool) {
      self.settings.fixData = bool;
    },

    /**
     * Set decimal and thuousands separator.
     *
     * For example: <i>"##,###,###.00"</i>
     * @param {string} str - Format string.
     * @instance
     */
    setFormat(str) {
      self.settings.format = str;
    },

    /**
     * Set the legend visible.
     * @param {boolean} bool - Enable the legend.
     * @instance
     */
    setLegend(bool) {
      self.settings.legend = bool;
    },

    /**
     * Set the defautl widget legend format.
     *
     * The asigned function receives an object with <i>color</i> and
     * <i>name</i> values.
     * @param {Function} func - Function to set default legend format.
     * @instance
     */
    setDefaultFormaterLegend(func) {
      self.settings.defaultformaterlegend = func;
    },

    /**
     * Set the default tooltip format.
     *
     * The asigned function receives an object with <i>x</i> and
     * <i>y</i> values.
     * @param {Function} func - Function to set default tooltip format.
     * @instance
     */
    setDefaultFormater(func) {
      self.settings.defaultformater = func;
    },

    /**
     * Set data accumulation, sum a value with the previous value.
     * @param {boolean} bool - Enable the data accumulation.
     * @instance
     */
    setAccumulated(bool) {
      self.settings.accumulated = bool;
    },

    /**
     * Show an average line.
     * @param {boolean} bool - Enable the average line.
     * @instance
     */
    setShowAvgLine(bool) {
      self.settings.showAvgLine = bool;
    },

    /**
     * Discard values using a determined method.
     *
     * The following values are supported:
     * - <b>none</b>: Do not apply.
     * - <b>stdDev</b>: Discard values using standard deviation.
     * @param {String} str - Method to use.
     * @instance
     */
    setDiscardMethod(str) {
      self.settings.discardMethod = str;
    },

    /**
     * Discard values using a determined mode.
     *
     * The following values are supported:
     * - <b>plotBand</b>
     * - <b>extremes</b>
     * @param {string} str - Mode to use.
     * @instance
     */
    setDiscardMode(str) {
      self.settings.discardMode = str;
    },

    /**
     * Allows add regression series in the chart.
     * This function sets <i>fixData</i> to <i>false</i> as a requirement
     * to display a regression line.
     *
     * The following values are supported:
     * - <b>none</b>
     * - <b>linear</b>
     * - <b>exponential</b>
     * - <b>polynomial</b>
     * - <b>logarithmic</b>
     * - <b>loess</b>
     * @param {string} str - Regression type.
     * @instance
     */
    setRegressionLine(str) {
      self.settings.regressionLine = str;
      self.settings.fixData = false;
    },

    /**
     * Set the Y axis scale.
     *
     * The following values are supported:
     * - <b>none</b>
     * - <b>logarithmic</b>
     * @param {string} str - Scale type.
     * @instance
     */
    setYscaleType(str) {
      self.settings.yScaleType = str;
    },

    /**
     * Highlights max and min values.
     * @param {boolean} bool - Enbale the highlights.
     * @instance
     */
    setHighlightMaxMin(bool) {
      self.settings.highlightMaxMin = bool;
    },

    /**
     * Set the label formatter for the Y axis.
     * @param {Function} func - Callback JavaScript function to format the label.
     * @instance
     */
    setYAxisLabelsFormatter(func) {
      objects.set(self.settings, 'widgetTemplate.yAxis.labels.formatter', func);
    },

    /**
     * Set the label formatter for the X axis.
     * @param {Function} func -Callback JavaScript function to format the label.
     * @instance
     */
    setXAxisFormatter(func) {
      objects.set(self.settings, 'widgetTemplate.xAxis.labels.formatter', func);
    },

    /**
     * Set the widget start to first element.
     * @param {Boolean} bool - Enable to start with the first element.
     * @instance
     */
    setForceFirstElement(bool) {
      self.settings.forceFirstElement = bool;
    },

    /**
     * Set the widget end to last element.
     * @param {Boolean} bool - Enable to start with the first element.
     * @instance
     */
    setForceLastElement(bool) {
      self.settings.forceLastElement = bool;
    },

    /**
     * Set the allKeysLimit
     * Note: This is not used
     * @param {number} [limit=15] - Limit
     * @ignore
     */
    setAllKeysLimit(limit = 20) {
      self.settings.allKeysLimit = limit;
    },

    /**
     * Set the format of the x axis labels.
     *
     * Avaiable formats are:
     * {@link https://api.highcharts.com/highcharts/xAxis.dateTimeLabelFormats}
     * @param {Object} obj - Check the Highcharts documentation.
     * @instance
     */
    setDateTimeLabelFormats(obj) {
      objects.set(
        self.settings,
        'widgetTemplate.xAxis.dateTimeLabelFormats',
        obj
      );
    },

    /**
     * An array determining what time intervals the ticks are allowed to fall
     * on.
     * {@link https://api.highcharts.com/highcharts/xAxis.units}
     * @param {Array} arr - Check the Highcharts documentation.
     * @instance
     */
    setXAxisUnits(arr) {
      objects.set(self.settings, 'widgetTemplate.xAxis.units', arr);
    },

    /**
     * Set YAxis and values to the bytes format
     * @instance
     */
    setToBytes() {
      objects.set(
        self.settings,
        'widgetTemplate.yAxis.labels.formatter',
        highchartsHelper.axisFormatterByteSize(1, true)
      );
      objects.set(
        self.settings,
        'defaultformater',
        highchartsHelper.valueFormatterByteSize()
      );
    },

    /**
     * Set any settings to the widget.
     * For highchart properties use <i>'widgetTemplate'</i> as the base of the path.
     * @param {string} path - Path to the settings.
     * @param {*} val - Value to set.
     * @instance
     */
    setProperty(path, val) {
      objects.set(self.settings, path, val);
    },

    /**
     * Set the rest of series to a new grouped series called _other_.
     * @param {boolean} [bool=false] - Show grouped series.
     * @instance
     */
    setOthers(bool = false) {
      self.settings.others = bool;
    },

    /**
     * Set the number of series to be displayed.
     * @param {number} [num=10] - Number of series.
     * @instance
     */
    setTop(num = 10) {
      self.settings.top = num;
    },

    /**
     * Set the aggrupation for the data to add zeros.
     * @param {string | Function} string - Text with a unit of time of
     * <i>moment.js</i> library or a function that recive a object with
     * <i>from</i> and <i>to</i> key date.
     * @instance
     */
    setGrouping(str = 'days') {
      self.settings.grouping = str;
    },

    /**
     * Set the order type for the series.
     *
     * The following values are supported:
     * - <b>alphabetic</b>
     * - <b>total</b>
     * - Or a function
     * @param {string|Function} val - Text with the order type or a
     * function to order the series.
     * @instance
     */
    setSeriesOrder(val = 'alphabetic') {
      self.settings.seriesOrder = val;
    },

    /**
     * Set the parser function for the values.
     * @param {Function} func - The parser function.
     * @instance
     */
    setValuesParseFunction(func) {
      self.settings.valuesParseFunction = func;
    },

    /**
     * Filter the series by a custom function or using a number
     * to limit the number of series to display.
     * @param {Function|number} func - Callback function or number to filter.
     * the series.
     * @instance
     */
    setSeriesFilter(func = null) {
      self.settings.seriesFilter = func;
    },

    /**
     * Set a custom property available in Highchart for the chart.
     * @param {Object[]} props - Array the properties.
     * @instance
     */
    setSeriesProperties(props) {
      self.settings.seriesProperties = props;
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
     * Redraw function
     * @ignore
     */
    redraw() {
      if (self.widget) {
        self.widget.chart.reflow();
      }
    },

    /**
     * Resize function
     * @ignore
     */
    resize() {
      this.redraw();
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
      // let cfg = Object.assign({}, defaultSettings, self.settings);
      let cfg = self.settings;

      let data = processStructure(orig, {
        keys: cfg.keyToShow || [],
        values: cfg.valToShow || [],
        seriesNames: cfg.seriesNames || [],
        seriesProperties: cfg.seriesProperties || null,
        forceFirstElement:
          cfg.forceFirstElement == null ? true : cfg.forceFirstElement,
        forceLastElement:
          cfg.forceLastElement == null ? true : cfg.forceLastElement,
        timestampKey: cfg.timestampKey || 'eventdate',
        order: cfg.seriesOrder || null,
        filter: cfg.seriesFilter || null,
        parseFunc: cfg.valuesParseFunction || parseFloat,
        zeroFill: cfg.grouping,
      });

      objects.set(
        cfg,
        'widgetTemplate.chart.renderTo',
        self.el.querySelector('.lt-vapp-widget-graphic')
      );
      for (let item of data) item.name = __(item.name);

      if (data) {
        // Default formatter
        if (!cfg.defaultformater) {
          cfg.defaultformater = highchartsHelper.valueFormatterCount();
        }

        self.widget = new LineWidget(cfg);
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
