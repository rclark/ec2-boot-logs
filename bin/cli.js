#!/usr/bin/env node

'use strict';

const meow = require('meow');
const getLogs = require('..');

const cli = meow(`
  USAGE: ec2-boot-logs [options]

  Options:
    -i, --instance-id   (required) the EC2 ID
    -r, --region        [default us-east-1] the EC2 region
`, {
  alias: {
    i: 'instance-id',
    r: 'region'
  },
  default: {
    region: 'us-east-1'
  }
});

getLogs(cli.flags.instanceId, cli.flags.region, process.stdout)
  .catch((err) => process.stdout.write(err.stack));
