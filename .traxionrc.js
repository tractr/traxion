module.exports = {
  apps: {
    pwa: {
      environments: [
        {
          name: 'API_URL',
          value: (service, config) => service.getApplicationUrl(config.apiPath),
        },
      ],
    },
    api: {
      environments: [
        { name: 'NODE_ENV', value: 'production' },
        { name: 'NODE_OPTIONS', value: '' },
        {
          name: 'API_URL',
          value: (service) => service.getApplicationUrl('/api'),
        },
        { name: 'PWA_URL', value: (service) => service.getApplicationUrl('') },
        { name: 'POSTGRES_DB', value: (_, config) => config.db.name },
        { name: 'POSTGRES_DB_TEST', value: (_, config) => config.db.nameTest },
        {
          name: 'POSTGRES_HOST',
          value: (service, config) =>
            config.db.host ?? service.getServiceDomainName('postgres'),
        },
        { name: 'POSTGRES_PORT', value: (_, config) => config.db.port },
        { name: 'POSTGRES_SCHEMA', value: (_, config) => config.db.schema },
        {
          name: 'POSTGRES_OPTIONS',
          value: (_, config) => config.db.options ?? '',
        },
      ],
      secrets: [
        'COOKIE_SECRET',
        'JWT_SECRET',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
      ],
    },
  },
};
