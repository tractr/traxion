import { StructureKind } from 'ts-morph';

import { generateUpdateMethod } from './update-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateUpdateMethod', () => {
  const model: Model = {
    name: 'User',
    pluralName: '',
    fields: [],
    primaryKey: null,
  };
  const method = generateUpdateMethod(model);
  it('should generate the create method with the correct name', () => {
    expect(method.name).toEqual('updateUser');
  });

  it('should generate the create method as asynchronous', () => {
    expect(method.isAsync).toBeTruthy();
  });

  it('should generate the correct kind of method', () => {
    expect(method.kind).toEqual(StructureKind.Method);
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

  it('should generate the correct parameters - name', () => {
    const param = method.parameters?.[1];
    expect(param?.name).toEqual('{ data, where }');
  });

  it('should generate the correct parameters - kind', () => {
    const param = method.parameters?.[1];
    expect(param?.kind).toEqual(StructureKind.Parameter);
  });

  it('should generate the correct parameters - type', () => {
    const param = method.parameters?.[1];
    expect(param?.type).toEqual('UpdateOneUserArgs');
  });

  it('should generate the correct parameters - decorators', () => {
    const param = method.parameters?.[1];
    expect(param?.decorators).toEqual([{ name: 'Args', arguments: [] }]);
  });

  it('should generate the correct method statements for the User model', () => {
    expect(method.statements).toEqual(
      `
    const select = new PrismaSelect(info).value;

    const user = await this.userService.update({ where, data, ...select });

    return user;
  `,
    );
  });

  it('should generate the correct method documentation for the User model', () => {
    expect(method.docs).toEqual([
      {
        kind: StructureKind.JSDoc,
        description: `Update a single user.`,
      },
    ]);
  });
});
