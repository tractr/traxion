module.exports = {
  documentation: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'introduction',
    },
    {
      type: 'category',
      label: 'Get started',
      link: { type: 'doc', id: 'get-started/quick-start' },
      items: [
        {
          type: 'category',
          label: 'Step by step',
          link: {
            type: 'doc',
            id: 'get-started/step-by-step/introduction',
          },
          items: [
            'get-started/step-by-step/nx-workspace',
            'get-started/step-by-step/hapify',
            'get-started/step-by-step/prettier',
            'get-started/step-by-step/eslint',
            'get-started/step-by-step/prisma',
            'get-started/step-by-step/generated-libs',
            'get-started/step-by-step/commitlint-husky',
            'get-started/step-by-step/github-actions',
            {
              type: 'category',
              label: 'Applications',
              items: [
                'get-started/step-by-step/apps/api',
                'get-started/step-by-step/apps/admin',
                'get-started/step-by-step/apps/terraform',
                'get-started/step-by-step/apps/docusaurus',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Overview',
      items: ['overview/generation', 'overview/scaffolding'],
    },
    {
      type: 'category',
      label: 'How to',
      items: [
        'how-to/data-models',
        'how-to/database',
        'how-to/angular',
        'how-to/authentication',
        'how-to/authorization',
        'how-to/file-storage',
        'how-to/mailer',
        'how-to/infrastructure',
        'how-to/ci-cd',
        'how-to/style-guide',
      ],
    },
    {
      type: 'category',
      label: 'Schematics',
      link: { type: 'doc', id: 'schematics/how-to' },
      items: [
        'schematics/publish',
        'schematics/release',
        'schematics/eslint',
        'schematics/prettier',
        'schematics/github-workflows',
      ],
    },
    {
      type: 'category',
      label: 'Contribution',
      items: ['contribution/how-to-write-this-documentation'],
    },
  ],
};
