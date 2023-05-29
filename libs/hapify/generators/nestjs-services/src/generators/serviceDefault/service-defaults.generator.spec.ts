import { generateServiceDefaultClass } from './service-defaults.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateServiceDefaultClass', () => {
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
  it('should generate a default service class with the correct name and decorator', () => {
    const serviceClass = generateServiceDefaultClass(model);

    // Check class declaration
    expect(serviceClass.kind).toBe(2); // StructureKind.Class is equal to 2
    expect(serviceClass.name).toBe('UserDefaultService');
    expect(serviceClass.isExported).toBe(true);
    expect(serviceClass.ctors).toEqual([]);

    // Check decorators
    const decorators = serviceClass.decorators || [];
    expect(decorators.length).toBe(1);
    expect(decorators[0].name).toBe('Injectable()');
  });

  it('should generate a default service class with at least one method', () => {
    const serviceClass = generateServiceDefaultClass(model);

    const methods = serviceClass.methods || [];
    expect(methods.length).toBeGreaterThan(0);
  });
});
