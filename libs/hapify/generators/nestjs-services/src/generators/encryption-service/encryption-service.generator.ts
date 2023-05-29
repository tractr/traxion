import {
  ClassDeclarationStructure,
  Project,
  Scope,
  StructureKind,
} from 'ts-morph';

export function generateEncryptionServiceClass(): ClassDeclarationStructure {
  const className = `EncryptionService`;

  return {
    kind: StructureKind.Class,
    name: className,
    isExported: true,
    decorators: [{ name: 'Injectable()' }],
    methods: [
      {
        name: 'encrypt',
        kind: StructureKind.Method,
        isAsync: true,
        returnType: 'Promise<string>',
        parameters: [
          {
            name: 'value',
            type: 'string',
            kind: StructureKind.Parameter,
          },
        ],
        statements: [
          `if (typeof this.encryptionService !== 'undefined')
            return this.encryptionService.encrypt(value);
          return hash(value, 10);`,
        ],
      },
      {
        name: 'compare',
        kind: StructureKind.Method,
        isAsync: true,
        returnType: 'Promise<boolean>',
        parameters: [
          {
            name: 'plainText',
            type: 'string',
            kind: StructureKind.Parameter,
          },
          {
            name: 'hashText',
            type: 'string',
            kind: StructureKind.Parameter,
          },
        ],
        statements: [
          `if (typeof this.encryptionService !== 'undefined')
            return this.encryptionService.compare(plainText, hashText);
          return compare(plainText, hashText);`,
        ],
      },
    ],
    properties: [
      {
        name: 'encryptionService',
        type: 'EncryptionService',
        scope: Scope.Private,
      },
    ],
    ctors: [
      {
        kind: StructureKind.Constructor,
        statements: [
          `this.encryptionService = moduleOptions.encryptionService || externalEncryptionService;`,
        ],
        parameters: [
          {
            name: 'externalEncryptionService',
            type: 'EncryptionService',
            isReadonly: true,
            scope: Scope.Private,
            decorators: [
              {
                name: 'Optional',
                arguments: [],
                kind: StructureKind.Decorator,
              },
              {
                name: 'Inject',
                arguments: ['ENCRYPTION_SERVICE'],
                kind: StructureKind.Decorator,
              },
            ],
          },
          {
            name: 'moduleOptions',
            type: 'ModelsServicesModuleOptions',
            isReadonly: true,
            scope: Scope.Private,
            decorators: [
              {
                name: 'Inject',
                arguments: ['MODULE_OPTIONS_TOKEN'],
                kind: StructureKind.Decorator,
              },
            ],
          },
        ],
      },
    ],
  };
}

export function generateEncryptionServiceSourceFile(
  project: Project,
  path: string,
) {
  const fileName = `encryption.service`;
  const filePath = `${path}/services/${fileName}.ts`;

  const sourceFile = project.createSourceFile(filePath);

  const serviceClass = generateEncryptionServiceClass();

  sourceFile.addImportDeclarations([
    {
      moduleSpecifier: '@nestjs/common',
      namedImports: ['Inject', 'Injectable', 'Optional'],
    },
    {
      moduleSpecifier: 'bcrypt',
      namedImports: ['hash', 'compare'],
    },
    {
      moduleSpecifier: '../constants',
      namedImports: ['ENCRYPTION_SERVICE'],
    },
    {
      moduleSpecifier: '../models-services.module-definition',
      namedImports: ['MODULE_OPTIONS_TOKEN'],
    },
    {
      moduleSpecifier: '../models-services.module-options',
      namedImports: ['ModelsServicesModuleOptions'],
    },
  ]);

  sourceFile.addClass(serviceClass);
}
