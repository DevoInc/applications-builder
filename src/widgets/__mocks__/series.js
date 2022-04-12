import processStructure from '@devoinc/applications-data-library/structures/series';
import objects from '@devoinc/applications-builder/utils/objects';
import highchartsHelper from '@devoinc/applications-builder/widgets/helpers/highchartsHelper';
import downloads from '@devoinc/applications-builder/libs/downloads';
import HCP from '@devoinc/applications-builder/widgets/helpers/exportDataSeries';
import { __ } from '@devoinc/applications-builder/i18n';
const LineWidget = () => {};
import widgetFactory from '@devoinc/applications-builder/widgetFactory';

/**
 * @module widgets/series
 * @mixes mixins/base
 * @mixes mixins/lifeCycle
 * @mixes mixins/info
 * @mixes mixins/menu
 * @mixes mixins/screenshot
 * @mixes mixins/zoom
 * @mixes mixins/loxcope
 * @mixes mixins/loading
 * @mixes mixins/listeners
 * @mixes mixins/collapser
 * @mixes mixins/download
 */
export function mixin(self) {
  HCP.highcharts();

  return {
    /**
     * Set the key to show
     * @param {String} key - key name
     * @instance
     */
    setKeys(key) {
      self.settings.keyToShow = key;
    },

    /**
     * Set series names
     * @param {String[]} arr - Array containing series names
     * @instance
     */
    setSeriesNames(arr) {
      self.settings.seriesNames = arr;
    },

    /**
     * Set the timespamp key
     * @param {String} str - timestamp key value
     * @instance
     */
    setTimestampKey(str) {
      self.settings.timestampKey = str;
    },

    /**
     * Set the value to show
     * @param {String} val
     * @instance
     */
    setValue(val) {
      self.settings.valToShow = val;
    },

    /**
     * Set the data grouping. It accepts the moment's get values:
     * - 'date'
     * - 'year'
     * - 'month'
     * - 'day'
     * - 'hour'
     * - 'minute',
     * - 'second'
     * - 'millisecond'
     * @param {String} grouping - data grouping
     * @instance
     */
    setGrouped(grouping) {
      self.settings.groupped = grouping;
    },

    /**
     * Set the Y axis title
     * @param {String} title - Y axis title
     * @instance
     */
    setYAxisTitle(title) {
      self.settings.yaxis_title = title;
    },

    /**
     * Set the X axis title
     * @param {String} title - X axis title
     * @instance
     */
    setXAxisTitle(title) {
      self.settings.xaxis_title = title;
    },

    /**
     * Fix data, if it is true data can not be temporarily grouped
     * @param {Boolean} bool
     * @instance
     */
    setFixedData(bool) {
      self.settings.fixData = bool;
    },

    /**
     * Set decimal and thuousands separator
     * ex. "##,###,###.00"
     * @param {String} str - Format string
     * @instance
     */
    setFormat(str) {
      self.settings.format = str;
    },

    /**
     * Set legend
     * @param {Boolean} bool
     * @instance
     */
    setLegend(bool) {
      self.settings.legend = bool;
    },

    /**
     * Set the defautl widget legend format
     * @param {Function} func - function to set default legend format
     * @instance
     */
    setDefaultFormaterLegend(func) {
      self.settings.defaultformaterlegend = func;
    },

    /**
     * Set the default tooltip format
     * @param {Function} func - function to set default tooltip format
     * @instance
     */
    setDefaultFormater(func) {
      self.settings.defaultformater = func;
    },

    /**
     * Set data accumulation, sum a value with the previous value
     * @param {Boolean} bool
     * @instance
     */
    setAccumulated(bool) {
      self.settings.accumulated = bool;
    },

    /**
     * Show an average line
     * @param {Boolean} bool
     * @instance
     */
    setShowAvgLine(bool) {
      self.settings.showAvgLine = bool;
    },

    /**
     * Discard values using a determined parameter:
     * - 'none'
     * - 'stdDev' Discard values using standard deviation
     * @param {String} str
     * @instance
     */
    setDiscardMethod(str) {
      self.settings.discardMethod = str;
    },

    /**
     * Discard values using a determined parameter:
     * - 'plotBand'
     * - 'extremes'
     * @param {String} str
     * @instance
     */
    setDiscardMode(str) {
      self.settings.discardMode = str;
    },

    /**
     * Show a regression line.
     * This function set fixData to false as it is a requirement to show a
     * regression line:
     * - 'none'
     * - 'linear'
     * - 'exponential'
     * - 'polynomial'
     * - 'logarithmic'
     * - 'loess'
     * @param {String} str - type of regression line
     * @instance
     */
    setRegressionLine(str) {
      self.settings.regressionLine = str;
      self.settings.fixData = false;
    },

    /**
     * Set the Y axis scale
     * - 'none'
     * - 'logarithmic'
     * @param {String} str - Y axis scale
     * @instance
     */
    setYscaleType(str) {
      self.settings.yScaleType = str;
    },

    /**
     * Highlights max and min values
     * @param {Boolean} bool
     * @instance
     */
    setHighlightMaxMin(bool) {
      self.settings.highlightMaxMin = bool;
    },

    /**
     * Set the label formatter for the Y axis
     * @param {Function} func
     * @instance
     */
    setYAxisLabelsFormatter(func) {
      objects.set(self.settings, 'widgetTemplate.yAxis.labels.formatter', func);
    },

    /**
     * Set the label formatter for the X axis
     * @param {Function} func
     * @instance
     */
    setXAxisFormatter(func) {
      objects.set(self.settings, 'widgetTemplate.xAxis.labels.formatter', func);
    },

    /**
     * Set the widget start to first element
     * @param {Boolean} bool
     * @instance
     */
    setForceFirstElement(bool) {
      self.settings.forceFirstElement = bool;
    },

    /**
     * Set the widget end to last element
     * @param {Boolean} bool
     * @instance
     */
    setForceLastElement(bool) {
      self.settings.forceLastElement = bool;
    },

    /**
     * Set the allKeysLimit
     * @param {Number} [limit=15] - Limit
     * @instance
     */
    setAllKeysLimit(limit = 20) {
      self.settings.allKeysLimit = limit;
    },

    /**
     * Set the format of the x axis labels
     * Avaiable formats are:
     * {@link https://api.highcharts.com/highcharts/xAxis.dateTimeLabelFormats}
     * @param {Object} obj
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
     * @param {Array} arr
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
     * Set any settings to the widget
     * (For the highchart properties use the base 'widgetTemplate')
     * @param {string} path - Path to the settings
     * @param {*} val - Value to set
     * @instance
     */
    setProperty(path, val) {
      objects.set(self.settings, path, val);
    },

    /**
     * Set if the rest of series are grouped in
     * a new serie called other
     * @param {Boolean} [bool=false]
     * @instance
     */
    setOthers(bool = false) {
      self.settings.others = bool;
    },
    /**
     * Set the number of series shown by the widget
     * @param {Number} [num=10] Number of series
     * @instance
     */
    setTop(num = 10) {
      self.settings.top = num;
    },

    /**
     * Set the aggropupation for the data to add zeros
     * @param {String | Function} string with a unit of time of moment.js or
     * a function that recive a object with from and to key date.
     * @instance
     */
    setGrouping(str = 'days') {
      self.settings.grouping = str;
    },

    /**
     * Set the order method for the series
     * - 'alphabetic'
     * - 'total'
     * - Function
     * @param {String|Function} val Method for order
     * @instance
     */
    setSeriesOrder(val = 'alphabetic') {
      self.settings.seriesOrder = val;
    },

    /**
     * Set the parser function
     * @param {Function} func The parser function
     * @instance
     */
    setValuesParseFunction(func) {
      self.settings.valuesParseFunction = func;
    },

    /**
     * Filter series by a custom function or using a number to filter x elements
     * from the starts
     * @param {Function|Number} func Function for filter the series or a number
     * @instance
     */
    setSeriesFilter(func = null) {
      self.settings.seriesFilter = func;
    },

    /**
     * Set the array or object for properties on series
     * @param {Array|Object} props Array or object of porperties
     * @instance
     */
    setSeriesProperties(props) {
      self.settings.seriesProperties = props;
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Download in CSV format
     * @instance
     */
    downloadCSV() {
      let s = self.widget.chart.getCSV();
      downloads.downloadCSV(s, `${self.id}-data`);
    },

    /**
     * Redraw function
     */
    redraw() {
      if (self.widget) {
        self.widget.chart.reflow();
      }
    },

    /**
     * Resize function
     */
    resize() {
      this.redraw();
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render function
     * @param {object} orig - Data for process
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
        zeroFill: cfg.grouping || 'auto',
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
