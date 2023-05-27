import { Project } from 'ts-morph';

import {
  generateModelsServicesProvidersSourceFile,
  generateProviderSourceFile,
} from './providers.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateProviderSourceFile', () => {
  const id: PrimaryField = {
    name: 'id',
    type: 'primary',
    pluralName: 'ids',
    scalar: 'string',
    relations: [],
  };

  const model: Model = {
    name: 'TestModel',
    pluralName: 'testModels',
    fields: [id],
    primaryKey: {
      name: 'id',
      fields: [id],
    },
    dbName: null,
  };
  it('should create a new source file with the correct providers and add the necessary imports to the existing services providers source file', () => {
    // Arrange
    const project = new Project();
    const path = 'test/path';
    const servicesProviderSourceFile = project.createSourceFile(
      'test/path/models-services.providers.ts',
      'test/path',
    );

    // Act
    generateProviderSourceFile(
      project,
      model,
      path,
      servicesProviderSourceFile,
    );

    // Assert
    // Check that the new source file was created with the correct providers
    const sourceFile = project.getSourceFile(
      './test/path/providers/test_model-authorized-service.provider.ts',
    );
    expect(sourceFile).toBeDefined();
    const result = sourceFile?.getVariableDeclaration(
      'TEST_MODEL_AUTHORIZED_SERVICE_PROVIDER',
    );
    expect(result).toBeDefined();

    expect(
      sourceFile
        ?.getVariableDeclaration('TEST_MODEL_AUTHORIZED_SERVICE_PROVIDER')
        ?.getTypeNode()
        ?.getText(),
    ).toEqual('Provider[]');
  });
});

describe('generateModelsServicesProvidersSourceFile', () => {
  const id: PrimaryField = {
    name: 'id',
    type: 'primary',
    pluralName: 'ids',
    scalar: 'string',
    relations: [],
  };

  const model: Model = {
    name: 'User',
    pluralName: 'users',
    fields: [id],
    primaryKey: {
      name: 'id',
      fields: [id],
    },
    dbName: null,
  };
  it('should create a new source file with the correct initial content', () => {
    // Arrange
    const project = new Project();
    const path = 'test/path';

    // Act
    const sourceFile = generateModelsServicesProvidersSourceFile(
      project,
      [model],
      path,
    );

    // Assert
    expect(
      sourceFile.getVariableDeclaration('AUTHORIZED_SERVICES_PROVIDERS'),
    ).toBeDefined();
    expect(
      sourceFile
        .getVariableDeclaration('AUTHORIZED_SERVICES_PROVIDERS')
        ?.getTypeNode()
        ?.getText(),
    ).toEqual('Provider[]');
    expect(
      sourceFile
        .getVariableDeclaration('AUTHORIZED_SERVICES_PROVIDERS')
        ?.getInitializer()
        ?.getText(),
    ).toEqual('[...USER_AUTHORIZED_SERVICE_PROVIDER]');
    expect(sourceFile.getImportDeclaration('@nestjs/common')).toBeDefined();
    expect(
      sourceFile
        .getImportDeclaration('@nestjs/common')
        ?.getNamedImports()
        .map((namedImport) => namedImport.getText()),
    ).toContain('Provider');
    expect(sourceFile.getImportDeclaration('./providers')).toBeDefined();
  });
});
