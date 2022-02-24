module.exports = {
  documentation: [
    'introduction',
    'get-started/index',
    {
      type: 'category',
      label: 'How to use',
      items: [
        {
          type: 'category',
          label: 'NestJS',
          link: { type: 'doc', id: 'how-to/nestjs/index' },
          items: [
            'how-to/nestjs/configuration/index',
            {
              type: 'category',
              label: 'Use cases',
              items: [
                'how-to/nestjs/use-cases/create-a-new-route',
                'how-to/nestjs/use-cases/override-authentication-for-a-generated-route',
                'how-to/nestjs/use-cases/override-validation-for-a-generated-route',
                'how-to/nestjs/use-cases/manage-file-storage-with-aws-s3',
              ],
            },
            'how-to/nestjs/troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Database',
          link: { type: 'doc', id: 'how-to/database/index' },
          items: [
            'how-to/database/configuration/index',
            {
              type: 'category',
              label: 'Use cases',
              items: [
                'how-to/database/use-cases/browse-data-with-prisma-studio',
                'how-to/database/use-cases/seed-database-with-predefined-data',
                'how-to/database/use-cases/seed-database-with-random-data',
              ],
            },
            'how-to/database/troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Angular',
          link: { type: 'doc', id: 'how-to/angular/index' },
          items: [
            {
              type: 'category',
              label: 'Configuration',
              items: [
                'how-to/angular/configuration/configure-lazy-loading',
                'how-to/angular/configuration/configure-storybook',
                'how-to/angular/configuration/configure-tailwind-css',
              ],
            },
            {
              type: 'category',
              label: 'Use cases',
              items: [
                'how-to/angular/use-cases/create-new-angular-application',
                'how-to/angular/use-cases/create-new-angular-library',
                'how-to/angular/use-cases/create-new-angular-module',
                'how-to/angular/use-cases/create-new-angular-component',
                'how-to/angular/use-cases/call-the-api-using-rext-client',
                'how-to/angular/use-cases/call-the-api-using-graphql',
                'how-to/angular/use-cases/create-a-login-page',
                'how-to/angular/use-cases/create-a-user-profile-page',
                'how-to/angular/use-cases/upload-a-file-to-aws-s3',
              ],
            },
            'how-to/angular/troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Hapify',
          link: { type: 'doc', id: 'how-to/hapify/index' },
          items: [
            'how-to/hapify/configuration/index',
            {
              type: 'category',
              label: 'Use cases',
              items: [
                'how-to/hapify/use-cases/edit-data-models',
                'how-to/hapify/use-cases/extend-hapify-templates',
                'how-to/hapify/use-cases/override-generated-library',
              ],
            },
            'how-to/hapify/troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Infrastructure',
          link: { type: 'doc', id: 'how-to/infrastructure/index' },
          items: [
            {
              type: 'category',
              label: 'Configuration',
              items: [
                'how-to/infrastructure/configuration/create-aws-account',
                'how-to/infrastructure/configuration/create-terraform-account',
                'how-to/infrastructure/configuration/provide-credentials-to-github',
              ],
            },
            {
              type: 'category',
              label: 'Use cases',
              items: [
                'how-to/infrastructure/use-cases/access-remote-database',
                'how-to/infrastructure/use-cases/apply-terraform-from-ci-cd',
                'how-to/infrastructure/use-cases/apply-terraform-manually',
                'how-to/infrastructure/use-cases/force-redeployment',
              ],
            },
            {
              type: 'category',
              label: 'Troubleshooting',
              items: [
                'how-to/infrastructure/troubleshooting/ecs-task-definition-not-applied',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'CI/CD',
          link: { type: 'doc', id: 'how-to/ci-cd/index' },
          items: [
            {
              type: 'category',
              label: 'Configuration',
              items: [
                'how-to/ci-cd/configuration/create-github-bot',
                'how-to/ci-cd/configuration/setup-github-secrets',
              ],
            },
            {
              type: 'category',
              label: 'Use cases',
              items: ['how-to/ci-cd/use-cases/optimize-ci-cd-using-nx-cloud'],
            },
            'how-to/ci-cd/troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Schematics',
          link: { type: 'doc', id: 'how-to/schematics/index' },
          items: [
            'how-to/schematics/configuration/index',
            {
              type: 'category',
              label: 'Use cases',
              items: ['how-to/schematics/use-cases/create-a-new-schematic'],
            },
            'how-to/schematics/troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Workspace',
          link: { type: 'doc', id: 'how-to/workspace/index' },
          items: [
            'how-to/workspace/configuration/index',
            {
              type: 'category',
              label: 'Use cases',
              items: [
                'how-to/workspace/use-cases/create-a-new-library',
                'how-to/workspace/use-cases/create-a-new-application',
              ],
            },
            'how-to/workspace/troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Documentation',
          link: { type: 'doc', id: 'how-to/documentation/index' },
          items: [
            'how-to/documentation/configuration/index',
            {
              type: 'category',
              label: 'Use cases',
              items: [
                'how-to/documentation/use-cases/deploy-the-documentation',
              ],
            },
            'how-to/documentation/troubleshooting/index',
          ],
        },
        {
          type: 'category',
          label: 'Services',
          link: { type: 'doc', id: 'how-to/services/index' },
          items: [
            'how-to/services/authentication/index',
            'how-to/services/aws-s3/index',
            'how-to/services/mailjet/index',
            'how-to/services/sentry/index',
          ],
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
            'references/schematics/npm-publish',
            'references/schematics/release',
            'references/schematics/eslint-config',
            'references/schematics/prettier-config',
            'references/schematics/github-workflows',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contribution',
      items: [
        'contribution/code-guidelines',
        'contribution/documentation-guidelines',
        'contribution/style-and-layout',
      ],
    },
    'what-is-inside',
  ],
};
