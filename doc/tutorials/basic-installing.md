For the installation of _Devo Applications Builder CLI_ make sure you meet the [requirements](./tutorial-basic-requirements.html) and then follow the steps below:

### NPM

```bash
  npm install -g @devo/applications-builder-cli
```

### GitHub

- Download the [Devo Applications Builder CLI](https://github.com/DevoInc/dab-cli)
- Install the package
  ```bash
  npm install -g /dir/to/devo-applications-builder-cli
  ```

For more information about this tool, visit [Devo Applications Builder CLI](https://github.com/DevoInc/dab-cli)

If you want to customize or extend some functionality of _Devo Applications Builder_ follow the steps bellow:

- Download the [Devo Applications Builder](https://github.com/DevoInc/applications-builder)
- Go to the downloaded folder
- Install the package
  ```bash
  npm ci
  ```
- Generate the link
  ```bash
  cd src
  npm link
  ```
- Link the package in your application
  ```bash
  cd /path/to/your/application
  npm link @devo/applications builder
  ```

For more information about this library and how to link, visit [Devo Applications Builder](https://github.com/DevoInc/applications-builder).

Finally, if you want to customize or extend some functionality of _Devo Applications Data Library_ follow the steps bellow:

- Download the [Devo Applications Data Library](https://github.com/DevoInc/applications-data-library)
- Go to the downloaded folder
- Install the package
  ```bash
  npm install
  ```
- Generate the link
  ```bash
  cd src
  npm link
  ```
- Link the package in your application and in the _Devo Applications Builder_.
  ```bash
  npm link @devo/application-data-library
  ```

For more information about this library and how to link with your application, visit [Devo Applications Data Library](https://github.com/DevoInc/applications-data-library).
