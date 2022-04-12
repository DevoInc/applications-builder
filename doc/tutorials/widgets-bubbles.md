This chart displays three dimensions of data over an X-Y chart,
where X and Y are the first 2 dimensions.
The third dimension is represented by the disk, whose diameter
is proportional to the value of the third parameter.

<img src="widgets/bubbles.png" alt="Bubbles" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import bubblesWidget from '@devoinc/applications-builder/widgets/bubbles';

let query = `from siem.logtrust.web.activity
group every 5m by contentLength, responseLength, responseTime, city
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = bubblesWidget('bubbles-example');
widget.setRequests([request]);
widget.setYaxis({ name: 'responseLength', type: 'str' });
widget.setXaxis({ name: 'contentLength', type: 'str' });
widget.setSeriesBy('city');
widget.setValue('responseTime');
```

<hr>

> [See API](module-Bubbles.html)
