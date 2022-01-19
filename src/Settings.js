import DataTree from './data/dataTree';
import alerts from './libs/alerts';
import events from './libs/events';

/**
 * @class
 *
 */
class Settings {
  /**
   * Link the DOM elements (panel, buttons and overlay)
   * @param {object} props - Properties effects.
   * @param {object} props.panel
   * @param {object} props.panel.trans
   * @param {string} props.panel.trans.effect - Effect name.
   * One of _slide_, _fade_ or _none_. Default _slide_.
   * @param {string} props.panel.trans.duration - Duration of the effect
   * in milliseconds. Default _300_.
   * @param {object} props.overlay
   * @param {object} props.panel.trans
   * @param {string} props.overlay.trans.effect - Effect name.
   * One of _slide_, _fade_ or _none_. Default _fade_.
   * @param {string} props.overlay.trans.duration - Duration of the effect
   * in milliseconds. Default _100_.
   */
  constructor(props = null) {
    this.data = DataTree.root;

    this.btn = document.querySelector('.va-menu-trigger');
    this.panel = document.querySelector('.lt-vapp-config');
    this.overlay = document.querySelector('.lt-vapp-overlay');

    this.btnUpdate = document.querySelectorAll('.lt-vapp-config-update');
    this.btnCancels = document.querySelectorAll('.lt-vapp-config-close');

    this.settings = {
      panel: { trans: { effect: 'slide', duration: 300 } },
      overlay: { trans: { effect: 'fade', duration: 100 } },
    };
    if (props !== null) this.settings = Object.assign(this.settings, props);

    this.options = [];
    this.setListeners();
  }

  /**
   * Apply initial configurations.
   */
  applyInitialChanges() {
    for (let option of this.options) {
      try {
        if (option.onChange) option.onChange(option.value);
      } catch (err) {
        alerts.error(err.message);
        console.log(err);
      }
    }
  }

  /**
   * Add an option to the panel.
   * @param {BaseField} option - Any kind of field for add.
   */
  addOption(option) {
    this.options.push(option);
  }

  /**
   * Add listeners for the buttons of the panel and for the overlay.
   */
  setListeners() {
    if (this.btnUpdate != null)
      for (let elem of this.btnUpdate) {
        elem.addEventListener('click', () => this.save());
      }

    if (this.btnCancels != null)
      for (let elem of this.btnCancels) {
        elem.addEventListener('click', () => this.cancel());
      }

    if (this.overlay != null)
      this.overlay.addEventListener('click', () => this.cancel());

    if (this.btn != null) this.btn.addEventListener('click', () => this.open());
  }

  /**
   * Save all the settings on the panel and close the panel.
   */
  save() {
    for (let option of this.options) {
      try {
        option.save();
      } catch (err) {
        alerts.error(err);
      }
    }
    this.close();
    events.trigger('settings.saved', this.options);
  }

  /**
   * Restore the settings before open the panel and close the panel.
   */
  cancel() {
    for (let option of this.options) option.restore();
    this.close();
    events.trigger('settings.closed', this.options);
  }

  /**
   * Toogle the open/close state of the panel.
   */
  toggle() {
    if (this.isClosed()) this.open();
    else this.close();
  }

  /**
   * Check if the panel is closed.
   * @param {boolean}
   */
  isClosed() {
    return this.panel.classList.contains('closed');
  }

  /**
   * Open the panel with the proper effect.
   */
  open() {
    if (!this.panel) return;
    this.panel.classList.remove('closed');
    let panel = this.settings.panel.trans;
    let overlay = this.settings.overlay.trans;

    if (panel.effect === 'fade') {
      $(this.panel).fadeIn(panel.duration);
      this.panel.style.right = 0;
    } else if (panel.effect === 'slide') {
      $(this.panel).animate({ right: 0 }, panel.duration);
    } else this.panel.style.right = 0;

    if (overlay.effect === 'fade') $(this.overlay).fadeIn(overlay.duration);
    else this.overlay.style.display = 'block';
  }

  /**
   * Close the panel with the proper effect.
   */
  close() {
    if (!this.panel) return;
    this.panel.classList.add('closed');
    let panel = this.settings.panel.trans;
    let overlay = this.settings.overlay.trans;

    if (panel.effect === 'fade') $(this.panel).fadeOut(panel.duration);
    else if (panel.effect === 'slide') {
      $(this.panel).animate({ right: -this.panel.offsetWidth }, panel.duration);
    } else this.panel.style.right = -this.panel.offsetWidth;

    if (overlay.effect === 'fade') $(this.overlay).fadeOut(overlay.duration);
    else this.overlay.style.display = 'none';
  }

  /**
   * Hide the panel without effects.
   */
  hide() {
    this.panel.classList.add('closed');
    this.panel.style.right = -this.panel.offsetWidth;
    this.overlay.style.display = 'none';
  }
}

export default Settings;
