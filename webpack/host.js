
module.exports = (props = {}) => {
  const {
    PROTOCOL = process.env.PROTOCOL || 'http',
    OUTPUT_PATH = process.env.OUTPUT_PATH || 'dist/',
    PORT = process.env.PORT || 3001,
    HOSTNAME = process.env.HOSTNAME || 'localhost'
  } = props;

  const HOST_URL = `${PROTOCOL}://${HOSTNAME}${PORT === 80 ? '' : `:${PORT}`}`;
  const ASSET_HOST = process.env.ASSET_HOST || (HOST_URL + '/' + OUTPUT_PATH);

  return {
    OUTPUT_PATH,
    PORT,
    HOSTNAME,
    HOST_URL,
    ASSET_HOST
  };
};
