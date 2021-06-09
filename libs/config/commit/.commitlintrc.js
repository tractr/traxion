// When updating this file think to change the @tractr/semantic-release-config/.commitlintrc.js too

const conventional = require('./types.json');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Follow the commit-types used by commitizen (https://git.io/Je4pr).
    'type-enum': [2, 'always', Object.keys(conventional.types)],
    // Blow lines are optional.
    'header-max-length': [2, 'always', 100],
    'body-max-line-length': [2, 'always', 100],
    'footer-max-line-length': [2, 'always', 100],
  },
};
