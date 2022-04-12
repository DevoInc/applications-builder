import { closeAllMenus } from './menu';
import screenshot from '@devoinc/applications-builder/libs/screenshot';

const BTN_CLASS = 'lt-vapp-widget-action-capture';

const takeScreenShot = function (el) {
  closeAllMenus();
  screenshot.takeElementScreenShot(el);
};

/**
 * UI logic for screenshot.
 * @category Widgets
 * @subcategory Mixins
 * @module screenshot
 */
export default (self) => {
  // Add button and the effects
  if (self.el == null) return;
  let btn = self.el.querySelector(`.${BTN_CLASS}`);
  if (btn !== null) {
    btn.addEventListener('click', (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      takeScreenShot(self.el);
    });
  }

  return {
    /**
     * Take a screenshot of the widget.
     * @instance
     */
    takeScreenShot() {
      takeScreenShot(self.el);
    },
  };
};
