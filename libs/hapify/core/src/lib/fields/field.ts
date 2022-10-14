import { Node } from '../node';
import { FieldProperties } from '../interfaces';

/**
 * Abstract class for a field of a model
 */
export abstract class Field extends Node implements FieldProperties {
  primary = false;
  unique = false;
  label = false;
  nullable = false;
  multiple = false;
  embedded = false;
  searchable = false;
  sortable = false;
  hidden = false;
  internal = false;
  restricted = false;
  ownership = false;

  /**
   * Allows to set boolean property and chain
   */
  setProperty(name: keyof FieldProperties, value: boolean): this {
    this[name] = value;
    return this;
  }
}
