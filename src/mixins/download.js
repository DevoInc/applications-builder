import { toggleMenu } from "./menu";

const BTN_CLASS = "lt-vapp-widget-action-download";

/**
 * Methods related to downloading widget data in to a file.
 * @category Widgets
 * @subcategory Mixins
 * @module download
 */
export default (self) => ({
  /**
   * Add download behaviour.
   * This make the possibility to override this function.
   * @instance
   */
  addDownloadBehaviour() {
    // Capture no element error
    if (self.el === null) return;

    let btn = self.el.querySelector(`.${BTN_CLASS}`);
    if (btn) {
      btn.addEventListener("click", (evt) => {
        evt.stopPropagation();
        toggleMenu(self.el);
        if (self.widget) this.downloadCSV();
        else console.error(`No data for download in widget "${self.id}"`);
      });
    }
  },

  /**
   * This method is implemented on each widget and it allow
   * to download the data of the widget in CSV format file.
   * @instance
   */
  downloadCSV() {},
});
