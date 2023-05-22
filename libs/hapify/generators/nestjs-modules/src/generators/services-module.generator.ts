import { Project } from 'ts-morph';

import { NestjsModulesImportPath } from '../config.types';

import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateServicesModuleSourceFile(
  project: Project,
  outputPath: string,
  importPaths: NestjsModulesImportPath,
) {
  const fileName = `services.module.ts`;
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
      moduleSpecifier: resolveDynamicPath(importPaths.nestjsServices, '..'),
      namedImports: ['ModelsServicesModule'],
    },
  ]);

  sourceFile.addClass({
    name: 'NestjsServicesModule',
    isExported: true,
    decorators: [
      {
        name: 'Module',
        arguments: [
          `{
  imports: [
    ModelsServicesModule.register({
      imports: [DatabaseModule],
    }),
  ],
  exports: [ModelsServicesModule],
}
      `,
        ],
      },
    ],
  });
}
