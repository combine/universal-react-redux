import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/example">Example</Link></li>
          <li><Link to="/example/2">Example 2</Link></li>
        </ul>
      </header>
    );
  }
}
