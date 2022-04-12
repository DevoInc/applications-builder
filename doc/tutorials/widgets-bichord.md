This chart displays the interrelationships between data through time.
The data is arranged radially around a circle with the relationships
between the different distinct values (represented as segments in the
circle) drawn as arcs connecting the data together.
Each arc is assigned a value that represents its proportion.

<img src="widgets/bichord.png" alt="Bichord" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import bichordWidget from '@devoinc/applications-builder/widgets/bichord';

let query = `from siem.logtrust.web.activity
group every 5m by contentLength, responseLength, responseTime, city
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = bichordWidget('bichord-example');
widget.setRequests([request]);
widget.setKeys({ source: 'country', target: 'method' });
widget.setValue('count');
widget.setSeparationAngle(10);
widget.setSourceSideClass(true);
```

<hr>

> [See API](module-Bichord.html)
