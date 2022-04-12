This is a simple HTML select element that allows select an item form a list.

There are two options to create a HTML select element:
[_Select2Field_](Select2Field.html_) and
[_SelectField_](SelectField.html).
We will use the first one for the following example.

To create a select add the element in the `app.html` file.

```javascript
<main class="lt-vapp-main" id="main1">
  <nav class="">
    <ul style="margin: 10px 20px;">
      <li style="display: inline-block; margin-left: 10px;">
        <select id="mySelect">
          <option value="PUT">PUT</option>
          <option value="POST">POST</option>
          <option value="GET">GET</option>
        </select>
      </li>
    </ul>
  </nav>
</main>
```

Now we need to attach this field with the [`SelectField`](SelectField.html)
component.
You can create a new file to add all the inputs used, or added in the
`app.js` file.

```javascript
import SelectField from '@devoinc/applications-builder/fields/SelectField';
import dataTree from '@devoinc/applications-builder/data/dataTree';

...

let selectInput = new SelectField({
  id: '#mySelect',
  onChange: () => {
    dataTree.root.set('method', selectInput.getValue());
  },
});

...

app.init();
```

We will use the following query for this example.

```javascript
requests.add(
  'lines',
  new RequestApi({
    template: `from demo.ecommerce.data
    where isempty("{{method}}") or method="{{method}}"
    group every 5m by method, statusCode
    select count() as count`,
    dates: dateRange.fromNow(1, 'day'),
  })
);
```

> Note that we will use the `template` attribute instead of `query`

The next thing to do, is to subscribe to the changes that can be made on the
`method` variable that we have added previously.
We will edit the `resources/requests.js` file to do this, but you can do it
however you prefer.

```javascript
import dataTree from '@devoinc/applications-builder/data/dataTree';

...

dataTree.root.subscribe('method', (value) => {
  requests.get('lines').parseTemplate({ method: value }, true);
});
```

Finally, the widget need to be updated as the following

```javascript
import dataTree from '@devoinc/applications-builder/data/dataTree';

...

widget = seriesWidget('widgetContainer');
  widget.setRequests(
    [requests.get('lines').parseTemplate({ method: '' })],
    true
  );
  widget.setKeys(['method', 'statusCode']);
  widget.setValue(['count']);
```

<img src="inputs/select.gif" alt="Select" />
