module.exports = {
  name: 'Hapify templates for Angular Rext Client',
  description:
    'Generate the Angular Rext Client to call the generated REST API',
  templates: [
    {
      path: 'generated/angular-rext-client/services/{kebab}.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/angular-rext-client/services/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/angular-rext-client/angular-rext.module.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/angular-rext-client/index.ts',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
