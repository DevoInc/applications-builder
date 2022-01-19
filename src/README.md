# Devo Applications Builder

The applications in Devo are a set of CSS, HTML, and JavaScript functions
that are saved independently from the web to allow for dynamism when creating and
editing the applications.

_Devo Application Builder_ are a set of widgets with extended functionality.
When an [_activeboard_](https://docs.devo.com/confluence/ndt/latest/activeboards)
doesn't meet the required needs, the idea is to use this library to solve the issue.

The documentation is structured in the following way:

- You can read the official documentation at [main documentation web](https://github.com/DevoInc/applications-builder)
- You can read the `src/README.md` file and go through the code to see how it
  works. All classes and methods are self-documented.
- In the [doc](./doc/index.md) folder there are more examples and documentation.
  Note that these are the same as the ones in the main documentation page.

This library uses [Devo Applications Data Library](https://github.com/DevoInc/applications-data-library).
This package is contained and installed from the `deps` folder.

# Quick Start

## Requirements

To install and develop with _Devo Applications Builder_ you need:

- Node >= 8.0.0
- npm >= 6.0.0

## Install

Go to the root directory and run:

```
npm install
```

### Link

If you need to link this library with your applications, create the link:

```
cd /src
npm link
```

Into yout folder project linked it

```
npm @devo/applications-builder
```

> Do this only if you need to modify this library for your application.

## Tests

To run the tests, go to the root directory and run:

```
npm run test
```

## Documentation

To generate the documentation in a local directory, run:

```
npm run jsdoc
```

This will generate a new directory in the root of the project called `docs`.
You can view the documentation by opening the file `docs/index.html`


> *Note:* This project uses double packages json files. 
_Important_: do not touch the `src/package.json` file; only add new dependencies in the 
`package.json` root file.
