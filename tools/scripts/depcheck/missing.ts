import { join } from 'path';

import * as depcheck from 'depcheck';

// Ignore packages that are defined here per package
const IGNORE_MATCHES_IN_PACKAGE: Record<string, string[]> = {
  '*': [
    'nx',
    'prettier',
    'typescript',
    'rxjs',
    '@trxn/hapify-config',
    '@trxn/angular-authentication',
    '@trxn/angular-casl',
    '@trxn/angular-components',
    '@trxn/angular-config',
    '@trxn/angular-file-storage',
    '@trxn/angular-form',
    '@trxn/angular-tools',
    '@trxn/commit-config',
    '@trxn/common',
    '@trxn/eslint-config',
    '@trxn/hapify-common',
    '@trxn/hapify-config',
    '@trxn/hapify-create-traxion-workspace',
    '@trxn/hapify-generate-config',
    '@trxn/hapify-templates-angular-rext-client',
    '@trxn/hapify-templates-casl',
    '@trxn/hapify-templates-dbml',
    '@trxn/hapify-templates-models',
    '@trxn/hapify-templates-nestjs-graphql',
    '@trxn/hapify-templates-nestjs-models',
    '@trxn/hapify-templates-nestjs-models-common',
    '@trxn/hapify-templates-nestjs-models-rest',
    '@trxn/hapify-templates-prisma',
    '@trxn/hapify-templates-react-admin',
    '@trxn/hapify-templates-rest-dtos',
    '@trxn/hapify-templates-rext-client',
    '@trxn/hapify-update-templates-import-path',
    '@trxn/nestjs-authentication',
    '@trxn/nestjs-bcrypt',
    '@trxn/nestjs-casl',
    '@trxn/nestjs-core',
    '@trxn/nestjs-database',
    '@trxn/nestjs-file-storage',
    '@trxn/nestjs-graphql',
    '@trxn/nestjs-mailer',
    '@trxn/nestjs-password',
    '@trxn/nestjs-request-timestamp',
    '@trxn/nestjs-sentry',
    '@trxn/nestjs-testing',
    '@trxn/nestjs-winston',
    '@trxn/prettier-config',
    '@trxn/schematics',
    '@trxn/terraform-aws-stack',
    '@trxn/terraform-component-aws',
    '@trxn/terraform-component-deployment',
    '@trxn/terraform-component-deployment-trigger',
    '@trxn/terraform-component-entrypoint',
    '@trxn/terraform-component-file-storage',
    '@trxn/terraform-component-logs',
    '@trxn/terraform-component-private-dns',
    '@trxn/terraform-component-s3',
    '@trxn/terraform-component-s3-user',
    '@trxn/terraform-component-secrets',
    '@trxn/terraform-component-volume',
    '@trxn/terraform-group-network',
    '@trxn/terraform-group-pool',
    '@trxn/terraform-group-registry',
    '@trxn/terraform-group-zone',
    '@trxn/terraform-service-admin',
    '@trxn/terraform-service-api',
    '@trxn/terraform-service-ecs',
    '@trxn/terraform-service-logstash',
    '@trxn/terraform-service-postgres',
    '@trxn/terraform-service-pwa',
    '@trxn/terraform-service-reverse-proxy',
  ],
};

const IGNORE_MATCHES_BY_FILE: Record<string, string[]> = {
  '@storybook/core': [
    join(
      __dirname,
      '../../packages/angular/src/migrations/update-12-3-0/update-storybook.ts',
    ),
  ],
};

export default async function getMissingDependencies(
  name: string,
  path: string,
  dependencies: depcheck.PackageDependencies,
  verbose: boolean,
) {
  const options = {
    /**
     * If a dependency is exclusively used via a TypeScript type import
     * e.g. `import type { Foo } from 'bar';`
     * ...then we do not want it to trigger a missing dependency warning
     * because it is not required at runtime.
     *
     * We can achieve this by overriding the default detector for
     * ImportDeclaration nodes to check the `importKind` value.
     */
    detectors: [
      ...Object.entries(depcheck.detector).map(([detectorName, detectorFn]) => {
        // Use all the default detectors, apart from 'importDeclaration'
        if (detectorName !== 'importDeclaration') {
          return detectorFn;
        }
        const customImportDeclarationDetector: depcheck.Detector = (node) =>
          node.type === 'ImportDeclaration' &&
          node.source &&
          node.source.value &&
          node.importKind !== 'type'
            ? [node.source.value]
            : [];
        return customImportDeclarationDetector;
      }),
    ],
    skipMissing: false, // skip calculation of missing dependencies
    ignorePatterns: [
      '*.d.ts',
      '.eslintrc.json',
      '*.spec*',
      'src/schematics/**/files/**',
    ],
  };
  const { missing } = await depcheck(path, {
    ...options,
    package: { dependencies },
  });

  const packagesMissing = Object.keys(missing).filter(
    (m) =>
      !IGNORE_MATCHES_IN_PACKAGE['*'].includes(m) &&
      !(IGNORE_MATCHES_IN_PACKAGE[name] || []).includes(m) &&
      missing[m].filter(
        (occurence) => !IGNORE_MATCHES_BY_FILE[m]?.includes(occurence),
      ).length,
  );

  if (verbose) {
    console.info(`> ${name}`);
    packagesMissing.forEach((p) => {
      console.info(p, missing[p]);
    });
  }

  return packagesMissing;
}
