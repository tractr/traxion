import { createManyManyRelation } from './create-many-many-relation';
import { createOneManyRelation } from './create-one-many-relation';
import { createOneOneRelation } from './create-one-one-relation';
import {
  Field,
  FieldDeclaration,
  getPrimaryFields,
  isForeignField,
  isVirtualField,
  VirtualField,
} from '../fields';
import { Model, ModelDeclaration, Relation } from '../models';
import { and, not } from '../operators';
import { SchemaDeclaration } from '../schema';

export function createSchema(definition: SchemaDeclaration) {
  const declarationModels: Record<string, ModelDeclaration> = {};

  // Check for duplicate model names
  definition.models.forEach((model) => {
    if (declarationModels[model.name]) {
      throw new Error(`Model ${model.name} already exists`);
    }
    declarationModels[model.name] = model;

    // Check for duplicate field names in each model
    const fields: Record<string, boolean> = {};
    model.fields.forEach((field) => {
      if (fields[field.name]) {
        throw new Error(
          `Field ${field.name} already exists in model ${model.name}`,
        );
      }
      fields[field.name] = true;
    });
  });

  // Extract all virtual fields by relation name
  const virtualFields: Record<
    string,
    (Omit<VirtualField, 'relation'> & FieldDeclaration)[]
  > = {};
  definition.models.forEach((model) => {
    model.fields.filter(isVirtualField).forEach((field) => {
      if (!virtualFields[field.relation.name]) {
        virtualFields[field.relation.name] = [];
      }
      virtualFields[field.relation.name].push(field);
    });
  });

  // Extract all the fields that are not relation from each model
  const models: Model[] = definition.models.map((model) => {
    const fields: Field[] = model.fields
      // FIXME: filter are not working with FieldDeclaration
      .filter(not(and(isVirtualField, isForeignField))) as Field[];

    return {
      fields,
      name: model.name,
      primaryKey: {
        name: model.primaryKey?.name || null,
        fields: getPrimaryFields(fields),
      },
      documentation: model.documentation,
    };
  });

  const relations: Relation[] = [];
  Object.keys(virtualFields).forEach((relationName) => {
    const fields = virtualFields[relationName];

    const field1 = fields[0];
    const field2 = fields[1];

    let relationType;
    if (field1.isMultiple && field2.isMultiple) relationType = 'manyMany';
    else if (!field1.isMultiple && !field2.isMultiple) relationType = 'oneOne';
    else relationType = 'oneMany';

    let relation: Relation | null = null;

    if (relationType === 'oneOne') {
      relation = createOneOneRelation(relationName, definition, models, fields);
    } else if (relationType === 'oneMany') {
      relation = createOneManyRelation(
        relationName,
        definition,
        models,
        fields,
      );
    } else if (relationType === 'manyMany') {
      relation = createManyManyRelation(
        relationName,
        definition,
        models,
        fields,
      );
    }

    if (relation) relations.push(relation);
  });

  return {
    models,
    relations,
  };
}
