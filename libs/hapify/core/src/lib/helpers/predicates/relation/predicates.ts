import { Field, KeyField, Model, RelationField } from '../../../nodes';
import { Relation } from '../../../nodes/relation';

// TODO: voir comment on range tout ça dans l'arborescence
export type RelationalField = KeyField | RelationField;

export function getCardinality(relation: Relation) {
  const dependencyCardinality = relation.dependency.cardinality;
  const referenceCardinality = relation.reference.cardinality;
  if (dependencyCardinality === 'one' && referenceCardinality === 'one')
    return 'oneOne';
  if (dependencyCardinality === 'many' && referenceCardinality === 'many')
    return 'manyMany';
  return 'oneMany';
}

export function isOneToOne(relation: Relation) {
  return getCardinality(relation) === 'oneOne';
}

export function isOneToMany(relation: Relation) {
  return getCardinality(relation) === 'oneMany';
}

export function isManyToMany(relation: Relation) {
  return getCardinality(relation) === 'manyMany';
}

export function isRelationField(field: Field): field is RelationField {
  return field.type === 'relation';
}

export function isFieldReferencedInRelation(
  relation: Relation,
  field: KeyField,
) {
  return relation.reference.scalarField === field;
}

export function isFieldDependencyInRelation(
  relation: Relation,
  field: KeyField,
) {
  return relation.dependency.scalarField === field;
}

export function isFieldInRelation(relation: Relation, field: KeyField) {
  return (
    isFieldReferencedInRelation(relation, field) ||
    isFieldDependencyInRelation(relation, field)
  );
}

export function isModelReferencedInRelation(relation: Relation, model: Model) {
  return relation.reference.model === model;
}

export function isModelDependencyInRelation(relation: Relation, model: Model) {
  return relation.dependency.model === model;
}

export function isModelInRelation(relation: Relation, model: Model) {
  return (
    isModelReferencedInRelation(relation, model) ||
    isModelDependencyInRelation(relation, model)
  );
}

export function getModelRelations(model: Model) {
  return Array.from(
    new Set(
      model.fields.filter(isRelationField).map((field) => field.relation),
    ),
  );
}

export function getModelDependencies(model: Model) {
  return Array.from(
    new Set(
      getModelRelations(model).map((relation) => relation.dependency.model),
    ),
  );
}

export function getModelReferences(model: Model) {
  return Array.from(
    new Set(
      getModelRelations(model).map((relation) => relation.reference.model),
    ),
  );
}

export function getModelSelfRelations(model: Model) {
  return getModelRelations(model).filter(
    (relation) => relation.reference.model === relation.dependency.model,
  );
}

export function modelHasReferences(model: Model) {
  return getModelReferences(model).length > 0;
}

export function modelHasDependencies(model: Model) {
  return getModelDependencies(model).length > 0;
}

export function modelHasRelations(model: Model) {
  return modelHasReferences(model) || modelHasDependencies(model);
}

export function modelHasSelfRelation(model: Model) {
  return getModelSelfRelations(model).length > 0;
}
