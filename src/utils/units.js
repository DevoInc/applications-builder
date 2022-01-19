/**
 * This file contains some functionalities related to units and their
 * conversions.
 * @category Utils
 * @subcategory Global
 * @module units
 */

/**
 * Array of units of digital information.
 */
export let BYTE_SIZES = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

/**
 * Get the best readable representation of a number of bytes.
 * @param {number} bytes - Number of bytes.
 * @param {number} [dec=2] - Number of decimal positions.
 * @param {number} [ord=null] - Order of the unit.
 * @return {string} - A string representation.
 */
export function bytesToByteBaseSize(bytes, dec = 2, ord = null) {
  if (bytes == 0) return `0 ${ord ? BYTE_SIZES[ord] : "B"}`;
  if (ord == null) ord = getByteBaseOrder(bytes);
  return (
    roundWithDecimals(bytes / Math.pow(1024, ord), dec) + " " + BYTE_SIZES[ord]
  );
}

/**
 * Get the bytes in the unit specified.
 * @param {number} bytes - Number of bytes.
 * @param {string} unit - The unit to change: B, KB, MB, GB, TB, PB, EB,
 * ZB or YB.
 * @param {number} dec - Number of decimal positions.
 * @return {number} - A string representation.
 */
export function getByteBaseSize(bytes, unit = "MB", dec = 2) {
  const i = BYTE_SIZES.findIndex((u) => u == unit);
  return roundWithDecimals(bytes / Math.pow(1024, i), dec);
}

/**
 * Return the index of the unit based on bytes.
 * @param {number} bytes - Number of bytes.
 * @return {number} - A string representation.
 */
export function getByteBaseOrder(bytes) {
  return parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
}

/**
 * Round with decimals.
 * @param {number} num - Number for round.
 * @param {number} dec - Number of decimal positions.
 * @return {number} - Rounded value.
 */
export function roundWithDecimals(num, dec = 2) {
  return (num * Math.pow(10, dec)).toFixed() / Math.pow(10, dec);
}

/**
 * Format a number as a percentage.
 * @param {number} num - The number to format
 * @param {number} dec - The number of decimals to use
 * @return {string} - Percentage value.
 */
export function toPercent(num, dec = 2) {
  return roundWithDecimals(num * 100, dec) + " %";
}

/**
 * Prepare a number for CSV visualization.
 * @param {number} num - The number to prepare.
 * @return {string} - CSV format.
 */
export function toCSVFormat(num) {
  return (num + "").replace(".", ",");
}

export default {
  BYTE_SIZES,
  bytesToByteBaseSize,
  getByteBaseSize,
  getByteBaseOrder,
  roundWithDecimals,
  toPercent,
  toCSVFormat,
};
