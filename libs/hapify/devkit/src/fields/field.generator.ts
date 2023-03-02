import { DMMF } from '@prisma/client/runtime';

import {
  BooleanField,
  createField,
  DateField,
  EnumField,
  Field,
  FileField,
  ForeignField,
  NumberField,
  ObjectField,
  StringField,
  VirtualField,
} from '@trxn/hapify-core';

/**
 * Convert a DMMF field to a Hapify field.
 *
 * @param field
 * @returns
 */
export function convertToField(field: DMMF.Field): Field {
  switch (field.type) {
    case 'float':
    case 'Int':
      return createField(
        'number',
        field.name,
        {
          isMultiple: !!field.isList,
          isNull: !field.isRequired,
          isRequired: field.isRequired,
          isUnique: field.isUnique,
          isLabel: field.isId,
        },
        {
          pluralName: field.name,
        },
      ) as NumberField;

    // TODO: add format?
    // TODO: add is encripted or not?
    // TODO: add default value ?
    case 'String':
      return createField(
        'string',
        field.name,
        {
          isMultiple: !!field.isList,
          isNull: !field.isRequired,
          isRequired: field.isRequired,
          isUnique: field.isUnique,
          isLabel: field.isId,
        },
        {
          pluralName: field.name,
        },
      ) as StringField;
    case 'Boolean':
      return createField(
        'boolean',
        field.name,
        {},
        {
          pluralName: field.name,
        },
      ) as BooleanField;
    case 'DateTime':
      return createField(
        'date',
        field.name,
        {},
        {
          pluralName: field.name,
        },
      ) as DateField;
    case 'Enum':
      return createField(
        'enum',
        field.name,
        {
          enum: field.enumValues,
        },
        {
          pluralName: field.name,
        },
      ) as EnumField;
    case 'File':
      return createField(
        'file',
        field.name,
        {},
        {
          pluralName: field.name,
        },
      ) as FileField;
    case 'ForeignKey':
      return createField(
        'foreign',
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
      return createField(
        'virtual',
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
      ) as VirtualField;
    case 'Object':
      return createField(
        'object',
        field.name,
        {},
        {
          pluralName: field.name,
          fields: field.fields ? field.fields.map(convertToField) : [],
        },
      ) as ObjectField;
    default:
      return createField(
        'object',
        field.name,
        {},
        {
          pluralName: field.name,
          fields: field.fields ? field.fields.map(convertToField) : [],
        },
      ) as ObjectField;
  }
}
