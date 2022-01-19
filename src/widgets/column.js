import { mixin } from './series';
import objects from '@devo/applications-builder/utils/objects';
import widgetFactory from '@devo/applications-builder/widgetFactory';

/**
 * The column chart widget draws columns for categories along the x-axis
 * where the column height is in proportion to its value along the y-axis.
 * The x-axis can include one or more grouping elements—including
 * time—while the y-axis is a single metric, or measured value.
 *
 * This widget has the same methods of [Series widget](module-Series.html).
 *
 * This widget use [Highchart]{@link https://www.highcharts.com/} library.
 * @category Widgets
 * @module Column
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
 * @tutorial widgets-column
 */
function mixin2(self) {
  objects.set(self.settings, 'widgetTemplate.chart', { type: 'column' });
  objects.set(self.settings, 'widgetTemplate.plotOptions.column', {
    stacking: null,
  });

  return mixin(self);
}

export default widgetFactory(mixin2);
