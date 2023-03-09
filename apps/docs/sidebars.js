module.exports = {
  documentation: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      link: { type: 'doc', id: 'get-started/index' },
      items: ['get-started/nestjs-services', 'get-started/nestjs-graphql'],
    },
    {
      type: 'category',
      label: 'How to',
      items: [
        {
          type: 'category',
          label: 'Database',
          items: [
            'how-to/database/configuration',
            'how-to/database/database-migration-with-prisma',
          ],
        },
        {
          type: 'category',
          label: 'Authentication',
          items: [
            'how-to/authentication/use-nestjs-user',
            'how-to/authentication/use-nestjs-authentication',
            'how-to/authentication/use-nestjs-casl',
            'how-to/authentication/use-nestjs-password',
          ],
        },
        // {
        //   type: 'category',
        //   label: 'Angular',
        //   items: [
        //     'how-to/angular/configure-lazy-loading',
        //     'how-to/angular/configure-storybook',
        //     'how-to/angular/configure-tailwind-css',
        //   ],
        // },
        {
          type: 'category',
          label: 'NestJS',
          items: ['how-to/nestjs/extend-a-generated-controller'],
        },
        // {
        //   type: 'category',
        //   label: 'File storage',
        //   items: [
        //     'how-to/file-storage/file-storage-on-aws-s3',
        //     'how-to/file-storage/use-minio',
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Mailer',
        //   items: [
        //     'how-to/mailer/use-mailjet',
        //     'how-to/mailer/use-mailer-with-mailjet',
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Terraform',
        //   items: [
        //     'how-to/terraform/introduction',
        //     'how-to/terraform/configuration',
        //     'how-to/terraform/add-a-new-environment',
        //     'how-to/terraform/ecs-components',
        //     'how-to/terraform/create-new-service',
        //   ],
        // },
        // {
        //   type: 'category',
        //   label: 'Documentation',
        //   items: ['how-to/documentation/add-docusaurus'],
        // },
      ],
    },
    // {
    //   type: 'category',
    //   label: 'References',
    //   items: [
    //     {
    //       type: 'category',
    //       label: 'Schematics',
    //       link: { type: 'doc', id: 'references/schematics/how-to' },
    //       items: [
    //         'references/schematics/admin-app',
    //         'references/schematics/eslint-config',
    //         'references/schematics/github-workflows',
    //         'references/schematics/hapify-library',
    //         'references/schematics/npm-publish',
    //         'references/schematics/prettier-config',
    //         'references/schematics/prisma-library',
    //         'references/schematics/release',
    //         'references/schematics/target-generate',
    //         'references/schematics/traxion-workspace',
    //       ],
    //     },
    //   ],
    // },
    {
      type: 'category',
      label: 'Contribution',
      items: ['contribution/documentation-guidelines'],
    },
    'what-is-inside',
  ],
};
