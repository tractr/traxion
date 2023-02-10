import { Field } from './fields';
import { ModelAction, ModelActionsScopes, Scope } from './interfaces';
import { Node } from './node';
import type { Relation } from './relation';

/**
 * Represents a model that contains fields
 */
export class Model extends Node {
  /**
   * Fields of the model
   */
  protected _fields = new Set<Field>();

  /**
   * Stores the scope of each action
   */
  protected _actionsScopes: ModelActionsScopes = {
    create: 'auth',
    read: 'public',
    update: 'auth',
    delete: 'auth',
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
   * Get the scope of an action
   * Clones the scope to avoid mutation
   */
  get actionsScopes(): ModelActionsScopes {
    return { ...this._actionsScopes };
  }

  /**
   * Denotes if the model is self-dependent
   */
  get isSelfDependent(): boolean {
    return this.fields.filter(isEntity).some((field) => field.model === this);
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
