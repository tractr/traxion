import { Node } from '../node';
import {
  EmbeddedField,
  FieldProperties,
  HiddenField,
  InternalField,
  LabelField,
  MultipleField,
  NullableField,
  OwnershipField,
  PrimaryField,
  RestrictedField,
  SearchableField,
  SortableField,
  UniqueField,
} from '../interfaces';

/**
 * Abstract class for a field of a model
 */
export abstract class Field extends Node implements FieldProperties {
  protected _primary = false;
  protected _unique = false;
  protected _label = false;
  protected _nullable = false;
  protected _multiple = false;
  protected _embedded = false;
  protected _searchable = false;
  protected _sortable = false;
  protected _hidden = false;
  protected _internal = false;
  protected _restricted = false;
  protected _ownership = false;

  get primary(): boolean {
    return this._primary;
  }
  get unique(): boolean {
    return this._unique;
  }
  get label(): boolean {
    return this._label;
  }
  get nullable(): boolean {
    return this._nullable;
  }
  get multiple(): boolean {
    return this._multiple;
  }
  get embedded(): boolean {
    return this._embedded;
  }
  get searchable(): boolean {
    return this._searchable;
  }
  get sortable(): boolean {
    return this._sortable;
  }
  get hidden(): boolean {
    return this._hidden;
  }
  get internal(): boolean {
    return this._internal;
  }
  get restricted(): boolean {
    return this._restricted;
  }
  get ownership(): boolean {
    return this._ownership;
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
  setEmbedded(value: boolean): this {
    this._embedded = value;
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
  setHidden(value: boolean): this {
    this._hidden = value;
    return this;
  }
  setInternal(value: boolean): this {
    this._internal = value;
    return this;
  }
  setRestricted(value: boolean): this {
    this._restricted = value;
    return this;
  }
  setOwnership(value: boolean): this {
    this._ownership = value;
    return this;
  }
}

/**
 * Checks if a field is a flagged as primary
 */
export function primary<T extends Field>(field: T): field is T & PrimaryField {
  return field.primary;
}

/**
 * Checks if a field is a flagged as primary
 */
export function unique<T extends Field>(field: T): field is T & UniqueField {
  return field.unique;
}

/**
 * Checks if a field is a flagged as label
 */
export function label<T extends Field>(field: T): field is T & LabelField {
  return field.label;
}

/**
 * Checks if a field is a flagged as nullable
 */
export function nullable<T extends Field>(
  field: T,
): field is T & NullableField {
  return field.nullable;
}

/**
 * Checks if a field is a flagged as multiple
 */
export function multiple<T extends Field>(
  field: T,
): field is T & MultipleField {
  return field.multiple;
}

/**
 * Checks if a field is a flagged as embedded
 */
export function embedded<T extends Field>(
  field: T,
): field is T & EmbeddedField {
  return field.embedded;
}

/**
 * Checks if a field is a flagged as searchable
 */
export function searchable<T extends Field>(
  field: T,
): field is T & SearchableField {
  return field.searchable;
}

/**
 * Checks if a field is a flagged as sortable
 */
export function sortable<T extends Field>(
  field: T,
): field is T & SortableField {
  return field.sortable;
}

/**
 * Checks if a field is a flagged as hidden
 */
export function hidden<T extends Field>(field: T): field is T & HiddenField {
  return field.hidden;
}

/**
 * Checks if a field is a flagged as internal
 */
export function internal<T extends Field>(
  field: T,
): field is T & InternalField {
  return field.internal;
}

/**
 * Checks if a field is a flagged as restricted
 */
export function restricted<T extends Field>(
  field: T,
): field is T & RestrictedField {
  return field.restricted;
}

/**
 * Checks if a field is a flagged as ownership
 */
export function ownership<T extends Field>(
  field: T,
): field is T & OwnershipField {
  return field.ownership;
}
