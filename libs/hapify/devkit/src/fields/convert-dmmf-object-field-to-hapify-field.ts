import { DMMF } from '@prisma/generator-helper';

import { createDefaultConstraints, getPluralName } from '../constraints';
import { PrismaObjectField } from '../interfaces';

import { FieldDeclaration } from '@trxn/hapify-core';

export function convertDmmfObjectFieldToHapifyField(
  model: DMMF.Model,
  field: PrismaObjectField,
  metadata?: Record<string, unknown>,
  documentation?: string,
): FieldDeclaration {
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

  // If is a list that we are in the many side of the relation
  // If not a list that we are in the one side of the relation
  // Prisma define the information of the relation always on the foreign key field
  // Moreover the from -> to relation in prisma is relative to the field and not
  // absolute to the relation (the relation is always from primary to the foreign key)

  const {
    type,
    relationFromFields,
    relationName,
    relationOnDelete,
    relationToFields,
  } = field;

  const from = { model: type, fields: relationToFields };
  const to = { model: model.name, fields: relationFromFields };

  return {
    name,
    type: 'virtual',
    scalar: null,
    pluralName,
    documentation,
    ...baseConstraints,
    relation: {
      name: relationName,
      onDelete: relationOnDelete,
      from,
      to,
    },
  };
}
