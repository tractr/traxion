const path = require('path');
console.log(path.join(__dirname, '@tractr/angular-components'));
console.log(require.resolve('@tractr/angular-components'));

module.exports = {
  stories: [
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
    require.resolve('@tractr/angular-components') +
      '/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
  ],
};
