The graph diagram is a theoretical representation of at least two columns
of a data table and the connections between their distinct values,
represented as nodes.

<img src="widgets/graph.png" alt="Graph" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import graphWidget from '@devoinc/applications-builder/widgets/graph';

let query = `from demo.ecommerce.data
where isnotnull(clientIpAddress) 
group every 1h by clientIpAddress, method, statusCode
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = heatCalendarWidget('heat-calendar-example');
widget.setRequests([request]);
widget.setTypes([
  {
    name: 'type-0',
    color: 'rgb(162, 182, 42)',
  },
  {
    name: 'type-1',
    color: 'rgb(162, 42, 182)',
  },
  {
    name: 'type-2',
    color: 'rgb(42, 182, 162)',
  },
]);
widget.setNodes([
  {
    name: 'clientIpAddress',
    type: 'type-0',
    links: ['statusCode', 'method'],
    disabled: true,
  },
  {
    name: 'method',
    type: 'type-1',
    links: ['statusCode', 'clientIpAddress'],
  },
  {
    name: 'statusCode',
    type: 'type-2',
    links: ['clientIpAddress', 'method'],
  },
]);
widget.setAttrs([
  { name: 'count', role: 'size', node: 'clientIpAddress' },
  { name: 'count', role: 'label', node: 'method' },
  { name: 'count', role: 'position', node: 'statusCode' },
]);
widget.setFields([
  { name: 'clientIpAddress', type: 'ip4' },
  { name: 'method', type: 'str' },
  { name: 'statusCode', type: 'int' },
  { name: 'count', type: 'int' },
]);
```

<hr>

> [See API](module-Graph.html)
