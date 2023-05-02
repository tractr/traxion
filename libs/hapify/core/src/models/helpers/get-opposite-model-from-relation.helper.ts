import { Model, Relation } from '../model';

export function getOppositeModelFromRelation(model: Model, relation: Relation) {
  return relation.from.model.name === model.name
    ? relation.to.model
    : relation.from.model;
}
