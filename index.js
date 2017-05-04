'use strict';

const AWS = require('aws-sdk');
const Spinner = require('cli-spinner').Spinner;

module.exports = (InstanceId, region, destinationStream) => {
  const index = {};
  const params = { InstanceId };
  const ec2 = new AWS.EC2({ region });

  const spinner = new Spinner('Waiting for output...');
  spinner.setSpinnerString('⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆');
  spinner.start();

  return new Promise((resolve, reject) => {
    const makeRequest = () => {
      setTimeout(() => {
        ec2.getConsoleOutput(params, (err, data) => {
          if (err) return reject(err);
          if (!data.Output) return makeRequest();

          spinner.stop(true);
          const lines = new Buffer(data.Output, 'base64').toString().split('\r\n');
          lines.forEach((line) => {
            if (index[line]) return;
            index[line] = true;
            destinationStream.write(`${line}\n`);
          });

          makeRequest();
        });
      }, 1000);
    };

    makeRequest();
  });
};

if (require.main === module) {
  module.exports(process.argv[2], process.argv[3], process.stdout)
    .catch((err) => process.stdout.write(err.stack));
}
