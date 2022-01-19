/**
 * @category Utils
 * @subcategory Helpers
 * @module Helper Renderers
 */

/**
 * Datatables cell renderer that can render arrays or multivalue fields coming from
 * Serrea.
 * @param data
 * @param type
 * @param row
 * @param meta
 * @returns {*}
 */
export function arrayRenderer(data, type, row, meta) {
  if (Array.isArray(data)) {
    let result = '';
    for (let item of data) {
      if (item !== null && item !== undefined) {
        // Prevent XSS by escaping HTML:
        // see: https://datatables.net/manual/security
        result += $.fn.psDataTable.render.text().display(item) + '<br>';
      }
    }
    return result;
  } else {
    return data;
  }
}

/**
 * Renders a cell with a span and a tooltip
 * @param data
 * @param type
 * @param row
 * @param meta
 * @returns {string}
 */
export function tooltipRenderer(data, type, row, meta) {
  let content = $.fn.psDataTable.render.text().display(data);
  return `<span title="${content}">${content}</span>`;
}

/**
 * Creates a renderer function from a map of key:color pairs like:
 *
 *  let map = new Map();
 *  map.set("1 - High Possiblity", "#d11414");
 *  map.set("2 - Unknown", "#37009E");
 *  map.set("3 - Validate SPAM/Malware", "#ff751a");
 *  map.set("4 - Reset Forced", "#ffff00");
 *  map.set("5 - Already Reset", "#00ff00");
 *
 * @param map
 * @returns {function(*=, *, *, *): string}
 */
export function buildColorMapRenderer(map) {

  return function (data, type, row, meta) {
    let content = $.fn.psDataTable.render.text().display(data);
    let color = $.fn.psDataTable.render.text().display(map.get(data));
    return `<div title="${content}" style="
        color:white;
        background-color:${color};
        width:100%;
        height:100%;
        padding:4px;
        ">${content}</div>`;
  }
}

/**
 * Builds a cell renderer with a link inside, can render arrays or single values.
 *
 * protected aginst XSS
 *
 * @param value_cls class that can be added to a renderer
 */
export function buildDrillDownCellRenderer(value_cls) {

  return (data, type, row, meta) => {

    if (Array.isArray(data)) {
      let result = '';
      for (let item of data) {
        if (item !== null && item !== undefined) {
          // Prevent XSS by escaping HTML:
          // see: https://datatables.net/manual/security
          let safe_item = $.fn.psDataTable.render.text().display(item);
          result += `<a class="${value_cls}">${safe_item}</a><br>`;
        }
      }
      return result;
    } else {
      let safe_data = $.fn.psDataTable.render.text().display(data);
      return `<a class="${value_cls}">${safe_data}</a>`;
    }
  }
}

/**
 * Creates a cell renderer that will wrap some part of the text with a
 * span and a class. Useful to highlight some part of a cell.
 * @param {Function} getKeyword function that will return the keyword
 * to be searched on each rendered cell.
 * @param {String} html_class class added to the highlighted area,
 * by default it will put a style with a font-weight:bold rule.
 * @returns {function(*, *, *, *): *}
 */
export function buildWrapPartWithSpanRenderer(getKeyword, html_class='highlighted-cell-text') {

  return (data, type, row, meta) => {
    let safe_value = $.fn.psDataTable.render.text().display(data);
    return safe_value.replace(getKeyword(),
      `<span class=${html_class}>${getKeyword()}</span>`);
  }
}
