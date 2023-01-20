import { DMMF } from '@prisma/generator-helper';
import { Scope, StructureKind } from 'ts-morph';

import {
  generateCheckUniquenessConstraintMethod,
  generateCreateMethod,
  generateFindManyMethod,
  generateImports,
  generateStateProperty,
  generateUniqueFieldsProperty,
} from './helpers.generator';

describe('controller helpers generator', () => {
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
        parameters: [
          {
            kind: StructureKind.Parameter,
            name: 'data',
            decorators: [{ name: 'Body', arguments: [] }],
            type: 'TestDto',
          },
        ],
      };

      const expectedStatements = `
    this.state.push(data);
    return data;
  `;

      const { statements, ...result } = generateCreateMethod(model);

      expect(result).toEqual(expectedMethodStructure);
      expect(statements).toContain(expectedStatements);
    });
  });

  describe('generateCheckUniquenessConstraintMethod', () => {
    it('should return a valid checkUniquenessConstraint method structure', () => {
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
        name: 'checkUniquenessConstraint',
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

  describe('generateUniqueFieldsPropertyProperty', () => {
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
      };

      const result = generateUniqueFieldsProperty(model);

      expect(result).toEqual(expectedMethodStructure);
    });
  });
});
