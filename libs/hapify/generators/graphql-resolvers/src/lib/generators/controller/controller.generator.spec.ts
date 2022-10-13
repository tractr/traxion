import { DMMF } from '@prisma/generator-helper';
import {
  MethodDeclarationStructure,
  Project,
  PropertyDeclarationStructure,
  StructureKind,
} from 'ts-morph';

import {
  generateControllerClass,
  generateControllerSourceFile,
} from './controller.generator';
import * as helpers from './helpers.generator';

const spyGenerateStateProperty = jest.spyOn(helpers, 'generateStateProperty');
const spyGenerateCreateMethod = jest.spyOn(helpers, 'generateCreateMethod');
const spyGenerateFindManyMethod = jest.spyOn(helpers, 'generateFindManyMethod');
const spyGenerateCheckUniquenessConstraintMethod = jest.spyOn(
  helpers,
  'generateCheckUniquenessConstraintMethod'
);
const spyGenerateUniqueFieldsProperty = jest.spyOn(
  helpers,
  'generateUniqueFieldsProperty'
);

describe('Controller generator', () => {
  beforeEach(() => {
    spyGenerateCreateMethod.mockClear();
    spyGenerateFindManyMethod.mockClear();
    spyGenerateStateProperty.mockClear();
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

      const expectedClassStructure = {
        kind: StructureKind.Class,
        name: 'TestController',
        isExported: true,
        decorators: [{ name: 'Controller', arguments: [`['test']`] }],
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { properties, methods, ...result } = generateControllerClass(model);

      expect(result).toEqual(expectedClassStructure);
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

      spyGenerateStateProperty.mockReturnValueOnce(
        'mockStateProperty' as unknown as PropertyDeclarationStructure
      );
      spyGenerateCreateMethod.mockReturnValueOnce(
        'mockCreateMethod' as unknown as MethodDeclarationStructure
      );
      spyGenerateFindManyMethod.mockReturnValueOnce(
        'mockFindManyMethod' as unknown as MethodDeclarationStructure
      );

      const expectedMethodStructure = {
        kind: StructureKind.Class,
        name: 'TestController',
        isExported: true,
        decorators: [{ name: 'Controller', arguments: [`['test']`] }],
        properties: ['mockStateProperty'],
        methods: ['mockCreateMethod', 'mockFindManyMethod'],
      };

      const result = generateControllerClass(model);

      expect(result).toEqual(expectedMethodStructure);

      expect(spyGenerateStateProperty).toHaveBeenCalledTimes(1);
      expect(spyGenerateCreateMethod).toHaveBeenCalledTimes(1);
      expect(spyGenerateFindManyMethod).toHaveBeenCalledTimes(1);

      expect(spyGenerateStateProperty).toHaveBeenCalledWith(model);
      expect(spyGenerateCreateMethod).toHaveBeenCalledWith(model);
      expect(spyGenerateFindManyMethod).toHaveBeenCalledWith();
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

      spyGenerateUniqueFieldsProperty.mockReturnValueOnce(
        'mockUniqueFieldsProps' as unknown as PropertyDeclarationStructure
      );
      spyGenerateCheckUniquenessConstraintMethod.mockReturnValueOnce(
        'mockCheckUniquenessConstraintMethod' as unknown as MethodDeclarationStructure
      );

      const { methods, properties } = generateControllerClass(model);

      expect(methods).toContain('mockCheckUniquenessConstraintMethod');
      expect(properties).toContain('mockUniqueFieldsProps');

      expect(spyGenerateUniqueFieldsProperty).toHaveBeenCalledTimes(1);
      expect(spyGenerateCheckUniquenessConstraintMethod).toHaveBeenCalledTimes(
        1
      );

      expect(spyGenerateUniqueFieldsProperty).toHaveBeenCalledWith(model);
      expect(spyGenerateCheckUniquenessConstraintMethod).toHaveBeenCalledWith(
        model
      );
    });
  });

  describe('generateSourceFile', () => {
    it('should add a sourceFile to the project', () => {
      const project = new Project();

      const model = {
        name: 'Test',
        dbName: 'Test',
        primaryKey: null,
        uniqueFields: [],
        uniqueIndexes: [],
        fields: [],
      };

      generateControllerSourceFile(project, model, 'test-path');

      const createdSourceFile = project.getSourceFile(
        'test-path/test.controller.ts'
      );

      const createdClass = createdSourceFile?.getClass('TestController');

      expect(createdSourceFile).toBeDefined();
      expect(createdClass).toBeDefined();
      expect(createdClass.getName()).toEqual('TestController');
    });
  });
});
