import { DMMF } from '@prisma/generator-helper';

import { createDefaultConstraints, getPluralName } from '../constraints';
import { PrismaObjectField } from '../interfaces';

import { FieldDeclaration } from '@trxn/hapify-core';

export function convertDmmfObjectFieldToHapifyField(
  model: DMMF.Model,
  field: PrismaObjectField,
  metadata?: Record<string, unknown>,
  documentation?: string,
): FieldDeclaration[] {
  const pluralName = getPluralName(field, metadata);
  const baseConstraints = createDefaultConstraints(field, metadata);
  // "kind": "object",
  // "name": "owner",
  // "relationFromFields": ["ownerId"],
  // "relationName": "Answer.owner.User.answers",
  // "relationOnDelete": "Cascade",
  // "relationToFields": ["id"],
  // "type": "User"

  const { name } = field;

  return [
    {
      name,
      type: 'virtual',
      scalar: null,
      pluralName,
      documentation,
      ...baseConstraints,
      relation: {
        name: field.relationName,
        onDelete: field.relationOnDelete,
        from: {
          model: model.name,
          fields: field.relationFromFields,
        },
        to: {
          model: field.type,
          fields: field.relationToFields,
        },
      },
    },
  ];
}
