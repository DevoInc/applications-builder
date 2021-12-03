A pie chart is a circular graph that contains slices that correspond to
parts of the whole. The different slices of the chart and their proportions
are defined by two given fields in your query.

<img src="widgets/pie.png" alt="Pie" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import pieWidget from '@devo/applications-builder/widgets/pie';

let query = `from demo.ecommerce.data
group every 1h by method
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = pieWidget('pie-example');
widget.setRequests([request]);
widget.setKeys(['method']);
widget.setValue('count');
```

<hr>

> [See API](module-Pie.html)
