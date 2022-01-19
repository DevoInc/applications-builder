Punchcard widget let you visualize trends data in a period of time.

<img src="widgets/punchcard.png" alt="Punchcard" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import punchCardWidget from '@devo/applications-builder/widgets/punchCard';

let query = `from demo.ecommerce.data
group every 1h by statusCode
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = punchCardWidget('punch-card-example');
widget.setRequests([request]);
widget.setKeys(['statusCode']);
widget.setValue('count');
```

<hr>

> [See API](module-Punchcard.html)
