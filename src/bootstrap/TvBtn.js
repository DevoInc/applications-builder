import Button from '@devoinc/applications-builder/fields/Button';

/**
 * @category Utils
 * @subcategory Bootstrap
 * @class
 * Simple widget to set the TV button element.
 * @extends Button
 */
class TvBtn extends Button {
  constructor() {
    super({ id: '.lt-vapp-tv-mode' });

    document
      .querySelector('.lt-vapp-tv-close')
      .addEventListener('click', () => {
        document.querySelector('.lt-vapp').classList.remove('tv-mode');
      });
  }

  click() {
    this.vapp.classList.add('tv-mode');
  }
}

export default TvBtn;
