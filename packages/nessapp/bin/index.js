#!/usr/bin/env node

const sade = require('sade');
const spawn = require('react-dev-utils/crossSpawn');
const pkg = require('../package.json');
const prog = sade('nessapp');

function dispatchScript(script) {
  const result = spawn.sync('node', [require.resolve('../scripts/' + script)].concat(process.argv.slice(3)), { stdio: 'inherit' });

  // if script was killed by SIGKILL or SIGTERM
  if (result.signal) {
    if (result.signal === 'SIGKILL') console.log('The build failed because the process exited too early. ' + '\nThis probably means the system ran out of memory or someone called ' + '\n`kill -9` on the process.');
    else if (result.signal === 'SIGTERM') console.log('The build failed because the process exited too early. ' + '\nSomeone might have called `kill` or `killall`, or the system could ' + '\nbe shutting down.');
    process.exit(1);
  }
  process.exit(result.status);
}

// version
prog.version(pkg.version);

// build command
prog.command('build').describe('Build the application into production mode.').action(() => dispatchScript('build'));

// start command
prog.command('start').describe('Start the application in development mode.').action(() => dispatchScript('start'));

// run production mode
prog.command('production').describe('Start the application in production mode.').action(() => dispatchScript('production'));

// generate command
prog.command('generate').describe('Generate hooks, pages, components, etc.').option(
  '-t, --type',
).option(
  '-o --output',
).action(() => dispatchScript('generate'));

prog.parse(process.argv);

// NODE_ENV=production nessapp build && node deploy/server.js