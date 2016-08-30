import React, { Component } from 'react';
import { connect } from 'react-redux';
import ExampleComponent from 'components/Example';

const mapStateToProps = (state, ownProps) => {
  return {
    example: state.example,
    location: ownProps.location,
    params: ownProps.params
  };
};

class ExampleContainer extends Component {
  render() {
    return (
      <div>
        <h1>I am an example smart container.</h1>
        <ExampleComponent {...this.props} />
      </div>
    );
  }
}

export default connect(mapStateToProps)(ExampleContainer);
