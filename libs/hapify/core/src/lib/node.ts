import { stringVariants } from './utils';
import { StringVariations } from './interfaces';

/**
 * Abstract component
 */
export abstract class Node {
  /**
   * All names variations
   */
  protected _names = stringVariants(this.name);

  /**
   * Metadata of the node
   */
  protected _metadata: Record<string, string> = {};

  /**
   * A note associated to the node
   */
  protected _notes: string | undefined;

  constructor(protected readonly name: string) {}

  /**
   * Get the names of the node
   */
  get names(): StringVariations {
    return this._names;
  }

  /**
   * Get the metadata of the node.
   * Clone the object
   */
  get metadata(): Record<string, string> {
    return { ...this._metadata };
  }

  /**
   * Returns the notes of the node
   */
  get notes(): string {
    return this._notes || '';
  }

  /**
   * Adds a metadata of the node
   */
  addMetadata(name: string, value: string): this {
    this._metadata[name] = value;
    return this;
  }

  /**
   * Removes a metadata of the node
   */
  removeMetadata(name: string): this {
    delete this._metadata[name];
    return this;
  }

  /**
   * Denotes if the node has a metadata.
   * If not argument is passed, denotes if the node has at least one metadata
   */
  hasMetadata(name?: string): boolean {
    return name
      ? typeof this._metadata[name] !== 'undefined'
      : Object.keys(this._metadata).length > 0;
  }

  /**
   * Set the notes of the node
   */
  setNotes(notes: string): this {
    this._notes = notes;
    return this;
  }

  /**
   * Remove the notes from the node
   */
  clearNotes(): this {
    delete this._notes;
    return this;
  }

  /**
   * Denotes if the nod has notes
   */
  hasNotes(): boolean {
    return !!this._notes && this._notes.length > 0;
  }
}
