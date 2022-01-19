A voronoi is a type of widget that represents one variable in several dimensions.

<img src="widgets/voronoi.png" alt="Voronoi" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import voronoiWidget from '@devo/applications-builder/widgets/voronoi';

let query = `from siem.logtrust.web.activity
  group every 30m by userAgent, locale, result
  select count() as count`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

widget = voronoiWidget('voronoi-example');
widget.setRequests([request]);
widget.setSearch(request.getSearch());
widget.setValToShow('count');
widget.setKeyToShow(['userAgent', 'locale', 'result']);
widget.setValueFormat(['toBytes']);
```

<hr>

> [See API](module-Tree.html)
