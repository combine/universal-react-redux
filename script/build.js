import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';

const args = process.argv.splice(2);
const configFilePath = `${__dirname}/../${args[0]}`;
const debug = require('debug')(args[0]);
const configFile = require(configFilePath).default;
const compiler = webpack(configFile);

const handleSoftErrors = (errors) => {
  debug('There were some errors with compilation.');
  debug(errors);
};

const handleWarnings = (warnings) => {
  debug('There were some warnings with compilation.');
  debug(warnings);
};

compiler.apply(new ProgressPlugin({ profile: true }));

compiler.run((err, stats) => {
  if (err || stats.hasErrors()) {
    debug('There was a fatal error with webpack.');
    debug(err);
    return;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.errors.length > 0) {
    return handleSoftErrors(jsonStats.errors);
  }

  if (jsonStats.warnings.length > 0) {
    return handleWarnings(jsonStats.warnings);
  }
});
