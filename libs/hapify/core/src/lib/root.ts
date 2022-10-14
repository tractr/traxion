import { Model } from './model';
import { Node } from './node';

/**
 * Top level node of a project
 */
export class Root extends Node {
  /**
   * List of models in the project
   */
  protected _models = new Set<Model>();

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
