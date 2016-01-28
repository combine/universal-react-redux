import React, { Component } from 'react';

export default class ExampleComponent extends Component {
  render() {
    const { example, location, params } = this.props;
    return (
      <div>
        <h2>I am an example dumb component.</h2>
        <p>
          Reducer state passed to props:
        </p>
        <pre>{JSON.stringify(example, null, 2)}</pre>
        <p>
          Router location passed to props:
        </p>
        <pre>{JSON.stringify(location, null, 2)}</pre>
        <p>
          Router params passed to props:
        </p>
        <pre>{JSON.stringify(params, null, 2)}</pre>
      </div>
    );
  }
}
