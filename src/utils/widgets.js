/**
 * @category Utils
 * @subcategory Global
 * @module widgets
 * @ignore
 */
/**
 * Get a ranking with key and value for the
 * @param {array} arr - Array of objects.
 * @param {string} key - The name of the object key for the key.
 * @param {string} value - The name of the object key for the value.
 * @param {number} num - The number of elements for the ranking.
 * @return {array} Array of objects with the key and value sorted.
 */
export function get(arr, key, value, num = 10) {
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

export default {
  get,
};
