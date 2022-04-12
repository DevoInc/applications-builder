import processStructure from '@devoinc/applications-data-library/structures/googleMap';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const GoogleHeatMapWidget = dependencies.require('widgets').GoogleHeatMapWidget;

/**
 * This chart displays information on a world map using latitude and
 * longitude coordinates, representing data with different colors.
 * Information can be clustered on the map by an optional additional value.
 * @category Widgets
 * @module GoogleHeatmap
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
 * @tutorial widgets-google-heatmap
 */
function mixin(self) {
  return {
    /**
     * Shows the MapType control in the map.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setMapTypeControl: (bool) => (self.settings.mapTypeControl = bool),

    /**
     * Sets the Google maps type.
     * @param {string} type - Type of map.
     * @see https://developers.google.com/maps/documentation/javascript/maptypes#BasicMapTypes
     * @instance
     */
    setMapTypeId: (type) => (self.settings.mapTypeId = type),

    /**
     * Displays a small circular icon which allows you to rotate maps.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setRotateControl: (bool) => (self.settings.rotateControl = bool),

    /**
     * Displays a map scale element.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setScaleControl: (bool) => (self.settings.scaleControl = bool),

    /**
     * Displays a Pegman icon which can be dragged to the map to enable
     * Street View.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setStreetViewControl: (bool) => (self.settings.streetViewControl = bool),

    /**
     * Displays a slider or "+/-" buttons to control the zoom level of
     * the map.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setZoomControl: (bool) => (self.settings.zoomControl = bool),

    /**
     * Specifies whether heatmaps dissipate on zoom.
     * @param {boolean} dissipating - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/heatmaplayer#customize_a_heatmap_layer
     * @instance
     */
    setDissipating: (dissipating) => (self.settings.disipating = dissipating),

    /**
     * Set the color gradient of the heatmap.
     *
     * One of the following numbers:
     * - <i>0</i>: 'Default'.
     * - <i>1</i>: 'Artic'.
     * - <i>2</i>: 'Boreal'.
     * - <i>3</i> 'Bruise'.
     * - <i>4</i> 'Sunset'.
     * - <i>5</i> 'Antartic'.
     * - <i>6</i> 'Sky Burst'.
     * - <i>7</i> 'Rioja Lightning'.
     * - <i>8</i> 'Kamehameha'.
     * - <i>9</i> 'Alien'.
     * - <i>10</i> 'Rainbow'.
     * @param {number} gradient - Number of gradient.
     * @instance
     */
    setGradient: (gradient) => (self.settings.gradient = gradient),

    /**
     * Set the radius of influence for each data point.
     * @param {number} radius - Number in pixels.
     * @see https://developers.google.com/maps/documentation/javascript/heatmaplayer#customize_a_heatmap_layer
     * @instance
     */
    setRadius: (radius) => (self.settings.radius = radius),

    /**
     * Set the opacity of the heatmap.
     * @param {number} opacity - Number between 0 and 1.
     * @see https://developers.google.com/maps/documentation/javascript/heatmaplayer#customize_a_heatmap_layer
     * @instance
     */
    setOpacity: (opacity) => (self.settings.opacity = opacity),

    /**
     * Set custom styles.
     * @param {Object[]} styles - CSS styles properties.
     * @instance
     */
    setStyles: (styles) => (self.settings.styles = styles),

    /**
     * Set the default value for zoom.
     * @param {number} zoom - Zoom value.
     * @instance
     */
    setZoom: (zoom) => (self.settings.zoom = zoom),

    /**
     * Set the initial map center.
     * @param {Object} center
     * @param {number} center.lat - Latitude value.
     * @param {number} center.lng - Longitude value.
     * @instance
     */
    setCenter: (center) => (self.settings.center = center),

    /**
     * Set the operation to apply to the data.
     *
     * The following values are supported:
     * - <b>none</b>: No operation to apply.
     * - <b>log</b>: Logarithmic operation.
     * - <b>arc</b>: Arctangent operation.
     * @param {string} operation - Operation name.
     * @instance
     */
    setDataOperation: (operation) => (self.settings.dataOperation = operation),

    /**
     * Set the zooming on the map using a mouse scroll wheel.
     * @param {boolean} bool - Enable or disable.
     * @instance
     */
    setScrollwheel: (bool) => (self.settings.scrollWheel = bool),

    /**
     * Set the default options for map controls.
     * @param {Object} options - Show Google documentation.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setMapTypeControlOptions: (options) =>
      (self.settings.mapTypeControlOptions = options),

    /**
     * Set the display options for the zoom control.
     * @param {Object} options - Show Google documentation.
     * @see https://developers.google.com/maps/documentation/javascript/reference/control#ZoomControlOptions
     * @instance
     */
    setZoomControlOptions: (options) =>
      (self.settings.zoomControlOptions = options),

    /**
     * Set the default options for the rendering of the Street View pegman
     * control on the map.
     * @param {Object} options - Show Google documentation.
     * @see https://developers.google.com/maps/documentation/javascript/reference/control#StreetViewControlOptions
     * @instance
     */
    setStreetViewControlOptions: (options) =>
      (self.settings.streetViewControlOptions = options),

    /**
     * Set the keys to show.
     * @param {Object[]} arr - Object with <i>lat</i> and <i>lon</i> values.
     * @instance
     */
    setKeys: (arr) => (self.settings.keys = arr),

    /**
     * Set the column nae with the value.
     * @param {string} value - Column name.
     * @instance
     */
    setValue: (value) => (self.settings.value = value),

    /**
     * Set partitioning key.
     * @param {string} partKey - Partitioning key
     * @instance
     */
    setPartKey: (partKey) => (self.settings.partKey = partKey),

    /**
     * Set initial gradient color.
     * @param {Object} gradient
     * @instance
     */
    setInitGradient: (gradient) => (self.settings.initGradient = gradient),

    // Life Cycle
    // ---------------------------------------------------------------------------

    /**
     * Render method
     * @ignore
     */
    render: (orig) => {
      if (!self.el) return; // If not have element not render
      let cfg = Object.assign(
        {},
        {
          scrollwheel: null,
        },
        self.settings
      );
      let data = processStructure(orig, cfg.keys, cfg.value, cfg.partKey);
      if (data) {
        self.widget = new GoogleHeatMapWidget(cfg);
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
