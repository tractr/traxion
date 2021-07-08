module.exports = {
  name: 'Hapify templates for Nestjs Rext Client',
  description: 'Generate the Rext Client to call the generated REST API',
  templates: [
    {
      path: 'generated/rext-client/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rext-client/rext-client.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rext-client/helpers/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rext-client/helpers/rest-ajax.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rext-client/helpers/transform-and-validate.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rext-client/helpers/universal-rxjs-ajax.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rext-client/typings/xhr2.d.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rext-client/helpers/url.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/rext-client/services/{kebab}.service.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/rext-client/services/index.ts',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
