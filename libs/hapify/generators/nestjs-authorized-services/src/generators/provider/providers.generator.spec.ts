import { Project } from 'ts-morph';

import {
  generateModelsServicesProvidersSourceFile,
  generateProviderSourceFile,
} from './providers.generator';

import { Model } from '@trxn/hapify-core';

describe('generateProviderSourceFile', () => {
  it('should create a new source file with the correct providers and add the necessary imports to the existing services providers source file', () => {
    // Arrange
    const project = new Project();
    const model: Model = {
      name: 'TestModel',
      pluralName: '',
      fields: [],
      primaryKey: null,
    };
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
      './test/path/providers/test_model-model.providers.ts',
    );
    const result = sourceFile?.getVariableDeclaration(
      'TEST_MODEL_SERVICES_PROVIDERS',
    );
    expect(result).toBeDefined();

    expect(
      sourceFile
        ?.getVariableDeclaration('TEST_MODEL_SERVICES_PROVIDERS')
        ?.getTypeNode()
        ?.getText(),
    ).toEqual('Provider[]');
  });
});

describe('generateModelsServicesProvidersSourceFile', () => {
  it('should create a new source file with the correct initial content', () => {
    // Arrange
    const project = new Project();
    const path = 'test/path';

    // Act
    const sourceFile = generateModelsServicesProvidersSourceFile(project, path);

    // Assert
    expect(
      sourceFile.getVariableDeclaration('MODELS_SERVICES_PROVIDERS'),
    ).toBeDefined();
    expect(
      sourceFile
        .getVariableDeclaration('MODELS_SERVICES_PROVIDERS')
        ?.getTypeNode()
        ?.getText(),
    ).toEqual('Provider[]');
    expect(
      sourceFile
        .getVariableDeclaration('MODELS_SERVICES_PROVIDERS')
        ?.getInitializer()
        ?.getText(),
    ).toEqual('[]');
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
