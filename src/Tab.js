import events from '@devoinc/applications-builder/libs/events';
import scroll from '@devoinc/applications-builder/utils/scroll';
import DataNode from '@devoinc/applications-builder/data/DataNode';

/**
 * @class
 * This class involve a set of [Sections](Section.html).
 *
 */
class Tab {
  /**
   * @param {string} id - Id of the tab.
   * @param {object} settigns - Settings of the tab.
   * @param {boolean} settigns.loadOnDemand - Process the section on init. Default false.
   * @param {object} settigns.transition - Process the section on init. Default false.
   * @param {string} settigns.transition.effect - Effect to apply on tab transitions. One of _fade_, _slide_ or _none_.
   * @param {string} settigns.transition.duration - Duration of the transition in milliseconds,
   */
  constructor(id, settings = {}) {
    this.id = id;
    this.sections = [];
    this.data = new DataNode(id);
    this.settings = Object.assign(
      {
        loadOnDemand: false,
      },
      settings
    );
    this.stats = {
      show: 0,
    };
  }

  /**
   * Init tab
   * This is part of the initialization process
   * @param {object} settings - Settings for the tab
   */
  init(settings) {
    this.vapp = document.querySelector('.lt-vapp');
    this.selector = this.vapp.querySelector(`li[main="${this.id}"]`);
    if (this.selector) {
      this.settings = Object.assign({}, this.settings, settings);
      this.el = this.vapp.querySelector(`#${this.id}`);
      for (let sec of this.sections) sec.init();
      this._initSubMenu();
      this._addListeners();
    } else {
      console.error(`Tab "${this.id}" does not exists on HTML.`);
    }
  }

  // If the class has submenu add the class
  _initSubMenu() {
    if (this.selector.querySelector('.lt-vapp-menu-scroll')) {
      this.selector.classList.add('hasMenu');
    } else {
      this.selector.classList.remove('hasMenu');
    }
  }

  // Add listeners
  _addListeners() {
    this.selector.addEventListener('click', () => this.select());
    events.listen('tab-changed', (evt) => {
      if (evt.detail.id !== this.id) this.unselect();
    });
    if (this.selector.querySelector('[section]') != null) {
      for (let sec of this.selector.querySelectorAll('[section]')) {
        sec.addEventListener('click', (evt) => {
          evt.preventDefault();
          evt.stopPropagation();
          this.toSection(evt.currentTarget);
        });
      }
    }
  }

  /**
   * Set transition properties
   * For transition we can use the next keys:
   * - effect[=none] - Effect to apply on tab transitions: Fade, Slide or None.
   * - duration[=0] - Duration of the transition (in milliseconds).
   *
   * @param {object} trans - Transition options
   */
  setTransition(trans) {
    this.trans = trans;
  }

  /**
   * Go To Section
   */
  toSection(sectionTag) {
    this.closeSubmenu();
    let toSection = sectionTag.getAttribute('section');
    scroll.scrollToElement(`#${toSection}`, 300, 90);
  }

  /**
   * Close the submenu
   */
  closeSubmenu() {
    this.selector.classList.remove('scroll-menu-open');
    this.selector.classList.remove('hasMenuOpen');
  }

  /**
   * Add section to the tab
   * @param {Section} section
   */
  addSection(section) {
    this.data.append(section.data);
    this.sections.push(section);
  }

  /**
   * Select tab
   */
  select() {
    if (this.isSelected()) {
      // Only if have submenu
      if (this.selector.classList.contains('hasMenu')) {
        // TODO Use only one class
        this.selector.classList.toggle('scroll-menu-open');
        this.selector.classList.toggle('hasMenuOpen');
      }
    } else {
      events.trigger('tab-changed', this);
      this._selectEffect(() => {
        // After select effect redraw all widgets for adjustments
        // only if the loadOnDemand is false
        if (!this.settings.loadOnDemand) {
          for (let sec of this.sections) {
            if (!sec.settings.hidden) sec.show();
            for (let wid of sec.widgets) wid.resize();
          }
        } else {
          this.settings.loadOnDemand = false;
        }
      });

      this.selector.classList.add('active');

      if (this.onSelect) this.onSelect();
      this.stats.show++;
    }
  }

  // Make the effect on select
  _selectEffect(callback = null) {
    let ops = { fade: 'fadeIn', slide: 'slideDown' };
    if (Object.keys(ops).includes(this.trans.effect)) {
      $(this.el)
        .delay(this.trans.duration)
        [ops[this.trans.effect]](this.trans.duration, callback);
    } else {
      this.el.style.display = 'block';
      if (callback) callback();
    }
  }

  /**
   * Refresh the sections in tab
   */
  refresh() {
    if (this.isSelected()) {
      for (let sec of this.sections) sec.refresh();
    }
  }

  /**
   * Check if the tab is selected
   * @return {boolean}
   */
  isSelected() {
    return this.selector.classList.contains('active');
  }

  /**
   * Unselect tab
   */
  unselect() {
    for (let sec of this.sections) sec.hide();
    this._unselectEffect();
    this.selector.classList.remove('active');
    this.closeSubmenu();
  }

  // Unselect effect
  _unselectEffect() {
    let ops = { fade: 'fadeOut', slide: 'slideUp' };
    if (Object.keys(ops).includes(this.trans.effect)) {
      $(this.el)[ops[this.trans.effect]](this.trans.duration);
    } else this.el.style.display = 'none';
  }
}

export default Tab;
