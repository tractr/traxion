import { ParameterDeclarationStructure, StructureKind } from 'ts-morph';

import { generateDeleteMethod } from './delete-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateDeleteMethod', () => {
  // Arrange
  const model: Model = {
    name: 'user',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };

  // Act
  const method = generateDeleteMethod(model);

  it('should generate the create method with the correct name', () => {
    expect(method.name).toEqual('deleteUser');
  });

  it('should generate the create method as asynchronous', () => {
    expect(method.isAsync).toEqual(true);
  });

  it('should generate the correct kind of method', () => {
    expect(method.kind).toEqual(26);
  });

  it('should generate the correct decorators', () => {
    expect(method.decorators).toEqual([
      {
        kind: StructureKind.Decorator,
        name: 'Mutation',
        arguments: [`() => User`, `{ nullable: true }`],
      },
    ]);
  });

  it('should generate the correct parameters', () => {
    const parameters = method.parameters as ParameterDeclarationStructure[];
    expect(parameters.length).toEqual(2);

    expect(parameters[0].name).toEqual('info');
    expect(parameters[0].kind).toEqual(StructureKind.Parameter);
    expect(parameters[0].type).toEqual('GraphQLResolveInfo');
    expect(parameters[0].decorators).toEqual([{ name: 'Info', arguments: [] }]);

    expect(parameters[1].kind).toEqual(StructureKind.Parameter);
    expect(parameters[1].name).toEqual('{ where }');
    expect(parameters[1].type).toEqual('DeleteOneUserArgs');
    expect(parameters[1].decorators).toEqual([{ name: 'Args', arguments: [] }]);
  });

  it('should generate the correct method statements for the User model', () => {
    expect(method.statements).toEqual(
      `
    const select = new PrismaSelect(info).value;

    const user = await this.userService.delete({ where, ...select });

    return user;
  `,
    );
  });

  it('should generate the correct method documentation for the User model', () => {
    expect(method.docs).toEqual([
      {
        kind: StructureKind.JSDoc,
        description: 'Delete a single User.',
      },
    ]);
  });
});
