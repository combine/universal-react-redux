import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import routes from 'routes';

const App = () => (
  <Container fluid={false}>
    <Header />
    <Switch>
      {routes.map(route => <Route key={route.path} {...route} />)}
    </Switch>
    <Footer />
  </Container>
);

export default App;
