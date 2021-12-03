The Stacked Bars is a variant of the Line chart widget.
In this case the data is stacked in vertical bars or columns.

<img src="widgets/stackedBars.png" alt="Stacked Bars" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devo/applications-data-library/requests/RequestApi';
import dateRange from '@devo/applications-builder/utils/dateRange';
import stackedBarsWidget from '@devo/applications-builder/widgets/stackedBars';

let query = `from siem.logtrust.web.activity 
group every 30m by method
select count() as count`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = stackedBarsWidget('stackedbars-example');
widget.setRequests([request]);
widget.setKeys(['method']);
widget.setValue(['count']);
```

<hr>

> [See API](module-StackedBars.html)
