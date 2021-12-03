import { mixin } from './series';
import { set } from '@devo/applications-builder/utils/objects';
import widgetFactory from '@devo/applications-builder/widgetFactory';

/**
 * The area chart widget draws a line chart where the x-axis is always time.
 * Use this to plot one or several series of data points over the same time
 * period to create a line or lines.
 * The area below the line or lines drawn is shaded by default.
 *
 * These are useful when you want to analyze how a single entity has changed
 * over time, or to compare the evolution of similar groups over time.
 *
 * This widget has the same methods of [Series widget](module-Series.html).
 *
 * This widget use [Highchart]{@link https://www.highcharts.com/} library.
 * @category Widgets
 * @module Area
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
 * @tutorial widgets-area
 */

function mixin2(self) {
  set(self.settings, 'widgetTemplate.chart', { type: 'area' });
  return mixin(self);
}

export default widgetFactory(mixin2);
