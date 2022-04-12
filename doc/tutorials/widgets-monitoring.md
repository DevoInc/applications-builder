This is a custom widget that is used to monitor the single result value,
coloring the background depending on its value and settings.

<img src="widgets/monitoring.png" alt="Monitoring" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import monitoringWidget from '@devoinc/applications-builder/widgets/monitoring';

let query = `from demo.ecommerce.data
group every 1h by method
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = monitoringWidget('monitoring-example');
widget.setRequests([request]);
widget.setKey('method');
widget.setValue('count');
widget.setHeight(300);
widget.setRules(
  { operator: '>', value: 10000 },
  { operator: '<', value: 1000 }
);
widget.setIsPercent(false);
```

<hr>

> [See API](module-Monitoring.html)
