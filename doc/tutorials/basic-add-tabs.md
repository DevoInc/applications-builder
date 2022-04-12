The purpose of the tabs is to group in them a series of sections and widgets
that are related and that provide coherent information to the data and report
that you want to represent.

Each tab is contains a grouping of sections and widgets.
To know how to add [sections](tutorial-basic-add-sections.html) and
[widgets](tutorial-basic-add-widgets.html) go to the documentation.

Below are the steps to add a new tab.
We will continue with the example of the application `my-first-app` created
in the [First application](tutorial-basic-first-app.html) section.

- Create a new file called `tab3.js` into the `/src/tabs/` directory.
  This should look like the following.

  ```javascript
  import Tab from '@devoinc/applications-builder/Tab';

  export default () => {
    let tab = new Tab('main3');

    return tab;
  };
  ```

  At this point we have defined a new tab with the identifier `main3`

- Now, within the `/src/app.js` file, we must add this new tab to the
  application structure tree.
  The file should have the following code:

  ```javascript
  import config from './config';
  import App from '@devoinc/applications-builder/App';
  import bootstrap from '@devoinc/applications-builder/bootstrap';

  bootstrap.langs({
    es_ES: require('./i18n/es_ES.json'),
  });

  let app = new App(config.id);
  bootstrap.app(app);

  require('./resources/requests');

  import createTab1 from './tabs/tab1';
  import createTab2 from './tabs/tab2';
  import createTab3 from './tabs/tab3';

  app.addTab(createTab1());
  app.addTab(createTab2());
  app.addTab(createTab3());

  app.init();
  ```

- Finally, we only have to edit the content of the HTML to add this new tab.
  In the `app.html` file add a new `li` element inside the `ul` element
  that as the class `lt-vapp-menu-main`.
  This will make our tab appear in the header of the application.

  ```javascript
  <li main="main3">
    <p class="lt-vapp-menu-item-name">
      <i class="lticon-analytics_presentation_statistics_graph"></i>
      <span>${__('TAB 3')}</span>
    </p>
  </li>
  ```

  Finally, under the HTML element `<main>` with the `id` atributte `main2`,
  we add a new HTML element `<main>` like the following:

  ```javascript
  <main class="lt-vapp-main" id="main3"></main>
  ```

Up to this point, we have added a new tab without any content.

<img src="new-app/new-tab.png" alt="New tab" />
