import { TargetConfiguration } from '@nrwl/devkit';

export function getTargetsToAdd(projectRoot: string): {
  [index: string]: TargetConfiguration;
} {
  return {
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
  };
}
