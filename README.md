# universal-react-redux

A simple, clean, React and Redux boilerplate with sensible defaults. Server
rendering with react and express. Bundled with Webpack, with HMR transforms and
support for `css-modules`.

## Get started

Copy environment variables and edit them if necessary:

```
cp .env.example .env
```

Then:

```
npm install
npm start
```

Direct your browser to `http://localhost:3000`.

For production builds:

```
npm run prod:build
npm run serve
```

Or simply

```
npm run prod
```

For Heroku, simply add a `Procfile`:

```
web: npm run serve
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

## Environment Variables

In development mode, environment variables are loaded by `dotenv` off the `.env`
file in your root directory. In production, you'll have to manage these
yourself. In Heroku, this is simple as running:

```
heroku config:set FOO=bar
```

## Redux Devtools

This project supports the awesome [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension). Install the
Chrome or Firefox extension and it should just work.

## Pre-fetching Data for Server Side Rendering (SSR)

When rendering components on the server, you'll find that you may need to fetch
some data before it can be rendered. The [server code](server/server.js) looks
for a `fetchData` method on the container component and its child components,
then executes all of them and only renders after the promises have all been
resolved.

```
//  As an ES6 class

class TodosContainer extends React.Component {
  static fetchData = ({ store }) => {
    return store.dispatch(fetchTodos());
  };
}

// As a functional stateless component

const TodosContainer = (props) => {
  const { todos } = props;
  return (
    // ...component code
  );
}

TodosContainer.fetchData = ({ store }) => {
  return store.dispatch(fetchTodos());
}
```

## Async / Await

This project uses `async/await`, available by default in Node.js v8.x.x or
higher. If you experience errors, please upgrade your version of Node.js.

## Testing

The default testing framework is Mocha, though you can use whatever you want.
Make sure you have it installed:

```
npm install -g mocha
```

Tests should reside in `test/spec` in their appropriate folders:

```
├── test
│   ├── spec
│   │   ├── api
│   │   │   ├── todos.test.js
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

This will run all tests in the `test/spec` directory.

## Running ESLint

```
npm run lint
```

Check the `.eslintignore` file for directories excluded from linting.

## Changing the public asset path

By default, assets are built into `/dist/public`. This path is then served by
express under the path `/assets`. This is the public asset path. In a production
scenario, you may want your assets to be hosted on a CDN. To do so, just change
the `PUBLIC_ASSET_PATH` environment variant.

If you're using Heroku:

```
heroku config:set PUBLIC_ASSET_PATH=https://my.cdn.com
```
