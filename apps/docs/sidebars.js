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
      items: ['get-started/initialization'],
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
        {
          type: 'category',
          label: 'Initialization',
          items: [
            'how-to/initialization/introduction',
            'how-to/initialization/nx-workspace',
            'how-to/initialization/hapify',
            'how-to/initialization/prettier',
            'how-to/initialization/eslint',
            'how-to/initialization/prisma',
            'how-to/initialization/generated-libs',
            'how-to/initialization/commitlint-husky',
            'how-to/initialization/github-actions',
            {
              type: 'category',
              label: 'Applications',
              items: [
                'how-to/initialization/apps/api',
                'how-to/initialization/apps/admin',
                'how-to/initialization/apps/terraform',
                'how-to/initialization/apps/docusaurus',
              ],
            },
          ],
        },
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
      items: [
        'schematics/how-to',
        'schematics/publish',
        'schematics/release',
        'schematics/eslint',
        'schematics/prettier',
        'schematics/github-workflows',
        'schematics/schematic-template-lib',
      ],
    },
    {
      type: 'category',
      label: 'Contribution',
      items: ['contribution/how-to-write-this-documentation'],
    },
  ],
};
