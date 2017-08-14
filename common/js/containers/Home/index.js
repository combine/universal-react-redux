import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import css from './index.scss';

export default class HomeContainer extends Component {
  render() {
    return (
      <div className={css.home}>
        <Helmet>
          <title>Home</title>
        </Helmet>
        <h1>It Works!</h1>
      </div>
    );
  }
}
