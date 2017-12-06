const exec = require('child_process').exec;

// For cross-platform postinstalls, use a node script to execute any
// post-install tasks rather than using a bash script since that wouldn't work
// on Windows.
if (process.env.NODE_ENV === 'production') {
  exec('npm run prod:build', (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
