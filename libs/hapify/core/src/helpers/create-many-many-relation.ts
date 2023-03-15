/* eslint-disable @typescript-eslint/no-unused-vars */
import { getModel } from './get-model';
import { FieldDeclaration, VirtualField } from '../fields';
import { ManyManyRelation, Model } from '../models';
import { SchemaDeclaration } from '../schema';

export function createManyManyRelation(
  relationName: string,
  definition: SchemaDeclaration,
  models: Model[],
  virtualFields: (Omit<VirtualField, 'relation'> & FieldDeclaration)[],
): ManyManyRelation {
  const field1 = virtualFields[0];
  const field2 = virtualFields[1];

  const many1Declaration: Omit<VirtualField, 'relation'> & FieldDeclaration =
    field1;
  const many2Declaration: Omit<VirtualField, 'relation'> & FieldDeclaration =
    field2;

  /**
   * A has many B and B has many A
   * A is the many side of the relation, the primary key and isMultiple
   * B is the many side of the relation, the primary key and isMultiple
   *
   * They are no foreign key in this relation
   *
   * The direction of the relation is not important in a many to many relation
   */

  const firstModelName = many1Declaration.relation.from.model;
  const firstModel = getModel(many1Declaration.relation.from.model, models);

  if (!firstModel) {
    throw new Error(
      `Model ${firstModelName} not found for relation ${relationName}`,
    );
  }

  const secondModelName = many1Declaration.relation.to.model;
  const secondModel = getModel(secondModelName, models);

  if (!secondModel) {
    throw new Error(
      `Model ${secondModelName} not found for relation ${relationName}`,
    );
  }

  // Create the future from fields (virtual) and add them to the model
  const { relation: unused1Relation, ...firstVirtualField } = many1Declaration;

  // Create the future to fields (virtual) and add them to the model
  const { relation: unused2Relation, ...secondVirtualField } = many2Declaration;

  // Create the relation
  const relation: ManyManyRelation = {
    type: 'manyMany',
    name: relationName,
    from: {
      model: firstModel,
      // TODO: temporary fix: use the field from the opposite side of the relation
      virtual: secondVirtualField as VirtualField,
    },
    to: {
      model: secondModel,
      // TODO: temporary fix: use the field from the opposite side of the relation
      virtual: firstVirtualField as VirtualField,
    },
  };

  // Add the relation reference to the virtual fields
  relation.from.virtual.relation = relation;
  relation.to.virtual.relation = relation;

  // Add the relation reference to the primary fields
  relation.from.model.primaryKey?.fields.forEach((field) => {
    field.relations.push(relation);
  });
  relation.to.model.primaryKey?.fields.forEach((field) => {
    field.relations.push(relation);
  });

  // Add the relation fields to the models
  firstModel.fields.push(relation.from.virtual);
  secondModel.fields.push(relation.to.virtual);

  return relation;
}
