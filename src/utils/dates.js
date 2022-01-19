/**
 * This file contains a series of functionalities that allow the generations
 * of range dates.
 * @category Utils
 * @subcategory Global
 * @module dates
 */

/**
 * Generate a range of dates between the two passed dates.
 * @param {number} start - The start timestamp.
 * @param {number} end - The end timestamp.
 * @param {string} jump - The jump for every iter: 'days', 'weeks', 'months'...
 * @param {string} format - The format for the result dates.
 * @returns {number[]} - Array of datetimes range.
 */
export function genRangeDates(start, end, jump = "days", format = "x") {
  let result = [];
  let current = moment(start);
  end = moment(end);
  while (current < end) {
    result.push(parseInt(moment(current).format(format)));
    current = moment(current).add(1, jump);
  }
  return result;
}

/**
 * Generate a date range following the params specifications.
 * @param {number} to - End timestamp. Default now().
 * @param {number} num - Number of units to subtract from "to".
 * @param {string} unit - Unit.
 * @param {boolean} wholeDay - Specify whether "from" and "to" start at the
 * beginning of the day.
 * @returns {object} - An object with from and to timestamp values.
 */
export function genDates(to, num = 1, unit = "day", wholeDay = false) {
  to = !to ? moment() : moment(to);
  let from = to.subtract(num, unit);
  if (wholeDay) {
    from = from.startOf("day");
    to = to.endOf("day");
    if (to > moment()) to = moment();
  }
  return { from, to };
}

/**
 * Get a range date of the current date starting at 00:00 hours.
 * @returns {object} - An object with from and to timestamp values.
 */
export function genDatesToday() {
  return genDates(null, 0, "day", true);
}

/**
 * Get yesterday's date range.
 * @returns {object} - An object with from and to timestamp values.
 */
export function genDatesYesterday() {
  return genDates(moment().subtract(1, "day").valueOf(), 0, "day", true);
}

/**
 * Get the date range of the previous 30 days.
 * @returns {object} - An object with from and to timestamp values.
 */
export function genDates30DaysFromYesterday() {
  return genDates(moment().subtract(1, "day").valueOf(), 30, "days", true);
}

export default {
  genRangeDates,
  genDates,
  genDatesToday,
  genDatesYesterday,
  genDates30DaysFromYesterday,
};
