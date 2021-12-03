All applications developed from the basic template have the following
directory structure:

```bash
my-application
├── dist
├── releases
├── src
│   └── helpers
│   └── i18n
│   └── resources
│   └── tabs
│   └── widgets
│   └── app.html
│   └── app.js
│   └── app.scss
│   └── config.js
├── tmp
├── LICENSE.txt
├── package.js
└── README.md

```

The root directory contains several files for the metadata of the application:

- **LICENSE.txt**: File with the license of the application.
- **package.json**: This files contains all the dependencies and versions
  need to install.
- **README.md:** This is the description of the application in Markdown style.
  The owner of the application is in charge of editing it.

### _dist_ directory

Contains the file with the compiled application.
This file is generated after executing the _build_ comand of the
_Devo Applications Builder Client_.

### _releases_ directory

Contains the files with the compiled application in production mode.
This file is generated after executing the _build_ comand (using _pro_ mode)
of the _Devo Applications Builder Client_.

### _src_ directory

All the vertical application is contained in this folder.

- **helpers** directory: this folder contains any logic of the application
  that will be used as helpers for some operations.
  For example, if you have a logic about certain names that are coded in
  the data and we want to use it in several tabs.
  In this case this is a piece of code that naturally comes to mind as Helper,
  so all the code related to this, must be placed here.
- **i18n** directory: This folder contains the language files that will be
  used for translations.
- **resources** directory: This folder contains several files as resources
  (e.g.the templates.js or requests.js files) to store the widgets templates.
  Each file represents a tab, and each tab contains information about the
  widgets included in it.
- **tabs** directory: This directory contains the logic of the widgets
  contained in each tab.
- **widgets** directory: This directory has the custom widgets developed for
  the application.
- **app.html** file: This file contains the entire HTML structure of the
  application.
- **app.js** file: This file contains the initial and functional logic of the
  application.
- **app.scss** file: This file contains the styles applied in the application.
- **config.js** file: This file basic information related to the application.

### _tmp_ directory

Contains the files generated after compile the app.
