import React, { Component } from 'react';
import Main from 'components/Main';
import Header from 'components/Header';
import Footer from 'components/Footer';
import DevTools from 'containers/DevTools';

export default class App extends Component {
  renderDevTools = () => {
    const { NODE_ENV, DISABLE_DEV_TOOLS } = process.env;

    if (NODE_ENV === 'development' && !DISABLE_DEV_TOOLS) {
      return <DevTools />;
    }

    return null;
  }
  render() {

    return (
      <div>
        <Header />
        <Main />
        <Footer />
        {this.renderDevTools()}
      </div>
    );
  }
}
