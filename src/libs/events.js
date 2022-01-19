/** @category Libs
 * @module events */

/**
 * Trigger one event
 * @param {string} name - Name of the event
 * @param {object} [detail={}] - Detail of the event
 */
export function trigger(name, detail = {}) {
  let event = new CustomEvent(name, { detail: detail });
  document.querySelector('.lt-vapp').dispatchEvent(event);
}

/**
 * Subscribe to one kind of event
 * @param {string} name - Name of the event
 * @param {function} listener - Listener function for the event. The detail
 * of the event contains the information passed
 */
export function listen(name, listener) {
  document.querySelector('.lt-vapp').addEventListener(name, listener);
}

/**
 * Unsubscribe to one kind of event with a exact listener
 * @param {string} name - Name of the event
 * @param {Function} listener - Listener function to remove
 */
export function remove(name, listener) {
  document.querySelector('.lt-vapp').removeEventListener(name, listener);
}

// Exports

export default {
  trigger,
  listen,
  remove
};
