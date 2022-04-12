A RAG widget rate the data in its values.

<img src="widgets/rag.png" alt="RAG" style="width: 100%;"/>

### Example

```javascript
import RequestApi from '@devoinc/applications-data-library/requests/RequestApi';
import dateRange from '@devoinc/applications-builder/utils/dateRange';
import ragWidget from '@devoinc/applications-builder/widgets/rag';

let query = `from demo.ecommerce.data
group by method, statusCode
select count() as count
`;

let request = new RequestApi({
  query: query,
  dates: dateRange.fromNow(1, 'day'),
});

let widget;
widget = ragWidget('rag-example');
widget.setRequests([request]);
widget.setKeys(['method', 'statusCode']);
widget.setValue('count');
```

<hr>

> [See API](module-RAG.html)
