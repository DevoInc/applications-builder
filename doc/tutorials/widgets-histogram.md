This chart consists of a series of upright rectangles whose area is
proportional to the frequency of the variable.

<img src="widgets/histogram.png" alt="Histogram" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import histogramWidget from '@devo/applications-builder/widgets/histogram';

let query = `from demo.ecommerce.data
group every 1h by method, statusCode
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = histogramWidget('histogram-example');
widget.setRequests([request]);
widget.setKeys(['method', 'statusCode']);
widget.setValue(['count']);
```

<hr>

> [See API](module-Histogram.html)
