import events from '@devoinc/applications-builder/libs/events';
import DataNode from '@devoinc/applications-builder/data/DataNode';

/**
 * @class
 * This class contains a set of widgets that will be displayed
 * in a tab and the methods to operate on this section.
 */
class Section {
  /**
   * @param {string} id - Id of the section.
   * @param {Object} settings - Settings for the tab.
   * @param {boolean} settings.hidden - Show or hide the section.
   * Default _false_.
   */
  constructor(id, settings = {}) {
    this.id = id;
    this.widgets = [];
    this.data = new DataNode(id);
    this.status = 'expanded';
    this.settings = Object.assign(
      {
        hidden: false,
      },
      settings
    );
  }

  /**
   * Init the tab.
   * Used on the initialize App process.
   */
  init() {
    this.vapp = document.querySelector('.lt-vapp');
    this.section = this.vapp.querySelector(`#${this.id}`);
    if (this.section != 'undefined' && this.section != null) {
      for (let widget of this.widgets) widget.init();
      this.collapser = this.section.querySelector('.lt-vapp-section-collapser');
      if (this.collapser != null) {
        this.collapser.addEventListener('click', () => this.toggle());
        events.listen('widget-toggle', () => {
          this._setStatus(
            this.areAllWidgetsCollapsed() ? 'collapsed' : 'expanded'
          );
        });
      }
      if (this.settings.hidden) $(this.section).hide();
    } else {
      console.error(
        `The section '${this.id}' does not exist in the index.html`.replace(
          /\n/gm,
          ''
        )
      );
    }
  }

  /**
   * Toggle section.
   */
  toggle() {
    if (this.status == 'collapsed') this.expand();
    else this.collapse();
  }

  // Set status to section
  _setStatus(status) {
    this.status = status;
    if (this.status == 'collapsed') this.collapser.classList.add('active');
    else this.collapser.classList.remove('active');
  }

  /**
   * Collapse section.
   */
  collapse() {
    if (this.status == 'collapsed') return;
    for (let wid of this.widgets) wid.collapse();
    this._setStatus('collapsed');
  }

  /**
   * Expand section.
   */
  expand() {
    if (this.status == 'expanded') return;
    for (let wid of this.widgets) wid.expand();
    this._setStatus('expanded');
  }

  /**
   * Check if all widgets in section are collapsed.
   */
  areAllWidgetsCollapsed() {
    return this.widgets.reduce((val, widget) => {
      return !widget.isCollapsed() ? false : val;
    }, true);
  }

  /**
   * Add widget to section.
   * @param {Object} widget - Widget to add.
   */
  addWidget(widget) {
    this.data.append(widget.data);
    this.widgets.push(widget);
  }

  /**
   * Show section.
   */
  show(forceRefresh = false) {
    this.settings.hidden = false;
    $(this.section).show();
    for (let wid of this.widgets) {
      if (!wid.isHidden()) {
        wid.show(forceRefresh);
      }
    }
  }

  /**
   * Check if the section is hidden.
   * @return {boolean}
   */
  isHidden() {
    return this.settings.hidden;
  }

  /**
   * Hide the entire section.
   */
  hide() {
    for (let wid of this.widgets) wid.hideGraphic();
  }

  /**
   * Refresh all the widgets in the section.
   * @param {boolean} forceRefresh - True force the refresh.
   */
  refresh(forceRefresh = false) {
    if (!this.settings.hidden) {
      for (let wid of this.widgets) wid.refresh(forceRefresh);
    }
  }
}

export default Section;
