import processStructure from '@devo/applications-data-library/structures/sankey';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const SankeyWidget = dependencies.require('widgets').SankeyWidget;

/**
 * This is a flow diagram from source to target where the width of the arrows
 * is proportional to the flow quantity.
 *
 * This widget is based on
 * [D3 Sankey Diagram]{@link https://github.com/d3/d3-sankey}
 * library.
 *
 * @category Widgets
 * @module Sankey
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
 * @tutorial widgets-sankey
 */
function mixin(self) {
  return {
    /**
     * Set the value key.
     * @param {string} key - Text of the key.
     * @instance
     */
    setValKey(key) {
      self.settings.valKey = key;
    },

    /**
     * Set the key of outgoing link.
     * @param {string} key - Text of the key.
     * @instance
     */
    setSourceKey(key) {
      self.settings.sourceKey = key;
    },

    /**
     * Set the key of incoming link.
     * @param {String} key - Text of the key.
     * @instance
     */
    setTargetKey(key) {
      self.settings.targetKey = key;
    },

    /**
     * Set the margin value that wraps the chart.
     * @param {number} margin - Value of margin in pixels.
     * @instance
     */
    setMargin(margin) {
      self.settings.margin = margin;
    },

    /**
     * Set the width of nodes.
     * @param {number} nodeWidth - Value of width in pixels.
     * @instance
     */
    setNodeWidth(nodeWidth) {
      self.settings.nodeWidth = nodeWidth;
    },

    /**
     * Set the vertical separation between adjacent nodes.
     * @param {number} num - Value of padding.
     * @instance
     */
    setNodePadding: (num) => (self.settings.nodePadding = num),

    /**
     * Set node text background filter name.
     * This method needs to set <i>setGenerateNodeTextBackground</i>.
     * @param {string} filterName - Text.
     * @instance
     */
    setNodeTextBackgroundFilterName(filterName) {
      self.settings.nodeTextBackgroundFilterName = filterName;
    },

    /**
     * Set the filter propperty style as visual effect to a node.
     * @param {function|string} ref - Filter property.
     * @instance
     */
    setNodeTextBackgroundFilterRef(ref) {
      self.settings.nodeTextBackgroundFilterRef = ref;
    },

    /**
     * Apply the background filter name in the node.
     * This method needs to set <i>setNodeTextBackgroundFilterName</i>.
     * @param {Boolean} bool - Apply the filter.
     * @instance
     */
    setGenerateNodeTextBackground(bool) {
      self.settings.generateNodeTextBackground = bool;
    },

    /**
     * Set the links color.
     *
     * The following values are supported:
     * - <b>source</b>
     * - <b>target</b>
     * - <b>source-target</b>
     * or an static color.
     * @param {string} color - Text with the color.
     * @instance
     */
    setLinkColor(color) {
      self.settings.linkColor = color;
    },

    /**
     * Set cycles.
     *
     * @param {Function} func - Callback JavaScript function.
     * @instance
     */
    setCycles(func) {
      self.settings.cycles = func;
    },

    /**
     * Apply a percentile score value.
     * @param {number} num - Number between 0 and 1.
     * @instance
     */
    setPercentile: (num) => (self.settings.percentile = num),

    /**
     * Apply a weight to the data to apply the percentile.
     * @param {number} num - Weight value.
     * @instance
     */
    setWeightedPercentile(num) {
      self.settings.weightedPercentile = num;
    },

    /**
     * Set tail name.
     * @param {string} str - Text with the name.
     * @instance
     */
    setTailName(str) {
      self.settings.tailName = str;
    },

    /**
     * Set the nodes breadths.
     *
     * The following values are supported:
     * - <i>forward</i>
     * - <i>backward</i>
     * or a function.
     * @param {string|Function} val - Value to apply.
     * @instance
     */
    setBreadths(val) {
      self.settings.breadths = val;
    },

    /**
     * Sets the aligment of the chart.
     * When the breath value is "<i>forward</i>", it's aligned to the right.
     * When the breath value is "<i>backward</i>", it's aligned to the left.
     * @param {boolean} bool - Align the chart.
     * @instance
     */
    setAlign(bool) {
      self.settings.align = bool;
    },

    /**
     * Sets the number of relaxation iterations when generating the layout.
     * @param {number} num - Numbers of iterations.
     * @instance
     */
    setIterations(num) {
      self.settings.iterations = num;
    },

    /**
     * Transform outer-join data to inner-join data.
     * This is, it leaves only the nodes and links that are part of paths
     * from the nodes of the first block to the nodes of the last block.
     * @param {boolean} bool - Enable this transformation.
     * @instance
     */
    setInnerJoinOnInitialValue(bool) {
      self.settings.innerJoinOnInitialValue = bool;
    },

    /**
     * Set statistics on initial value.
     * @param {boolean} bool - Enable statistics..
     * @instance
     */
    setStatsOnInitialValue(bool) {
      self.settings.statsOnInitialValue = bool;
    },

    /**
     * Add visible title to nodes.
     * @param {boolean} bool - Enable title.
     * @instance
     */
    setWithNodeLabels(bool) {
      self.settings.withNodeLabels = bool;
    },

    /**
     * Set visible link labels.
     * @param {boolean} bool - Enable link labels.
     * @instance
     */
    setWithLinkLabels(bool) {
      self.settings.withLinkLabels = bool;
    },

    /**
     * Set visible node names.
     * @param {boolean} bool - Enable node names.
     * @instance
     */
    setWithNodeNames(bool) {
      self.settings.withNodeNames = bool;
    },

    /**
     * Set with inner join toggle.
     * #todo
     * @param {boolean} bool - Enable inner join.
     * @instance
     */
    setWithInnerJoinToggle(bool) {
      self.settings.withInnerJoinToggle = bool;
    },

    /**
     * Set with stats toggle.
     * #todo
     * @param {boolean} bool - Enable inner join.
     * @instance
     */
    setWithStatsToggle(bool) {
      self.settings.withStatsToggle = bool;
    },

    /**
     * Set the info margin.
     * @param {number} num - Number in pixels.
     * @instance
     */
    setInfoMargin(num) {
      self.settings.infoMargin = num;
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
      //let wrapper = document.createElement('div');
      //wrapper.className += 'lt-lx-aw-sankey';
      self.el.querySelector('.lt-vapp-widget-graphic').className +=
        ' lt-lx-aw-sankey';
      let cfg = Object.assign({}, self.settings);
      let data = processStructure(
        orig,
        cfg.valKey,
        cfg.sourceKey,
        cfg.targetKey
      );
      cfg.withDownloadButton = false;
      if (data) {
        self.widget = new SankeyWidget(cfg);
        this.processOn(self);
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
     *
     * @param {*} self
     * @ignore
     */
    processOn(self) {
      function marking() {
        self.widget._domContainer.addClass('lt-lx-aw-sankey-marking');
      }

      function normal() {
        self.widget._domContainer.removeClass('lt-lx-aw-sankey-marking');
      }

      var _settings = {
        on: {
          nodeover: [
            marking,
            function (d) {
              self.widget.markNode(d, 'over', Infinity);
            },
          ],
          nodeout: [
            normal,
            function () {
              self.widget.unmarkAll('over');
            },
          ],
          linkover: [
            marking,
            function (d) {
              self.widget.markLink(d, 'over', Infinity);
            },
          ],
          linkout: [
            normal,
            function () {
              self.widget.unmarkAll('over');
            },
          ],
        },
      };
      self.widget.configure(_settings);
    },
  };
}

export default widgetFactory(mixin);
