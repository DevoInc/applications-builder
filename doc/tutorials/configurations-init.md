The applications have the same basic structure: App > Tabs > Sections > Widgets.

Each of these structures are JavaScript classes, imported from
_Devo Applications Builder_ and added to a dependency tree contained in the
application.
The main class (_App_) is loaded in the `src/app.js` file and it contains the initial configuration of an application.

This initial configuration can be changed so that when the application starts, its values are loaded. The list of allowed parameters is as follows:

### Bootstrapping Parameters

| Param                        | Default           | Description                                                                                                                     |
| ---------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| _defaultSettingsPanel_       | `true`            | Used to construct the right configuration panel.                                                                                |
| _datesCallback_              |                   | This callback is triggered when the global dates are changed. It's a function for update #callfrom and #callto elements content |
| _titleSize_                  | ``                | The size of the. One of: `big-headers`, `small-headers` or `` (normal)                                                          |
| _dates_                      | One day dateRange | The initial dates to use in all application.                                                                                    |
| _theme_                      | `theme-light`     | The default theme to show. One of: `theme-light`, `theme-dark` or custom                                                        |
| _displayDescription_         | `true`            | Shows the descriptions of the widgets.                                                                                          |
| _displayMenuWidgetsExpanded_ | `false`           | Shows a compressed/expanded menu for widgets.                                                                                   |
| _displayCollapsibles_        | `true`            | Makes sections and widgets collapsibles.                                                                                        |
| _displayCompact_             | `false`           | Displays the application in compact mode and removes the space between elements on the application.                             |
| _displayBordered_            | `false`           | Displays a border around elements on the application.                                                                           |
| _tvBtn_                      | `true`            | Trigger TV mode bar.                                                                                                            |
| _fsBtn_                      | `true`            | Trigger fullscreen bar.                                                                                                         |

You cand change some of those params, like the followinf example:

```javascript
import config from './config';
import bootstrap from '@devo/applications-builder/bootstrap';
import App from '@devo/applications-builder/App';

...

let app = new App(config.id);
bootstrap.app(app, {
  theme: 'theme-dark'
});
```
