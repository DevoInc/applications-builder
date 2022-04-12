import processStructure from '@devoinc/applications-data-library/structures/availabilityTimeLine';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const AvailabilityTimelineWidget =
  dependencies.require('widgets').AvailabilityTimelineWidget;

/**
 * The availability timeline widget displays events during specific
 * intervals shown chronologically along a line, indicating the availability
 * and unavailability periods for each data group.
 * The widget is designed to provide a broad overview of a sequence of
 * events in time.
 * @category Widgets
 * @module AvailabilityTimeline
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
 * @tutorial widgets-availability-timeline
 */
function mixin(self) {
  return {
    /**
     * Set the column name to show.
     * @param {string} key - Column name.
     * @instance
     */
    setKey: (key) => {
      self.settings.keyToShow = key;
    },

    /**
     * Set the column with the value to show.
     * @param {string} key - Column name.
     * @instance
     */
    setValue: (value) => {
      self.settings.valueToShow = value;
    },

    /**
     * Set the grouping interval.
     * @param {number} grouping - Milliseconds.
     * @instance
     */
    setGrouping: (grouping) => {
      self.settings.grouping = grouping;
    },

    /**
     * Set all margins around the widget: top, bottom, left and right.
     * @param {Object} margin
     * @param {number} margin.top - Value in pixels.
     * @param {number} margin.right - Value in pixels.
     * @param {number} margin.bottom - Value in pixels.
     * @param {number} margin.left - Value in pixels.
     * @default {top: 100, right: 40, bottom: 20, left: 100}
     * @instance
     */
    setMargin: (margin) => {
      self.settings.margin = margin;
    },

    /**
     * Set the height of the blocks.
     * @param {number} height - Value in pixels.
     * @default 18
     * @instance
     */
    setDataHeight: (height) => {
      self.settings.dataHeight = height;
    },

    /**
     * Set the spacing between of the blocks.
     * @param {number} spacing - Value in pixels.
     * @default 14
     * @instance
     */
    setLineSpacing: (spacing) => {
      self.settings.lineSpacing = spacing;
    },

    /**
     * Set the padding top of the heading.
     * @param {number} padding - Value in pixels.
     * @default -50
     * @instance
     */
    setPaddingTopHeading: (padding) => {
      self.settings.paddingTopHeading = padding;
    },

    /**
     * Set the padding bottom.
     * @param {number} padding - Value in pixels.
     * @default 10
     * @instance
     */
    setPaddingBottom: (padding) => {
      self.settings.paddingBottom = padding;
    },

    /**
     * Set the padding left.
     * @param {number} padding - Value in pixels.
     * @instance
     */
    setPaddingLeft: (padding) => {
      self.settings.paddingLeft = padding;
    },

    /**
     * Set a custom class for the tooltip.
     * @param {string} className - Class name.
     * @instance
     */
    setToolTipClass: (className) => {
      self.settings.toolTipClass = className;
    },

    /**
     * Set the default formatter for dates.
     * @param {string} formatter - Formatter.
     * @default "DD/MM/YYYY HH:mm:SS"
     * @instance
     */
    setDateFormatter: (formatter) => {
      self.settings.dateFormatter = formatter;
    },

    /**
     * Set a custom class for the vertical grid.
     * @param {string} className - Class name.
     * @instance
     */
    setVertGridClass: (className) => {
      self.settings.vertGridClass = className;
    },

    /**
     * Set a custom class for the horizontal grid.
     * @param {string} className - Class name.
     * @instance
     */
    setHorzGridClass: (className) => {
      self.settings.horzGridClass = className;
    },

    /**
     * Set a custom class for the title of the grid.
     * @param {string} className - Class name.
     * @instance
     */
    setGTitleClass: (className) => {
      self.settings.gTitleClass = className;
    },

    /**
     * Set a custom class for the grid axis.
     * @param {string} className - Class name.
     * @instance
     */
    setGAxisClass: (className) => {
      self.settings.gAxisClass = className;
    },

    /**
     * Set a custom class for the axis.
     * @param {string} className - Class name.
     * @instance
     */
    setAxisClass: (className) => {
      self.settings.axisClass = className;
    },

    /**
     * Set a custom class for the data.
     * @param {string} className - Class name.
     * @instance
     */
    setGDataClass: (className) => {
      self.settings.gDataClass = className;
    },

    /**
     * Set a custom class for the dataset.
     * @param {string} className - Class name.
     * @instance
     */
    setDatasetClass: (className) => {
      self.settings.datasetClass = className;
    },

    /**
     * Set a custom class for the Y axis title.
     * @param {string} className - Class name.
     * @instance
     */
    setYTitleClass: (className) => {
      self.settings.yTitleClass = className;
    },

    /**
     * Set a custom class when has data.
     * @param {string} className - Class name.
     * @instance
     */
    setHasDataClass: (className) => {
      self.settings.hasDataClass = className;
    },

    /**
     * Set a custom class when have no data.
     * @param {string} className - Class name.
     * @instance
     */
    setHasNoDataClass: (className) => {
      self.settings.hasNoDataClass = className;
    },

    /**
     * @param {number} duration
     * @instance
     */
    setTransitionDuration: (duration) => {
      self.settings.transitionDuration = duration;
    },

    /**
     * Set a custom time for the opacity transition.
     * @param {number} opacity - Time in milliseconds.
     * @default 200
     * @instance
     */
    setTransitionOpacity: (opacity) => {
      self.settings.transitionOpacity = opacity;
    },

    /**
     * Set a custom data threshold.
     * @param {number} threshold - Threshold value.
     * @default 1
     * @instance
     */
    setDataThreshold: (threshold) => {
      self.settings.dataThreshold = threshold;
    },

    /**
     * Set a custom class for the tooltip when has data.
     * @param {string} className - Class name.
     * @instance
     */
    setTooltipHasDataClass: (className) => {
      self.settings.tooltipHasDataClass = className;
    },

    /**
     * Set a custom class for the tooltip when have no data.
     * @param {string} className - Class name.
     * @instance
     */
    setTooltipHasNoDataClass: (className) => {
      self.settings.tooltipHasNoDataClass = className;
    },

    /**
     * Set custom icon for when data is available.
     * @param {string} iconName
     * @instance
     */
    setIconOk: (iconName) => {
      self.settings.iconOk = iconName;
    },

    /**
     * Set custom icon for when no data is available.
     * @param {string} iconName
     * @instance
     */
    setIconCancel: (iconName) => {
      self.settings.iconCancel = iconName;
    },

    /**
     * @param {number} duration - Time in milliseconds
     * @ignore
     */
    setMouseoutDuration: (duration) => {
      self.settings.mouseoutDuration = duration;
    },

    /**
     * Set a custom title for the timeline.
     * @param {string} title - Text of the title.
     * @default "Data Availability Plot"
     * @instance
     */
    setTimelineTitle: (title) => {
      self.settings.timelineTitle = title;
    },

    /**
     * Set a custom class for the title.
     * @param {string} className - Class name.
     * @instance
     */
    setTitleClass: (className) => {
      self.settings.titleClass = className;
    },

    /**
     * Set the default formatter for the subtitle dates.
     * @param {string} format - Formatter.
     * @default "DD/MM/YYYY HH:mm:ss"
     * @instance
     */
    setSubtitleDateFormat: (format) => {
      self.settings.subtitleDateFormat = format;
    },

    /**
     * Set a custom class for the subtitle.
     * @param {string} className - Class name.
     * @instance
     */
    setSubheadingClass: (className) => {
      self.settings.subheadingClass = className;
    },

    /**
     * Set a custom margin top for the legend.
     * @param {number} margin - Legend top.
     * @default 11
     * @instance
     */
    setLegendTop: (margin) => {
      self.settings.legendTop = margin;
    },

    /**
     * Set a custom margin top for the subtitle.
     * @param {number} margin - Value in pixels.
     * @default 17
     * @instance
     */
    setSubtitleTop: (margin) => {
      self.settings.subtitleTop = margin;
    },

    /**
     * Set a custom margin left for the legend.
     * @param {number} margin - Value in pixels.
     * @default 20
     * @instance
     */
    setLegendMarginLeft: (margin) => {
      self.settings.legendMarginLeft = margin;
    },

    /**
     * Set a custom margin top for the legend.
     * @param {number} margin - Value in pixels.
     * @default 8.5
     * @instance
     */
    setLegendMarginTop: (margin) => {
      self.settings.legendMarginTop = margin;
    },

    /**
     * Set a custom margin between the title and the content of the legend.
     * @param {number} margin - Value in pixels.
     * @default 17
     * @instance
     */
    setLegendMarginH1: (margin) => {
      self.settings.legendMarginH1 = margin;
    },

    /**
     * Set a custom margin between the subtitle and the content of the legend.
     * @param {number} margin - Value in pixels.
     * @default 2
     * @instance
     */
    setLegendMarginH2: (margin) => {
      self.settings.legendMarginH2 = margin;
    },

    /**
     * Set a custom height for the legend.
     * @param {number} height - Value in pixels.
     * @default 15
     * @instance
     */
    setLegendHeight: (height) => {
      self.settings.legendHeight = height;
    },

    /**
     * et a custom width for the legend.
     * @param {number} width - Value in pixels.
     * @default 15
     * @instance
     */
    setLegendWidth: (width) => {
      self.settings.legendWidth = width;
    },

    /**
     * @param {string} text - Text when data is present
     * @instance
     */
    setTextHasData: (text) => {
      self.settings.textHasData = text;
    },

    /**
     * Set a custom text to show when no data.
     * @param {string} text - Custom text.
     * @default "No data available"
     * @instance
     */
    setTextHasNotData: (text) => {
      self.settings.textHasNotData = text;
    },

    /**
     * Set a custom class for the legend.
     * @param {string} className - Class name.
     * @instance
     */
    setLegendClass: (className) => {
      self.settings.legendClass = className;
    },

    /**
     * Set a custom unit for the values.
     * @param {string} units - Unit.
     * @instance
     */
    setLegendUnits: (units) => {
      self.settings.legendUnits = units;
    },

    /**
     * Set a custom function to format.
     * @param {Function} formatter - Callback JavaScript function.
     * @instance
     */
    setDataFormatter: (formatter) => {
      self.settings.dataFormatter = formatter;
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render function
     * @param {object} orig - Data for process
     * @ignore
     */
    render: function (orig) {
      if (!self.el) return; // If not have element not render
      let cfg = Object.assign({}, self.settings);
      let data = processStructure(
        orig,
        cfg.keyToShow,
        cfg.valueToShow,
        cfg.grouping
      );
      self.el.querySelector('.lt-vapp-widget-graphic').className +=
        ' lt-lx-aw-availability';
      self.withDownloadButton = false;
      if (data) {
        self.widget = new AvailabilityTimelineWidget(cfg);

        self.widget.setData(data);
        self.widget.display({
          force: true,
          data: data,
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
