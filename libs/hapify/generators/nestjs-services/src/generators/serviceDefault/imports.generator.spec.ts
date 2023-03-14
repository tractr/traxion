import { ImportSpecifierStructure, OptionalKind } from 'ts-morph';

import { generateImports } from './imports.generator';

describe('generateImports', () => {
  it('returns an array of import declaration structures', () => {
    const imports = generateImports();

    expect(imports).toBeInstanceOf(Array);
    expect(imports).toHaveLength(1);

    const [importDeclaration] = imports;

    expect(importDeclaration.kind).toEqual(16);
    expect(importDeclaration.moduleSpecifier).toEqual('@nestjs/common');
    expect(importDeclaration.namedImports).toHaveLength(1);

    const importNames =
      importDeclaration.namedImports as OptionalKind<ImportSpecifierStructure>[];
    expect(importNames[0].name).toEqual('Injectable');
  });
});
