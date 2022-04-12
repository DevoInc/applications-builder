The table widget displays data as a simple table,
distributed in columns and rows.

<img src="widgets/table.png" alt="Table" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import dataTablesWidget from '@devoinc/applications-builder/widgets/dataTables';

let query = `from demo.ecommerce.data
group  by method, str(clientIpAddress), statusCode
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(15, 'minutes'),
});

let widget;
widget = dataTablesWidget('table-example');
widget.setRequests([request]);
```

<hr>

> [See API](module-Table.html)
