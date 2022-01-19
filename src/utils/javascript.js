/**
 * Contains a series of custom functionalities related to intervals.
 * @category Utils
 * @subcategory Global
 * @module intervals
 */

/**
 * This set interval function works like the native one but registers
 * every call in a global place so that we can clear all the intervals
 * when we exit the vapp.
 */
export function managedSetInterval() {
  window.vapp_framework.registered_intervals = Object.is(
    window.vapp_framework.registered_intervals,
    undefined
  )
    ? []
    : window.vapp_framework.registered_intervals;

  let id = setInterval.apply(null, arguments);
  window.vapp_framework.registered_intervals.push(id);
  return id;
}
