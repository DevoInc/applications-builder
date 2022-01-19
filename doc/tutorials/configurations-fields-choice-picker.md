Choice picker let you select an option of a set.

```javascript
<main class="lt-vapp-main" id="main1">
  <nav class="">
    <ul style="margin: 10px 20px;">
      <li style="display: inline-block; margin-left: 10px;">
        <div id="myChoice"></div>
      </li>
    </ul>
  </nav>
</main>
```

Now we need to attach this input with the _ChoicePickerField_ component.
Edit the `app.js` file.

```javascript
import ChoicePickerField from '@devo/applications-builder/fields/ChoicePickerField';
import dataTree from '@devo/applications-builder/data/dataTree';

...

let choiceInput = new ChoicePickerField({
  id: '#myChoice',
  choices: [
    { id: 'all', value: '', text: 'All' },
    { id: 'get', value: 'GET', text: 'GET' },
    { id: 'post', value: 'POST', text: 'POST' },
    { id: 'put', value: 'PUT', text: 'PUT' },
  ],
  default: 'all',
  onChange: () => {
    dataTree.root.set('method', choiceInput.getValue());
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
import dataTree from '@devo/applications-builder/data/dataTree';

...

dataTree.root.subscribe('method', (value) => {
  requests.get('lines').parseTemplate({ method: value }, true);
});
```

Finally, the widget need to be updated as the following

```javascript
import dataTree from '@devo/applications-builder/data/dataTree';

...

widget = seriesWidget('widgetContainer');
  widget.setRequests(
    [requests.get('lines').parseTemplate({ method: '' })],
    true
  );
  widget.setKeys(['method', 'statusCode']);
  widget.setValue(['count']);
```

<img src="inputs/choicePicker.gif" alt="Choice picker" />
