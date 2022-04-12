import screenshot from '@devoinc/applications-builder/libs/screenshot';
import Button from '@devoinc/applications-builder/fields/Button';

/**
 * @category Utils
 * @subcategory Bootstrap
 * @class
 * Simple widget to set the Full Screen button element.
 * @extends Button
 */

class FullScreenShotBtn extends Button {
  constructor() {
    super({
      id: '.lt-vapp-capture-button',
    });
  }

  /**
   * Take action for screenshot
   */
  click() {
    screenshot.takeElementScreenShot(this.vapp);
  }
}

export default FullScreenShotBtn;
