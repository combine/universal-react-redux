import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import css from './Header.scss';

export default class Header extends Component {
  render() {
    return (
      <header>
        <ul className={css.headerLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/example">Example</Link></li>
          <li><Link to="/example/2">Example 2</Link></li>
        </ul>
      </header>
    );
  }
}
