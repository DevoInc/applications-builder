/**
 * Add the mechanism to show a loader gif on graphic space and to remove this
 * loader.
 * @category Widgets
 * @subcategory Mixins
 * @module loading
 */
export default (self) => ({
  /**
   * Show loading.
   * @instance
   */
  showLoading() {
    self.graphic.innerHTML = `<div class="lt-vapp-widget-loading"></div>`;
  },

  /**
   * Hide loading.
   * @instance
   */
  hideLoading() {
    self.graphic.innerHTML = "";
  },
});
