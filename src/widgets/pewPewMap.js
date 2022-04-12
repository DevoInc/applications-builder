import processStructure from '@devoinc/applications-data-library/structures/pewPewMap';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const PewPewMapWidget = dependencies.require('widgets').PewPewMapWidget;

/**
 * Colloquially known as Pew Pew map, this chart tracks live attacks going
 * from one location to another over a world map, depicted as arrows whose
 * colors and widths are defined by the values in the specified fields.
 * @category Widgets
 * @module PewPewMap
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
 * @tutorial widgets-pew-pew-map
 */
function mixin(self) {
  return {
    /**
     * Set the origin and destination coordinates.
     * @param {Object} coordinates
     * @param {Object} coordinates.from
     * @param {string} coordinates.from.lat - Latitude origin.
     * @param {string} coordinates.from.lon - Longitude origin.
     * @param {Object} coordinates.to
     * @param {string} coordinates.to.lat - Destination latitude.
     * @param {string} coordinates.to.lon - Deestination longitude.
     * @instance
     */
    setKeys(coordinates) {
      self.settings.latLonKeys = coordinates;
    },

    /**
     * Set the labels text.
     * @param {Object} labels
     * @param {string} labels.from - Text label.
     * @param {string} labels.to - Text label.
     * @instance
     */
    setLabelsKeys(labels) {
      self.settings.labels = labels;
    },

    /**
     * Set color key.
     * @param {string} val - Color.
     * @instance
     */
    setColorKey(val) {
      self.settings.colorKey = val;
    },

    /**
     * Set the column value to show.
     * @param {string} val - Column name.
     * @instance
     */
    setValue(val) {
      self.settings.valueToShow = val;
    },

    /**
     * Set gradient color number.
     * @param {number} gradient - Gradient number.
     * @instance
     */
    setGradient(gradient) {
      self.settings.gradient = gradient;
    },

    /**
     * Set an array of colors used for gradients.
     * @param {string[]} gradients Array of arrays of colors
     * @instance
     */
    setGradients(gradients) {
      self.settings.gradients = gradients;
    },

    /**
     * Wether to use gradient.
     * @param {boolean} val - Use gradient.
     * @instance
     */
    setUseGradient(val) {
      self.settings.useGradient = val;
    },

    /**
     * Set visibility of arrows.
     * @param {boolean} val - Visibility of arrows.
     * @instance
     */
    setVisible(val) {
      self.settings.visible = val;
    },

    /**
     * Set arrows animation.
     * @param {boolean} val - Animation of arrows.
     * @instance
     */
    setPlay(val) {
      self.settings.play = val;
    },

    /**
     * Set use of custom style-
     * @param {boolean} val - Custom style.
     * @instance
     */
    setCustomStyle(val) {
      self.settings.customStyle = val;
    },

    /**
     * Set descending sorting.
     * @param {boolean} val - Sort descending.
     * @instance
     */
    setSortDescending(val) {
      self.settings.sortDescending = val;
    },

    /**
     * Set default color.
     * @param {string} color - Default color
     * @instance
     */
    setDefaultColor(color) {
      self.settings.defaultColor = color;
    },

    /**
     * Set wether to fit map zoom when rendered.
     * @param {boolean} val - Fit to bounds.
     * @instance
     */
    setFitToBounds(val) {
      self.settings.fitToBounds = val;
    },

    /**
     * Apply an operation to the data.
     *
     * The following values are supported:
     * - <b>none</b>
     * - <b>arctag</b>
     * - <b>log</b>
     * @param {string} operation - Operation name.
     * @instance
     */
    setDataOperation(operation) {
      self.settings.dataOperation = operation;
    },

    /**
     * Do not apply the data.
     * @param {boolean} val - Skip limit data.
     * @instance
     */
    setSkipLimit(val) {
      self.settings.skipLimit = val;
    },

    /**
     * Set the limit of elements.
     * @param {number} limit - Limit number.
     * @instance
     */
    setElementsLimit(limit) {
      self.settings.elementsLimit = limit;
    },

    /**
     * Apply a style layer to the map.
     *
     * The following values are supported:
     * - <b>hybrid</b>
     * - <b>roadmap</b>
     * - <b>satellite</b>
     * - <b>terrain</b>
     * @param {string} val - Layer name.
     * @instance
     */
    setType(val) {
      self.settings.googleMutantOptions = { type: val };
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

    /**
     * Resize
     * @ignore
     */
    showLoading() {
      self.graphic.childNodes.forEach((node) => {
        node.hidden = true;
      });
      let spinner = document.createElement('div');
      spinner.className = 'lt-vapp-widget-loading';
      self.graphic.appendChild(spinner);
    },

    /**
     * Resize
     * @ignore
     */
    hideLoading() {
      self.graphic.querySelector('.lt-vapp-widget-loading').remove();
      self.graphic.childNodes.forEach((node) => {
        node.hidden = false;
      });
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
      let cfg = Object.assign({}, self.settings);
      let data = processStructure(
        orig,
        cfg.latLonKeys,
        cfg.valueToShow,
        cfg.labels,
        cfg.colorKey
      );

      if (data) {
        let aux;
        if (self.widget) aux = self.widget.map;
        self.widget = new PewPewMapWidget(cfg);
        self.widget.setData(data);
        if (aux) self.widget.map = aux;
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
