This is a simple HTML input element that allows write inside it.
To create a input text you need to edit the `app.html` file.
You can edit the html file as you like and apply the custom styles you need.

In the example, we added a simple HTML element `ul` at the begining of the
`main` element.

```javascript
<main class="lt-vapp-main" id="main1">
  <nav class="">
    <ul style="margin: 10px 20px;">
      <li style="display: inline-block;">
        <input id="myInput"></input>
      </li>
    </ul>
  </nav>
</main>
```

Now we need to attach this input with the [`InputField`](InputField.html)
component.
You can create a new file to add all the inputs used, or added in the
`app.js` file.

```javascript
import InputField from '@devo/applications-builder/fields/InputField';
import dataTree from '@devo/applications-builder/data/dataTree';

...

let methodInput = new InputField({
  id: '#myInput',
  default: '',
  onChange: () => {
    console.log('Input changed');
    dataTree.root.set('method', methodInput.getValue());
  },
});

...

app.init();
```

In the `onChange` method we use the [`dataTree`](DataTree.html) to add this
variable to the root of the tree structure and be able to use it anywhere in
the application.
However, you can include the code you need.

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

<img src="inputs/input.gif" alt="Input text" />
