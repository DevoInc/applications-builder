/**
 * This file contains a series of functionalities related to sorting objects.
 * @category Utils
 * @subcategory Global
 * @module order
 */

/**
 * Get a ranking given a specfic configuration.
 * @param {object[]} arr - Array of objects to rank.
 * @param {string} key - The name of the object key to rank.
 * @param {string} value - The name of the object key with the value.
 * @param {number} num - The number of elements for the ranking.
 * @return {Array} - Array of objects with the key and value sorted.
 */
export function rankingByFloat(arr, key, value, num = 10) {
  let ranking = [];
  for (let el of arr) {
    let ex = ranking.find((it) => el[key] == it[key]);
    if (ex) ex[value] += parseFloat(el[value]);
    else ranking.push({ [key]: el[key], [value]: parseFloat(el[value]) });
  }
  ranking.sort((a, b) => parseFloat(b[value]) - parseFloat(a[value]));
  if (ranking.length > num) ranking = ranking.slice(0, num);
  return ranking;
}

/**
 * Order array of elements by a timestamp attribute.
 * @param {object[]} arr - Array of objects to sort.
 * @param {string} [key='eventdate'] - Key of the eventdate attribute.
 * @return {object[]} - Sorted array.
 */
export function orderByDateTime(arr, key = "eventdate") {
  arr.sort((a, b) => moment(b[key]).valueOf() - moment(a[key]).valueOf());
  return arr;
}

export default {
  rankingByFloat,
  orderByDateTime,
};
