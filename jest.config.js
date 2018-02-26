const { mapValues, mapKeys } = require('lodash');
const { _moduleAliases } = require('./package.json');

// Maps _moduleAliases in package.json to Jest's regex format that it can read
const moduleAliasesMap = mapValues(
  mapKeys(_moduleAliases, (_, alias) => `${alias}/(.*)$`),
  path => `<rootDir>/${path}/$1`
);

const cssFiles = '\\.(css|scss|less)$';
const staticFiles =
  '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|' +
  'webm|wav|mp3|m4a|aac|oga)$';

module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'jsx'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  moduleNameMapper: {
    ...moduleAliasesMap,
    [staticFiles]: '<rootDir>/__mocks__/fileMock.js',
    [cssFiles]: 'identity-obj-proxy'
  }
};
