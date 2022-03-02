Before you start creating an application, make sure you have the
[requirements](tutorial-basic-requirements.html) already installed.

To create the application we will use the
[_Devo Applications Builder Client_](https://github.com/DevoInc/dab-cli)
which will generate an example application based on a default template.
This application will have the directory structure described above,
which we will edit below.

- Using a terminal, go to the directory where you want to create the application.
- Run the command to create a new applicaction.
  ```bash
  dab-cli create my-first-app
  ```

A new foder, called `my-first-app`, has been created in the current directory.
By default, applications use a default template located in this
[repository](https://github.com/DevoInc/applications-builder-template).

> You can use a custom template to create your applications.
> To use yor custom template use `--template` flag.

To see this application running you need to compile it, log into your Devo
domain and use the
[Devo Runner](https://chrome.google.com/webstore/detail/devo-runner/apjjdfhcegcemhdhaeadkddbjhgfplmo).

- Compile the application.

  ```bash
  dab-cli build dev
  ```

  If every was ok, you should see something like the following image:

  <img src="new-app/build-ok.png" alt="My first app" />

  This will generate a new file (_index.html_) inside the _my-first-app/dist_ folder.

- Log into your Devo domain using Google Chrome browser.
- Open the Devo Runner extension and select the _index.html_ file.
  This will load the application.

  <img src="new-app/load-app.gif" alt="My first app" />

### App configuration

You will need to edit the `/src/config.js` file, which contains basic information
about the application.

- `id`: an internal identification for the application.
- `version`: the version of your application.
- `autor`: the owner of the application.
- `title`: the name of the application that will appear in the platform menu.

Now, you can customize the application adding more tabs and widgets.
