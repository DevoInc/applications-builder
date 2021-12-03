/**
 * This file contains a series of functionalities that allow type conversion.
 * @category Utils
 * @subcategory Global
 * @module casting
 */

/**
 * Convert an array of objects to object of objects based on one key.
 * @param {array} arr - Array of objects.
 * @param {string} key - The key to use as key.
 * @param {Function} keyFunc - Function to use before the key is applied to
 * the new object.
 */
export function arrayToObject(arr, key, keyFunc = null) {
  return Object.assign(
    {},
    ...arr.map((item) => {
      let k = keyFunc ? keyFunc(item[key]) : item[key];
      return { [k]: item };
    })
  );
}

export default {
  arrayToObject,
};
