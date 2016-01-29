import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DevTools from '../../../shared/containers/DevTools';

export default class App extends Component {
  render() {
    const { header, footer } = this.props;
    return (
      <div>
        {header || <Header />}
        {this.props.children}
        {footer || <Footer />}
        <DevTools />
      </div>
    );
  }
}
