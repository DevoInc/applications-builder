/**
 * This file contains a series of functionalities that allow the manipulation
 * of range dates.
 * @category Utils
 * @subcategory Global
 * @module dateRange
 */

import user from '@devoinc/applications-builder/libs/user';

// Basic Generators
// -----------------------------------------------------------------------------

/**
 * Generates a range of datestimes from a number of previous time units
 * to the current date.
 * @param {number} num - Number of units.
 * @param {string} unit - Unit to use.
 * @param {boolean|string} forceStart - Default true. Forces the start of the
 * unit var. If you want to start in another unit you must specify the unit
 * here.
 * @return {Object} - An object with from and to timestamp values.
 */
function fromNow(num = 1, unit = 'day', forceStart = true) {
  let tz = user.getTimezone();
  let now = moment().startOf('minute').valueOf();
  let from = moment(now).tz(tz).subtract(num, unit);
  if (typeof forceStart === 'boolean' && forceStart) from = from.startOf(unit);
  else if (typeof forceStart === 'string') from = from.startOf(forceStart);
  return {
    from: from.valueOf(),
    to: now,
  };
}

/**
 * Generates a range of datetimes from a number of previous time units
 * to the current start date.
 * @param {number} num - Number of units
 * @param {string} unit - Units to use.
 * @param {Object|string} forceStart - Default true. Forces the start of the
 * unit var. If you want to start in another unit you must specify the unit
 * here.
 * @return {Object} - An object with from and to timestamp values.
 */
function fromToday(num = 1, unit = 'day', forceStart = true) {
  let tz = user.getTimezone();
  let now = moment().startOf('minute').valueOf();
  let from = moment(now).tz(tz).subtract(num, unit);
  if (typeof forceStart === 'boolean' && forceStart) from = from.startOf(unit);
  else if (typeof forceStart === 'string') from = from.startOf(forceStart);
  return fixRange({
    from: from.valueOf(),
    to: moment(now).tz(tz).startOf('day').valueOf(),
  });
}

/**
 * Fix the date range when its values are no valid.
 * @param {Object} dateRange
 * @param {number} dateRange.from - Start timestamp value.
 * @param {number} dateRange.to - End timestamp value.
 * @return {Object} - An object with from and to timestamp values.
 */
function fixRange(dateRange) {
  if (dateRange.to > moment.utc().valueOf()) {
    dateRange.to = moment.utc().valueOf();
  }

  if (dateRange.from === dateRange.to) dateRange.to++;

  return dateRange;
}

/**
 * Get today date range, starting at 00:00 hours.
 * @return {object} - An object with from and to timestamp values.
 */
function getToday() {
  return fromNow(0);
}

/**
 * Get a date range from the start of the current month to 23:59 yesterday.
 * @return {object} - An object with from and to timestamp values.
 */
function getCurrentMonth() {
  return fromToday(0, 'month');
}

/**
 * Get the range of the previous month, starting from the beginning of the
 * month at 00:00 until the month ends at 23:59.
 * @param {number} offset - Number of previous months.
 * @return {object} - An object with from and to timestamp values.
 */
function getPrevMonth(offset = 0) {
  return {
    from: moment
      .utc()
      .subtract(offset + 1, 'month')
      .startOf('month')
      .valueOf(),
    to: moment.utc().subtract(offset, 'month').startOf('month').valueOf(),
  };
}

/**
 * Get the last 30 days range.
 * @param {number} offset - The number of days before get the previous 30 days.
 * @return {object} - An object with from and to timestamp values.
 */
function getLast30Days(offset = 0) {
  return {
    from: moment
      .utc()
      .subtract(offset + 30, 'days')
      .startOf('day')
      .valueOf(),
    to: moment.utc().subtract(offset, 'days').startOf('day').valueOf(),
  };
}

// Basic Operations
// -----------------------------------------------------------------------------

/**
 * Check if a date time in millis is in the DateRange specified
 * @param {number} millis - Time from epoch.
 * @param {Object} dateRange
 * @param {number} dateRange.from - Start timestamp value.
 * @param {number} dateRange.to - End timestamp value.
 * @return {boolean} - Check result.
 */
function contains(millis = moment.utc().valueOf(), dateRange = getToday()) {
  return dateRange.from <= millis && millis <= dateRange.to;
}

/**
 * Get the number of units in a range.
 * @param {Object} dateRange
 * @param {number} dateRange.from - Start timestamp value.
 * @param {number} dateRange.to - End timestamp value.
 * @param {string} unit - Unit to use.
 * @return {number} - Number of units in range.
 */
function size(dateRange, unit = 'days') {
  return moment(dateRange.to).diff(moment(dateRange.from), unit);
}

/**
 * Get a string object with dates in human readable format.
 * @param {Object} dateRange
 * @param {number} dateRange.from - Start timestamp value.
 * @param {number} dateRange.to - End timestamp value.
 * @return {object} - An object with from and to string values.
 */
function debug(dateRange) {
  return {
    from: moment(dateRange.from).format('YYYY-MM-DD HH:mm:ss.SSS'),
    to: moment(dateRange.to).format('YYYY-MM-DD HH:mm:ss.SSS'),
  };
}

export default {
  fromNow,
  fromToday,
  fixRange,
  getToday,
  getCurrentMonth,
  getPrevMonth,
  getLast30Days,
  contains,
  size,
  debug,
};
