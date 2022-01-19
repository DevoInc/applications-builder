import dom from '@devo/applications-builder/libs/dom';
import dependencies from '../data/dependencies';
const InlineMessage = dependencies.require('InlineMessage');

const BTN_CLASS = 'lt-vapp-widget-action-showquery';
const ELEMENT_ID = 'ltInfoQueryM';
const default_text =
  'These queries may only be available via API as some' +
  ' methods  are not supported in the UI. The queries are executed in order ' +
  'as an alternative to subselects';

// Open info
const openInfoQuery = function (title, content, options = {}) {
  dom.removeElement(`#${ELEMENT_ID}`);

  const div = dom.createElement('div', { id: ELEMENT_ID });
  document.querySelector('.lt-vapp').appendChild(div);

  const r_pragmas = /pragma.+/gm;
  const r_white_spaces = /^\s*[\r\n]/gm;

  const opts = Object.assign(
    {
      pragmas: true, // show pragmas
      white_spaces: false, // show white spaces
      notice: { text: default_text, style: 'ad-default' },
    },
    options
  );

  if (typeof content == 'object' && !Array.isArray(content))
    content = [content];
  if (typeof content == 'string') content = [{ query: content }];
  if (!opts.notice.style) opts.notice.style = 'ad-default';

  let html_content = `<div class="ns-query-content">
    <div class="${opts.notice.style}">${opts.notice.text}</div>`;
  let d_query;
  for (let elem of content) {
    d_query = elem.query ? elem.query : elem.template;
    if (!d_query) continue;
    if (elem.title) html_content += `<h3>${elem.title}</h3>`;

    if (!opts.pragmas) d_query = d_query.replace(r_pragmas, '');
    if (!opts.white_spaces) d_query = d_query.replace(r_white_spaces, '');
    html_content += `<div class="ns-qtext">${d_query}</div>`;
  }
  html_content += `</div>`;

  const iMessage = InlineMessage.of({
    appendTo: $('.lt-vapp'),
    content: html_content,
    draggable: true,
    status: 'help',
    title,
  });

  iMessage.show();
};

// Close info
const closeInfoQuery = function () {
  dom.removeElement(`#${ELEMENT_ID}`);
};

/**
 * Contains the related methods to display the query text of the witdget in a modal.
 * @category Widgets
 * @subcategory Mixins
 * @module showQuery
 **/
export default (self) => {
  if (self.el == null) return null;
  let btn = self.el.querySelector(`.${BTN_CLASS}`);
  self.infoquery = {
    title: 'Info Query',
    query: `Define this text in the application using
      widget.setInfoQuery({ title: '', query: [{title: '', query:''}] }, options)`.replace(
      /\n/gm,
      ''
    ),
  };
  self.options = {};

  if (btn !== null) {
    btn.addEventListener('click', () => {
      if (self.infoquery)
        openInfoQuery(self.infoquery.title, self.infoquery.query, self.options);
      else console.error(`No query defined for widget "${self.id}"`);
    });
  }

  return {
    /**
     * Set the query text of the widget to be displayed.
     * @param {Object} content -
     * @param {string} content.title - Text with the title
     * @param {string|object[]} content.query - Text with the query or an array of queries. i.e: [{title: '', query:''}]
     * @param {Object} [options] -
     * @param {boolean} options.pragmas - Indicates if pragmas will be
     * displayed.
     * @param {boolean} options.white_spaces - Indicates that white
     * spaces will be removed.
     * @param {Object} [options.notice] -
     * @param {boolean} options.notice.text - Text to be displayed as a
     * notice.
     * @param {boolean} options.notice.style - Text with the name of the
     * style class to apply to the content of the notice.
     * @instance
     */
    setInfoQuery(content, options = {}) {
      self.infoquery = content;
      self.options = options;
    },

    /**
     * Open the modal with the widget query.
     * @instance
     */
    openInfoQuery() {
      if (!self.infoquery)
        console.error(`No infoquery defined for widget "${self.id}"`);
      else
        openInfoQuery(self.infoquery.title, self.infoquery.query, self.options);
    },

    /**
     * Close the modal with the widget query.
     * @instance
     */
    closeInfoQuery() {
      closeInfoQuery();
    },
  };
};
