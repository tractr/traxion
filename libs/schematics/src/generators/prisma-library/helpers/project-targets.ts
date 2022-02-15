import { TargetConfiguration } from '@nrwl/devkit';

export function getTargetsToAdd(projectRoot: string): {
  [index: string]: TargetConfiguration;
} {
  return {
    deploy: {
      executor: '@nx-tools/nx-prisma:generate',
      options: {
        schema: `${projectRoot}/prisma/schema.prisma`,
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
        cwd: projectRoot,
        parallel: false,
      },
    },
    pregenerate: {
      executor: '@tractr/schematics:generate',
      options: {
        cleanFirst: false,
        cwd: projectRoot,
        format: false,
        inputHapifyGeneratedPath: 'prisma',
        moveGeneratedFiles: false,
      },
    },
    migrate: {
      executor: '@nx-tools/nx-prisma:migrate',
      options: {
        schema: `${projectRoot}/prisma/schema.prisma`,
      },
    },
    pull: {
      executor: '@nx-tools/nx-prisma:pull',
      options: {
        schema: `${projectRoot}/prisma/schema.prisma`,
      },
    },
    push: {
      executor: '@nx-tools/nx-prisma:push',
      options: {
        schema: `${projectRoot}/prisma/schema.prisma`,
      },
    },
    reset: {
      executor: '@nx-tools/nx-prisma:reset',
      options: {
        schema: `${projectRoot}/prisma/schema.prisma`,
      },
    },
    seed: {
      executor: '@nx-tools/nx-prisma:seed',
      options: {
        script: `${projectRoot}/prisma/seed.ts`,
        tsConfig: `${projectRoot}/tsconfig.json`,
      },
    },
    status: {
      executor: '@nx-tools/nx-prisma:status',
      options: {
        schema: `${projectRoot}/prisma/schema.prisma`,
      },
    },
  };
}
