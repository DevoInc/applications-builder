The area chart widget draws a line chart where the x-axis is always time.
Use this to plot one or several series of data points over the same time
period to create a line or lines.
The area below the line or lines drawn is shaded by default.

These are useful when you want to analyze how a single entity has changed
over time, or to compare the evolution of similar groups over time.

<img src="widgets/area.png" alt="Area" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import areaWidget from '@devoinc/applications-builder/widgets/area';

let query = `from demo.ecommerce.data
where clientIpAddress = 87.153.102.201 or 
clientIpAddress = 58.14.227.52 or 
clientIpAddress = 48.126.91.202
group every 5m by method, str(clientIpAddress)
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'hour'),
});

let widget;
widget = areaWidget('area-example');
widget.setRequests([request]);
widget.setKeys(['method', 'clientIpAddress']);
widget.setValue(['count']);
```

<hr>

> [See API](module-Area.html)
