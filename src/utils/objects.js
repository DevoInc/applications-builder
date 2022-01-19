/**
 * This file contains a series of functionalities related to getting and
 * setting from a objects.
 * It is based on lodash library.
 * @category Utils
 * @subcategory Global
 * @module objects
 */

/**
 * Port of lodash function set.
 * @see https://lodash.com/docs/4.17.4#set
 * @param {Object} obj Target object.
 * @param {string} path Path to use.
 * @param {any} val Vale to set.
 */
export function set(obj, path, val) {
  if (typeof path === "string") path = path.split(".");
  if (path.length > 1) {
    if (obj[path[0]] === undefined) obj[path[0]] = {};
    set(obj[path[0]], path.slice(1), val);
  } else obj[path[0]] = val;
  return obj;
}

/**
 * Port of lodash function get.
 * @see https://lodash.com/docs/4.17.4#get
 * @param {Object} obj Target object
 * @param {string} path Path to use
 * @param {any} val Default value
 * @return {any} Value returned
 */
export function get(obj, path, val) {
  if (typeof path === "string") path = path.split(".");
  if (obj[path[0]] === undefined) return val;
  if (path.length > 1) {
    return get(obj[path[0]], path.slice(1), val);
  } else return obj[path[0]];
}

export default {
  set,
  get,
};
