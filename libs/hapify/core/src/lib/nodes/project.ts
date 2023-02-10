import { Model } from './model';
import { Node } from './node';
import { Relation } from './relation';

/**
 * Top level node of a project
 */
export class Project extends Node {
  /**
   * List of models in the project
   */
  protected _models = new Set<Model>();

  /**
   * Relation between models
   */
  protected _relations = new Set<Relation>();

  addRelation(relation: Relation): this {
    this._relations.add(relation);

    // set up the relation on associated fields
    relation.referer.scalarField.addRelation(relation);
    relation.referee.scalarField.addRelation(relation);
    relation.referer.virtualField.setRelation(relation);
    relation.referee.virtualField.setRelation(relation);

    return this;
  }

  /**
   * Adds a model to the project
   */
  addModel(model: Model): this {
    this._models.add(model);
    return this;
  }

  /**
   * Removes a model from the project
   */
  removeModel(model: Model): this {
    this._models.delete(model);
    return this;
  }

  /**
   * Returns a list of models in the project
   */
  get models(): Model[] {
    return Array.from(this._models);
  }
}
