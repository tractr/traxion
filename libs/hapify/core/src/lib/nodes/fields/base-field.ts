import { FieldAction, FieldActionsScopes, Scope } from '../interfaces';
import { Node } from '../node';

/**
 * Abstract class for a field of a model
 * This class is tested via the children classes, especially the StringBasicField class
 */
export abstract class BaseField extends Node {
  abstract readonly type: string;
  abstract readonly subType: string;

  protected _primary = false;
  protected _unique = false;
  protected _label = false;
  protected _nullable = false;
  protected _multiple = false;
  protected _searchable = false;
  protected _sortable = false;

  /**
   * Stores the scope of each action
   */
  protected _actionsScopes: FieldActionsScopes = {
    read: undefined,
    write: undefined,
  };

  /** Should be used as a primary key or not */
  get primary(): boolean {
    return this._primary;
  }

  /** Should be used as a unique key or not */
  get unique(): boolean {
    return this._unique;
  }

  /** Should be used as a label or not */
  get label(): boolean {
    return this._label;
  }

  /** Denotes if the field can be empty or not */
  get nullable(): boolean {
    return this._nullable;
  }

  /** Denotes if the field is an array of values */
  get multiple(): boolean {
    return this._multiple;
  }

  /** Indicate whether the field is searchable or not */
  get searchable(): boolean {
    return this._searchable;
  }

  /** Indicate whether the field is sortable or not */
  get sortable(): boolean {
    return this._sortable;
  }

  /**
   * Get the scope of an action
   * Clones the scope to avoid mutation
   */
  get actionsScopes(): FieldActionsScopes {
    return { ...this._actionsScopes };
  }

  setPrimary(value: boolean): this {
    this._primary = value;
    return this;
  }

  setUnique(value: boolean): this {
    this._unique = value;
    return this;
  }

  setLabel(value: boolean): this {
    this._label = value;
    return this;
  }

  setNullable(value: boolean): this {
    this._nullable = value;
    return this;
  }

  setMultiple(value: boolean): this {
    this._multiple = value;
    return this;
  }

  setSearchable(value: boolean): this {
    this._searchable = value;
    return this;
  }

  setSortable(value: boolean): this {
    this._sortable = value;
    return this;
  }

  /**
   * Set the scope of an action
   */
  setActionScope(action: FieldAction, scope: Scope): this {
    this._actionsScopes[action] = scope;
    return this;
  }

  /**
   * Set the scopes of many actions.
   * Accept a partial object of scopes
   */
  setActionsScopes(scopes: Partial<FieldActionsScopes>): this {
    this._actionsScopes = { ...this._actionsScopes, ...scopes };
    return this;
  }

  /**
   * Shortcut to set read scope to system
   */
  makeNotReadable(): this {
    return this.setActionScope('read', 'system');
  }

  /**
   * Shortcut to set write scope to system
   */
  makeNotWritable(): this {
    return this.setActionScope('write', 'system');
  }
}
