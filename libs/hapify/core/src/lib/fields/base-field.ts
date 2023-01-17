import { FieldProperties } from '../interfaces';
import { Node } from '../node';

/**
 * Abstract class for a field of a model
 */
export abstract class BaseField extends Node implements FieldProperties {
  abstract readonly type: string;
  abstract readonly subType: string;

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
