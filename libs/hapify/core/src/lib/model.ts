import { Field, isEntity, isLatitude, isLongitude } from './fields';
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
    return this.fields.some((field) => field.primary);
  }

  /** Denotes if the model has at least one unique field */
  get hasUnique(): boolean {
    return this.fields.some((field) => field.unique);
  }

  /** Denotes if the model has at least one label field */
  get hasLabel(): boolean {
    return this.fields.some((field) => field.label);
  }

  /** Denotes if the model has at least one nullable field */
  get hasNullable(): boolean {
    return this.fields.some((field) => field.nullable);
  }

  /** Denotes if the model has at least one multiple field */
  get hasMultiple(): boolean {
    return this.fields.some((field) => field.multiple);
  }

  /** Denotes if the model has at least one embedded field */
  get hasEmbedded(): boolean {
    return this.fields.some((field) => field.embedded);
  }

  /** Denotes if the model has at least one searchable field */
  get hasSearchable(): boolean {
    return this.fields.some((field) => field.searchable);
  }

  /** Denotes if the model has at least one sortable field */
  get hasSortable(): boolean {
    return this.fields.some((field) => field.sortable);
  }

  /** Denotes if the model has at least one hidden field */
  get hasHidden(): boolean {
    return this.fields.some((field) => field.hidden);
  }

  /** Denotes if the model has at least one internal field */
  get hasInternal(): boolean {
    return this.fields.some((field) => field.internal);
  }

  /** Denotes if the model has at least one restricted field */
  get hasRestricted(): boolean {
    return this.fields.some((field) => field.restricted);
  }

  /** Denotes if the model has at least one ownership field */
  get hasOwnership(): boolean {
    return this.fields.some((field) => field.ownership);
  }

  /** Denotes if the model has at least one field marked as label and also searchable */
  get hasSearchableLabel(): boolean {
    return this.fields.some((field) => field.label && field.searchable);
  }

  /** Denotes if most of the fields are hidden (strictly) */
  get mainlyHidden(): boolean {
    return (
      this.fields.filter((field) => field.hidden).length > this.fieldsCount / 2
    );
  }

  /** Denotes if most of the fields are internal (strictly) */
  get mainlyInternal(): boolean {
    return (
      this.fields.filter((field) => field.internal).length >
      this.fieldsCount / 2
    );
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
