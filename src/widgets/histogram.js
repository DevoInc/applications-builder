import { mixin } from './series';
import { set } from '@devoinc/applications-builder/utils/objects';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';

/**
 * This chart consists of a series of upright rectangles whose area is
 * proportional to the frequency of the variable.
 * It looks similar to a bar graph but uses only one variable.
 * The column widths are often equal but might vary reflecting the frequency
 * density of the variable instead of the simple frequency.
 *
 * This widget has the same methods of [Series widget](module-Series.html).
 *
 * This widget use [Highchart]{@link https://www.highcharts.com/} library.
 * @category Widgets
 * @module Histogram
 * @see {@link widgets/series} For the rest of the implementation
 * @see [base](module-base.html)
 * @see [collapser](module-collapser.html)
 * @see [dataSearch](module-dataSearch.html)
 * @see [download](module-download.html)
 * @see [info](module-info.html)
 * @see [lifeCycle](module-lifeCycle.html)
 * @see [listeners](module-listeners.html)
 * @see [loading](module-loading.html)
 * @see [menu](module-menu.html)
 * @see [screenshot](module-screenshot.html)
 * @see [zoom](module-zoom.html)
 * @tutorial widgets-histogram
 */
function mixin2(self) {
  set(self.settings, 'widgetTemplate.chart', { type: 'column' });
  set(self.settings, 'widgetTemplate.chart.plotOptions.column', {
    column: {
      pointPadding: 0,
      borderWidth: 0,
      groupPadding: 0,
      shadow: false,
    },
  });
  return mixin(self);
}

export default widgetFactory(mixin2);
