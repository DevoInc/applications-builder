The column chart widget draws columns for categories along the x-axis
where the column height is in proportion to its value along the y-axis.
The x-axis can include one or more grouping elements—including
time—while the y-axis is a single metric, or measured value.

<img src="widgets/column.png" alt="Column" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import columnWidget from '@devo/applications-builder/widgets/column';

let query = `from demo.ecommerce.data
where clientIpAddress = 87.153.102.201 
or clientIpAddress = 58.14.227.52 
or clientIpAddress = 48.126.91.202
group every 5m by method, str(clientIpAddress)
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'hour'),
});

let widget;
widget = columnWidget('column-example');
widget.setRequests([request]);
widget.setKeys(['method', 'clientIpAddress']);
widget.setValue(['count']);
```

<hr>

> [See API](module-Column.html)
