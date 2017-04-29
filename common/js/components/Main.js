import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from 'routes';

const Main = () => (
  <main>
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} />)}
    </Switch>
  </main>
);

export default Main;
