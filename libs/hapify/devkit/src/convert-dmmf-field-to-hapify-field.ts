import { DMMF } from '@prisma/client/runtime';

import {
  createBooleanField,
  createDateField,
  createEnumField,
  createFileField,
  createForeignField,
  createNumberField,
  createObjectField,
  createStringField,
  createVirtualField,
  EnumField,
  Field,
  ForeignField,
} from '@trxn/hapify-core';

/**
 * Convert a DMMF field to a Hapify field.
 *
 * @param field
 * @returns
 */
export function convertDmmfFieldToHapifyField(field: DMMF.Field): Field {
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

  // const { metadata, documentation } = extractMetadataFromDocumentation(
  //   docs,
  //   validations,
  // );
  // const baseConstraints = createDefaultConstraints(field, metadata)

  const { type } = field;
  switch (field.type) {
    case 'float':
    case 'Int':
      return createNumberField(
        field.name,
        {
          isMultiple: !field.isList,
          isNull: !field.isRequired,
          isRequired: field.isRequired,
          isUnique: field.isUnique,
          isLabel: field.isId,
          // defaultValue: , // TODO: update default value?
          format: 'integer', // TODO: update format?
          isEncrypted: false, // TODO: update is encrypted?
          isSearchable: false, // TODO: update is searchable?
          isSortable: false, // TODO: update is sortable?
          max: 0, // TODO: update max?
          min: 0, // TODO: update min?
          pluralName: field.name,
          type: 'number',
        },
        {
          pluralName: field.name,
        },
      );

    case 'String':
      return createStringField(
        field.name,
        {
          isMultiple: !field.isList,
          isNull: !field.isRequired,
          isRequired: field.isRequired,
          isUnique: field.isUnique,
          isLabel: field.isId,
          // defaultValue: field.default, // TODO: update default value?
          // format: 'email', // TODO: update format?
          // isEncrypted: false, // TODO: update is encrypted?
          // isSearchable: false, // TODO: update is searchable?
          // isSortable: false, // TODO: update is sortable?
          // maxLength: 0, // TODO: how to check for max Length?
          // minLength: 0, // TODO: how to check for  min length?
        },
        {
          pluralName: field.name,
          // metadata: {}, // TODO: update metadata?
        },
      );
    case 'Boolean':
      return createBooleanField(
        field.name,
        {
          isMultiple: !field.isList,
          isNull: !field.isRequired,
          isRequired: field.isRequired,
          isUnique: field.isUnique,
          // isLabel: , // TODO: update label
          // defaultValue: 0, // TODO: update default value
          // isSearchable: false, // TODO: update is searchable?
          // isSortable: false, // TODO: update is sortable?
        },
        {
          pluralName: field.name,
        },
      );
    case 'DateTime':
      return createDateField(
        field.name,
        {
          isMultiple: !field.isList,
          isNull: !field.isNullable,
          isUnique: field.isUnique,
          // defaultValue: field.default, // TODO: update default value?
          // isSearchable: false, // TODO: update is searchable?
          // isSortable: false, // TODO: update is sortable?
          // max: 0, // TODO: update max?
          // min: 0, // TODO: update min?
        },
        {
          pluralName: field.name,
        },
      );
    case 'Enum':
      return createEnumField(
        field.name,
        {
          enum: field.enumValues,
        },
        {
          pluralName: field.name,
        },
      ) as EnumField;
    case 'File':
      return createFileField(
        field.name,
        {
          isMultiple: field.isList,
          isNull: field.isNullable,
          isUnique: field.isUnique,
          // defaultValue: field?.default?.name, // TODO: update default value?
          // isSearchable: false, // TODO: update is searchable?
          defaultValue: field.default,
        },
        {
          pluralName: field.name,
        },
      );
    case 'ForeignKey':
      return createForeignField(
        field.name,
        {
          model: field.referencedTable,
          foreignKey: field,
          isMultiple: !!field.isList,
        },
        {
          pluralName: field.name,
        },
      ) as ForeignField;
    // TODO: add relation
    case 'Virtual':
      return createVirtualField(
        field.name,
        {
          isSearchable: !!(
            field.kind === 'object' && field.relationName !== null
          ),
          isSortable: !!(field.kind === 'scalar' && field.isSortable === true),
          isMultiple: !!(
            field.kind === 'scalar' && field.isSearchable === true
          ),
          relation: undefined,
        },
        {
          pluralName: field.name,
        },
      );
    case 'Object':
      return createObjectField(
        field.name,
        {},
        {
          pluralName: field.name,
          fields: field.fields ? field.fields.map(convertToField) : [],
        },
      );
    default:
      return createObjectField(
        field.name,
        {},
        {
          pluralName: field.name,
          fields: field.fields ? field.fields.map(convertToField) : [],
        },
      );
  }
}
