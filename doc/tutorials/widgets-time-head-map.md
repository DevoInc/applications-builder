The time heatmap widget represents the parameter values in a calendar, by day and hours, through a gradient color scale.

<img src="widgets/timeHeatMap.png" alt="Time Heatmap" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import timeHeatmapWidget from '@devo/applications-builder/widgets/timeHeatmap';

let query = `from siem.logtrust.web.activity 
group every 1d by username
select count() as count`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = timeHeatmapWidget('timeheadmap-example');
widget.setRequests([request]);
widget.setPeriod(3600000 * 24);
widget.setValue('count');
```

<hr>

> [See API](module-TimeHeatMap.html)
