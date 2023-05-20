import { Project } from 'ts-morph';

export function generateAuthenticationModuleSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `authentication.module.ts`;
  const filePath = `${path}/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['Module'],
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
    TrxnAuthenticationModule.register({
      imports: [UserModule],
      customSelect,
      jwtModuleOptions: {
        secret: 'secret',
      },
    }),
    CaslModule.register({
      getRoles(user) {
        return user.roles;
      },
      rolePermissions,
      publicPermissions,
    }),
  ],
  exports: [TrxnAuthenticationModule],
  providers: [
    { provide: APP_GUARD, useClass: JwtGlobalAuthGuard },
    { provide: APP_GUARD, useClass: PoliciesGuard },
    { provide: APP_INTERCEPTOR, useClass: CaslExceptionInterceptor },
  ],
}

      `,
        ],
      },
    ],
  });
}
