The gauge meter widget illustrates the proportion of the indicated sets of values as portions of a wheel.

<img src="widgets/gauge.png" alt="Gauge" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import gaugeWidget from '@devo/applications-builder/widgets/gauge';

let query = `from demo.ecommerce.data
where clientIpAddress = 87.153.102.201
group every 1h
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = gaugeWidget('gauge-example');
widget.setRequests([request]);
widget.setValue('count');
```

<hr>

> [See API](module-Gauge.html)
