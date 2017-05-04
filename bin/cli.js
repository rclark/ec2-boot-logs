'use strict';

const meow = require('meow');

const cli = meow(`
  USAGE: ec2-boot-logs [options]

  Options:
    -i, --instance-id   (required) the EC2 ID
    -r, --region        [default us-east-1] the EC2 region
`)
