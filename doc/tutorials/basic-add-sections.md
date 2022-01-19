The sections are included in the tabs and their purpose is to be the
container for various widgets.
There can be multiple sections within a tab.

To know how to add [tabs](tutorial-basic-add-tabs.html) and
[widgets](tutorial-basic-add-widgets.html)
go to the documentation.

Below are the steps to add a new section.
We will continue with the example of the application `my-first-app` created
in the [First application](tutorial-basic-first-app.html) section.

- Inside the `/src/tabs/tab3.js` file we will include a new section.
  This should look like the following.

  ```javascript
  import Tab from '@devo/applications-builder/Tab';
  import Section from '@devo/applications-builder/Section';

  export default () => {
    let tab = new Tab('main3');
    let sec1 = new Section('section31');
    tab.addSection(sec1);

    return tab;
  };
  ```

  At this point we have defined a new secction with the identifier `section31`
  and we have added it as a dependency of this tab.

- Now, we need to edit the content of the HTML to add this new secttion inside
  the third tab.
  In the `app.html` file add a new `<section>` element inside the `<main>` element
  that as the id `main3`.

  ```javascript
  <main class="lt-vapp-main" id="main3">
    <section class="lt-vapp-section" id="section21">
      <h3 class="lt-vapp-section-title">
        <i class="lticon-analytics_presentation_statistics_graph"></i>
        <span>${__('My first section')}</span>
        <span class="lt-vapp-section-collapser lticon-vapp_expand"></span>
      </h3>
    </section>
  </main>
  ```

  This new section has the identifier `section21` that corresponds to the one created in the `tab3.js` file.

Up to this point, we have added a new section without any content.

<img src="new-app/new-section.png" alt="New section" />
