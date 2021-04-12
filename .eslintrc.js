module.exports = {
  extends: ['@tractr'],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['packages/*/tsconfig.json', 'apps/*/tsconfig.json'],
      },
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
