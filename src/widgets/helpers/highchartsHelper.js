/**
 * @category Utils
 * @subcategory Helpers
 * @module Helper Highcharts **/

import units from '@devo/applications-builder/utils/units';

/**
 * Axis formater
 * @param {number} [dec=2] - Number of decimals for the values
 * @param {boolean} [onlyMax=false] - Use the max value as unit or dymanic
 */
function axisFormatterByteSize(dec = 2, onlyMax = false) {
  return function () {
    if (onlyMax)
      return units.bytesToByteBaseSize(
        this.value,
        dec,
        units.getByteBaseOrder(this.axis.max)
      );
    return units.bytesToByteBaseSize(this.value, dec);
  };
}

/**
 * Formatter for values as bytes
 * Date Format: http://api.highcharts.com/highcharts/Highcharts.dateFormat
 * @param {string} [dateFormat='%e %b.'] - Format value for the date
 */
function valueFormatterByteSize(dateFormat = '%e %b.') {
  return function (ctx) {
    return [
      `<strong>${ctx.series.name}</strong><br>`,
      `${Highcharts.dateFormat(dateFormat, ctx.x)}: `,
      `${units.bytesToByteBaseSize(ctx.y, 3)}`,
    ].join('');
  };
}

/**
 * Formatter for values as counter
 * Date Format: http://api.highcharts.com/highcharts/Highcharts.dateFormat
 * @param {string} [dateFormat='%e %b.'] - Format value for the date
 */
function valueFormatterCount(dateFormat = '%e %b.', shared = false) {
  if (shared) {
    return function (ctx) {
      let labelArray = [];
      ctx.points = ctx.points.sort((a, b) => {
        if (a.y > b.y) {
          return -1;
        } else if (a.y < b.y) {
          return 1;
        } else {
          return 0;
        }
      });
      for (let point of ctx.points) {
        labelArray = labelArray.concat(
          `${Highcharts.dateFormat(dateFormat, point.x)}: ${point.y}
           <strong>${point.series.name}</strong><br>`
        );
      }
      return labelArray.join('');
    };
  } else {
    return function (ctx) {
      return [
        `<strong>${ctx.series.name}</strong><br>`,
        `${Highcharts.dateFormat(dateFormat, ctx.x)}: ${ctx.y}`,
      ].join('');
    };
  }
}

export default {
  axisFormatterByteSize,
  valueFormatterByteSize,
  valueFormatterCount,
};
