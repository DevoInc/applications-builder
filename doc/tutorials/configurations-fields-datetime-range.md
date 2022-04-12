Datetime range picker let you select a custom range datetime.
To create a datetime picker add the element in the `app.html` file.

In this example we will add a selector to change the datetime range of the
widget query.

```javascript
<main class="lt-vapp-main" id="main1">
  <nav class="">
    <ul style="margin: 10px 20px;">
      <li style="display: inline-block; margin-left: 10px;">
        <div id="myDateTimePickerRange"></div>
      </li>
    </ul>
  </nav>
</main>
```

Now we need to attach this field with the [`DateTimePickerRangeField`](DateTimePickerRangeField.html)
component.

We will do this in the `app.js` file.

```javascript
import DateTimePickerRangeField from '@devoinc/applications-builder/fields/DateTimePickerRangeField';
import dataTree from '@devoinc/applications-builder/data/dataTree';

...

let datetimeRangeInput = new DateTimePickerField({
  id: '#myDateTimePickerRange',
  onChange: () => {
    dataTree.root.set('date', datetimeRangeInput.getValue());
  },
});

...

app.init();
```

In the `onChange` method we use the [`dataTree`](DataTree.html) to add this
variable to the root of the tree structure and be able to use it anywhere in
the application.

We will use the following query for this example.

```javascript
requests.add(
  'lines',
  new RequestApi({
    template: `from demo.ecommerce.data
    group every 5m by method, statusCode
    select count() as count`,
    dates: dateRange.fromNow(1, 'day'),
  })
);
```

The next thing to do, is to subscribe to the changes that can be made on the
`date` variable that we have added previously.
We will edit the `resources/requests.js` file to do this, but you can do it
however you prefer.

```javascript
import dataTree from '@devoinc/applications-builder/data/dataTree';

...

dataTree.root.subscribe('date', (range) => {
  requests.get('lines').setDates(range);
});
```

Finally, the widget need to be updated as the following

```javascript
import dataTree from '@devoinc/applications-builder/data/dataTree';

...

widget = seriesWidget('widgetContainer');
  widget.setRequests(
    [requests.get('lines').parseTemplate({})],
    true
  );
  widget.setKeys(['method', 'statusCode']);
  widget.setValue(['count']);
```

<img src="inputs/datetimeRangePicker.gif" alt="Datetime range picker" />
