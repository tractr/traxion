import { plural as pluralize } from 'pluralize';

/**
 * Abstract component
 */
export abstract class Node {
  /**
   * Metadata of the node
   */
  protected _metadata: Record<string, string> = {};

  /**
   * A note associated to the node
   */
  protected _notes: string | undefined;

  /**
   * Plural name of the node
   */
  protected _plural?: string;

  constructor(readonly name: string) {}

  /**
   * Get the plural name of the node
   * If not set, use the pluralize package
   */
  get plural() {
    return this._plural ?? pluralize(this.name);
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
   * Set the plural name of the node
   */
  setPlural(plural: string): this {
    this._plural = plural;
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
