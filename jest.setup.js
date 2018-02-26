const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// configure an adapter for enzyme
configure({ adapter: new Adapter() });
