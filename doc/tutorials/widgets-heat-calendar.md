The heat calendar widget shows a calendar with the days marked in
different colors.

<img src="widgets/heatCalendar.png" alt="Heat Calendar" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import heatCalendarWidget from '@devoinc/applications-builder/widgets/heatCalendar';

let query = `from demo.ecommerce.data
group every 1d 
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(6, 'months'),
});

let widget;
widget = heatCalendarWidget('heat-calendar-example');
widget.setRequests([request]);
widget.setDisplayDayLegend(true);
widget.setDisplayMark(true);
widget.setDisplaySelectors(true);
widget.setDisplayScale(true);
widget.setDisplayWeekDays(true);
widget.setLeyendMaxValColor('#000');
widget.setLegendSelectorColor('#000');
widget.setMonthLabelColor('#000');
widget.setTopmargin(100);
widget.setWeekDayFontColor('#000');
```

<hr>

> [See API](module-HeatCalendar.html)
