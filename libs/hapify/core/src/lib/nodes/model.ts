import { EntityField, Field } from './fields';
import { ModelAction, ModelActionsScopes, Scope } from './interfaces';
import { Node } from './node';

/**
 * Local helper to filter entity fields.
 * This avoids importing helpers and creating a circular dependency.
 */
function isEntity(field: Field): field is EntityField {
  return field.type === 'entity';
}

/**
 * Represents a model that contains fields
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
   * Stores the scope of each action
   */
  protected _actionsScopes: ModelActionsScopes = {
    create: 'auth',
    read: 'public',
    update: 'auth',
    remove: 'auth',
    search: 'public',
    count: 'public',
  };

  /**
   * Model that own this one.
   * This is used to determine the ownership.
   */
  protected _owner: Model | undefined;

  /**
   * Adds a field to the model
   */
  addField(field: Field): this {
    this._fields.add(field);
    // If the field is an entity field, add this model to the list of referenced models
    if (isEntity(field)) {
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
    if (isEntity(field)) {
      field.model.removeReferencedIn(this);
    }
    return this;
  }

  /**
   * Set the scope of an action
   */
  setActionScope(action: ModelAction, scope: Scope): this {
    this._actionsScopes[action] = scope;
    return this;
  }

  /**
   * Set the scopes of many actions.
   * Accept a partial object of scopes
   */
  setActionsScopes(scopes: Partial<ModelActionsScopes>): this {
    this._actionsScopes = { ...this._actionsScopes, ...scopes };
    return this;
  }

  /**
   * Set the model that owns this one.
   */
  setOwner(model: Model): this {
    this._owner = model;
    return this;
  }

  /**
   * Removes the owner of the model
   */
  removeOwner(): this {
    this._owner = undefined;
    return this;
  }

  /**
   * The model that owns this one.
   */
  get owner(): Model | undefined {
    return this._owner;
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
      .filter(isEntity)
      .filter((field) => field.model !== this)
      .map((field) => field.model);
  }

  /**
   * Get the scope of an action
   * Clones the scope to avoid mutation
   */
  get actionsScopes(): ModelActionsScopes {
    return { ...this._actionsScopes };
  }

  /**
   * Denotes if the model has dependencies to other models or itself
   */
  get hasDependencies(): boolean {
    return this.fields.filter(isEntity).length > 0;
  }

  /**
   * Denotes if the model is self-dependent
   */
  get isSelfDependent(): boolean {
    return this.fields.filter(isEntity).some((field) => field.model === this);
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
  get isReferenced(): boolean {
    return this._referencedIn.size > 0;
  }

  /**
   * Denotes if the model is referenced by itself
   */
  get isSelfReferenced(): boolean {
    return this._referencedIn.has(this);
  }

  /** The number of fields contained in the model */
  get fieldsCount(): number {
    return this._fields.size;
  }
}
