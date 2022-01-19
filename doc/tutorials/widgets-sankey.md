This is a flow diagram from source to target where the width of the arrows is proportional to the flow quantity.

<img src="widgets/sankey.png" alt="Sankey" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import sankeyWidget from '@devo/applications-builder/widgets/sankey';

let query = `from demo.ecommerce.data
from demo.ecommerce.data
where isnotnull(method)
where isnotnull(statusCode)
select str(statusCode) as strStatusCode
group by method, strStatusCode
select sum(bytesTransferred) as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = sankeyWidget('sankey-example');
widget.setRequests([request]);
widget.setSourceKey('method');
widget.setTargetKey('strStatusCode');
widget.setValKey('count');
```

<hr>

> [See API](module-Sankey.html)
