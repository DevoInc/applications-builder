This is a simple HTML button element that allows click and trigger an event.

We will continue with the example of the input text to add a button.

In the example, we will add a new `li` item with a `button`element.
Remember you can edit the html file as you like and apply the custom
styles you need.

```javascript
<main class="lt-vapp-main" id="main1">
  <nav class="">
    <ul style="margin: 10px 20px;">
      <li style="display: inline-block;">
        <input id="myInput"></input>
      </li>
      <li style="display: inline-block; margin-left: 10px;">
        <button id="myButton" class="btn-small">
          Update
        </button>
      </li>
    </ul>
  </nav>
</main>
```

Now we need to attach this button with the Button component.
We will edit the `app.js` file

```javascript
import InputField from '@devo/applications-builder/fields/InputField';
import Button from '@devo/applications-builder/fields/Button';
import dataTree from '@devo/applications-builder/data/dataTree';

...

let methodInput = new InputField({
  id: '#myInput',
  default: '',
  onChange: () => {
    console.log('Input changed');
  },
});

let applyBtn = new Button({
  id: '#myButton',
  onClick: () => {
    console.log('Button clicked');
    dataTree.root.set('method', methodInput.getValue());
  },
});

...

app.init();
```

We will use this query for this example.

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

We need to subscribe to the changes that can be made on the
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

<img src="inputs/button.gif" alt="Button" />
