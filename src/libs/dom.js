/**
 * DOM manipulations utils
 *  @category Libs
 *  @module dom
 */

/**
 * Remove element from Dom by a query
 * @param {string} query - Query for the Dom
 */
export function removeElement(query) {
  let elem = document.querySelector(query);
  if (elem) elem.parentNode.removeChild(elem);
}

/**
 * Create Dom element
 * @param {string} elem - The element to create
 * @param {object} props - Object of properties for assign to the element
 */
export function createElement(elem, props={}) {
  let el = document.createElement(elem);
  Object.assign(el, props);
  return el;
}

/**
 * Apply styles for the element
 * @param {string} query - Query for the element to apply styles
 * @param {object} props - Object of styles for assign to the element
 */
export function applyStyles(query, props={}) {
  let styles = document.querySelector('#info .ns-box-inner').style;
  Object.assign(styles, props);
}

/**
 * Verify is one element is hidden
 * @param {element} el - DOM Element
 */
export function isHidden(el) {
  var style = window.getComputedStyle(el);
  return (style.display === 'none');
}


/**
* Hide the given element, change the visibility state of the widget
* and remove all listeners
* @param {Elem} elem
*/
export function hide(elem){
  elem.style.display = 'none';
}

export default {
  removeElement,
  createElement,
  applyStyles,
  isHidden,
  hide
};
