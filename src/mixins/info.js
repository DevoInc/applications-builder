import dom from '@devo/applications-builder/libs/dom';
import dependencies from '../data/dependencies';
const InlineMessage = dependencies.require('InlineMessage');

const BTN_CLASS = 'lt-vapp-widget-action-info';
const ID_INFO = 'ltInfoIM';

// Open info
const openInfo = function (title, content) {
  dom.removeElement(`#${ID_INFO}`);

  const div = dom.createElement('div', { id: ID_INFO });
  document.querySelector('.lt-vapp').appendChild(div);

  const iMessage = InlineMessage.of({
    appendTo: $('.lt-vapp'),
    content,
    draggable: true,
    position: 'top-end',
    status: 'help',
    title,
  });

  iMessage.show();
};

// Close info
const closeInfo = function () {
  dom.removeElement(`#${ID_INFO}`);
};

/**
 * Contains the related methods for displaying additional information
 *  in a modal about the widget.
 * @category Widgets
 * @subcategory Mixins
 * @module info
 **/
export default (self) => {
  if (self.el == null) return;
  const btn = self.el.querySelector(`.${BTN_CLASS}`);
  self.info = {
    title: 'Info',
    content: `Define this text in the application using
      widget.setInfo({ title: '', content: '' })`.replace(/\n/gm, ''),
  };
  if (btn !== null) {
    btn.addEventListener('click', () => {
      if (self.info) openInfo(self.info.title, self.info.content);
      else console.error(`No info defined for widget "${self.id}"`);
    });
  }

  return {
    /**
     * Set the detailed text about the widget to be displayed
     * @param {Object} content
     * @param {string} content.title - Title text
     * @param {string} content.content - Content text
     * @instance
     */
    setInfo(content) {
      self.info = content;
    },

    /**
     * Open the modal with the widget information.
     * @instance
     */
    openInfo() {
      if (!self.info) console.error(`No info defined for widget "${self.id}"`);
      else openInfo(self.info.title, self.info.content);
    },

    /**
     * Close the modal.
     * @instance
     */
    closeInfo() {
      closeInfo();
    },
  };
};
