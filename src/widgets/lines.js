import { mixin } from './series';
import { set } from '@devo/applications-builder/utils/objects';
import widgetFactory from '@devo/applications-builder/widgetFactory';

/**
 * The line chart widget is created by connecting a series of data points
 * together with a line, showing the values through time.
 * You can easily compare several lines representing different sets of data.
 *
 * This widget has the same methods of [Series widget](module-Series.html).
 *
 * This widget is based on [Highchart]{@link https://www.highcharts.com/} library.
 *
 * @category Widgets
 * @module Lines
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
 * @tutorial widgets-lines
 */
function mixin2(self) {
  set(self.settings, 'widgetTemplate.chart', { type: 'spline' });
  return mixin(self);
}

export default widgetFactory(mixin2);
