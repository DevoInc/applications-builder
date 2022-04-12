import events from '@devoinc/applications-builder/libs/events';

const BTN_CLASS = 'lt-vapp-widget-collapser';

// Toggle collapse
export const toggle = function (self) {
  if (self.isCollapsed) expand(self);
  else collapse(self);
};

// Collapse the widget
export const collapse = function (self) {
  $(self.graphic).slideUp(400, () => {
    self.graphic.style.flexGrow = '0';
  });
  self.btnCollapser.classList.add('active');
  self.isCollapsed = true;
};

// Expand the widget
export const expand = function (self) {
  $(self.graphic).slideDown(400, () => {
    self.graphic.style.flexGrow = '1';
  });
  self.btnCollapser.classList.remove('active');
  self.isCollapsed = false;
};

/**
 * Methods used to collapse or expand a widget
 * @category Widgets
 * @subcategory Mixins
 * @module collapser
 **/
export default (self) => {
  // Capture no element error
  if (self.el === null) return null;

  Object.assign(self, {
    isCollapsed: false,
    btnCollapser: self.el.querySelector(`.${BTN_CLASS}`),
  });

  if (self.btnCollapser != null) {
    self.btnCollapser.addEventListener('click', () => {
      toggle(self);
      events.trigger('widget-toggle', this);
    });
  }

  return {
    /**
     * Collapse the widget.
     * @instance
     */
    collapse: function () {
      collapse(self);
    },

    /**
     * Expand the widget.
     * @instance
     */
    expand: function () {
      expand(self);
    },

    /**
     * Check if the widget is collapsed.
     * @return {boolean} - Indicates whether the widget is collapsed.
     * @instance
     */
    isCollapsed: function () {
      return self.isCollapsed;
    },

    /**
     * Toggle the collapse and expand function.
     * @instance
     */
    toggle: function () {
      toggle(self);
    },
  };
};
