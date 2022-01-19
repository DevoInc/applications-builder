import processStructure from '@devo/applications-data-library/structures/tree';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const TreeWidget = dependencies.require('widgets').TreeWidget;

/**
 * This widget produces tidy node-link diagrams of trees using the
 * Reingold–Tilford “tidy” algorithm.
 *
 * It is based on
 * [Interactive D3 Tree layout diagram]{@link https://github.com/d3/d3-hierarchy/blob/main/README.md#tree}
 * library.
 *
 * @category Widgets
 * @module Tree
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
 * @tutorial widgets-tree
 */
function mixin(self) {
  return {
    /**
     * Set the key value to show.
     * @param {string} value - Value to show
     * @instance
     */
    setValue(val) {
      self.settings.valToShow = val;
    },

    /**
     * Set the keys to be displayed in the tree.
     * @param {string[]} keys - keys to show.
     * @instance
     */
    setKeys(keys) {
      self.settings.keysToShow = keys;
    },

    /**
     * Attach an event handler function for one event to the widget.
     * @param {Object} event - Event ot array of events with the handler.
     * @param {string} event.on - Name of the event to listen.
     * @param {Function} event.perform Function to execute when the event is triggered.
     * @instance
     */
    setOn(events) {
      self.settings.on = events;
    },

    /**
     * Set the colors to be used on the chart.
     * @param {string[]} colors - Array of string colors.
     * @instance
     */
    setColors(colors) {
      self.settings.colors = colors;
    },

    /**
     * Set the maximun depth of the tree.
     * @param {number} num - Depth of the tree
     * @instance
     */
    setMaxDepth(num) {
      self.settings.maxDepth = num;
    },

    /**
     * Sets whether to display the count of values or the values.
     * @param {boolean} isValueCount - Enable the count of value.
     * @instance
     */
    setIsValueCount(isValueCount) {
      self.settings.isValueCount = isValueCount;
    },

    /**
     * Set the zoom as enabled or disabled.
     * @param {boolean} bool - Enabled or disabled the zoom.
     * @instance
     */
    setIsZoomEnabled(bool) {
      self.settings.isZoomEnabled = bool;
    },

    /**
     * Set the zoom level
     * @param {any} zoom The zoom.
     * @instance
     * @ignore
     */
    setZoom(zoom) {
      self.settings.zoom = zoom;
    },

    /**
     * Set the minimum connection radius between nodes.
     * @param {number} num - The radius.
     * @instance
     */
    setMinRadius(num) {
      self.settings.minRadius = num;
    },

    /**
     * Set the minimum circle radius of each child node.
     * @param {number} num - The radius.
     * @instance
     */
    setMinCircleRadius(num) {
      self.settings.minCircleRadius = num;
    },

    /**
     * Set the max radious.
     * @param {number} num - The radius.
     * @instance
     */
    setMaxRadius(num) {
      self.settings.maxRadius = num;
    },

    /**
     * Sets the container margin with the SVG graphic.
     * @param {number} num - The margin
     * @instance
     */
    setSvgMargin(num) {
      self.settings.svgMargin = num;
    },

    /**
     * Set the maximun number of elements to display.
     * @param {number} num - The maximum elements
     * @instance
     */
    setNumMaxElem(num) {
      self.settings.numMaxElem = num;
    },

    /**
     * Set the font color
     * @param {string} color - The font color
     * @instance
     */
    setFontColour(color) {
      self.settings.fontColor = color;
    },

    /**
     * Set the maximum font size
     * @param {number} num - Font size
     * @instance
     */
    setMaxFontSize(size) {
      self.settings.maxFontSize = size;
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Redraw function
     * @instance
     * @ignore
     */
    redraw() {
      if (self.widget) {
        // self.widget._initFoamtreeParentContainer($(self.graphic).height());
        // self.widget._addFoamtreeWidget({ size: true });
        let h = $(self.graphic).height();
        let w = $(self.graphic).width();
        self.widget.updateContainerSize(h, h, w, w);
        self.widget.updateViewportBoundaries();

        // TODO Temporal until review the resize on tree
        // Also see the root node identification problem for change the color
        // of the node
        // self.widget.display({
        //   force: true,
        //   data: true
        // });
      }
    },

    /**
     * Resize function
     * @instance
     * @ignore
     */
    resize() {
      this.redraw();
    },

    // Life Cycle
    // -------------------------------------------------------------------------

    /**
     * Render the data
     * @param {Object} orig Object of data
     * @ignore
     */
    render(orig) {
      if (!self.el) return; // If not have element not render
      self.el.querySelector('.lt-vapp-widget-graphic').className +=
        ' lt-lx-aw-sankey';
      this.processOn(self);
      let cfg = Object.assign({}, self.settings);
      let data = processStructure(orig, cfg.keysToShow, cfg.valToShow);
      self.withDownloadButton = false;
      if (data) {
        self.widget = new TreeWidget(cfg);

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
      self.settings.on = self.settings.on || [
        {
          on: ['nodeClick'],
          perform: function (d) {
            console.info('nodeClick', d);
          },
        },
        {
          on: ['nodeOver'],
          perform: function (d) {
            console.info('nodeOver', d);
          },
        },
        {
          on: ['nodeOut'],
          perform: function (d) {
            console.info('nodeOut', d);
          },
        },
        {
          on: ['textClick'],
          perform: function (d) {
            console.info('textClick', d);
          },
        },
        {
          on: ['textOver'],
          perform: function (d) {
            console.info('textOver', d);
          },
        },
        {
          on: ['textOut'],
          perform: function (d) {
            console.info('textOut', d);
          },
        },
      ];
    },
  };
}

export default widgetFactory(mixin);
