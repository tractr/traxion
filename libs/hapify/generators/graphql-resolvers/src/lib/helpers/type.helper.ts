// import { DMMF } from '@prisma/generator-helper';
//
// export function isEntityField(field: DMMF.Field) {
//   return (
//     field.relationFromFields || field.relationName || field.relationToFields
//   );
// }
//
// export function getFieldType({ type, isList, isRequired }: DMMF.Field) {
//   let fieldType: string;
//
//   switch (type) {
//     case 'Boolean':
//       fieldType = 'boolean';
//       break;
//     case 'Int':
//     case 'BigInt':
//     case 'Decimal':
//     case 'Float':
//     case 'DateTime':
//       fieldType = 'number';
//       break;
//     case 'String':
//       fieldType = 'string';
//       break;
//     case 'Json':
//       fieldType = 'JSON';
//       break;
//     case 'Byte':
//       fieldType = 'Buffer';
//       break;
//     default:
//       fieldType = type;
//   }
//
//   const listModifier = isList ? '[]' : '';
//   const nullModifier = isRequired ? '' : '| null';
//
//   return `${fieldType}${listModifier}${nullModifier}`;
// }
//
