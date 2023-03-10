/* eslint-disable no-continue */
import { plural } from 'pluralize';

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

  // Build the models declaration (excluding the virtual fields)
  const models: Model[] = definition.models.map((model) => {
    const fields: Field[] = model.fields
      // FIXME: filter are not working with FieldDeclaration
      .filter(and(not(isVirtualField), not(isForeignField))) as Field[];

    return {
      fields,
      name: model.name,
      pluralName: model.pluralName ?? plural(model.name),
      primaryKey: {
        name: model.primaryKey?.name || null,
        fields: getPrimaryFields(fields),
      },
      documentation: model.documentation,
    };
  });

  const relations: Relation[] = [];

  // We need to use for loop to be able to run synchronously to not loose the model references
  for (const [relationName, fields] of Object.entries(virtualFields)) {
    // Validate that the relations have 2 fields
    if (fields.length !== 2) {
      throw new Error(
        `Relation ${relationName} must have 2 fields, found ${fields.length}`,
      );
    }

    const [field1, field2] = fields;

    let relationType;

    if (field1.isMultiple && field2.isMultiple) relationType = 'manyMany';
    else if (!field1.isMultiple && !field2.isMultiple) relationType = 'oneOne';
    else relationType = 'oneMany';

    let relation: Relation | null = null;

    switch (relationType) {
      case 'oneOne':
        relation = createOneOneRelation(
          relationName,
          definition,
          models,
          fields,
        );
        break;
      case 'oneMany':
        relation = createOneManyRelation(
          relationName,
          definition,
          models,
          fields,
        );
        break;
      case 'manyMany':
        relation = createManyManyRelation(
          relationName,
          definition,
          models,
          fields,
        );
        break;
      default:
        break;
    }

    if (relation) relations.push(relation);
  }

  // Now we need for each relation to add the ref to the primary keys
  relations.forEach((relation) => {
    switch (relation.type) {
      case 'oneOne':
      case 'oneMany':
        relation.from.model.primaryKey?.fields.forEach((field) => {
          field.relations.push(relation);
        });
        break;
      case 'manyMany':
        relation.from.model.primaryKey?.fields.forEach((field) => {
          field.relations.push(relation);
        });
        relation.to.model.primaryKey?.fields.forEach((field) => {
          field.relations.push(relation);
        });
        break;
      default:
        break;
    }
  });

  return {
    enums: definition.enums,
    models,
    relations,
  };
}
