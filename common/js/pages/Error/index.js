import React from 'react';
import PropTypes from 'prop-types';

const ERROR_MESSAGES = {
  404: 'The page you requested was not found.',
  500: 'The server encountered an error.'
};

const ErrorPage = (props) => {
  const { message } = props;

  return (
    <div>
      <h1>Sorry!</h1>
      <p>{message}</p>
    </div>
  );
};

ErrorPage.propTypes = {
  code: PropTypes.number,
  message: PropTypes.string
};

ErrorPage.defaultProps = {
  code: 404,
  message: ERROR_MESSAGES[404]
};

export default ErrorPage;
