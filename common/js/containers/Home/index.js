import React, { Component } from 'react';
import css from './index.scss';

export default class HomeContainer extends Component {
  render() {
    return (
      <div className={css.home}>
        <h1>It Works!</h1>
      </div>
    );
  }
}
