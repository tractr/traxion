import { JSDocStructure, OptionalKind, WriterFunction } from 'ts-morph';

import { generateCreateMethod } from './create-method.generator';

import { Model } from '@trxn/hapify-core';

describe('generateCreateMethod', () => {
  const model: Model = {
    name: 'user',
    fields: [],
    pluralName: '',
    primaryKey: null,
  };

  it('should generate the create method with the correct name', () => {
    const method = generateCreateMethod(model);
    expect(method.name).toEqual('createUser');
  });

  it('should generate the create method as asynchronous', () => {
    const method = generateCreateMethod(model);
    expect(method.isAsync).toEqual(true);
  });

  it('should generate the create method with the Mutation decorator', () => {
    const method = generateCreateMethod(model);
    expect(method.decorators?.[0].name).toEqual('Mutation');
  });

  it('should generate the create method with the correct argument types', () => {
    const method = generateCreateMethod(model);
    const args = method.decorators?.[0].arguments as WriterFunction[];
    expect(args?.[0]).toEqual('() => User');
    expect(args?.[1]).toEqual('{ nullable: true }');
  });

  it('should generate the create method with the correct parameters', () => {
    const method = generateCreateMethod(model);
    const params = method.parameters;
    expect(params?.[0].name).toEqual('info');
    expect(params?.[0].type).toEqual('GraphQLResolveInfo');
    expect(params?.[0].decorators?.[0].name).toEqual('Info');
    expect(params?.[1].name).toEqual('{ data }');
    expect(params?.[1].type).toEqual('CreateOneUserArgs');
    expect(params?.[1].decorators?.[0].name).toEqual('Args');
  });

  it('should generate the create method with the correct statements', () => {
    const method = generateCreateMethod(model);
    expect(method.statements).toEqual(
      `
    const select = new PrismaSelect(info).value;

    const user = await this.userService.create({ data, ...select });

    return user;
  `,
    );
  });

  it('should generate the create method with the correct documentation', () => {
    const method = generateCreateMethod(model);
    const docs = method.docs as OptionalKind<JSDocStructure>[];
    expect(docs[0].description).toEqual('Create a single user.');
  });
});
