import processStructure from '@devo/applications-data-library/structures/googleMap';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const CircleWorldMapWidget =
  dependencies.require('widgets').CircleWorldMapWidget;

/**
 * The circle world map widget shows a map where the number of
 * values for each area is represented by colored circles.
 * @category Widgets
 * @module CircleWorldMap
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
 * @tutorial widgets-circle-world-map
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
    setMapTypeId(type) {
      self.settings.mapTypeId = type;
    },

    /**
     * Displays a small circular icon which allows you to rotate maps.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setRotateControl: (bool) => {
      self.settings.rotateControl = bool;
    },

    /**
     * Displays a map scale element.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setScaleControl: (bool) => {
      self.settings.scaleControl = bool;
    },

    /**
     * Displays a Pegman icon which can be dragged to the map to enable
     * Street View.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setStreetViewControl(bool) {
      self.settings.streetViewControl = bool;
    },

    /**
     * Displays a slider or "+/-" buttons to control the zoom level of
     * the map.
     * @param {boolean} bool - Enable or disable.
     * @see https://developers.google.com/maps/documentation/javascript/controls
     * @instance
     */
    setZoomControl(bool) {
      self.settings.zoomControl = bool;
    },

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
    setValue(values) {
      self.settings.valueToShow = values;
    },

    /**
     * Set custom styles.
     * @param {Object[]} styles - CSS styles properties.
     * @instance
     */
    setStyles(obj) {
      self.settings.styles = obj;
    },

    /**
     * Set styles by presets.
     *
     * The following values are supported:
     * - <b>standard</b>
     * - <b>silver</b>
     * - <b>retro</b>
     * - <b>dark</b>
     * - <b>night</b>
     * - <b>aubergine</b>
     * @param {string} str - Style name.
     * @instance
     */
    setPresetStyles(str) {
      const styles = require(`@devo/applications-builder/widgets/presets/googleMaps/${str}.json`);
      if (styles !== null) this.setStyles(styles);
    },

    // Common
    // -------------------------------------------------------------------------

    /**
     * Resize
     * @ignore
     */
    resize() {
      // This widget resize itself
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
      let cfg = Object.assign(
        {},
        {
          scrollwheel: true,
        },
        self.settings
      );
      let data = processStructure(orig, cfg.keyToShow, cfg.valueToShow);
      if (data) {
        self.widget = new CircleWorldMapWidget(cfg);
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
