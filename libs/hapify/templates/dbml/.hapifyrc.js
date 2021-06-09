module.exports = {
  name: 'Hapify DBML templates',
  description: 'Generate the DBML schema',
  templates: [
    {
      path: 'models.dbml',
      engine: 'hpf',
      input: 'all',
    },
  ],
};
