/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModel } from './get-model';
import {
  FieldDeclaration,
  ForeignField,
  IsConstraints,
  isField,
  isForeignField,
  isUniqueField,
  VirtualField,
} from '../fields';
import { Model, OneOneRelation } from '../models';
import { SchemaDeclaration } from '../schema';

export function createOneOneRelation(
  relationName: string,
  definition: SchemaDeclaration,
  models: Model[],
  virtualFields: (Omit<VirtualField, 'relation'> & FieldDeclaration)[],
): OneOneRelation {
  const field1 = virtualFields[0];
  const field2 = virtualFields[1];

  /**
   * A has one B
   * A is the one side of the relation, the primary key and !isMultiple
   * B is the one side of the relation, the foreign key and !isMultiple
   *
   * In prisma B is the one who hold all the information of the relation
   */

  let primaryDeclaration: Omit<VirtualField, 'relation'> & FieldDeclaration =
    field1;
  let foreignDeclaration: Omit<VirtualField, 'relation'> & FieldDeclaration =
    field2;

  if (field1.relation.from.fields.length === 0) {
    primaryDeclaration = field2;
    foreignDeclaration = field1;
  }

  const primaryModelName = foreignDeclaration.relation.from.model;
  const primaryModel = getModel(primaryModelName, models);

  if (!primaryModel) {
    throw new Error(
      `Model ${primaryModelName} not found for relation ${relationName}`,
    );
  }

  const foreignModelName = foreignDeclaration.relation.to.model;
  const foreignModel = getModel(foreignModelName, models);

  if (!foreignModel) {
    throw new Error(
      `Model ${foreignModelName} not found for relation ${relationName}`,
    );
  }

  // Create the future from fields (virtual) and add them to the model
  const { relation: unusedP, ...primaryVirtualField } = primaryDeclaration;

  // Create the future to fields (virtual) and add them to the model
  const { relation: unusedF, ...foreignVirtualField } = foreignDeclaration;

  const foreignListField = foreignDeclaration.relation.from.fields;
  const toForeignField = getModel(foreignModelName, definition.models)
    ?.fields.filter(isForeignField)
    .filter((field) => foreignListField.includes(field.name));

  if (!toForeignField) {
    throw new Error(
      `Model ${foreignModelName} not found for relation ${relationName}`,
    );
  }

  toForeignField.forEach((field) => {
    if (!isUniqueField(field)) {
      throw new Error(
        `Foreign field ${field.name} in model ${foreignModel.name} for relation ${relationName} is not unique`,
      );
    }
  });

  // Create the relation
  const relation: OneOneRelation = {
    type: 'oneOne',
    name: relationName,
    from: {
      model: primaryModel,
      virtual: primaryVirtualField as VirtualField,
    },
    to: {
      model: foreignModel,
      virtual: foreignVirtualField as VirtualField,
      foreign: toForeignField as IsConstraints<ForeignField, 'isUnique'>[],
    },
  };

  // Add the relation reference to the virtual fields
  relation.from.virtual.relation = relation;
  relation.to.virtual.relation = relation;

  // Add the relation reference to the foreign field
  relation.to.foreign = relation.to.foreign.map((field) => ({
    ...field,
    relation,
  }));

  // Add the relation reference to the primary fields
  relation.from.model.primaryKey?.fields.forEach((field) => {
    field.relations.push(relation);
  });

  // Add the relation fields to the models
  primaryModel.fields.push(relation.from.virtual);
  foreignModel.fields.push(relation.to.virtual);
  foreignModel.fields.push(...relation.to.foreign);

  return relation;
}
