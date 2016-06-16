# Building Cordova Apps

First, make sure you have Cordova installed:

```
npm install -g cordova
```

In your project directory, initialize the Cordova app:

```
cordova create ./cordova/ com.org.appname "My App"
```

Add the platform(s) you want to build for:

```
cd cordova/
cordova platform add ios # or 'android'
```

Install plugins (if you don't have a `/plugins` folder)
```
cordova prepare
```

## Build/Start Dev Environment

```
npm run cordova:dev:start   # build for development with hot reloading
npm run cordova:dev:build   # build for development without hot reloading

npm run cordova:prod:build  # build for production without hot reloading
```

## Start a simulator/emulator

* iOS - CLI

Install XCode, then:

```
npm install -g ios-deploy
cd cordova && cordova run ios
```

* iOS - XCode

Open the file located in `./cordova/platforms/ios/AppName.xcodeproj`.

* Android - CLI

Install the Android SDK, then:
```
cd cordova && cordova run android
```

## Committing to Source Control
The `cordova/` directory is not .gitignored, but several directories are, as
they are directories containing built files. You'll need to leave the main
`cordova/` directory in source control as it will contain configuration files
that you will need for your app.

## Distributing Betas

You may want to distribute the app via Fabric (Crashlytics). To do so, prepare
the following files (copy and rename them):

```
build/fabric.json.example -> build/fabric.json
build/config/release.json.example -> build/config/release.json
```

Fill in the fields in the JSON files properly, then run the following commands:

```
npm run cordova:build:prod    # build the source files for cordova's www
npm run cordova:dist          # build and distribute the binary to Fabric/Crashlytics for all platforms

# OR
npm run cordova:dist:android  # distribute android to Fabric
npm run cordova:dist:ios      # distribute ios to Fabric
```

## Additional Notes

If you're debugging in a mobile browser and you want to access your project
locally, do the following:

- Make sure your mobile device on the same network as your desktop/laptop.
- Run `npm start` with a `HOSTNAME` environment variable set to your computer's
local ip address (the computer that your dev environment is on):
```
HOSTNAME=10.0.1.3 npm start
```
- Browse to `http://10.0.1.3:3000` on your mobile device.
