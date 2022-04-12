import DataNode from '@devoinc/applications-builder/data/DataNode';
import * as dom from '@devoinc/applications-builder/libs/dom';

/**
 * Contains all methods related with the widget HTML container
 * element and not the graphic itself. Some of then can be redefined
 * in each widget and used in a instance of the widget.
 * @category Widgets
 * @subcategory Mixins
 * @module base
 */
function base(self) {
  self = Object.assign(self, {
    widget: null, // Reference to the widget inside
    data: new DataNode(self.id),
    hidden: false,
    visible: false, // Hidden at the begining
    forceRefresh: false, // When the widget is visible refresh
  });

  return {
    data: self.data,

    /**
     * Personalize an captured error ocurred in the widget
     * and show in the widget and the Web console.
     * @param {Object} [opts={}]
     * @param {string} opts.msg - Message to show in the widget.
     * @param {Object} opts.console
     * @param {string} opts.console.method - A valid method of console Web API.
     * @param {string} opts.console.msg - Message to show int the console.
     * @param {boolean} [reject=false] - Boolean to break the chain actions.
     * @instance
     */
    debugError(opts = {}, reject = false) {
      opts = Object.assign(
        {
          msg: 'NO DATA',
          console: { method: 'warn', msg: 'No data' },
        },
        opts
      );
      this.hideLoading(); // Hide loading if no hidden yet
      this.drawError(opts.msg); // Draw message on widget
      // Show console message
      console[opts.console.method](`${self.id} -> ${opts.console.msg}`);
      if (reject) return Promise.reject(); // Reject for break the chain
    },

    /**
     * Draw the widget with the given configuration and data.
     * @param {any} Widget - Widget object to draw
     * @param {Object} cfg - Configuration set according to the widget.
     * @param {Object|Array} data - Data struture according to the widget.
     * @instance
     */
    displayWashemoWidget(Widget, cfg, data) {
      self.widget = new Widget(cfg);
      self.widget.setData(data);
      self.widget.display({
        force: true,
        data: true,
      });
    },

    /**
     * Show an error in the widget container.
     * @param {string} msg - Error message.
     * @instance
     */
    drawError(msg) {
      let icon = self.settings.errorIcon || 'lticon-information_about';
      let container = $(self.el).find('.lt-vapp-widget-graphic');
      container.empty();
      let div = $('<div>').addClass('widgetError');
      icon = $('<span>').addClass(icon);
      msg = $('<span>').text(msg);
      container.append(div.append(icon).append(msg));
    },

    /**
     * This method calls the showEl method.
     * @instance
     */
    forceShow() {
      self.hidden = false;
      this.showEl(true);
    },

    /**
     * Get the widget container.
     * The element container include the header and the graphic.
     * @return {Object} - HTML DOM element widget container.
     * @instance
     */
    getElementContainer() {
      return self.el;
    },

    /**
     * Get the chart container.
     * @return {Object} - Chart container HTML DOM element.
     * @instance
     */
    getGraphicContainer() {
      return self.graphic;
    },

    /**
     * Get the widget object
     * @return {Object} - Widget object.
     * @instance
     */
    getWidget() {
      return self.widget;
    },

    /**
     * Hide the widget container element.
     * @instance
     */
    hide() {
      self.hidden = true;
      self.visible = false;
      dom.hide(self.el);
      this.removeAllListeners('resize');
    },

    /**
     * Hide the chart container element.
     * @instance
     */
    hideGraphic() {
      dom.hide(self.graphic);
      this.removeAllListeners('resize');
    },

    /**
     * Allow to initialize any widget.
     * This method is overridden in each widget.
     * @instance
     */
    init() {},

    /**
     * Check hidden state.
     * @return {boolean} - Indicates if the widget is hidden.
     * @instance
     */
    isHidden() {
      return self.hidden;
    },

    /**
     * Check visibility state.
     * @return {boolean} - Indicates if the widget is visible.
     * @instance
     */
    isVisible() {
      return self.visible;
    },

    /**
     * Set the widget element container
     * @param {Object} el - HTML DOM container.
     * @instance
     */
    setElementContainer(el) {
      self.el = el;
    },

    /**
     * Set the chart element container.
     * @param {Object} el - HTML DOM container.
     * @instance
     */
    setGraphicContainer(graphic) {
      self.graphic = graphic;
    },

    /**
     * Set widget title to header.
     * @param {string} title - Text to set.
     * @instance
     */
    setTitle(title) {
      if (title.length > 0) {
        if (self.el.querySelector('h3') !== null)
          self.el.querySelector('h3').innerHTML = title;
        else if (self.el.querySelector('h2') !== null)
          self.el.querySelector('h2').innerHTML = title;
      }
    },

    /**
     * Show the chart widget.
     * @param {boolean} [forceRefresh=false] - force refresh widget.
     * @instance
     */
    show(forceRefresh = false) {
      self.visible = true;
      self.hidden = false;
      if (forceRefresh) self.forceRefresh = true;

      // Only check for refresh if not collapsed
      if (self.isCollapsed === false) {
        self.graphic.style.display = 'block';
        this.addListener('resize', () => this.resize());

        // Refresh only when show at first time or if the forceRefresh is true
        if (forceRefresh || self.renderTimes === 0) this.refresh(forceRefresh);
        else this.resize();
      }
    },

    /**
     * Show the container widget.
     * @param {boolean} [forceRefresh=false] - force refresh widget.
     * @instance
     */
    showEl(forceRefresh = false) {
      self.visible = true;
      self.hidden = false;
      if (forceRefresh) self.forceRefresh = true;

      // Only check for refresh if not collapsed
      if (self.isCollapsed === false) {
        self.el.style.display = 'block';
        this.addListener('resize', () => this.resize());

        // Refresh only when show at first time or if the forceRefresh is true
        if (forceRefresh || self.renderTimes === 0) this.refresh(forceRefresh);
        else this.resize();
      }
    },

    /**
     * By default,it does nothing.
     * This method should be overwritten in each widget.
     * It's executed when redraw the widget.
     * @instance
     */
    redraw() {},

    /**
     * By default, it does nothing.
     * This method should be overwritten in each widget.
     * Resize method that trigger when de window change the size.
     * @instance
     */
    resize() {},
  };
}

export default base;
