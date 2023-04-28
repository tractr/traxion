import {
  ImportSpecifierStructure,
  OptionalKind,
  StructureKind,
} from 'ts-morph';

import { generateImports } from './imports.generator';

describe('generateImports', () => {
  it('should generate imports for @nestjs/common', () => {
    const expected = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `@nestjs/common`,
      namedImports: [{ name: `Module` }],
    };
    const imports = generateImports();
    const actualImport = imports[0];
    expect(actualImport.kind).toBe(expected.kind);
    expect(actualImport.moduleSpecifier).toBe(expected.moduleSpecifier);

    const actualNamedImports =
      actualImport.namedImports as OptionalKind<ImportSpecifierStructure>[];
    expect(actualNamedImports[0]).toEqual(expected.namedImports[0]);
  });

  it('should generate imports for ./models-services.module-definition', () => {
    const expected = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./models-services.module-definition`,
      namedImports: [{ name: `ConfigurableModuleClass` }],
    };
    const imports = generateImports();
    const actualImport = imports[1];
    expect(actualImport.kind).toBe(expected.kind);
    expect(actualImport.moduleSpecifier).toBe(expected.moduleSpecifier);

    const actualNamedImports =
      actualImport.namedImports as OptionalKind<ImportSpecifierStructure>[];
    expect(actualNamedImports[0]).toEqual(expected.namedImports[0]);
  });

  it('should generate imports for ./models-services.providers', () => {
    const expected = {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: `./models-services.providers`,
      namedImports: [{ name: `MODELS_SERVICES_PROVIDERS` }],
    };
    const imports = generateImports();
    const actualImport = imports[2];
    expect(actualImport.kind).toBe(expected.kind);
    expect(actualImport.moduleSpecifier).toBe(expected.moduleSpecifier);

    const actualNamedImports =
      actualImport.namedImports as OptionalKind<ImportSpecifierStructure>[];
    expect(actualNamedImports[0]).toEqual(expected.namedImports[0]);
  });
});
