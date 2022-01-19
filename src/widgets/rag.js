import processStructure from '@devo/applications-data-library/structures/rag';
import widgetFactory from '@devo/applications-builder/widgetFactory';
import dependencies from '../data/dependencies';

const RAGWidget = dependencies.require('widgets').RAGWidget;

/**
 * A RAG widget rate the data in its values.
 * This widgets is used to summarise indicator values where each color
 * represents a value.
 *
 * @category Widgets
 * @module RAG
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
 * @tutorial widgets-rag
 */
function mixin(self) {
  return {
    /**
     * Set the keys to represent.
     * @param {string[]} keys - Keys text.
     * @instance
     */
    setKeys(keys) {
      self.settings.keysToShow = keys;
    },

    /**
     * Set the value to show.
     * @param {string} value - Value to show.
     * @instance
     */
    setValue(val) {
      self.settings.valToShow = val;
    },

    /**
     * Indicate if the fields are related.
     * @param {boolean} bool
     * @instance
     */
    setIsFieldsRelated(bool) {
      self.settings.isFieldsRelated = bool;
    },

    /**
     * Set the unit for the values.
     * @param {string} str - Text with the unit.
     * @instance
     */
    setUnit(str) {
      self.settings.unit = str;
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
      let cfg = Object.assign({}, self.settings);
      let data = processStructure(orig, cfg.keysToShow, cfg.valToShow);
      self.withDownloadButton = false;
      if (data) {
        self.widget = new RAGWidget(cfg);

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
