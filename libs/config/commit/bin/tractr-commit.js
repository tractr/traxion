#!/usr/bin/env node

const { bootstrap } = require('commitizen/dist/cli/git-cz');

bootstrap({
  cliPath: require.resolve('commitizen').replace('dist/index.js', ''),
  // this is new
  config: {
    path: 'cz-conventional-changelog',
  },
});
