This is a common checkbox element of HTML.

To create a checkbox add the element in the `app.html` file.

```javascript
<main class="lt-vapp-main" id="main1">
  <nav class="">
    <ul style="margin: 10px 20px;">
      <li style="display: inline-block;">
        <input id="myInput"></input>
      </li>
      <li style="display: inline-block; margin-left: 10px;">
        <input type="checkbox" id="myCheckBox">
        <label for="scales">Click me!</label>
      </li>
      <li style="display: inline-block; margin-left: 10px;">
        <button id="myButton" class="btn-small">Update</button>
      </li>
    </ul>
  </nav>
</main>
```

In this example, we will display a notipop message when user click on the checkbox.

Now we need to attach this input with the CheckboxField component.
Additional, we will use the `info` notification.
We will edit the `app.js` file.

```javascript
import CheckBoxField from '@devo/applications-builder/fields/CheckBoxField';
import { info } from '@devo/applications-builder/libs/alerts';

...

let checkboxInput = new CheckBoxField({
  id: '#myCheckBox',
  onChange: () => {
    info(`I'm ${!checkboxInput.getValue() ? 'no ' : ''} selected!`);
  },
});

...

app.init();
```

<img src="inputs/checkbox.gif" alt="Checkbox" />
