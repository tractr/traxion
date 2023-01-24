export interface StringVariations {
  /** The string of the field, as the user entered it. Example `fiRst Name`. */
  raw: string;
  /** The string with hyphens and lower case. Example `first-name`. */
  kebab: string;
  /** The string with underscores and lower case. Example `first_name`. */
  snake: string;
  /** The string with hyphens and first letters capitalized. Example `First-Name`. */
  header: string;
  /**  The string with underscores and upper case. Example `FIRST_NAME`. */
  constant: string;
  /** The string with hyphens and upper case. Example `FIRST-NAME`. */
  big: string;
  /** The string as words with upper case on first letters. Example `First Name`. */
  capital: string;
  /** The string as words in lower case. Example `first name`. */
  lower: string;
  /** The string as words in upper case. Example `FIRST NAME`. */
  upper: string;
  /** The string joined and lower case. Example `firstname`. */
  compact: string;
  /** The string as upper camel case. Example `FirstName`. */
  pascal: string;
  /** The string as lower camel case. Example `firstName`. */
  camel: string;
  /** Returns a string for this object */
  toString(): string;
}
