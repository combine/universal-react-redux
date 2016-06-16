const { apiKey, apiSecret } = require('./fabric.json');
const exec = require('child_process').exec;
const flatten = require('lodash/flatten');
const upperFirst = require('lodash/upperFirst');

const generateCommands = (platform, target) => {
  const platformPath = `${__dirname}/cordova/platforms/${platform}`;
  switch (platform) {
    case 'ios': {
      const outputPath = `${platformPath}/build/${target}`;
      return [
        `xcrun -sdk iphoneos PackageApplication ${outputPath}/*.app -o "${outputPath}/ios-release.ipa"`,
        `${platformPath}/Crashlytics.framework/submit ${apiKey} ${apiSecret} -ipaPath ${outputPath}/ios-release.ipa`
      ];
    }
    case 'android': {
      return [
        `cd ${platformPath}`,
        `./gradlew crashlyticsUploadDistribution${upperFirst(target)}`
      ];
    }
  }
  return [];
};

/**
 * distribute()
 * Distributes a builds to beta test on Fabric.
 * @param platform [Array] The platforms to distribute to 'ios' or 'android'.
 * @param target [String] 'device' or 'emulator'.
 */
module.exports = {
  distribute: (platforms, target) => {
    console.log('distributing from...', __dirname);

    if (apiKey && apiSecret) {
      console.log('Submitting app to Crashlytics...');

      const commands = flatten(platforms.map((platform) => generateCommands(platform, target)));

      console.log('running commands:', commands);
      exec(commands.join(' && '), function(error, stdout, stderr) {
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
        if (error !== null) {
          console.log('exec error:', error);
        }
      });
    } else {
      console.log('Error: You must provide apiKey and apiSecret in ', require('./fabric.json').resolve());
      process.exit(1);
    }
  }
};
