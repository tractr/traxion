import {
  Field,
  isEmbedded,
  isEntity,
  isHidden,
  isInternal,
  isLabel,
  isLatitude,
  isLongitude,
  isMultiple,
  isNullable,
  isOwnership,
  isPrimary,
  isRestricted,
  isSearchable,
  isSortable,
  isUnique,
} from './fields';
import { ModelAction, ModelActionsScopes, Scope } from './interfaces';
import { Node } from './node';
import { and } from './operators';

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

  /** Denotes if the model has a primary field */
  get hasPrimary(): boolean {
    return this.fields.some(isPrimary);
  }

  /** Denotes if the model has at least one unique field */
  get hasUnique(): boolean {
    return this.fields.some(isUnique);
  }

  /** Denotes if the model has at least one label field */
  get hasLabel(): boolean {
    return this.fields.some(isLabel);
  }

  /** Denotes if the model has at least one nullable field */
  get hasNullable(): boolean {
    return this.fields.some(isNullable);
  }

  /** Denotes if the model has at least one multiple field */
  get hasMultiple(): boolean {
    return this.fields.some(isMultiple);
  }

  /** Denotes if the model has at least one embedded field */
  get hasEmbedded(): boolean {
    return this.fields.some(isEmbedded);
  }

  /** Denotes if the model has at least one searchable field */
  get hasSearchable(): boolean {
    return this.fields.some(isSearchable);
  }

  /** Denotes if the model has at least one sortable field */
  get hasSortable(): boolean {
    return this.fields.some(isSortable);
  }

  /** Denotes if the model has at least one hidden field */
  get hasHidden(): boolean {
    return this.fields.some(isHidden);
  }

  /** Denotes if the model has at least one internal field */
  get hasInternal(): boolean {
    return this.fields.some(isInternal);
  }

  /** Denotes if the model has at least one restricted field */
  get hasRestricted(): boolean {
    return this.fields.some(isRestricted);
  }

  /** Denotes if the model has at least one ownership field */
  get hasOwnership(): boolean {
    return this.fields.some(isOwnership);
  }

  /** Denotes if the model has at least one field marked as label and also searchable */
  get hasSearchableLabel(): boolean {
    return this.fields.some(and(isLabel, isSearchable));
  }

  /** Denotes if most of the fields are hidden (strictly) */
  get mainlyHidden(): boolean {
    return this.fields.filter(isHidden).length > this.fieldsCount / 2;
  }

  /** Denotes if most of the fields are internal (strictly) */
  get mainlyInternal(): boolean {
    return this.fields.filter(isInternal).length > this.fieldsCount / 2;
  }

  /** Denotes if the model contains at least one latitude field and one longitude field */
  get isGeolocated(): boolean {
    return this.fields.some(isLatitude) && this.fields.some(isLongitude);
  }

  /** Denotes if the model contains at least one searchable latitude field and one searchable longitude field */
  get isGeoSearchable(): boolean {
    return (
      this.fields.some((field) => isLatitude(field) && field.searchable) &&
      this.fields.some((field) => isLongitude(field) && field.searchable)
    );
  }
}
