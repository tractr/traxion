import { Project } from 'ts-morph';

export function generateUserModuleSourceFile(project: Project, path: string) {
  const fileName = `user.module.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['Module'],
    },
    {
      moduleSpecifier: './services.module',
      namedImports: ['NestjsServicesModule'],
    },
    {
      moduleSpecifier: '@trxn/nestjs-user',
      namedImports: ['UserModule as TrxnUserModule'],
    },
  ]);

  sourceFile.addClass({
    name: 'UserModule',
    isExported: true,
    decorators: [
      {
        name: 'Module',
        arguments: [
          `{
  imports: [
    TrxnUserModule.register({
      imports: [NestjsServicesModule],
    }),
  ],
  exports: [TrxnUserModule],
}
      `,
        ],
      },
    ],
  });
}
