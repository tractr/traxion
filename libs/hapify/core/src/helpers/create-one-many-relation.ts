/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModel } from './get-model';
import {
  FieldDeclaration,
  ForeignField,
  isField,
  isForeignField,
  VirtualField,
} from '../fields';
import { Model, OneManyRelation } from '../models';
import { SchemaDeclaration } from '../schema';

export function createOneManyRelation(
  relationName: string,
  definition: SchemaDeclaration,
  models: Model[],
  virtualFields: (Omit<VirtualField, 'relation'> & FieldDeclaration)[],
): OneManyRelation {
  const field1 = virtualFields[0];
  const field2 = virtualFields[1];

  /**
   * A has many B
   * A is the one side of the relation, the primary key and isMultiple
   * B is the many side of the relation, the foreign key and !isMultiple
   *
   * In prisma B is the one who hold all the information of the relation
   */

  let oneDeclaration: Omit<VirtualField, 'relation'> & FieldDeclaration =
    field1;
  let manyDeclaration: Omit<VirtualField, 'relation'> & FieldDeclaration =
    field2;

  if (field2.isMultiple) {
    oneDeclaration = field2;
    manyDeclaration = field1;
  }

  const fromModelName = manyDeclaration.relation.from.model;
  const fromModel = getModel(fromModelName, models);

  if (!fromModel) {
    throw new Error(
      `Model ${fromModelName} not found for relation ${relationName}`,
    );
  }

  // We use the from key of the relation declaration field to get the to model
  const toModelName = manyDeclaration.relation.to.model;
  const toModel = getModel(toModelName, models);

  if (!toModel) {
    throw new Error(
      `Model ${toModelName} not found for relation ${relationName}`,
    );
  }

  // Create the future from fields (virtual) and add them to the model
  const { relation: unusedFromRelation, ...fromVirtualField } = oneDeclaration;

  // Create the future to fields (virtual) and add them to the model
  const { relation: unusedToRelation, ...toVirtualField } = manyDeclaration;

  // FIXME: Prisma allow multiple foreign fields in a relation
  const foreignFields = manyDeclaration.relation.to.fields;
  const toForeignField = getModel(toModelName, definition.models)
    ?.fields.filter(isForeignField)
    .filter((field) => foreignFields.includes(field.name));

  if (!Array.isArray(toForeignField) || toForeignField?.length === 0) {
    throw new Error(
      `Foreign field ${foreignFields.join(
        ', ',
      )} not found in model ${toModelName} for relation ${relationName}`,
    );
  }

  // Create the relation
  const relation: OneManyRelation = {
    type: 'oneMany',
    name: relationName,
    from: {
      model: fromModel,
      virtual: fromVirtualField as VirtualField,
    },
    to: {
      model: toModel,
      virtual: toVirtualField as VirtualField,
      foreign: toForeignField as ForeignField[],
    },
  };

  // Add the relation to the fields
  relation.from.virtual.relation = relation;
  relation.to.virtual.relation = relation;
  relation.to.foreign = relation.to.foreign.map((field) => ({
    ...field,
    relation,
  }));

  fromModel.fields.push(relation.from.virtual);
  toModel.fields.push(relation.to.virtual);
  toModel.fields.push(...relation.to.foreign);

  return relation;
}
