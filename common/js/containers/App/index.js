import React from 'react';
import { Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from 'components/common';
import { Container } from 'semantic-ui-react';
import { Header, Footer } from 'components/common';
import routes from 'routes';

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

export default App;
