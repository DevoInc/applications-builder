import processStructure from '@devo/applications-data-library/structures/chord';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const BiChordWidget = dependencies.require('widgets').BiChordWidget;

/**
 * This chart displays the interrelationships between data through time.
 * The data is arranged radially around a circle with the relationships
 * between the different distinct values (represented as segments in the
 * circle) drawn as arcs connecting the data together.
 * Each arc is assigned a value that represents its proportion.
 * @category Widgets
 * @module Bichord
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
 * @tutorial widgets-bichord
 */
function mixin(self) {
  return {
    /**
     * Set the column name to be represented.
     * @param {string} str - Column name.
     * @instance
     */
    setValue: (str) => (self.settings.valToShow = str),

    /**
     * Set the source and target values of the relationships
     * to be defined in the diagram.
     *
     * The source values are represented in the left part of the diagram.
     * The target values are represented in the right part of the diagram.
     *
     * @example {source: 'source', target: 'target'}
     * @param {Object} keys - keys to show
     * @param {Object} keys.source - Source values of the relationships
     * to be defined in the diagram.
     * @param {Object} keys.target - 	Target values of the relationships
     * to be defined in the diagram.
     * @instance
     */
    setKeys: (keys) => (self.settings.keysToShow = keys),

    /**
     * Set the minimum percentage of value to show.
     * @param {number} percentage - Value between 0 and 100.
     * @instance
     */
    setMinPct: (percentage) => (self.settings.minPct = percentage),

    /**
     * Angle of separation between the two parts of the widgets.
     * @param {number} angle - Value in grades.
     * @instance
     */
    setSeparationAngle: (angle) => (self.settings.separationAngle = angle),

    /**
     * Set a background frame for the sources side.
     * @param {boolean} sourceSideClass - Enable or disable.
     * @instance
     */
    setSourceSideClass: (sourceSideClass) =>
      (self.settings.sourceSideClass = sourceSideClass),

    /**
     * Set a background frame for the sources side.
     * @param {boolean} targetSideClass - Enable or disable.
     * @instance
     */
    setTargetSideClass: (targetSideClass) =>
      (self.settings.targetSideClass = targetSideClass),

    /**
     * Set the width of the area dedicated to represent a group.
     *
     * - If it is a number, it is understood as absolute width.
     * - If it is a string with the form "nn%", it is understood to be a
     * percentage of the radius.
     * - If it is a string with the form "/ n", "* n", it is understood
     * to be the radius divided or multiplied by n.
     * - If it is a function, it is evaluated by passing the radius.
     *
     * All calculations are performed with the radius available for the
     * chord diagram, after removing the space of the labels and their
     * connectors.
     *
     * @param {number|string|Function} width - Width value.
     * @default Math.min(0.1 * radius, 20)
     * @instance
     */
    setGroupWidth: (width) => (self.settings.groupWidth = width),

    /**
     * The maximum angle occupied by the separations between groups.
     * @param {number} padding - Value in radians.
     * @default 0.015
     * @instance
     */
    setGroupPadding(padding) {
      self.settings.groupPadding = padding;
    },

    /**
     * The maximum percentage of separation between groups.
     * @param {number} percent - Value between 0 and 100.
     * @default 50
     * @instance
     */
    setGroupPaddingPercent(percent) {
      self.settings.groupPaddingPercent = percent;
    },

    /**
     * Set if the bands are colored with the color of the sources (true),
     * or the colors of the targets (false).
     * @param {boolean} sourceColoredChords - Value.
     * @instance
     */
    setSourceColoredChords(sourceColoredChords) {
      self.settings.sourceColoredChords = sourceColoredChords;
    },

    /**
     * Set enable or disable a band of color to give information of who is
     * the target.
     * @param {boolean} subgroups - Show subgroups.
     * @default true
     * @instance
     */
    setSubgroups(subgroups) {
      self.settings.subgroups = subgroups;
    },

    /**
     * Similar to groupWidth, but when relative it is calculated with respect
     * to the width of the group.
     * This space is eaten by the width of the groups, so it should not
     * exceed 50%.
     *
     * - If it is a number, it is understood as absolute width.
     * - If it is a string with the form "nn%", it is understood to be a
     * percentage of the radius.
     * - If it is a string with the form "/ n", "* n", it is understood
     * to be the radius divided or multiplied by n.
     * - If it is a function, it is evaluated by passing the radius.
     * @param {number|string|Function} width - Width value.
     * @default "33%"
     * @instance
     */
    setSubgroupWidth(width) {
      self.settings.subgroupWidth = width;
    },

    /**
     * Show the labels with the names of the groups.
     * @param {boolean} labels - Enable or disable.
     * @instance
     */
    setLabels: (labels) => (self.settings.labels = labels),

    /**
     * Set the maximum width that is dedicated to the labels.
     *
     * - If it is a number, it is understood as absolute width.
     * - If it is a string with the form "nn%", it is understood to be a
     * percentage of the radius.
     * - If it is a string with the form "/ n", "* n", it is understood
     * to be the radius divided or multiplied by n.
     * - If it is a function, it is evaluated by passing the radius.
     * @param {number|string|Function} width - Width value.
     * @default "20%"
     * @instance
     */
    setLabelMaxWidth: (width) => (self.settings.labelMaxWidth = width),

    /**
     * Set a value to the calculate the height for the labels.
     *
     * - If it is a number, it is understood as absolute width.
     * - If it is a string with the form "nn%", it is understood to be a
     * percentage of the radius.
     * - If it is a string with the form "/ n", "* n", it is understood
     * to be the radius divided or multiplied by n.
     * - If it is a function, it is evaluated by passing the radius.
     * @param {number|string|Function} scale - Scale value.
     * @default "20%"
     * @instance
     */
    setLabelHeightScale: (scale) => (self.settings.labelHeightScale = scale),

    /**
     * Set the maximum occupancy of the perimeter with labels.
     *
     * - If it is a number, it is understood as absolute width.
     * - If it is a string with the form "nn%", it is understood to be a
     * percentage of the radius.
     * - If it is a string with the form "/ n", "* n", it is understood
     * to be the radius divided or multiplied by n.
     * - If it is a function, it is evaluated by passing the radius.
     * @param {number|string|Function} density - Density value.
     * @default "80%"
     * @instance
     */
    setLabelMaxDensity: (density) => (self.settings.labelMaxDensity = density),

    /**
     * The minimum height for the labels.
     * It will evaluate the natural height of the current labels
     * (if there are several heights, on the maximum).
     * It only takes effect if <i>labelMaxDensity</> is not exceeded, which
     * means that the size of the labels is being reduced because of its length.
     * If this property takes effect, the content of some tags will be partially
     * displayed.
     *
     * - If it is a number, it is understood as absolute width.
     * - If it is a string with the form "nn%", it is understood to be a
     * percentage of the radius.
     * - If it is a string with the form "/ n", "* n", it is understood
     * to be the radius divided or multiplied by n.
     * - If it is a function, it is evaluated by passing the radius.
     * @param {number|string|Function} height - Height value.
     * @default 5
     * @instance
     */
    setLabelMinHeight: (height) => (self.settings.labelMinHeight = height),

    /**
     * The width that is dedicated to connectors between labels and groups,
     * if any are necessary.
     * It is a value similar to groupWidth, but, when relative, it is
     * calculated with respect to the effective width that is dedicated to
     * the label.
     *
     * - If it is a number, it is understood as absolute width.
     * - If it is a string with the form "nn%", it is understood to be a
     * percentage of the radius.
     * - If it is a string with the form "/ n", "* n", it is understood
     * to be the radius divided or multiplied by n.
     * - If it is a function, it is evaluated by passing the radius.
     * @param {number|string|Function} width - Min width value.
     * @default "33%"
     * @instance
     */
    setLabelLeadersWidth: (width) => (self.settings.labelLeadersWidth = width),

    /**
     * Set the color of labels.
     * @param {string} color - Color.
     * @default "black"
     * @instance
     */
    setLabelColour: (color) => (self.settings.labelColour = color),

    /**
     * Shows or hide the legend.
     * @param {boolean} show - Enbale or disable.
     * @default false
     * @instance
     */
    setShowLegend: (show) => (self.settings.showLegend = show),

    /**
     * Swaps sources and targets.
     * @param {boolean} swap
     * @default false
     * @instance
     */
    setSwapped: (swap) => (self.settings.swapped = swap),

    /**
     * Set enable or disable the period.
     * @param {boolean} period - Enable or disable.
     * @instance
     */
    setPeriodNavigation: (period) => (self.settings.periodNavigation = period),

    /**
     * Set the legend background color.
     * @param {string} color - Color.
     * @default "rgb(32,32,32)"
     * @instance
     */
    setLegendBgColor: (color) => (self.settings.legendBgColor = color),

    /**
     * Set the font color for the legend.
     * @param {string} color - Color.
     * @default "rgb(190,190,190)"
     * @instance
     */
    setLegendFontColor: (color) => (self.settings.legendFontColor = color),

    /**
     * Limit the relationships to be displayed.
     * @param {number} limit - Limit.
     * @default 50
     * @instance
     */
    setDisplayLimits: (limit) => (self.settings.displayLimits = limit),

    /**
     * Limit the relationships to be displayed by percentile.
     * @param {number} percentile - Percentage value.
     * @default 100
     * @instance
     */
    setPercentile: (percentile) => (self.settings.percentile = percentile),

    /**
     * Lock the legend by ckicking on the chart.
     * @param {boolean} bool - Enable or disable.
     * @default true
     * @instance
     */
    setclickToLockLegend: (bool) => (self.settings.clickToLockLegend = bool),

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render function
     * @param {object} orig - Data for process
     * @ignore
     */
    render: function (orig) {
      if (!self.el) return; // If not have element not render
      this.processOn(self);
      let cfg = Object.assign({}, self.settings);
      let data = processStructure(
        orig,
        cfg.minPct,
        cfg.keysToShow,
        cfg.valToShow
      );
      self.withDownloadButton = false;
      if (data) {
        self.widget = new BiChordWidget(cfg);

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

    /**
     * Process on
     * @param {*} self
     * @ignore
     */
    processOn: function (self) {
      self.settings.on = self.settings.on || [
        {
          on: ['groupover', 'labelover'],
          perform: function (d) {
            let legendDom = self.widget._domContainer.find('.legend');
            var legendValues = self.widget._domContainer.find('.legendValues'),
              valLen,
              i,
              total = 0,
              widthDom,
              legendRows,
              currentKey;
            legendDom.css('color', self.widget._settings.legendFontColor);
            legendValues.css('color', self.widget._settings.legendFontColor);
            if (typeof d != 'undefined' && typeof d.index != 'undefined') {
              self.widget.fadeAll(0.15, d.index);
              if (self.widget._settings.showLegend) {
                widthDom = self.widget._domContainer.width();
                if (this._settings.clickToLockLegend) {
                  legendRows = this._settings.displayLimits;
                } else if (widthDom <= 800) {
                  legendRows = Math.floor(
                    (self.widget._domContainer.height() - 100) / 31
                  );
                } else if (widthDom <= 1200) {
                  legendRows = Math.floor(
                    (self.widget._domContainer.height() - 120) / 31
                  );
                } else {
                  legendRows = Math.floor(
                    (self.widget._domContainer.height() - 140) / 31
                  );
                }
                legendValues.empty();
                legendDom.empty();
                legendDom.html(
                  ((d.value / self.widget._totalSum) * 100).toFixed(2) +
                    '% ' +
                    d.name +
                    ' (' +
                    d.value.toFixed(2) +
                    ')'
                );
                currentKey =
                  (d.index >= this._trgno ? '#src#' : '#trg#') + d.name;
                valLen = self.widget._statData[currentKey].values.length;
                for (i = 0; i < valLen; i++) {
                  let statData = self.widget._statData[currentKey];
                  let percent1 = (
                    ((statData.total - total) / statData.total) *
                    100
                  ).toFixed(2);
                  if (i === legendRows - 1 && valLen > legendRows) {
                    legendValues.append(
                      $('<li>')
                        .css('white-space', 'nowrap')
                        .css('box-shadow', 'none')
                        .html(`<b>${percent1} %</b> Grouped values
                      (${statData.total - total})`)
                    );
                    break;
                  }
                  let value = statData.values[i];
                  let percent = ((value.value / statData.total) * 100).toFixed(
                    2
                  );
                  legendValues.append(
                    $('<li>')
                      .css('white-space', 'nowrap')
                      .css('box-shadow', 'none')
                      .css('margin-bottom', '4px')
                      .attr('title', statData.values[i].value.toFixed(2))
                      .html(
                        `<b>${percent} %</b> ${value.target} (${value.value})`
                      )
                  );
                  total += statData.values[i].value;
                }
              }
            }
          },
        },
        {
          on: ['groupout', 'labelout'],
          perform: () => {
            self.widget.fadeAll(1);
            self.widget._domContainer.find('.legend').empty();
            self.widget._domContainer.find('.legendValues').empty();
            self.widget._sourceLegend();
          },
        },
        {
          on: ['chordover'],
          perform: function (d) {
            var legendDom = self.widget._domContainer.find('.legend'),
              legendValues = self.widget._domContainer.find('.legendValues'),
              valLen,
              i,
              total = 0,
              widthDom,
              legendRows,
              currentKey;
            legendDom.css('color', self.widget._settings.legendFontColor);
            legendValues.css('color', self.widget._settings.legendFontColor);
            if (
              typeof d != 'undefined' &&
              typeof d.source != 'undefined' &&
              typeof d.source.index != 'undefined'
            ) {
              self.widget.fadeAll(0.15, d.source.index);
              if (self.widget._settings.showLegend) {
                widthDom = this._domContainer.width();
                if (this._settings.clickToLockLegend) {
                  legendRows = this._settings.displayLimits;
                } else if (widthDom <= 800) {
                  legendRows = Math.floor(
                    (this._domContainer.height() - 100) / 24
                  );
                } else if (widthDom <= 1200) {
                  legendRows = Math.floor(
                    (this._domContainer.height() - 120) / 24
                  );
                } else {
                  legendRows = Math.floor(
                    (this._domContainer.height() - 140) / 24
                  );
                }
                legendValues.empty();
                legendDom.empty();
                legendDom.html(
                  ((d.source.value / self.widget._totalSum) * 100).toFixed(2) +
                    '% ' +
                    d.source.name +
                    ' (' +
                    d.source.value.toFixed(2) +
                    ')'
                );
                currentKey = '#trg#' + d.source.name;
                valLen = self.widget._statData[currentKey].values.length;
                for (i = 0; i < valLen; i++) {
                  if (i === legendRows - 1 && valLen > legendRows) {
                    legendValues.append(
                      $('<li>')
                        .css('box-shadow', 'none')
                        .css('white-space', 'nowrap')
                        .html(
                          '<b>' +
                            (
                              ((self.widget._statData[d.name].total - total) /
                                self.widget._statData[d.name].total) *
                              100
                            ).toFixed(2) +
                            '%</b> Grouped values (' +
                            (self.widget._statData[d.name].total - total) +
                            ')'
                        )
                    );
                    break;
                  }
                  legendValues.append(
                    $('<li>')
                      .css('box-shadow', 'none')
                      .css('white-space', 'nowrap')
                      .css('mrgin-bottom', '4px')
                      .attr(
                        'title',
                        self.widget._statData[currentKey].values[
                          i
                        ].value.toFixed(2)
                      )
                      .html(
                        '<b>' +
                          (
                            (self.widget._statData[currentKey].values[i].value /
                              self.widget._statData[currentKey].total) *
                            100
                          ).toFixed(2) +
                          '%</b> ' +
                          self.widget._statData[currentKey].values[i].target +
                          ' (' +
                          self.widget._statData[currentKey].values[i].value +
                          ')'
                      )
                  );
                  total += self.widget._statData[currentKey].values[i].value;
                }
              }
            }
          },
        },
        {
          on: ['chordout', 'labelout'],
          perform: () => {
            self.widget.fadeAll(1);
            self.widget._domContainer.find('.legend').empty();
            self.widget._domContainer.find('.legendValues').empty();
            self.widget._sourceLegend();
          },
        },
      ];
    },
  };
}

export default widgetFactory(mixin);
