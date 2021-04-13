module.exports = {
  extends: ['@tractr'],
  rules: {
    'import/no-unresolved': 'off',
  },
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
