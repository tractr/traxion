import { camel, pascal } from 'case';
import {
  ClassDeclarationStructure,
  OptionalKind,
  Project,
  Scope,
  StructureKind,
} from 'ts-morph';

import { NestjsModulesImportPath } from '../config.types';

import {
  Field,
  getLoginFieldFromUserModel,
  getPasswordFieldFromUserModel,
  getUserModelFromSchema,
  Model,
  Schema,
} from '@trxn/hapify-core';
import {
  generateFileIndexExporter,
  resolveDynamicPath,
} from '@trxn/hapify-devkit';

function generateAccessTokenGraphQLDtoClass(
  userModel: Model,
): OptionalKind<ClassDeclarationStructure> {
  return {
    kind: StructureKind.Class,
    isExported: true,
    name: 'AccessTokenGraphQLDto',
    decorators: [
      {
        name: 'ObjectType',
        arguments: [],
      },
    ],
    properties: [
      {
        name: 'accessToken',
        type: 'string',
        hasExclamationToken: true,
        decorators: [
          {
            name: 'Field',
            arguments: [],
          },
        ],
      },
      {
        name: 'user',
        type: pascal(userModel.name),
        hasExclamationToken: true,
        decorators: [
          {
            name: 'Field',
            arguments: [`() => ${pascal(userModel.name)}`],
          },
        ],
      },
    ],
  };
}

function generateLoginArgsGraphQLDtoClass(
  login: Field,
  password: Field,
): OptionalKind<ClassDeclarationStructure> {
  return {
    kind: StructureKind.Class,
    isExported: true,
    name: 'LoginArgsGraphQLDto',
    decorators: [
      {
        name: 'ArgsType',
        arguments: [],
      },
    ],
    properties: [
      {
        name: camel(login.name),
        type: `${login.scalar || 'unknown'}`,
        hasExclamationToken: true,
        decorators: [
          {
            name: 'Field',
            arguments: [],
          },
        ],
      },
      {
        name: camel(password.name),
        type: `${password.scalar || 'unknown'}`,
        hasExclamationToken: true,
        decorators: [
          {
            name: 'Field',
            arguments: [],
          },
        ],
      },
    ],
  };
}

export function generateLoginResolverClass(
  userModel: Model,
  login: Field,
  password: Field,
): OptionalKind<ClassDeclarationStructure> {
  return {
    kind: StructureKind.Class,
    decorators: [
      {
        name: 'Resolver',
        arguments: [],
      },
    ],
    ctors: [
      {
        kind: StructureKind.Constructor,
        parameters: [
          {
            isReadonly: true,
            scope: Scope.Private,
            name: 'cookieOptionsService',
            type: 'CookieOptionsService',
          },
          {
            isReadonly: true,
            scope: Scope.Private,
            name: 'authenticationService',
            type: 'AuthenticationService',
          },
          {
            isReadonly: true,
            scope: Scope.Private,
            name: 'userService',
            type: 'UserService',
          },
          {
            isReadonly: true,
            scope: Scope.Private,
            name: 'hashService',
            type: 'HashService',
          },
        ],
      },
    ],
    name: 'LoginResolver',
    isExported: true,
    methods: [
      {
        name: 'login',
        isAsync: true,
        returnType: 'Promise<AccessTokenGraphQLDto>',
        decorators: [
          {
            name: 'Public',
            arguments: [],
          },
          {
            name: 'Mutation',
            arguments: [`() => AccessTokenGraphQLDto`],
          },
        ],
        parameters: [
          {
            name: 'context',
            type: `{
              req?: Request & { secret?: string; user: User };
              res?: Response;
            }`,
            decorators: [
              {
                name: 'Context',
                arguments: [],
              },
            ],
          },
          {
            name: `{ ${camel(login.name)}, ${camel(password.name)} }`,
            type: 'LoginArgsGraphQLDto',
            decorators: [
              {
                name: 'Args',
                arguments: ['{ nullable: true, defaultValue: {} }'],
              },
            ],
          },
        ],
        statements: [
          `const req = ensureRequestInContext(context);
          const res = ensureResponseInContext(context);

          const user = await this.${camel(userModel.name)}Service.findUnique({
            where: {
              ${camel(login.name)},
            },
          });

          if (!user) {
            throw new UnauthorizedException();
          }

          const { password: passwordHash } = await this.userService.findUnique({
            where: {
              ${camel(login.name)},
            },
            select: {
              password: true,
            },
          });

          const isValid = await this.hashService.compare(password, passwordHash);

          if (!isValid) {
            throw new UnauthorizedException();
          }

          const token = await this.authenticationService.login(user);

          res.cookie(this.cookieOptionsService.cookieName, token.accessToken, {
            signed: !!req.secret,
            ...this.cookieOptionsService.cookieOptions,
          });

          return {
            ...token,
            user,
          };`,
        ],
      },
      {
        name: 'logout',
        isAsync: true,
        returnType: 'Promise<boolean>',
        decorators: [
          {
            name: 'Mutation',
            arguments: [`() => Boolean`],
          },
        ],
        parameters: [
          {
            name: 'context',
            type: `{
              res?: Response;
            }`,
            decorators: [
              {
                name: 'Context',
                arguments: [],
              },
            ],
          },
        ],
        statements: [
          `const res = ensureResponseInContext(context);
            res.cookie(
              this.cookieOptionsService.cookieName,
              '',
              this.cookieOptionsService.cookieOptions,
            );
        
            return true;`,
        ],
      },
      {
        name: 'me',
        isAsync: true,
        decorators: [
          {
            name: 'Query',
            arguments: [`() => ${pascal(userModel.name)}Gql`],
          },
        ],
        parameters: [
          {
            name: 'context',
            type: `{
              req?: Response & { user: ${pascal(userModel.name)} };
            }`,
            decorators: [
              {
                name: 'Context',
                arguments: [],
              },
            ],
          },
        ],
        statements: [
          `const req = ensureRequestInContext(context);
          const { user } = req;

          return this.${camel(userModel.name)}Service.findUnique({
            where: {
              id: user.id,
            },
          });`,
        ],
      },
    ],
  };
}

export function generateLoginResolverSourceFile(
  project: Project,
  schema: Schema,
  path: string,
  importPaths: NestjsModulesImportPath,
) {
  const fileName = `login.resolver.ts`;
  const filePath = `${path}/resolvers/${fileName}`;

  const sourceFile = project.createSourceFile(filePath);

  const userModel = getUserModelFromSchema(schema);

  const login = getLoginFieldFromUserModel(userModel);
  const password = getPasswordFieldFromUserModel(userModel);

  if (!login) {
    throw new Error(
      `No login field was found in the schema. Please add a field with the @trxn/loginField decorator.`,
    );
  }

  if (!password) {
    throw new Error(
      `No password field was found in the schema. Please add a field with the @trxn/passwordField decorator.`,
    );
  }

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['UnauthorizedException'],
    },
    {
      moduleSpecifier: '@nestjs/graphql',
      namedImports: [
        'Args',
        'ArgsType',
        'Context',
        'Field',
        'Query',
        'Mutation',
        'Resolver',
      ],
    },
    {
      moduleSpecifier: 'express',
      namedImports: ['Request', 'Response'],
    },
    {
      moduleSpecifier: '@trxn/nestjs-authentication',
      namedImports: [
        'AuthenticationService',
        'CookieOptionsService',
        'HashService',
      ],
    },
    {
      moduleSpecifier: '@trxn/nestjs-core',
      namedImports: ['Public'],
    },
    {
      moduleSpecifier: '@prisma/client',
      namedImports: [pascal(userModel.name)],
    },
    {
      moduleSpecifier: '@trxn/nestjs-graphql',
      namedImports: ['ensureRequestInContext', 'ensureResponseInContext'],
    },

    {
      moduleSpecifier: './dtos',
      namedImports: ['AccessTokenGraphQLDto', 'LoginArgsGraphQLDto'],
    },
    {
      moduleSpecifier: resolveDynamicPath(importPaths.nestjsServices, '../..'),
      namedImports: [`${pascal(userModel.name)}Service`],
    },
    {
      moduleSpecifier: resolveDynamicPath(importPaths.dtos, '../..'),
      namedImports: [
        { name: pascal(userModel.name), alias: `${pascal(userModel.name)}Gql` },
      ],
    },
  ]);

  sourceFile.addClass(generateLoginResolverClass(userModel, login, password));

  const accessTokenSourceFile = project.createSourceFile(
    `${path}/resolvers/dtos/access-token.dtos.ts`,
  );
  accessTokenSourceFile.addClass(generateAccessTokenGraphQLDtoClass(userModel));
  accessTokenSourceFile.addImportDeclarations([
    {
      moduleSpecifier: resolveDynamicPath(importPaths.dtos, '../../..'),
      namedImports: [pascal(userModel.name)],
    },

    {
      moduleSpecifier: '@nestjs/graphql',
      namedImports: ['Field', 'ObjectType'],
    },
  ]);

  const loginArgsSourceFile = project.createSourceFile(
    `${path}/resolvers/dtos/login-args.dtos.ts`,
  );
  loginArgsSourceFile.addClass(
    generateLoginArgsGraphQLDtoClass(login, password),
  );
  loginArgsSourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/graphql',
      namedImports: ['Field', 'ArgsType'],
    },
  ]);

  generateFileIndexExporter(project, `${path}/resolvers/dtos`);
  generateFileIndexExporter(project, `${path}/resolvers`);
}
