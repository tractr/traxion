module.exports = {
  documentation: [
    'introduction',
    'get-started/index',
    {
      type: 'category',
      label: 'How to',
      items: [
        {
          type: 'category',
          label: 'Database',
          link: { type: 'doc', id: 'how-to/database/index' },
          items: [],
        },
        {
          type: 'category',
          label: 'File storage',
          link: { type: 'doc', id: 'how-to/file-storage/index' },
          items: [
            'how-to/file-storage/upload-a-file-to-aws-s3',
            'how-to/file-storage/use-minio',
          ],
        },
        {
          type: 'category',
          label: 'Terraform',
          link: { type: 'doc', id: 'how-to/terraform/index' },
          items: [
            'how-to/terraform/configuration',
            'how-to/terraform/add-a-new-environment',
            'how-to/terraform/ecs-components',
            'how-to/terraform/create-new-service',
          ],
        },
        {
          type: 'category',
          label: 'Documentation',
          link: { type: 'doc', id: 'how-to/documentation/index' },
          items: [],
        },
      ],
    },
    {
      type: 'category',
      label: 'References',
      items: [
        {
          type: 'category',
          label: 'Schematics',
          link: { type: 'doc', id: 'references/schematics/how-to' },
          items: [
            'references/schematics/admin-app',
            'references/schematics/eslint-config',
            'references/schematics/github-workflows',
            'references/schematics/hapify-library',
            'references/schematics/npm-publish',
            'references/schematics/prettier-config',
            'references/schematics/prisma-library',
            'references/schematics/release',
            'references/schematics/target-generate',
            'references/schematics/traxion-workspace',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contribution',
      items: ['contribution/documentation-guidelines'],
    },
    'what-is-inside',
  ],
};
