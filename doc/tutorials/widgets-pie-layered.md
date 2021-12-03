The layered pie chart is a pie chart with concentric layers to show
successive levels of data.

<img src="widgets/pieLayered.png" alt="Pie Layered" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import pieLayeredWidget from '@devo/applications-builder/widgets/pieLayered';

let query = `from demo.ecommerce.data
group every 1h by method, statusCode
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = pieLayeredWidget('pie-layered-example');
widget.setRequests([request]);
widget.setKeys(['method', 'statusCode']);
widget.setValue('count');
```

<hr>

> [See API](module-PieLayered.html)
