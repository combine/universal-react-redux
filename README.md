# react-redux-starter

A universal starter kit built with ES2015, react, react-router and redux. Server
rendering with react and express. Bundled with Webpack with hot module and css
reloading with SCSS support.

## Prerequisites

* Node.js 6+ is **required**, as the Webpack configuration files uses ES2015
extensively.

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
├── README.md
├── client
│   └── index.js
├── common
│   ├── css
│   ├── fonts
│   ├── images
│   ├── js
│   │   ├── actions
│   │   ├── components            # "Dumb" components
│   │   ├── containers            # Smart containers
│   │   ├── lib                   # Misc. libraries like helpers, etc.
│   │   ├── middleware            # Middleware for redux
│   │   ├── reducers              # Redux reducers
│   │   ├── routes                # Routes each have an index.js which exports a react-router Route.
│   │   ├── selectors             # Selectors for getting state data
│   │   └── store                 # Store configuration for production and dev.
│   └── layouts                   # Layout files to be rendered by the server.
├── nodemon.json
├── package.json
├── server
│   ├── config.js
│   ├── index.js
│   └── server.js
├── webpack
│   ├── base.js
│   ├── development.js
│   ├── development.server.js
│   ├── hmr.js
│   ├── host.js
│   ├── isomorphic.js
│   └── production.js
```

## CSS Modules
This project uses [CSS Modules](https://github.com/css-modules/css-modules).
Class names should be in `camelCase`. Place the css file as a sibling to the
component with the same name, for example:
```
├── components
│   ├── Header.js
│   ├── Header.scss
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

## Changing the Asset Host

In production scenarios, you may want your assets to be hosted elsewhere besides
on your server. Just set an environment variable to point the asset host to
where ever you want, as defaults to `localhost:3001`. Just set it to the CDN of
your choice.

If you're using Heroku:
```
heroku config:set ASSET_HOST=/dist/
# OR
heroku config:set ASSET_HOST=https://s3.amazonaws.com/mybucket/myasssets/
```
