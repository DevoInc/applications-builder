A tree widget produces tidy node-link diagrams of trees using the Reingold–Tilford “tidy” algorithm.

<img src="widgets/tree.png" alt="Tree" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import voronoiWidget from '@devoinc/applications-builder/widgets/voronoi';

let query = `from siem.logtrust.web.activity
  group every 30m by level, domain, srcHost, serverHost
  select count() as count`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

widget = treeWidget('tree-example');
widget.setRequests([request]);
widget.setKeys(['level', 'domain', 'srcHost', 'serverHost']);
widget.setValue('count');
```

<hr>

> [See API](module-Tree.html)
