module.exports = {
  documentation: [
    { type: 'doc', label: 'Introduction', id: 'introduction' },
    {
      type: 'category',
      label: 'Overview',
      items: ['overview/first-steps', 'overview/hapify'],
    },
    {
      type: 'category',
      label: 'How to',
      items: ['how-to/docusaurus'],
    },
    {
      type: 'category',
      label: 'Commons',
      items: ['commons/common', 'commons/nestjs-core', 'commons/angular-tools'],
    },
    {
      type: 'category',
      label: 'Code Generation',
      items: ['code-generation/hapify'],
    },
    {
      type: 'category',
      label: 'Modelisation',
      items: [
        'modelisation/models',
        'modelisation/nestjs-models-common',
        'modelisation/nestjs-models',
      ],
    },
    {
      type: 'category',
      label: 'Database',
      items: ['database/prisma', 'database/nestjs', 'database/dbml'],
    },
    {
      type: 'category',
      label: 'REST',
      items: ['rest/rest-dtos', 'rest/rext-client', 'rest/angular-rext-client'],
    },
    {
      type: 'category',
      label: 'Authentication',
      items: [
        'auth/nestjs-auth',
        'auth/angular-auth',
        'auth/hapify-casl',
        'auth/nestjs-casl',
        'auth/angular-casl',
      ],
    },
    {
      type: 'category',
      label: 'Components',
      items: ['components/angular-components', 'components/angular-form'],
    },
    {
      type: 'category',
      label: 'Files',
      items: ['files/nestjs-file-storage', 'files/angular-file-storage'],
    },
    {
      type: 'category',
      label: 'Mailer',
      items: ['mailer/mailjet'],
    },
    {
      type: 'category',
      label: 'CI/CD',
      items: ['ci-cd/config-commit', 'ci-cd/terraform'],
    },
    { type: 'category', label: 'Exemples', items: ['doc1', 'doc2', 'doc3'] },
    { type: 'category', label: 'MDX !', items: ['mdx'] },
  ],
};
