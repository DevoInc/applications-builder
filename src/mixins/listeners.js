/**
 * Methods related to attaches custom events handlers to the
 * specified widget.
 * @category Widgets
 * @subcategory Mixins
 * @module listeners
 **/
export default (self) => {
  Object.assign(self, {
    listeners: {},
  });

  return {
    /**
     * Let to attach events handler. Several functions can be attached
     * to the same event name.
     * @param {string} evt - Event name.
     * @param {Function} func - Callback function.
     * @instance
     */
    addListener(evt, func) {
      if (!self.listeners[evt]) self.listeners[evt] = [];
      self.el.listeners[evt].push(func);
      this.addEventListener(evt, func);
    },

    /**
     * Remove a particular event listener by index.
     * @param {string} evt - Event name.
     * @param {number} index - Index number.
     * @instance
     */
    removeListenerByIndex(evt, index) {
      self.el.removeEventListener(evt, self.listeners[evt][index]);
      self.listeners[evt].splice(index, 1);
    },

    /**
     * Remove all listener for a particular event.
     * @param {string} evt - Event name.
     * @instance
     */
    removeAllListeners(evt) {
      if (!self.listeners[evt]) return;
      for (var i = 0; i < self.listeners[evt].length; i++) {
        this.removeListenerByIndex(evt, i);
      }
    },
  };
};
