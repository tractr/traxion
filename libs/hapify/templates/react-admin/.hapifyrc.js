module.exports = {
  name: 'Hapify templates for Nestjs Rext Client',
  description: 'Generate the Rext Client to call the generated REST API',
  templates: [
    {
      path: 'generated/react-admin/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/react-admin/ReactAdmin.tsx',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/react-admin/providers/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/react-admin/providers/auth.provider.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/react-admin/providers/rext.provider.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/react-admin/resources/index.ts',
      engine: 'hpf',
      input: 'all',
    },
    {
      path: 'generated/react-admin/resources/{pascal}/Filter.tsx',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/react-admin/resources/{pascal}/index.ts',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/react-admin/resources/{pascal}/Read.tsx',
      engine: 'hpf',
      input: 'one',
    },
    {
      path: 'generated/react-admin/resources/{pascal}/Write.tsx',
      engine: 'hpf',
      input: 'one',
    },
  ],
};
