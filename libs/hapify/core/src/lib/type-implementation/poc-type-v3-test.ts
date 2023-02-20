/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeepRequired } from 'ts-essentials';

import {
  BaseConstraint,
  BooleanField,
  Field,
  GetConstraints,
  hasConstraint,
  HasConstraints,
  hasDefault,
  hasLabel,
  hasMinLength,
  isConstraint,
  IsField,
  isField,
  isMultiple,
  isSearchable,
  isString,
  isUnique,
  NumberField,
  Searchable,
  SearchableConstraint,
  SortableConstraint,
  StringField,
  stringFieldFactory,
} from './poc-type-v3.2';

const booleanField: BooleanField = {
  type: 'boolean',
  name: 'test',
};

/**
 * TEST DES TYPES
 */
export const email = stringFieldFactory('email', {
  isSearchable: true,
});

const password = stringFieldFactory('password');

const testNumber = {
  type: 'number',
  name: 'name',
  max: 2,
  isInteger: true,
};

const testBoolean = {
  type: 'boolean',
  name: 'name',
  defaultValue: true,
};

const fields = [email, password, testBoolean, testNumber];

if (isString(email)) {
  console.info(email.name);
}

if (isField(testBoolean)) {
  console.info(testBoolean.name);
}

type test = HasConstraints<StringField, 'isLabel'>;

const test = {
  type: 'string',
  name: 'test',
  isMultiple: true,
  isLabel: true,
};

if (isString(test) && hasDefault(test) && isUnique(test) && isMultiple(test)) {
  console.info(test.isMultiple);
  console.info(test.defaultValue);
  console.info(test.isLabel);
  console.info(test.isUnique);
}

if (hasConstraint(test, 'isLabel')) {
  console.info(test.isLabel);
  console.info(test.defaultValue);
}

if (hasMinLength(email)) {
  console.info(email.minLength);
  console.info(email.defaultValue);
}

if (isUnique(email)) {
  console.info(email.isUnique);
  console.info(email.defaultValue);
}

if (isConstraint(test, 'isSearchable')) {
  console.info(test.isSearchable);
  console.info(test.defaultValue);
}
if (isSearchable(test)) {
  console.info(test.isSearchable);
  console.info(test.defaultValue);
}
