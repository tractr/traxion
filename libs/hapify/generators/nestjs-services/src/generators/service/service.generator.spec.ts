import { generateServiceClass } from './service.generator';

import { Model } from '@trxn/hapify-core';

describe('generateServiceClass', () => {
  it('should return a ClassDeclarationStructure with the correct properties', () => {
    // Arrange
    const model: Model = {
      name: 'User',
      pluralName: '',
      fields: [],
      primaryKey: null,
    };

    // Act
    const classDeclaration = generateServiceClass(model);

    // Check function name
    expect(classDeclaration.name).toBe('UserService');
    expect(classDeclaration.kind).toBe(2); // StructureKind.Class is equal to 2
    expect(classDeclaration.isExported).toBe(true);
    // TODO: add test for ctors
    // TODO: add test for methods

    // Check decorators
    const { decorators } = classDeclaration;
    expect(decorators?.length).toBe(1);
    expect(decorators?.[0].name).toBe('Injectable()');
  });
});
