import type { DMMF } from '@prisma/generator-helper';

import {
  createBooleanConstraints,
  createDateConstraints,
  createDefaultConstraints,
  createEnumConstraints,
  createFileConstraints,
  createNumberConstraints,
  createObjectConstraints,
  createPrimaryConstraints,
  createStringConstraints,
  getPluralName,
} from './constraints';
import { extractMetadataFromDocumentation } from './extract-metadata-from-documentation';
import { validations } from './validations';

import {
  createBooleanField,
  createDateField,
  createEnumField,
  createFileField,
  createForeignField,
  createNumberField,
  createObjectField,
  createPrimaryField,
  createStringField,
  createVirtualField,
  EnumField,
  EnumType,
  Field,
  ForeignField,
} from '@trxn/hapify-core';

/**
 * Convert a DMMF field to a Hapify field.
 *
 * @param field
 * @returns
 */
export function convertDmmfFieldToHapifyField(
  field: DMMF.Field,
  enums: EnumType[],
): Field {
  // kind: FieldKind;
  // name: string;
  // isRequired: boolean;
  // isList: boolean;
  // isUnique: boolean;
  // isId: boolean;
  // isReadOnly: boolean;
  // isGenerated?: boolean;
  // isUpdatedAt?: boolean;
  // /**
  //  * Describes the data type in the same the way is is defined in the Prisma schema:
  //  * BigInt, Boolean, Bytes, DateTime, Decimal, Float, Int, JSON, String, $ModelName
  //  */
  // type: string;
  // dbNames?: string[] | null;
  // hasDefaultValue: boolean;
  // default?: FieldDefault | FieldDefaultScalar | FieldDefaultScalar[];
  // relationFromFields?: string[];
  // relationToFields?: any[];
  // relationOnDelete?: string;
  // relationName?: string;
  // documentation?: string;
  // [key: string]: any;

  /**
   * Type mappings
   */
  // HAPIFY => PRISMA

  // SCALAR
  // Number => Float, Int, BigInt, Decimal
  // String => String
  // Boolean => Boolean
  // Date => DateTime
  // File => Bytes
  // Object => Json

  // OBJECT
  // string => Model / relation

  // ENUM
  // string => Enum

  const { metadata, documentation } = extractMetadataFromDocumentation(
    field.documentation,
    validations,
  );
  const pluralName = getPluralName(metadata);
  const baseConstraints = createDefaultConstraints(field, metadata);
  const numberConstraints = createNumberConstraints(field, metadata);
  const stringConstraints = createStringConstraints(field, metadata);
  const dateConstraints = createDateConstraints(field, metadata);
  const booleanConstraints = createBooleanConstraints(field, metadata);
  const enumConstraints = createEnumConstraints(field, metadata);
  const fileConstraints = createFileConstraints(field, metadata);
  const objectConstraints = createObjectConstraints(field, metadata);
  const primaryConstraints = createPrimaryConstraints(field, metadata);

  const { name, isId } = field;

  // Handle primary fields as they are mapped to a dedicated field type in hapify
  // if (isId) {
  //   return createPrimaryField(name, {
  //     relations: [],
  //     ...baseConstraints,
  //     ...primaryConstraints,
  //   });
  // }

  // Handle fields depending on their kind (scalar, object, enum)

  const { type } = field;
  switch (type) {
    case 'Float':
    case 'Int':
    case 'BigInt':
      return createNumberField(
        field.name,
        {
          ...baseConstraints,
          ...numberConstraints,
        },
        { pluralName },
      );

    case 'String':
      return createStringField(
        field.name,
        {
          ...baseConstraints,
          ...stringConstraints,
        },
        { pluralName },
      );
    case 'Boolean':
      return createBooleanField(
        field.name,
        {
          ...baseConstraints,
          ...booleanConstraints,
        },
        { pluralName },
      );
    case 'DateTime':
      return createDateField(
        field.name,
        {
          ...baseConstraints,
          ...dateConstraints,
        },
        { pluralName },
      );
    case 'Enum':
      return createEnumField(
        field.name,
        {
          ...baseConstraints,
          ...enumConstraints,
        },
        { pluralName },
      ) as EnumField;
    case 'File':
      return createFileField(
        field.name,
        {
          ...baseConstraints,
          ...fileConstraints,
        },
        { pluralName },
      );
    case 'Json':
    case 'Object':
      return createObjectField(
        field.name,
        {
          ...baseConstraints,
          ...objectConstraints,
        },
        { pluralName },
      );
    default:
      throw new Error(`Unknown type ${type}`);
  }
}
