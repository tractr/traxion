// import { ParameterDeclarationStructure, StructureKind } from 'ts-morph';

// import { generateFieldResolvers } from './field-resolver.generator';

// import { Field, Model, VirtualField } from '@trxn/hapify-core';

// describe('generateDeleteMethod', () => {

//   // Arrange
//   const model: Model = {
//     name: 'user',
//     pluralName: '',
//     fields,
//     primaryKey: null,
//   };

//   // Act
//   const method = generateFieldResolvers(model);
//   it('should generate the field resolvers with the correct name', () => {
//     console.log(method)
//     expect(method[0].name).toEqual('name');
//   });

//   it('should generate the field resolvers as asynchronous', () => {
//     expect(method[0].isAsync).toBe(true);
//   });

//   it('should generate the correct kind of method', () => {
//     expect(method[0].kind).toEqual(StructureKind.Method);
//   });

//   it('should generate the correct decorators', () => {
//     expect(method[0].decorators).toEqual([
//       {
//         name: 'ResolveField',
//         arguments: [`() => String`],
//       },
//     ]);
//   });

//   it('should generate the correct parameters for the virtual field', () => {
//     const expectedParameters: ParameterDeclarationStructure[] = [
//       {
//         kind: StructureKind.Parameter,
//         name: 'name',
//         type: 'name',
//         decorators: [{ name: 'Parent', arguments: [] }],
//       },
//     ];

//     expect(method[0].parameters).toEqual(expectedParameters);
//   });

//   it('should generate the correct method statements for the User model', () => {
//     const expectedStatements = `return model.posts;`;

//     expect(method[0].statements).toEqual(expectedStatements);
//   });

//   it('should generate the correct method documentation for the User model', () => {
//     const expectedDocs = [
//       {
//         kind: StructureKind.JSDoc,
//         description: `Resolver for the ${model.fields[2].name} field on the User model.`,
//       },
//     ];

//     expect(method[0].docs).toEqual(expectedDocs);
//   });

// });
