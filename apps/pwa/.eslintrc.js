module.exports = {
  extends: ['../../.eslintrc.json'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts'],
      extends: [
        'plugin:@nrwl/nx/angular',
        'plugin:@angular-eslint/template/process-inline-templates',
      ],
      rules: {
        '@angular-eslint/directive-selector': [
          'error',
          {
            type: 'attribute',
            prefix: 'stack',
            style: 'camelCase',
          },
        ],
        '@angular-eslint/component-selector': [
          'error',
          {
            type: 'element',
            prefix: 'stack',
            style: 'kebab-case',
          },
        ],
      },
    },
    {
      files: ['*.html'],
      extends: ['plugin:@nrwl/nx/angular-template'],
      rules: {},
    },
  ],
};
