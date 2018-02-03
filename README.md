# Universal React Redux Boilerplate

A universal React/Redux boilerplate with sensible defaults. Out of the box, this
boilerplate comes with:

- Server-side rendering with Express
- Code splitting with [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports) and [react-loadable](https://github.com/thejameskyle/react-loadable)
- Sane [webpack configurations](webpack/)
- JS hot reloading with [react-hot-loader (@next)](https://github.com/gaearon/react-hot-loader) and [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
- CSS, SASS and [css-modules](https://github.com/css-modules/css-modules) support with hot reloading and no [flash of unstyled content](https://en.wikipedia.org/wiki/Flash_of_unstyled_content) ([css-hot-loader](https://github.com/shepherdwind/css-hot-loader))
- Routing with [react-router-v4](https://github.com/ReactTraining/react-router)
- Full production builds that do not rely on `babel-node`.

## Philosophy

The JavaScript ecosystem is brimming with open source libraries. With advances
in ES6 and commitments by the big tech companies to invest in JavaScript, the
last several years have arguably turned web development into what was once a
huge pain in the ass, to a pretty decently enjoyable experience.

With so many different packages now available, we now have the freedom and the
choice to craft applications to our exact specifications, reducing bloat and
minimizing the number of code we need to support cross-platform apps. It really
is a new world.

However, with so many different developers working on different libraries,
things are constantly in flux, and breaking changes are often introduced. It can
be hard to keep up with the latest and greatest since they're always changing.

To help alleviate this, we've collected some of the best practices and features
from the React ecosystem and put them in one place. Although this boilerplate is
fully production-capable as is, its main goal is to serve as an example of how
to bring an application together using the latest tools in the ecosystem.

## Development Mode

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

## Production Builds

Add environment variables the way you normally would on your production system.

```
npm run prod:build
npm run serve
```

Or simply:

```
npm run prod
```

If using Heroku, simply add a `Procfile` in the root directory. The
[postinstall](postinstall.js) script will do the rest.

```
web: npm run serve
```

## Environment Variables

In development mode, environment variables are loaded by `dotenv` off the `.env`
file in your root directory. In production, you'll have to manage these
yourself.

An example with Heroku:

```
heroku config:set FOO=bar
```

## CSS Modules

This project uses [CSS Modules](https://github.com/css-modules/css-modules).
Class names should be in `camelCase`. Simply import the .scss file into your
component, for example:

```
├── components
│   ├── Header.js
│   ├── Header.scss
```

```
// Header.scss
.headerContainer {
  height: 100px;
  width: 100%;
}
```

```
// Header.js
import css from './Header.scss';

const Header = (props) => {
  return (
    <div className={css.headerContainer}>
      {...}
    </div>
  );
}

```

## Redux Devtools

This project supports the awesome [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension).
Install the Chrome or Firefox extension and it should just work.

## Pre-fetching Data for Server Side Rendering (SSR)

When rendering components on the server, you'll find that you may need to fetch
some data before it can be rendered. The [component renderer](server/renderer/handler.js)
looks for a `fetchData` method on the container component and its child
components, then executes all of them and only renders after the promises have
all been resolved.

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

By default, assets are built into `dist/public`. This path is then served by
express under the path `assets`. This is the public asset path. In a production
scenario, you may want your assets to be hosted on a CDN. To do so, just change
the `PUBLIC_ASSET_PATH` environment variant.

Example using Heroku, if serving via CDN:

```
heroku config:set PUBLIC_ASSET_PATH=https://my.cdn.com
```

Example using Heroku, if serving locally:

```
heroku config:set PUBLIC_ASSET_PATH=/assets
```
