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
   * Adds a field to the model
   */
  addField(field: Field): this {
    this._fields.add(field);
    return this;
  }

  /**
   * Removes a field from the model
   */
  removeField(field: Field): this {
    this._fields.delete(field);
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
   * The list of models that reference this model
   */
  // get dependents(): Model[] {
  //   return this.root.models.filter((model) =>
  //     model.dependencies.includes(this),
  //   );
  // }
}
