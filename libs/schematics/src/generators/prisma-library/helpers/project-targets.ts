import { TargetConfiguration } from '@nrwl/devkit';

import { NormalizedOptions } from '../../hapify-library/schema';

export function getTargetsToAdd(options: NormalizedOptions): {
  [index: string]: TargetConfiguration;
} {
  return {
    deploy: {
      executor: '@nx-tools/nx-prisma:generate',
      options: {
        schema: `${options.projectRoot}/prisma/schema.prisma`,
      },
    },
    generate: {
      dependsOn: [
        {
          projects: 'self',
          target: 'pregenerate',
        },
      ],
      executor: '@nrwl/workspace:run-commands',
      options: {
        commands: [
          {
            command:
              'npx prisma-merge --baseFile=prisma/schemas/base.prisma --schemaFilePatterns=prisma/**/*.prisma --outputFile=prisma/schema.prisma --excludedFilePattern=prisma/**/schema.prisma',
            forwardAllArgs: false,
          },
          {
            command: 'npx prisma format',
            forwardAllArgs: false,
          },
          {
            command: 'npx prisma generate',
            forwardAllArgs: false,
          },
        ],
        cwd: options.projectRoot,
        parallel: false,
      },
    },
    pregenerate: {
      executor: '@tractr/schematics:generate',
      options: {
        cleanFirst: false,
        cwd: options.projectRoot,
        format: false,
        inputHapifyGeneratedPath: 'prisma',
        moveGeneratedFiles: false,
      },
    },
    migrate: {
      executor: '@nx-tools/nx-prisma:migrate',
      options: {
        schema: `${options.projectRoot}/prisma/schema.prisma`,
      },
    },
    pull: {
      executor: '@nx-tools/nx-prisma:pull',
      options: {
        schema: `${options.projectRoot}/prisma/schema.prisma`,
      },
    },
    push: {
      executor: '@nx-tools/nx-prisma:push',
      options: {
        schema: `${options.projectRoot}/prisma/schema.prisma`,
      },
    },
    reset: {
      executor: '@nx-tools/nx-prisma:reset',
      options: {
        schema: `${options.projectRoot}/prisma/schema.prisma`,
      },
    },
    seed: {
      executor: '@nx-tools/nx-prisma:seed',
      options: {
        script: `${options.projectRoot}/prisma/seed.ts`,
        tsConfig: `${options.projectRoot}/tsconfig.json`,
      },
    },
    status: {
      executor: '@nx-tools/nx-prisma:status',
      options: {
        schema: `${options.projectRoot}/prisma/schema.prisma`,
      },
    },
  };
}
