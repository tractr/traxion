import { Project } from 'ts-morph';

import { NestjsModulesImportPath } from '../config.types';

import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateNestjsAuthorizedServicesModuleSourceFile(
  project: Project,
  outputPath: string,
  importPaths: NestjsModulesImportPath,
) {
  const fileName = `authorized-services.module.ts`;
  const filePath = `${outputPath}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['Module'],
    },
    {
      moduleSpecifier: './database.module',
      namedImports: ['DatabaseModule'],
    },
    {
      moduleSpecifier: './services.module',
      namedImports: ['NestjsServicesModule'],
    },
    {
      moduleSpecifier: resolveDynamicPath(
        importPaths.nestjsAuthorizedServices,
        '..',
      ),
      namedImports: ['AuthorizedServicesModule'],
    },
  ]);

  sourceFile.addClass({
    name: 'NestjsAuthorizedServicesModule',
    isExported: true,
    decorators: [
      {
        name: 'Module',
        arguments: [
          `{
  imports: [
    AuthorizedServicesModule.register({
      imports: [DatabaseModule, NestjsServicesModule],
    }),
  ],
  exports: [AuthorizedServicesModule],
}
      `,
        ],
      },
    ],
  });
}
