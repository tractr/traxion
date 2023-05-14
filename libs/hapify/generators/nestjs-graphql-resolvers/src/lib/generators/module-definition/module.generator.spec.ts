import { Project, VariableDeclarationKind } from 'ts-morph';

import { generateModuleDefinitionSourceFile } from './module.generator';

// Import or mock generateImports function
// ...

jest.mock('ts-morph');

describe('generateModuleDefinitionSourceFile', () => {
  it('should create a source file and add imports and a variable statement', () => {
    // Arrange
    const project = new Project();
    const path = './src';

    const sourceFileMock = {
      addImportDeclarations: jest.fn(),
      addVariableStatement: jest.fn(),
    };

    (project.createSourceFile as jest.Mock).mockReturnValue(sourceFileMock);

    // Act
    generateModuleDefinitionSourceFile(project, path);

    // Assert
    expect((project.createSourceFile as jest.Mock).mock.calls[0][0]).toEqual(
      `${path}/graphql.module-definition.ts`,
    );
    expect(sourceFileMock.addImportDeclarations).toHaveBeenCalled();
    expect(sourceFileMock.addVariableStatement).toHaveBeenCalledWith({
      isExported: true,
      declarationKind: VariableDeclarationKind.Const,
      declarations: [
        {
          name: `{
          ConfigurableModuleClass,
          MODULE_OPTIONS_TOKEN,
          ASYNC_OPTIONS_TYPE,
          OPTIONS_TYPE,
        }`,
          initializer: `
new ConfigurableModuleBuilder()
  .setExtras<ImportsExtra>(
    { imports: [] },
    addImportsExtra((definition) => definition),
  )
  .build();
        `,
        },
      ],
    });
  });
});
