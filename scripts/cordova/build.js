const fs = require('fs');
const cordova = require('cordova-lib').cordova;
const fabric = require('./fabric');

/**
 * cordovaBuild()
 * @param options.platforms [String] Comma-delimited platforms, e.g. 'ios,android'
 * @param options.config [String] The build configuration: 'debug', 'release', or other defined.
 * @param options.target [String] (iOS only) The target platform: 'device' or 'emulator'
 * @param options.distribute [Boolean] Deploy to Crashlytics.
 * NOTE: To build signed APKs for Android, cordova/build.json must be properly updated.
 */
const cordovaBuild = (options) => {
  const opts = arguments.length >= 1 ? options : {};
  const { platforms = 'ios,android', config = 'release', target = 'device', distribute } = opts;
  const configFile = `${__dirname}/config/${config}.json`;
  const buildOpts = {
    platforms: platforms.split(','),
    options: [`--${target}`, `--${config}`, `--buildConfig=${configFile}`]
  };

  // Check if config file exists, if not warn the user.
  if (config) {
    try {
      fs.accessSync(configFile, fs.F_OK);
    } catch (e) {
      console.log('Warning: build file not found, using defaults...');
    }
  }

  // switch to cordova directory
  process.chdir('./cordova');

  // build with options and distribute to Fabric if specified
  return cordova.raw.build(buildOpts).then(
    function() {
      if (distribute) {
        fabric.distribute(platforms, target);
      }
    },
    function(error) {
      console.log('Build failed:', error);
    }
  );
};

module.exports = cordovaBuild;
