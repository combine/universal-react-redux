var fs = require('fs');

/**
 * cordovaBuild()
 * @param options.platform [String] Can be 'ios' or 'android'
 * @param options.config [String] The build configuration: 'debug', 'release', or other defined.
 * @param options.target [String] (iOS only) The target platform: 'device' or 'emulator'
 * @param options.distribute [Boolean] Deploy to Crashlytics.
 * @param options.apiKey [String] The Fabric/Crashlytics API Key.
 * @param options.apiSecret [String] The Fabric/Crashlytics API Secret.
 * NOTE: To build signed APKs for Android, cordova/build.json must be properly updated.
 */
module.exports = function cordovaBuild(options) {
  var cordova = require('cordova-lib').cordova;
  var opts = arguments.length >= 1 ? options : {};
  var platform = opts.platform || null;
  var config = opts.config || 'beta';
  var target = opts.target || 'device';
  var apiKey = opts.apiKey || null;
  var apiSecret = opts.apiSecret || null;
  var distribute = opts.distribute || false;
  var o = {
    platforms: [],
    options: []
  };

  if (platform) { o.platforms.push(platform); }
  if (target) { o.options.push('--' + target); }
  if (config) {
    var configFilePath = __dirname + '/config/' + config + '.json';
    o.options.push('--' + config);
    try {
      fs.accessSync(configFilePath, fs.F_OK);
      o.options.push('--buildConfig=' + configFilePath);
    } catch (e) {
      console.log('Warning: build file not found, using defaults...');
    }
  }

  // switch to cordova directory
  process.chdir('./cordova');

  // build with options and distribute to Fabric if specified
  return cordova.raw.build(o).then(function() {
    // distribute to Fabric
    if (distribute) {
      require('./distribute')(platform, target, apiKey, apiSecret);
    }
  });
};
