import { EntityField, Field } from './fields';
import { Node } from './node';

/**
 * Top level construct which represents a project
 */
export class Model extends Node {
  /**
   * Fields of the model
   */
  protected _fields = new Set<Field>();

  /**
   * List of models which reference this model
   */
  protected _referencedIn = new Set<Model>();

  /**
   * Adds a field to the model
   */
  addField(field: Field): this {
    this._fields.add(field);
    // If the field is an entity field, add this model to the list of referenced models
    if (field instanceof EntityField) {
      field.model.addReferencedIn(this);
    }
    return this;
  }

  /**
   * Removes a field from the model
   */
  removeField(field: Field): this {
    this._fields.delete(field);
    // If the field is an entity field, remove this model from the list of referenced models
    if (field instanceof EntityField) {
      field.model.removeReferencedIn(this);
    }
    return this;
  }

  /**
   * Denotes if the model has at least one field
   */
  hasFields(): boolean {
    return this._fields.size > 0;
  }

  /**
   * Returns a list of fields in the model
   */
  get fields(): Field[] {
    return Array.from(this._fields);
  }

  /**
   * The list of models referenced by this model
   */
  get dependencies(): Model[] {
    return this.fields
      .filter((field): field is EntityField => field instanceof EntityField)
      .filter((field) => field.model !== this)
      .map((field) => field.model);
  }

  /**
   * Denotes if the model is self-dependent
   */
  get selfDependent(): boolean {
    return this.fields
      .filter((field): field is EntityField => field instanceof EntityField)
      .some((field) => field.model === this);
  }

  /**
   * Add a model to the list of models that reference this model
   */
  protected addReferencedIn(model: Model): this {
    this._referencedIn.add(model);
    return this;
  }

  /**
   * Remove a model from the list of models that reference this model
   */
  protected removeReferencedIn(model: Model): this {
    this._referencedIn.delete(model);
    return this;
  }

  /**
   * The list of models that reference this model
   */
  get referencedIn(): Model[] {
    return Array.from(this._referencedIn);
  }

  /**
   * Denotes if the model is referenced by at least one other model
   */
  get referenced(): boolean {
    return this._referencedIn.size > 0;
  }

  /**
   * Denotes if the model is referenced by itself
   */
  get selfReferenced(): boolean {
    return this._referencedIn.has(this);
  }
}
