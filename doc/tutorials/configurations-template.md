All the layout structure of an application is inside the `src/app.html` file.
The main features of the app style are controlled by the following elements
and classes.

## Container div

This element wraps the entire application.

```javascript
<div class="lt-vapp">...</div>
```

Addtionally, the following classes can be added to this element.

| Concept            | Class                            | Description                                                                                                                                                                                     |
| ------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Theme              | `theme-<color>`                  | Here you can add the theme for the application, although later it will be overwritten by the theme set in the properties. Later, the user can change the current theme from the settings panel. |
| Collapsible        | `collapsible`                    | It makes the sections and the widgets collapsibles.                                                                                                                                             |
| Compact Mode       | `compact`                        | Remove margins from all elements. This makes the application more compact and without space between elements.                                                                                   |
| Widget Menu        | `expanded-widget-menu`           | This class makes the menu items of each widget always visible rather than hidden in the icon menu.                                                                                              |
| Titles Size        | `big-headers` or `small-headers` | These two classes apply over the headers section and make them smaller or bigger.                                                                                                               |
| Section Border     | `bordered`                       | Bordered sections.                                                                                                                                                                              |
| Widget Description | hide-description                 | Hides the header description of the widgets. The description must be wrapped in a <p> element.                                                                                                  |

## Header

To create a header, we use the `lt-vapp-header` class.

```javascript
<header class="lt-vapp-header">...</header>
```

| Concept            | Class                      | Description                                            |
| ------------------ | -------------------------- | ------------------------------------------------------ |
| Header             | `lt-vapp-header`           |
| No header          | `no-header `               | Hide the header.                                       |
| Reduce header      | `small` or `xsmall`        | Reduces the height of the header.                      |
| Logtrust watermark | `lt-vapp-logtrust-powered` | It is mandatory.                                       |
| Summary module     | `lt-vapp-details`          | This class is optional and it is used in an aside tag. |

## Menu Bar

The navigation menu is controlled by the class `lt-vapp-menu`.
The list elements included inside the menu have to add a main tag and the first child must include the `active` class.

```javascript
<nav class="lt-vapp-menu">
  <ul class="lt-vapp-menu-main">
    <li class="active" main="main1">
      ...
    </li>
  </ul>
</nav>
```

| Concept        | Class                        | Description                                                   |
| -------------- | ---------------------------- | ------------------------------------------------------------- |
| Tabs           | `lt-vapp-menu-item-name`     | The tab name is included in a `span` tag.                     |
| Scroll in tabs | `lt-vapp-menu-scroll`        | To include a dropdown in the tab.                             |
| Title scroll   | `lt-vapp-menu-scroll-titles` | The header of the tab dropdown.                               |
| Preferences    | `lt-vapp-menu-preferences`   | To include the general configuration icon and capture button. |

```javascript
<nav class="lt-vapp-menu">
  <ul class="lt-vapp-menu-main">
    <li main="main1">
      <p class="lt-vapp-menu-item-name">
        <i class="lticon-analytics_presentation_statistics_graph"></i>
        <span>TAB 1</span>
      </p>
      <nav class="lt-vapp-menu-scroll">
        <p class="lt-vapp-menu-scroll-titles">
          <strong>Quick access</strong>
          <span>Scroll to one of the sections</span>
        </p>
        <ul>
          <li section="section11">Section 1</li>
        </ul>
      </nav>
    </li>
  </ul>
  <ul class="lt-vapp-menu-preferences">
    <li class="lt-vapp-tv-mode" title="TV Mode">
      <span class="lticon-tv_televison_movie_news"></span>
    </li>
    <li class="lt-vapp-capture-button" title="Capture app">
      <span class="lticon-polaroid_picture_image_photo"></span>
    </li>
    <li class="lt-vapp-options-button va-menu-trigger" title="General settings">
      <span class="lticon-settings_gear_preferences"></span>
    </li>
  </ul>
</nav>
```

## Configuration Panel

This element contains the visual settings of the application.
It is optional, but it must go under the `header` when it is included.
One click on the general settings button in menu bar let you access to
configuration panel.
This element is divided in a top bar, a container and a footer.

```javascript
<nav class="lt-vapp-config">...</nav>
```

| Concept           | Class                         | Description                                       |
| ----------------- | ----------------------------- | ------------------------------------------------- |
| Configuration bar | `lt-vapp-config-bar`          | This part contains the close button of the panel. |
| Options           | `lt-vapp-config-form-wrapper` | This part contains the settings.                  |
| Footer            | `lt-vapp-config-footer`       | The submit and cancel buttons are here.           |

```javascript
<nav class="lt-vapp-config">
  <p class="lt-vapp-config-bar">
    <i class="lt-vapp-config-close LtAppIcon-close2"></i>
    <span>Close settings</span>
  </p>
  <h4>
    <i class="lticon-settings_gear_preferences"></i>
    <span>Settings</span>
  </h4>
  <div class="lt-vapp-config-form-wrapper"></div>
  <div class="lt-vapp-config-footer">
    <button class="lt-vapp-config-close grey">Cancel</button>
    <button>Update</button>
  </div>
</nav>
```

## Tab contain

The content of the tab is wrapped in a `main` element.

```javascript
<main class="lt-vapp-main" id="main1"></main>
```

## Sections

Sections wrap widgets with the same theme.

```javascript
<section class="lt-vapp-section" id="section11"></section>
```

| Concept           | Class                       | Description              |
| ----------------- | --------------------------- | ------------------------ |
| Background        | `custom-background `        | Adds a background image. |
| Section title     | `lt-vapp-section-title`     | Adds the section title.  |
| Section collapsed | `lt-vapp-section-collapser` | Collapses the section.   |

```javascript
<h3 class="lt-vapp-section-title">
  <i class="lticon-analytics_presentation_statistics_graph"></i>
  <span>Title 1</span>
  <span class="lt-vapp-section-collapser lticon-vapp_expand"></span>
</h3>
```

## Widgets

Each widget is a graphical representation of the data.

```javascript
<article class="lt-vapp-widget" id="widget1"></article>
```

| Concept          | Class                            | Description                                                       |
| ---------------- | -------------------------------- | ----------------------------------------------------------------- |
| Widget header    | `lt-vapp-widget-header`          | Include the title of the widget.                                  |
| Options menu     | `lt-vapp-widget-options`         | Wrap differents actions: zoom, capture, download...               |
| Option           | `lt-vapp-widget-action-<action>` | Actions available: `zoom`, `capture`, `download` and `gotosearch` |
| Widget container | `lt-vapp-widget-graphic`         | Widget height is fixed to 400px.                                  |
| Widget filters   | `lt-vapp-widget-filter`          | We can add aditional filters inside a div with this class.        |
| Wiget collapser  | `lt-vapp-widget-collpaser`       | Collapser option.                                                 |

```javascript
<article class="lt-vapp-widget" id="widget1">
  <header class="lt-vapp-widget-header">
    <h3>Widget title</h3>
    <p>Widget description</p>
    <nav class="lt-vapp-widget-options">
      <span class="lt-vapp-widget-collapser "></span>
      <span class="lt-vapp-widget-menu-launcher "></span>
      <ul>
        <li>
          <i class="lticon-polaroid_picture_image_photo"></i>
          <span>Screenshot</span>
        </li>
      </ul>
    </nav>
  </header>
  <div class="lt-vapp-widget-graphic inner-padding"></div>
</article>
```

By default, the widgets take the max width of its container.
However, you can add some class to to make it responsive.

|        | small (>= 768px) | medium (>= 992px) | large (>= 1200px) |
| ------ | ---------------- | ----------------- | ----------------- |
| 16%    | .sm-2            | .md-2             | .lg-2             |
| 24.2%  | .sm-3            | .md-3             | .lg-3             |
| 32.72% | .sm-4            | .md-4             | .lg-4             |
| 41.14% | .sm-5            | .md-5             | .lg-5             |
| 49.55% | .sm-6            | .md-6             | .lg-6             |
| 66.4%  | .sm-8            | .md-8             | .lg-8             |
| 100%   | .sm-12           | .md-12            | .lg-12            |

You can add anyone in those classes (`.sm- *`, `.md- *` and `.lg- *`) to
adjust the widths of the widgets. Add them next to the `lt-vapp-widget` class.

## Highlights

If you want emphasize some data inside in the container, you can introduce a new article with the class lt-vapp-highlight.

```javascript
<article class="lt-vapp-highlight">
  <div class="lt-vapp-highlight-item lg-4">
    <span class="lt-vapp-highlight-icon lticon-time_watch_clock_wall"></span>
    <div class="lt-vapp-highlight-info">
      <div class="lt-vapp-highlight-title">
        <h5>Num. of users.</h5>
        <span class="lt-vapp-highlight-details"></span>
      </div>
      <h4 class="lt-vapp-highlight-data">
        <span class="lt-vapp-highlight-data-value">224.576</span>
        <span class="lt-vapp-highlight-data-unit">users</span>
      </h4>
    </div>
  </div>
</article>
```

| Concept | Class                       |
| ------- | --------------------------- |
| Items   | `lt-vapp-highlight-item`    |
| Icon    | `lt-vapp-highlight-icon`    |
| Info    | `lt-vapp-highlight-info`    |
| Header  | `lt-vapp-highlight-header`  |
| Title   | `lt-vapp-highlight-title`   |
| Data    | `lt-vapp-highlight-data`    |
| Details | `lt-vapp-highlight-details` |
