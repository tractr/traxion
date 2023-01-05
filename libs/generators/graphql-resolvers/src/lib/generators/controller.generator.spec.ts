import { DMMF } from '@prisma/generator-helper';
import {
  MethodDeclarationStructure,
  PropertyDeclarationStructure,
  Scope,
  StructureKind,
} from 'ts-morph';

import {
  generateCheckUniquenessConstraintMethod,
  generateControllerClass,
  generateControllerSourceFile,
  generateCreateMethod,
  generateFindManyMethod,
  generateImports,
  generateStateProperty,
  generateUniqueFieldsProperty,
} from './controller.generator';

jest.mock('generateCheckUniquenessConstraintMethod');
jest.mock('generateControllerClass');
jest.mock('generateControllerSourceFile');
jest.mock('generateCreateMethod');
jest.mock('generateFindManyMethod');
jest.mock('generateImports');
jest.mock('generateStateProperty');
jest.mock('generateUniqueFieldsProperty');

const mockGenerateCheckUniquenessConstraintMethod = jest.mocked(
  generateCheckUniquenessConstraintMethod,
);
const mockGenerateControllerClass = jest.mocked(generateControllerClass);
const mockGenerateControllerSourceFile = jest.mocked(
  generateControllerSourceFile,
);
const mockGenerateCreateMethod = jest.mocked(generateCreateMethod);
const mockGenerateFindManyMethod = jest.mocked(generateFindManyMethod);
const mockGenerateImports = jest.mocked(generateImports);
const mockGenerateStateProperty = jest.mocked(generateStateProperty);
const mockGenerateUniqueFieldsProperty = jest.mocked(
  generateUniqueFieldsProperty,
);

describe('Controller generator', () => {
  beforeEach(() => {
    mockGenerateCheckUniquenessConstraintMethod.mockReset();
    mockGenerateControllerClass.mockReset();
    mockGenerateControllerSourceFile.mockReset();
    mockGenerateCreateMethod.mockReset();
    mockGenerateFindManyMethod.mockReset();
    mockGenerateImports.mockReset();
    mockGenerateStateProperty.mockReset();
    mockGenerateUniqueFieldsProperty.mockReset();
  });

  describe('generateFindManyMethod', () => {
    it('should return a valid findMany method structure', () => {
      const expectedMethodStructure = {
        kind: StructureKind.Method,
        name: 'findMany',
        decorators: [{ name: 'Get', arguments: [] }],
        statements: ['return this.state;'],
      };

      const result = generateFindManyMethod();

      expect(result).toEqual(expectedMethodStructure);
    });
  });

  describe('generateCreateMethod', () => {
    it('should return a valid create method structure', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [],
      };

      const expectedMethodStructure = {
        kind: StructureKind.Method,
        name: 'create',
        decorators: [{ name: 'Post', arguments: [] }],
        statements: ['this.state.push(data);'],
        parameters: [
          {
            kind: StructureKind.Parameter,
            name: 'data',
            decorators: [{ name: 'Body', arguments: [] }],
            type: 'TestDto',
          },
        ],
      };

      const result = generateCreateMethod(model);

      expect(result).toEqual(expectedMethodStructure);
    });
  });

  describe('generateCheckUniquenessConstraintMethod', () => {
    it('should return a valid checkUniquenessConstraints method structure', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [],
      };

      const expectedMethodStructure = {
        kind: StructureKind.Method,
        name: 'checkUniquenessConstraints',
        scope: 'private',
        statements:
          '\n' +
          '  this.uniqueFields.forEach(uniqueField => {\n' +
          '    const conflict = this.state.some(existingData => existingData[uniqueField] === data[uniqueField]);\n' +
          '    if (conflict) throw new ConflictException();\n' +
          '  })\n' +
          '  ',
        parameters: [
          { kind: StructureKind.Parameter, name: 'data', type: 'TestDto' },
        ],
      };

      const result = generateCheckUniquenessConstraintMethod(model);

      expect(result).toEqual(expectedMethodStructure);
    });
  });

  describe('generateImports', () => {
    it('should return valid imports structure', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [],
      };

      const expectedMethodStructure = [
        {
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: './test.dto',
          namedImports: [{ name: 'TestDto' }],
        },
        {
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier: '@nestjs/common',
          namedImports: [
            { name: 'Controller' },
            { name: 'Get' },
            { name: 'Post' },
            { name: 'Req' },
            { name: 'Body' },
            { name: 'ConflictException' },
          ],
        },
      ];

      const result = generateImports(model);

      expect(result).toEqual(expectedMethodStructure);
    });
  });

  describe('generateStateProperty', () => {
    it('should return valid state property structure', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [],
      };

      const expectedMethodStructure = {
        kind: StructureKind.Property,
        name: 'state',
        scope: 'private',
        initializer: '[]',
        type: 'TestDto[]',
      };

      const result = generateStateProperty(model);

      expect(result).toEqual(expectedMethodStructure);
    });
  });

  describe('generateUniqueFieldsPropertyStateProperty', () => {
    it('should return valid uniqueFields property structure', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [],
      };

      const expectedMethodStructure = {
        kind: StructureKind.Property,
        name: 'uniqueFields',
        scope: Scope.Private,
        initializer: `[] as const`,
        isReadonly: true,
      };

      const result = generateUniqueFieldsProperty(model);

      expect(result).toEqual(expectedMethodStructure);
    });

    it('should be initialized with the list of model unique fields', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [
          {
            name: 'unique',
            isUnique: true,
          },
          {
            name: 'notUnique',
            isUnique: false,
          },
        ],
      } as unknown as DMMF.Model;

      const expectedMethodStructure = {
        kind: StructureKind.Property,
        name: 'uniqueFields',
        scope: Scope.Private,
        initializer: `['unique'] as const`,
        isReadonly: true,
      };

      const result = generateUniqueFieldsProperty(model);

      expect(result).toEqual(expectedMethodStructure);
    });
  });

  describe('generateControllerClass', () => {
    it('should return valid controller class structure', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [],
      };

      const expectedMethodStructure = {
        kind: StructureKind.Class,
        name: 'TestController',
        isExported: true,
        decorators: [{ name: 'Controller', arguments: ['test'] }],
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { properties, methods, ...result } = generateControllerClass(model);

      expect(result).toEqual(expectedMethodStructure);
    });

    it('should generate common methods and properties', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [],
      };

      mockGenerateStateProperty.mockReturnValueOnce(
        'mockStateProperty' as unknown as PropertyDeclarationStructure,
      );
      mockGenerateCreateMethod.mockReturnValueOnce(
        'mockCreateMethod' as unknown as MethodDeclarationStructure,
      );
      mockGenerateFindManyMethod.mockReturnValueOnce(
        'mockFindManyMethod' as unknown as MethodDeclarationStructure,
      );

      const expectedMethodStructure = {
        kind: StructureKind.Class,
        name: 'TestController',
        isExported: true,
        decorators: [{ name: 'Controller', arguments: ['test'] }],
        properties: ['mockStateProperty'],
        methods: ['mockCreateMethod', 'mockFindManyMethod'],
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const result = generateControllerClass(model);

      expect(result).toEqual(expectedMethodStructure);
      expect(mockGenerateStateProperty).toHaveBeenCalledTimes(1);
      expect(mockGenerateCreateMethod).toHaveBeenCalledTimes(1);
      expect(mockGenerateFindManyMethod).toHaveBeenCalledTimes(1);
    });

    it('should call uniqueness generators if unique fields exist', () => {
      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [
          {
            name: 'unique',
            isUnique: true,
          },
        ],
      } as unknown as DMMF.Model;

      mockGenerateUniqueFieldsProperty.mockReturnValueOnce(
        'mockUniqueFieldsProps' as unknown as PropertyDeclarationStructure,
      );
      mockGenerateCheckUniquenessConstraintMethod.mockReturnValueOnce(
        'mockCheckUniquenessConstraintMethod' as unknown as MethodDeclarationStructure,
      );

      const { methods, properties } = generateControllerClass(model);

      expect(methods).toContain('mockUniqueFieldsProps');
      expect(properties).toContain('mockCheckUniquenessConstraintMethod');

      expect(mockGenerateUniqueFieldsProperty).toHaveBeenCalledTimes(1);
      expect(mockGenerateCheckUniquenessConstraintMethod).toHaveBeenCalledTimes(
        1,
      );
    });
  });
});
