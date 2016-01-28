var fabricConfig = require('./fabric.json');
var exec = require('child_process').exec;

/**
 * distribute()
 * Distributes a build to beta test on Fabric.
 * @param platform [String] 'ios' or 'android'.
 * @param target [String] 'device' or 'emulator'.
 * @param apiKey [String] The Fabric API Key.
 * @param apiSecret [String] The Fabric API Secret.
 */
module.exports = function (platform, target, apiKey, apiSecret) {
  var paths = {
    ios: '../cordova/platforms/ios',
    android: '../cordova/platforms/android'
  };
  var outputs = {
    ios: paths.ios + '/build/' + target,
    android: paths.android + '/build/outputs/apk'
  };
  var commands = [];

  apiKey = apiKey || fabricConfig.apiKey || null;
  apiSecret = apiSecret || fabricConfig.apiSecret || null;

  if (apiKey && apiSecret) {
    console.log('Submitting app to Crashlytics...');
    if ((platform === null || platform === 'ios')) {
      // TODO: Retrieve and use the current version number for naming the IPA
      // Should be able to parse the version number from cordova/config.xml
      commands.push(
        'xcrun -sdk iphoneos PackageApplication ' + outputs.ios + '/*.app -o "' + outputs.ios + '/ios-release.ipa"',
        paths.ios + '/Crashlytics.framework/submit ' + apiKey + ' ' + apiSecret + ' -ipaPath ' + outputs.ios + '/ios-release.ipa'
      );
    }
    if ((platform === null || platform === 'android')) {
      process.chdir('../cordova/platforms/android');
      commands.push(
        './gradlew crashlyticsUploadDistributionRelease'
      );
    }

    exec(commands.join(' && '), function(error, stdout, stderr) {
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }
    });

  } else {
    console.log('Error: You must provide --api-key and --api-secret.');
    process.exit(1);
  }
};
