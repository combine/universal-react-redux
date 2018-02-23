import React from 'react';
import { Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { Header, Footer, RouteWithSubRoutes } from '@components/common';
import { hot } from 'react-hot-loader';
import routes from '@routes';

const App = () => (
  <Container fluid={false}>
    <Header />
    <Switch>
      {routes.map(route => (
        <RouteWithSubRoutes key={route.path} {...route} />
      ))}
    </Switch>
    <Footer />
  </Container>
);

export default hot(module)(App);
