module.exports = {
  stories: [
    '../projects/angular-components/src/lib/**/stories/*.storie.mdx',
    '../projects/angular-components/src/lib/**/stories/*.storie.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
