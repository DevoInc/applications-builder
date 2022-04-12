import { mixin } from './series';
import { set } from '@devoinc/applications-builder/utils/objects';
import widgetFactory from '@devoinc/applications-builder/widgetFactory';

/**
 * This widget is a variant of the Series chart widget.
 * In this case the data is stacked in vertical baars or columns.
 *
 * This widget has the same methods of [Series widget](module-Series.html).
 *
 * This widget use [Highchart]{@link https://www.highcharts.com/} library.
 *
 * @category Widgets
 * @module StackedBars
 * @see For the rest of implementations look at the [Series widget](module-Series.html).
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
 * @tutorial widgets-stacked-bars
 */
function mixin2(self) {
  set(self.settings, 'widgetTemplate.chart', { type: 'column' });
  set(self.settings, 'widgetTemplate.plotOptions.column', {
    stacking: 'normal',
  });

  return mixin(self);
}

export default widgetFactory(mixin2);
