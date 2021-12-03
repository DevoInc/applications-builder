The funnel widget shows the progressive reduction of data as it goes from one
phase to another.
In each of the phases, data is represented as different portions of a whole.

<img src="widgets/funnel.png" alt="Funnel" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import funnelWidget from '@devo/applications-builder/widgets/funnel';

let query = `from demo.ecommerce.data
where clientIpAddress = 87.153.102.201 
or clientIpAddress = 58.14.227.52 
or clientIpAddress = 48.126.91.202
group  by method, clientIpAddress
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = funnelWidget('funnel-example');
widget.setRequests([request]);
widget.setKeys(['method', 'clientIpAddress']);
widget.setValue('count');
```

<hr>

> [See API](module-Funnel.html)
