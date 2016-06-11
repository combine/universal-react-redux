# react-redux-starter

A universal starter kit built with react, react-router and redux. Server
rendering with react and express, bundles with Webpack with hot module reloading
and hot style reloading with SCSS support.

## Prerequisites

* Node 4.2+ is recommended.

* Webpack
```
npm install -g webpack
```

* nodemon

```
npm install -g nodemon
```

* eslint, babel-eslint

```
npm install -g eslint babel-eslint
```

## Get started

```
npm install
npm start
```

Direct your browser to `http://localhost:3000`.


## Directory Structure
```
├── client                    # Client-side code.
├── common                    # Shared code between client and server.
│   ├── assets                # All fonts, images, stylsheets.
│   │   ├── fonts
│   │   ├── images
│   │   └── stylesheets       # Follows the 7-1 pattern: http://sass-guidelin.es/#the-7-1-pattern
│   │       ├── base
│   │       ├── components
│   │       ├── layout
│   │       ├── pages
│   │       ├── shame
│   │       ├── utils
│   │       └── vendors
│   ├── config                # Contains the redux store configuration. Add anything else you like.
│   ├── middleware            # Custom redux middleware can be placed here.
│   ├── reducers              # Redux reducers
|   |   └── index.js          # Root reducer. Imports all other reducers.
│   ├── routes                # Routes each have an index.js which exports a react-router Route.
│   │   ├── app
│   │   │   ├── components
│   │   │   ├── containers
│   │   │   └── index.js
│   │   ├── example           # The name of route.
│   │   │   ├── components    # "Dumb" components
│   │   │   └── containers    # "Smart" containers
│   │   │   └── index.js      # Exports a react-router route. Uses [alternate configuration](https://github.com/rackt/react-router/blob/master/docs/guides/basics/RouteConfiguration.md#alternate-configuration)
│   │   └── home
│   │       └── containers
│   │   │   └── index.js
│   ├── selectors             # Memoized selectors. See https://github.com/rackt/reselect
│   ├── shared                # Shared actions and components and do not belong to a single route.
│   │   ├── actions
│   │   └── components
│   ├── layouts               # Layout files
│   └── util                  # Utility methods
│   └── config
├── server                    # Server-side code.
└── webpack                   # Webpack configuration files.
```

## Writing Tests
The default testing framework is Mocha, though you can use whatever you want.
Make sure you have it installed:

```
npm install -g mocha
```

Tests should reside alongside the component/module/selector/etc that it is
testing. For example:

```
├── reducers
│   ├── todos.js
│   ├── todos.test.js
```

Tests can be written with ES2015, since it passes through `babel-register`.

## Running Tests
To run a single test:
```
npm test /path/to/single.test.js
```

To run a directory of tests:

```
npm test /path/to/test/directory
```

To run all tests:

```
npm run test:all
```

This will run all files that are suffixed with a `.test.js`.

## Deploying to Heroku

Just set an environment variable to point the asset host to whereever you want,
since it defaults to `localhost:3001`. If using Heroku to store assets, just use
a local route. Otherwise, set it to the CDN of your choice.
```
heroku config:set ASSET_HOST=/dist/
# OR
heroku config:set ASSET_HOST=https://s3.amazonaws.com/mybucket/myasssets/
```

## Additional Notes

If you're debugging in a mobile browser and you want to access your project
locally, do the following:

- Make sure your mobile device on the same network as your desktop/laptop.
- Run `npm start` with a `HOSTNAME` environment variable set to your computer's
local ip address (the computer that your dev environment is on):
```
HOSTNAME=10.0.1.3 npm start
```
- Browse to `http://10.0.1.3:3000` on your mobile device.
