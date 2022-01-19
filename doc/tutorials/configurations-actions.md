Each widget container could have a series of custom actions to increase its
usability.
There are a series of actions that are included in _Devo Applications Builder_.

Normally, these actions are arranged in the header menu of each widget:

<img src="actions/menu.png" alt="Actions" />

You can manage the display of these actions according to your convenience.
The visualization of the actions is done directly from the `src/app.html` file.
Within the HTML element `<ul>`, included in the widget's header, all the actions to be displayed are included. Delete or add the ones you need.

```javascript
<ul>
  <li class="lt-vapp-widget-action-capture">
    <i class="lticon-polaroid_picture_image_photo"></i>
    <span>${__('Screenshot')}</span>
  </li>
  <li class="lt-vapp-widget-action-download">
    <i class="lticon-computer_laptop_download"></i>
    <span>${__('Download data')}</span>
  </li>
  <li class="lt-vapp-widget-action-zoom">
    <i class="lticon-zoom_in"></i>
    <span>${__('Zoom')}</span>
  </li>
  <li class="lt-vapp-widget-action-gotosearch">
    <i class="lticon-search_find_zoom2"></i>
    <span>${__('Go to search')}</span>
  </li>
  <li class="lt-vapp-widget-action-showquery">
    <i class="lticon-query_info"></i>
    <span>${__('Show query info')}</span>
  </li>
  <li class="lt-vapp-widget-action-info">
    <i class="lticon-info_about_round_bold"></i>
    <span>${__('Show info')}</span>
  </li>
</ul>
```

You can change the order, texts and [icons](tutorial-configurations-icons.html).
In the end, the important thing about actions is that the clickable item has the class corresponding to each action.
These classes have the form `lt-vapp-widget-action-[ACTION]`.

### Download data

This action allows the user to download the data obtained from the query. This action is linked to the `downloadCSV()` method of each widget, which is defined in the mixins.

When the user selects this option, the data is downloaded and saved in a file (as long as the widget has that method defined).

Class that triggers the event: `lt-vapp-widget-action-download`.

> For more info, visit [download](module-download.html).

### Go to search

This action allows executing the query of the widget in the _Data search_.
Not all queries can be executed in X because there are operations that are
not compatible.
To solve this problem you could use the methods _setUseMainRequestForSearch_ and _setSearchRequest_.

Class that triggers the event: `lt-vapp-widget-action-gotosearch`.

> For more info, visit [dataSearch](module-dataSearch.html).

### Screenshot

This method allows you to take a screenshot of the widget and download it.

Class that triggers the event: `lt-vapp-widget-action-capture`.

> For more info, visit [screenshot](module-screenshot.html).

### Show info

Allows you to view a description of the graph if it has been added in the application.

To add a description of the widget, use the `setInfo()` method.

```javascript
widget.setInfo({
  title: 'Information',
  content: 'This is the content information',
});
```

And when the user clicks on this option they will see a notification like the following:

<img src="actions/show-info.png" alt="Show info" />

Class that triggers the event: `lt-vapp-widget-action-info`.

> For more info, visit [info](module-info.html).

### Show query

Allows you to view the query or queries related to the widget if it has been added in the application.

To add a query information of the widget, use the `setInfoQuery()` method.

#### Simple query

You can use a custom query.

```javascript
widget.setInfo({
  title: 'Information',
  query: `
  from demo.ecommerce.data
  group by method
  select count() as count
  `,
});
```

or use the query defined in the request.

```javascript
widget.setInfoQuery({
  title: 'Information',
  query: requests.get('charRequest'),
});
```

<img src="actions/show-infoquery.png" alt="Show info query" />

#### Multiple queries

```javascript
widget.setInfoQuery({
  title: 'Information',
  query: [
    {
      query: `
  from demo.ecommerce.data
  group by method
  select count() as count
  `,
    },
    {
      title: 'siem.logtrust.web.activity table',
      query: `
  from siem.logtrust.web.activity
  group by method
  select count() as count
  `,
    },
  ],
});
```

<img src="actions/show-infoquery-multiple.png" alt="Show info query" />

Class that triggers the event: `lt-vapp-widget-action-showquery`.

> For more info, visit [showQuery](module-showQuery.html).

### Zoom

Allows the user to have an expanded view of the widget.

Class that triggers the event: `lt-vapp-widget-action-zoom`.

> For more info, visit [zoom](module-zoom.html).
