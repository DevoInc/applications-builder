import { toggleMenu } from './menu';
import zoom from '@devo/applications-builder/libs/zoom';
const BTN_CLASS = 'lt-vapp-widget-action-zoom';

function maximize(id, opts = {}) {
  // zoom.maximize(id, opts);
  zoom.maximizeExperimental(id, opts);
}

/** Contains the related methods to show a widget in full view mode.
 * @category Widgets
 * @subcategory Mixins
 * @module zoom
 **/
export default (self) => {
  if (self.el == null) return;
  let btn = self.el.querySelector(`.${BTN_CLASS}`);
  if (btn !== null) {
    btn.addEventListener('click', (evt) => {
      evt.stopPropagation();
      evt.preventDefault();
      toggleMenu(self.el);
      maximize(`#${self.id} .lt-vapp-widget-graphic`);
    });
  }

  return {
    /**
     * Show the widget in full view mode.
     * @instance
     */
    openModal() {
      toggleMenu(self.el);
      maximize(`#${self.id} .lt-vapp-widget-graphic`);
    },
  };
};
