The line chart widget is created by connecting a series of data points
together with a line, showing the values through time.

<img src="widgets/series.png" alt="Series" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import linesWidget from '@devoinc/applications-builder/widgets/lines';

let query = `from siem.logtrust.web.activity 
group every 5m by method
select count() as count`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = linesWidget('lines-example');
widget.setRequests([request]);
widget.setKeys(['method']);
widget.setValue(['count']);
```

<hr>

> [See API](module-Lines.html)
