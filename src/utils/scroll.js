/**
 * This file contains a functionality to scrolling an HTML element.
 * @category Utils
 * @subcategory Global
 * @module scroll
 */

/**
 * Scroll to a DOM element.
 * @param {object} element - DOM element
 * @param {number} [duration=300] - Duration of the movement in milliseconds.
 * @param {number} [offset=0] - Distance to the element to keep.
 */
export function scrollToElement(element, duration = 300, offset = 0) {
  if ($(element).length > 0) {
    $("html,body").animate(
      {
        scrollTop: $(element).offset().top - offset,
      },
      duration
    );
  } else {
    console.error(`The element ${element} is not defined. Review the code.`);
  }
}

export default {
  scrollToElement,
};
