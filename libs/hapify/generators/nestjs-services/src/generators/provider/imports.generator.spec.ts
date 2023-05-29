import { generateImports } from './imports.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateImports', () => {
  const id: PrimaryField = {
    name: 'id',
    type: 'primary',
    pluralName: 'ids',
    scalar: 'string',
    relations: [],
  };

  const model: Model = {
    name: 'User',
    pluralName: '',
    fields: [id],
    primaryKey: {
      name: 'id',
      fields: [id],
    },
    dbName: null,
  };
  const imports = generateImports(model);

  it('returns an array of import declarations with correct module specifiers', () => {
    expect(imports.length).toEqual(3);

    expect(imports[0].moduleSpecifier).toEqual('@nestjs/common');
    expect(imports[1].moduleSpecifier).toEqual('../constants');
    expect(imports[2].moduleSpecifier).toEqual('../services');
  });

  it('returns an array of import declarations with correct named imports', () => {
    expect(imports[0].namedImports).toEqual([{ name: 'Provider' }]);

    expect(imports[1].namedImports).toEqual([{ name: 'USER_SERVICE' }]);
  });
});
