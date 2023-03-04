import { getModel } from './get-model';
import {
  FieldDeclaration,
  isField,
  isForeignField,
  isUniqueField,
  VirtualField,
} from '../fields';
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

  let fromFieldDeclaration: Omit<VirtualField, 'relation'> & FieldDeclaration =
    field1;
  let toFieldDeclaration: Omit<VirtualField, 'relation'> & FieldDeclaration =
    field2;

  if (field2.relation.from.fields.length === 0) {
    fromFieldDeclaration = field2;
    toFieldDeclaration = field1;
  }
  // The difference between the to and from key of prisma and the to and from
  // key of hapify is in prisma the from and to refer to the field itself inside the relation
  // in hapify the from and to refer to the direction of the relation

  // In a one one relation all the information in prisma is hold by the prisma to relation field
  // In this relation declaration field, the from key is selfed targeted and
  // the to key is the primary key of the hapify from model
  const primaryModel = getModel(toFieldDeclaration.relation.to.model, models);

  if (!primaryModel) {
    throw new Error(
      `Model ${fromFieldDeclaration.relation.from.model} not found for relation ${relationName}`,
    );
  }

  // We use the from key of the relation declaration field to get the to model
  const foreignModelDeclaration = getModel(
    toFieldDeclaration.relation.from.model,
    definition.models,
  );
  const foreignModel = getModel(toFieldDeclaration.relation.from.model, models);

  if (!foreignModel) {
    throw new Error(
      `Model ${toFieldDeclaration.relation.to.model} not found for relation ${relationName}`,
    );
  }

  // Create the future from fields (virtual) and add them to the model
  const fromVirtualField: VirtualField = {
    ...fromFieldDeclaration,
  } as unknown as VirtualField;

  // Create the future to fields (virtual) and add them to the model
  const toVirtualField: VirtualField = {
    ...fromFieldDeclaration,
  } as unknown as VirtualField;

  // Create the foreign field from the RelationDeclaration
  // FIXME: Prisma allow multiple foreign fields in a relation
  const toForeignField = {
    ...foreignModelDeclaration?.fields
      .filter(isForeignField)
      .find(
        (field) => field.name === toFieldDeclaration.relation.from.fields[0],
      ),
  };

  if (!isField(toForeignField)) {
    throw new Error(
      `Foreign field ${toFieldDeclaration.relation.to.fields[0]} not found in model ${foreignModel.name} for relation ${relationName}`,
    );
  }

  if (!isUniqueField(toForeignField)) {
    throw new Error(
      `Foreign field ${toFieldDeclaration.relation.to.fields[0]} in model ${foreignModel.name} for relation ${relationName} is not unique`,
    );
  }

  // Create the relation
  const relation: ManyManyRelation = {
    type: 'manyMany',
    name: relationName,
    from: {
      model: primaryModel,
      virtual: fromVirtualField,
    },
    to: {
      model: foreignModel,
      virtual: toVirtualField,
    },
  };

  // Add the relation to the fields
  relation.from.virtual.relation = relation;
  relation.to.virtual.relation = relation;

  primaryModel.fields.push(relation.from.virtual);
  foreignModel.fields.push(relation.to.virtual);

  return relation;
}
