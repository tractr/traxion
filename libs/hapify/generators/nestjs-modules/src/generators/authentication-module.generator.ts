import { Project } from 'ts-morph';

import { NestjsModulesImportPath } from '../config.types';

import { resolveDynamicPath } from '@trxn/hapify-devkit';

export function generateAuthenticationModuleSourceFile(
  project: Project,
  path: string,
  importPaths: NestjsModulesImportPath,
) {
  const fileName = `authentication.module.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  let { caslAppConfig } = importPaths;

  caslAppConfig =
    typeof caslAppConfig === 'string'
      ? resolveDynamicPath(caslAppConfig, '..')
      : './configs/casl.config';

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['Module'],
    },
    {
      moduleSpecifier: '@nestjs/core',
      namedImports: ['APP_GUARD', 'APP_INTERCEPTOR'],
    },
    {
      moduleSpecifier: '@trxn/nestjs-authentication',
      namedImports: [
        'JwtGlobalAuthGuard',
        'AuthenticationModule as TrxnAuthenticationModule',
      ],
    },
    {
      moduleSpecifier: '@trxn/nestjs-casl',
      namedImports: ['CaslExceptionInterceptor', 'CaslModule', 'PoliciesGuard'],
    },
    {
      moduleSpecifier: './user.module',
      namedImports: ['UserModule'],
    },
    {
      moduleSpecifier: './resolvers',
      namedImports: ['LoginResolver'],
    },
    {
      moduleSpecifier: './services.module',
      namedImports: ['NestjsServicesModule'],
    },
    {
      moduleSpecifier: caslAppConfig,
      namedImports: [
        'customSelect',
        'getRoles',
        'rolePermissions',
        'publicPermissions',
      ],
    },
  ]);

  sourceFile.addClass({
    name: 'AuthenticationModule',
    isExported: true,
    decorators: [
      {
        name: 'Module',
        arguments: [
          `{
  imports: [
    NestjsServicesModule,
    TrxnAuthenticationModule.register({
      imports: [UserModule],
      customSelect,
      jwtModuleOptions: {
        secret: process.env.JWT_SECRET || 'secret',
      },
    }),
    CaslModule.register({
      getRoles,
      rolePermissions,
      publicPermissions,
    }),
  ],
  exports: [TrxnAuthenticationModule],
  providers: [
    LoginResolver,
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
  ],
}`,
        ],
      },
    ],
  });
}
