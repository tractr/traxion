import { generateImportsDefinition } from './imports-definition.generator';

describe('generateImportsDefinition', () => {
  it('should generate the correct imports', () => {
    const imports = generateImportsDefinition();

    expect(imports[0].moduleSpecifier).toEqual('@nestjs/common');
    expect(imports[0].namedImports).toEqual([
      { name: 'ConfigurableModuleBuilder' },
    ]);

    expect(imports[1].moduleSpecifier).toEqual('@trxn/nestjs-core');
    expect(imports[1].namedImports).toEqual([
      { name: 'addImportsExtra' },
      { name: 'ImportsExtra' },
    ]);
  });
});
