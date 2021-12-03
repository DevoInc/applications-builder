import processStructure from '@devo/applications-data-library/structures/heatCalendar';
import downloads from '@devo/applications-builder/libs/downloads';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const HeatCalendarWidget = dependencies.require('widgets').HeatCalendarWidget;

const defaultSettings = {
  on: [],
  valueExtent: [Infinity, -Infinity],
  monthLabelColour: 'none',
  title: null,
  weekDayFontColor: 'white',
  legendSelectorColor: 'white',
  weekDaysLabels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  moveDaysLabels: true,
  mondayFirst: false,
  toBytes: false,
  displayWeekDays: false,
  displayDayLegend: false,
  displayMark: true,
  opacity: 1,
  leftmargin: 12,
  topmargin: 50,
  labermargin: 35,
  displayScale: false,
  scalemargin: 30,
  scaleheight: 15,
  scalesize: [0.25, 0.75],
  dataOperation: 'none',
  drawZero: true,
  minPercentil: null,
  maxPercentil: null,
  discardMethod: 'none',
  displaySelectors: false,
};

/**
 * The heat calendar widget shows a calendar with the days marked in
 * different colors.
 * These colors depend on the amount of data per day and a gradient scale
 * that you can see below.
 * @category Widgets
 * @module HeatCalendar
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
 * @tutorial widgets-heat-calendar
 */
function mixin(self) {
  return {
    /**
     * Set a custum timespamp key.
     * The data should be ordered by this column.
     * @param {string} timestampKey - Column name.
     * @instance
     */
    setTimestampKey: (timestampKey) => {
      self.settings.timestampKey = timestampKey;
    },

    /**
     * Set the value to show.
     * @param {string} value - Column name.
     * @instance
     */
    setValue: (val) => {
      self.settings.valToShow = val;
    },

    /**
     * To develop
     * @param {number[]} valueExtend - Max and min values
     * @instance
     * @ignore
     */
    setValueExtent: (valueExtent) => {
      self.settings.valueExtent = valueExtent;
    },

    /**
     * Attach an event handler function for one event to the widget.
     * @param {string} str - Name of the event to listen.
     * @param {Function} func - Callback JavaScript function.
     * @instance
     */
    setEvent(event, func) {
      if (self.settings.on) {
        self.settings.on = [];
      }
      self.settings.on.push([event, func]);
    },

    /**
     * Set a custom color of the internal lines of the calendar that
     * delimit the days.
     * @param {string} color - Color.
     * @default '#555555'
     * @instance
     */
    setDayLineColor(color) {
      self.settings.dayLineColor = color;
    },

    /**
     * Set a custom color of the internal lines of the calendar that
     * delimit the months.
     * @param {string} color - Color.
     * @default '#eeeeee'
     * @instance
     */
    setMonthLineColor(color) {
      self.settings.monthLineColor = color;
    },

    /**
     * Set the date label color.
     * @param {string} color - Color.
     * @default 'none'
     * @instance
     */
    setMonthLabelColor(color) {
      self.settings.monthLabelColour = color;
    },

    /**
     * Set the custom color for the legend maximun value.
     * @param {string} color - Color.
     * @default '#dddddd'
     * @instance
     */
    setLeyendMaxValColor(color) {
      self.settings.leyendMaxValColor = color;
    },

    /**
     * Set the custom color for the legend minimun value.
     * @param {Object} color - Color.
     * @default '#dddddd'
     * @instance
     */
    setLeyendMinValColor(color) {
      self.settings.leyendMinValColor = color;
    },

    /**
     * Set the color for week days labels.
     * @param {string} color - Color.
     * @default '#ffffff'
     * @instance
     */
    setWeekDayFontColor(color) {
      self.settings.weekDayFontColor = color;
    },

    /**
     * Set the color for the legend selector.
     * @param {string} color - Color
     * @default 'white'
     * @instance
     */
    setLegendSelectorColor(color) {
      self.settings.legendSelectorColor = color;
    },

    /**
     * Set custom labels for days of weeks.
     * @param {string[]} days - Days of week labels.
     * @default ['S', 'M', 'T', 'W', 'T', 'F', 'S']
     * @instance
     */
    setWeekDaysLabels(days) {
      self.settings.weekDaysLabels = days;
    },

    /**
     * Allow to shift the days of the week.
     * @param {boolean} bool
     * @default true
     * @instance
     */
    setMoveDaysLabels: (bool) => (self.settings.moveDaysLabels = bool),

    /**
     * Set Monday as firts day of week.
     * @param {boolean} bool
     * @default false
     * @instance
     */
    setMondayFirst(bool) {
      self.settings.mondayFirst = bool;
    },

    /**
     * Set the values as units of bytes.
     * @param {boolean} bool
     * @default false
     * @instance
     */
    setToBytes: (bool) => (self.settings.toBytes = bool),

    /**
     * Shows the days of the week.
     * @param {boolean} bool
     * @default false
     * @instance
     */
    setDisplayWeekDays(bool) {
      self.settings.displayWeekDays = bool;
    },

    /**
     * Set visible days legend.
     * @param {boolean} bool
     * @default false
     * @instance
     */
    setDisplayDayLegend(bool) {
      self.settings.displayDayLegend = bool;
    },

    /**
     * Set enable display marks.
     * @param {boolean} bool
     * @default true
     * @instance
     */
    setDisplayMark(bool) {
      self.settings.displayMark = bool;
    },

    /**
     * Set the opacity for colors.
     * @param {number} opacity - Opacity. Number between 0 and 1.
     * @default 1
     * @instance
     */
    setOpacity(opacity) {
      self.settings.opacity = opacity;
    },

    /**
     * Set left margin to wrap the chart.
     * @param {number} margin - Margin value.
     * @default 12
     * @instance
     */
    setLeftmargin(margin) {
      self.settings.leftmargin = margin;
    },

    /**
     * Set the top margin of the chart.
     * @param {number} margin - Margin value.
     * @default 50
     * @instance
     */
    setTopmargin(margin) {
      self.settings.topmargin = margin;
    },

    /**
     * Set the margin for the label.
     * @param {number} margin - Margin value.
     * @default 35
     * @instance
     */
    setLabelMargin(margin) {
      self.settings.labermargin = margin;
    },

    /**
     * Set display the scale
     * @param {boolean} bool
     * @default false
     * @instance
     */
    setDisplayScale(bool) {
      self.settings.displayScale = bool;
    },

    /**
     * Set a custom margin for the scale.
     * @param {number} scale - Scale value.
     * @default 15
     * @instance
     */
    setScaleMargin(scale) {
      self.settings.scalemargin = scale;
    },

    /**
     * Set a custom scale height.
     * @param {number} scale - Scale value.
     * @default 15
     * @instance
     */
    setScaleHeight(scale) {
      self.settings.scaleheight = scale;
    },

    /**
     * Set a custom scale size.
     * @param {number[]} scale - Scale size.
     * @default [0.25, 0.75]
     * @instance
     */
    setScaleSize(scale) {
      self.settings.scalesize = scale;
    },

    /**
     * Set a color scale.
     * Currently it has to be an array of colors in d3.
     * The first color is used for tables without data.
     * The rest, to map from the minimum to the maximum value in a linear way.
     * @param {string[]} scale - Colors scale.
     * @default ["#006837", "#1A9863", "#66BD63","#A6D96A", "#D9EF8B", "#FFFFBF","#FEE08B", "#FDAE61", "#F46D43","#D73027", "#A50026"]
     * @instance
     */
    setColorScale(scale) {
      self.settings.colorScale = scale;
    },

    /**
     * Apply an operation for data.
     *
     * Allowed values are:
     * - <b>arctag</b>: Arctangent.
     * - <b>log</b>: Logarithm.
     * - <b>none</b>: No operation
     * @param {string} dataOperation - Operation name.
     * @default 'none'
     * @instance
     */
    setDataOperation(dataOperation) {
      self.settings.dataOperation = dataOperation;
    },

    /**
     * Set the minimum percentile color.
     * @param {string} color - Color.
     * @default #87CEEB
     * @instance
     */
    setMinPercentilColor(color) {
      self.settings.minPercentilColor = color;
    },

    /**
     * Set the maximun percentile color.
     * @param {string} color - Color.
     * @default #BA55D3
     * @instance
     */
    setMaxPercentilColor(color) {
      self.settings.maxPercentilColor = color;
    },

    /**
     * Set the minimun percentile score.
     * @param {number} percentil - Percentil value. Value between 0 and 1.
     * @default null
     * @instance
     */
    setMinPercentil(percentil) {
      self.settings.minPercentil = percentil;
    },

    /**
     * Set the maximun percentile score.
     * @param {number} percentil - Percentil value. Value between 0 and 1.
     * @default null
     * @instance
     */
    setMaxPercentil(percentil) {
      self.settings.maxPercentil = percentil;
    },

    /**
     * Method to discard maximums and minimums.
     *
     * Methods allowed:
     * - <b>stdDev</b>: Standard deviation.
     * - <b>5percent</b>: Percentile 5%-95%.
     * - <b>10percent</b>: Percentile 10%-90%.
     * - <b>20percent</b>: Percentile 20%-20%.
     * - <b>none</b>: None.
     * @param {string} discardMethod - Method name.
     * @default 'none'
     * @instance
     */
    setDiscardMethod(discardMethod) {
      self.settings.discardMethod = discardMethod;
    },

    /**
     * Set visible the selectors.
     * @param {boolean} bool
     * @default false
     * @instance
     */
    setDisplaySelectors(bool) {
      self.settings.displaySelectors = bool;
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Download CSV
     * @ignore
     */
    downloadCSV() {
      let s = null;
      let isCorrectData =
        self.widget &&
        self.widget.data &&
        self.widget.data.days &&
        Array.isArray(self.widget.data.days);
      if (isCorrectData) {
        let dayss = self.widget.data.days;
        let valss = self.widget.data.values;
        let nams = self.widget.data.tags[0];
        let totSeries = self.widget.data.days.length;
        let header = '"name","timestamp","value"\r\n';
        let content = '';
        for (var i = 0; i < totSeries; i += 1) {
          let days = dayss[i];
          let vals = valss[i];
          var serieTot = days.length;
          for (var j = 0; j < serieTot; j += 1) {
            content += nams + ',' + days[j] + ',' + vals[j] + ',\r\n';
          }
        }
        s = header + content;
      } else {
        console.error(`No data for download in widget "${self.id}"`);
      }
      if (s) downloads.downloadCSV(s, `${self.id}-data`);
    },

    /**
     * Redraw function
     * @ignore
     */
    redraw() {
      if (self.widget) {
        self.widget.display({ size: true }, 300, $(self.graphic).height());
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
    render: (orig) => {
      if (!self.el) return; // If not have element not render
      let cfg = Object.assign({}, defaultSettings, self.settings);
      let data = processStructure(
        orig,
        cfg.timestampKey,
        cfg.valToShow,
        cfg.valToShow,
        cfg.seriesNames,
        cfg.timestampKey,
        cfg.forceFirstElement,
        cfg.forceLastElement
      );

      if (data) {
        self.widget = new HeatCalendarWidget(cfg);
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
