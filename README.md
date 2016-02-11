# react-redux-starter

A universal starter kit built with react, react-router and redux. Server
rendering with react and express, bundles with Webpack with hot module reloading
and hot style reloading with SCSS support. Bonus: Cordova support.

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
│   ├── templates             # HTML templates
│   └── util                  # Utility methods
├── cordova-build             # Cordova build tools
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

## Building Cordova Apps

First, make sure you have Cordova installed:

```
npm install -g cordova
```

Initialize the Cordova app:

```
cordova create cordova/ com.org.appname "My App"
```

Add the platform(s) you want to build for:

```
cd cordova/
cordova platform add ios # or 'android'
```

Install plugins (if you don't have a `/plugins` folder)
```
cordova prepare
```

### Build/Start Dev Environment

```
npm run start:cordova               # build for development with hot reloading
npm run build:cordova               # build for development without hot reloading
npm run build:cordova:development   # alias for above
npm run build:cordova:production    # build for production without hot reloading
```

### Start a simulator/emulator

* iOS - CLI

Install XCode, then:

```
npm install -g ios-deploy
cd cordova && cordova run ios
```

* iOS - XCode

Open the file located in `./cordova/platforms/ios/MarcasDirectos.xcodeproj`.

* Android - CLI

Install the Android SDK, then:
```
cd cordova && cordova run android
```

## Distributing Betas

You may want to distribute the app via Fabric (Crashlytics). To do so, prepare
the following files (copy and rename them):

```
build/fabric.json.example -> build/fabric.json
build/config/release.json.example -> build/config/release.json
```

Fill in the fields in the JSON files properly, then run the following commands:

```
npm run build:cordova:production   # build the source files for cordova's www
npm run dist:android               # build the binary and upload to Crashlytics
# OR
npm run dist:ios
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
