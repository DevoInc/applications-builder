import processStructure from '@devoinc/applications-data-library/structures/voronoi';
import downloads from '@devoinc/applications-builder/libs/downloads';
import { __ } from '@devoinc/applications-builder/i18n';
import objects from '@devoinc/applications-builder/utils/objects';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const VoronoiWidget = dependencies.require('widgets').VoronoiWidget;

/**
 * This widget represents grouped data as variables, displayed as
 * a tessellation of polygons whose proportions depend on the number of
 * events represented. These polygons are subdivided into smaller polygons
 * and constitute a hierarchical structure with as many levels as those
 * into which the data is divided (there is a legend above the chart
 * explaining that hierarchy).
 *
 * This widget is based on
 * [FoamTree]{@link https://get.carrotsearch.com/foamtree/demo/api/index.html#quick-start}
 * library.
 *
 *
 * @category Widgets
 * @module Voronoi
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
 * @tutorial widgets-voronoi
 */
export function mixin(self) {
  // Always apply the default info
  // Later could be replaced
  setDefaultInfo(self);

  return {
    /**
     * Determines the general type of layout to generate.
     * Depending on this option, FoamTree will produce polygon-based
     * organic-looking visualization or the traditional rectangular
     * tree map.
     *
     * The following values are supported:
     * - <strong>relaxed</strong>: produces polygonal organic-looking
     * arrangements based on Voronoi diagrams.
     * - <strong>ordered</strong>: produces the traditional rectangular
     * treemap using the strip algorithm.
     * - <strong>squarified</strong>: produces the traditional treemap
     * using the squarified algorithm.
     *
     * @param {string} layout - Layout type.
     * @instance
     */
    setLayout(layout) {
      self.settings.layout = layout;
    },

    /**
     * Determines the initial layout of groups' polygons.
     *
     * The following values are supported:
     * - <strong>fisheye</strong>: puts large groups in the center of the
     * visualization area and the smaller groups towards the corners.
     * - <strong>blackhole</strong>: puts small groups in the center of the
     * visualization and the larger groups towards the corners.
     * - <strong>ordered</strong>: lays out the groups in a left-to-right
     * lines, in the order the groups were specified in the data object.
     * - <strong>squarified</strong>: puts large groups close to the top-left
     * corner of the visualization and the small groups close to the
     * bottom-right corner.
     * - <strong>random</strong>: puts groups at random positions.
     *
     * <i>Note</i>: Applicable only when <i>setLayout</i> is set to <i>relaxed</i>.
     * @param {string} [relaxation='fisheye'] - Layout relaxation.
     * @instance
     */
    setRelaxationInitializer(relaxation) {
      self.settings.relaxationInitializer = relaxation;
      self.settings.initializer = relaxation;
    },

    /**
     * Enable legend display.
     * @param {boolean} enabled - Indicates if it's enabled.
     * @instance
     */
    setLegendVal(enabled) {
      self.settings.showLegendVal = enabled;
    },

    /**
     * Enable legend percentage display.
     * @param {boolean} enabled - Indicates if it's enabled.
     * @instance
     */
    setLegendPercentage(enabled) {
      self.settings.showLegendPerc = enabled;
    },

    /**
     * Display animation effects.
     * @param {boolean} enabled - Indicates if it's enabled.
     * @instance
     */
    setAnimation(enabled) {
      self.settings.annimation = enabled;
    },

    /**
     * The image to display in the attribution group.
     * The image can be specified as a relative or absolute
     * HTTP URL or a data URI.
     * @param {string} path - Path or url of an image.
     * @instance
     */
    setAttributionLogo(path) {
      self.settings.attributionLogo = path;
    },

    /**
     * Set groups whose weight is zero as visible.
     *
     * For more info vistit
     * [this info]{@link https://get.carrotsearch.com/foamtree/demo/api/index.html#showZeroWeightGroups}.
     *
     * @param {boolean} showzero - Indicates if it's enabled.
     * @instance
     */
    setShowZero(showzero) {
      self.settings.showZeroVal = showzero;
    },

    /**
     * Set the operation used to scale data.
     *
     * The following values are supported:
     * - <b>none</b>: No operation.
     * - <b>log</b>: Logarithmic operation.
     * - <b>atan</b>: Arctangent operation.
     * - <b>pow.75</b>: Power 0.75 operation.
     * - <b>pow.33</b>: Power 0.33 operation.
     * - <b>pow.25</b>: Power 0.25 operation.
     * - <b>sqrt</b>: Square root operation.
     * @param {string} operation - Operation name.
     * @default 'none'
     * @instance
     */
    setOperation(operation) {
      self.settings.operation = operation;
    },

    /**
     * Set the data representation.
     *
     * The following values are supported:
     * - <b>['toBytes']</b>: Byte representation.
     * - <b>['secondsToHMS']</b>: Time representation
     * @param {string[]} valueFormat - Array with the string name of the format.
     * @instance
     */
    setValueFormat(valueFormat) {
      self.settings.valueFormat = valueFormat;
    },

    /**
     * Set scroll or zoom to enabled.
     * @param {boolean} enable - Indicates if it's enabled.
     * @default false
     * @instance
     */
    setScrollZoom(enable) {
      self.settings.scrollZoom = enable;
    },

    /**
     * Set maximum total nodes per level.
     * @param {number} [num=1000] - Number of nodes to show.
     * @instance
     */
    setMaxLevelItems(num = 1000) {
      self.settings.maxLevelItems = num;
    },

    /**
     * Set maximum total nodes.
     * @param {number} [num=1000] - Number of nodes to show.
     * @instance
     */
    setMaxItems(num = 1000) {
      self.settings.maxItems = num;
    },

    /**
     * When color scale is enabled, select how color should be calculated.
     * It can be according to all nodes, by siblings or by all elements within
     * the same depth.
     *
     * The following values are supported:
     * - <b>all</b>: All nodes.
     * - <b>siblings</b>: Siblings nodes.
     * - <b>level</b>: Per level.
     * @default 'all'
     * @param {string} relation - Scale type.
     * @instance
     */
    setColorScaleRelativeTo(relation) {
      self.settings.colorScaleRelativeTo = relation;
    },

    /**
     * Set the key color for gradient:
     *
     * The following values are supported:
     * - <b>Default</b>
     * - <b>Artic</b>
     * - <b>Boreal</b>
     * - <b>Bruise</b>
     * - <b>Sunset</b>
     * - <b>Antartic</b>
     * - <b>Sky Burst</b>
     * - <b>Rioja Lightning</b>
     * - <b>Kamehameha</b>
     * - <b>Alien</b>
     * - <b>Rainbow</b>
     * @param {String} colorScale - Color scale name.
     * @instance
     */
    setColorScale(colorScale) {
      self.settings.colorScale = colorScale;
    },

    /**
     * Set the exposed groups.
     *
     * For more info vistit
     * [this info]{@link https://get.carrotsearch.com/foamtree/demo/api/index.html#expose}.
     * @param {string[]} exposeCurrentNode - Array of groups to expose.
     * @instance
     */
    setExposeCurrentNode(exposeCurrentNode) {
      self.settings.exposeCurrentNode = exposeCurrentNode;
    },

    /**
     * Set the name of the values.
     * @default ['count']
     * @param {string[]} dataLabels - Array of labels.
     * @instance
     */
    setDataLabels(dataLabels) {
      self.settings.dataLabels = dataLabels;
    },

    /**
     * Set the keys to display.
     * @param {string[]} keys - Array of keys.
     * @instance
     */
    setKeys(keys) {
      self.settings.keyToShow = keys;
    },

    /**
     * Set the order of keys.
     * @param {string[]} keysOrder - Array of keys ordered.
     * @instance
     */
    setKeysOrder(keysOrder) {
      self.settings.keysOrder = keysOrder;
    },

    /**
     * Set the value to display.
     * @example { value: 'count'}
     * @param {Object} value
     * @param {string} value.value - Value to show.
     * @instance
     */
    setValue(value) {
      self.settings.valToShow = value;
    },

    /**
     * Determines how FoamTree will display nested groups.
     * When it's set true, produces a flattened view of the hierarchy.
     * @param {boolean} bool - Boolean value.
     * @instance
     */
    setFlatSignals(bool) {
      self.settings.flatSignals = bool;
    },

    /**
     * Enable detailed view for comparations.
     * @param {boolean} [bool=true] Enable detailed view.
     * @instance
     */
    setEnableDetailView(bool = true) {
      self.settings.enableDetailView = bool;
    },

    /**
     * Set enabled color scale selector.
     * @param {boolean} [bool=true] - Enable color scale.
     * @instance
     */
    setEnableColorScale(bool = true) {
      self.settings.enableColorScale = bool;
    },

    /**
     * Enable the size selector.
     * @param {boolean} [bool=true] - Enable size selector.
     * @instance
     */
    setEnableSizeSelect(bool = true) {
      self.settings.enableSizeSelect = bool;
    },

    /**
     * Enable the partitioning functionality.
     * @param {boolean} [bool=true] - Enable partitioning
     * @instance
     */
    setEnablePartitioning(bool = true) {
      self.settings.enablePartitioning = bool;
    },

    /**
     * Set the border width on partitioning.
     * @param {number} [num=2] - Number of width border.
     * @instance
     */
    setPartitioningBorder(num = 2) {
      self.settings.enablePartitioning = num;
    },

    /**
     * Set the darken flat parents.
     * @param {boolean} [bool=true] - Enable darken flat parents.
     * @instance
     */
    setDarkenFlatParents(bool = true) {
      self.settings.darkenFlatParents = bool;
    },

    /**
     * Set the darken flat parents colors when it's enabled.
     * @param {string[]} [arr=['#595959', '#080808']] - Array of colors.
     * @instance
     */
    setDarkenFlatParentsColor(arr = ['#595959', '#080808']) {
      self.settings.darkenFlatParentsColor = arr;
    },

    /**
     * Set the hover effect color when use darken flat parents is enabled.
     * @param {string} [color='#797878'] - Color for the hover effect.
     * @instance
     */
    setDarkenFlatParentsHoveredColor(color = '#797878') {
      self.settings.darkenFlatParentsHoveredColor = color;
    },

    /**
     * Index for the dataLabels value that it's used to calculate the
     * node color when color scale is enabled.
     *
     * It is related to the setting <i>setDataLabels</i>.
     * @param {number} [index=0] - Index number of datalabel.
     * @see setEnableColorScale
     * @see setDataLabels
     * @instance
     */
    setColorSelection(index = 0) {
      self.settings.colorSelection = index;
    },

    /**
     * Set the index for the dataLabels value that it's used to calculate
     * the node size.
     *
     * It's related to the setting <i>setDataLabels</i>.
     * @param {Number} [index=0] - Index number of datalabel.
     * @see setEnableSizeSelect
     * @see setDataLabels
     * @instance
     */
    setSizeSelection(index = 0) {
      self.settings.sizeSelection = index;
    },

    /**
     * Attach an event handler function for one event to the widget.
     *
     * The list of events allowed is:
     * - <b>displayHelp</b>
     * - <b>voroSearchChange</b>
     * - <b>onKeyUp</b>
     * - <b>onGroupSelectionChanged</b>
     * - <b>onGroupClick</b>
     * - <b>onGroupDoubleClick</b>
     * - <b>onGroupHover</b>
     * - <b>onModelChanging</b>
     * - <b>onRolloutComplete</b>
     * - <b>onRedraw</b>
     * - <b>onModelChanged</b>
     * - <b>onRolloutStart</b>
     * - <b>onRolloutComplete</b>
     * - <b>onRelaxationStep</b>
     * - <b>onRedraw</b>
     * - <b>onViewReset</b>
     * - <b>onGroupSelectionChanging</b>
     * - <b>onGroupExposureChanging</b>
     * - <b>onGroupExposureChanged</b>
     * - <b>onGroupOpenOrCloseChanging</b>
     * - <b>onGroupOpenOrCloseChanged</b>
     * - <b>onGroupHold</b>
     * - <b>onGroupMouseMove</b>
     * - <b>onGroupMouseWheel</b>
     * - <b>onGroupMouseDown</b>
     * - <b>onGroupMouseUp</b>
     * - <b>onGroupDragStart</b>
     * - <b>onGroupDrag</b>
     * - <b>onGroupDragEnd</b>
     * - <b>onGroupTransformStart</b>
     * - <b>onGroupTransform</b>
     * - <b>onGroupTransformEnd</b>
     * @param {string} str - Name of the event to listen.
     * @param {Function} func - Function to execute when the event is triggered.
     * @instance
     */
    on(str, func) {
      if (!self.settings.on) self.settings.on = [];
      self.settings.on.push({ on: [str], perform: func });
    },

    /**
     * Set a custom property to the widget.
     * @param {string} key - Key to set, using dot notation.
     * @param {*} val - Value to set
     * @instance
     */
    setCustomProperty(key, val) {
      objects.set(self.settings, key, val);
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Download CSV
     * @instance
     * @ignore
     */
    downloadCSV() {
      let s = null;
      let isCorrectData =
        self.widget &&
        self.widget.data &&
        self.widget.data.data &&
        Array.isArray(self.widget.data.data);
      if (isCorrectData) {
        let data = self.widget.data.data;
        let totVals = self.widget.data.data.length;
        let totSeries = totVals > 0 ? self.widget.data.data[0].length : 0;
        let header = self.widget.data.kKeys.keys.join(',') + ',value\n';
        let content = '';
        if (totVals > 0 && totSeries > 0) {
          for (var i = 0; i < totSeries; i += 1) {
            for (var j = 0; j < totVals; j += 1) {
              content += data[j][i] + ',';
            }
            content = content.slice(0, -1) + '\n';
          }
          s = header + content;
        }
      } else {
        console.error(`No data for download in widget "${self.id}"`);
      }
      if (s) downloads.downloadCSV(s, `${self.id}-data`);
    },

    /**
     * Redraw function
     * @instance
     * @ignore
     */
    redraw() {
      if (self.widget) {
        self.widget._initFoamtreeParentContainer($(self.graphic).height());
        self.widget._addFoamtreeWidget({ size: true });
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
      let cfg = self.settings;
      let data = processStructure(
        orig,
        cfg.keyToShow,
        cfg.valToShow,
        cfg.keysOrder
      );
      if (data.data) {
        if (!data.error) {
          if (self.widget && self.widget._domContainer) {
            self.widget._domContainer = null;
          }
          this.displayWashemoWidget(VoronoiWidget, cfg, data);
        } else {
          this.debugError({
            msg: 'WRONG DATA',
            console: {
              method: 'error',
              msg: 'Wrong data arrive to render function',
            },
          });
        }
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

function setDefaultInfo(self) {
  var interactions = VoronoiWidget.prototype.interactions
    ? VoronoiWidget.prototype.interactions
    : [];

  let message = `<ul>
    <li>
      <label class="stronger">${__('Voronoi shortcuts')}</label>
    </li>`;
  for (let i = 0; i < interactions.length; i++) {
    message += '<li><ul>';
    for (let j = 0; j < interactions[i].length; j++) {
      message +=
        '<li><label class="stronger">' +
        interactions[i][j].desktop +
        '</label> ' +
        interactions[i][j].action +
        '</li>';
    }
    message += '</ul></li>';
  }
  message += '</ul>';

  self.info = {
    title: __('Control panel'),
    content: message,
  };
}

export default widgetFactory(mixin);
