/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeepRequired } from 'ts-essentials';

import {
  BaseConstraint,
  BooleanField,
  Field,
  GetConstraints,
  hasConstraint,
  HasConstraints,
  hasMinLength,
  IsField,
  isField,
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
export const email: StringField = stringFieldFactory('email', {
  isSearchable: true,
});

const password: StringField = stringFieldFactory('password');

const testNumber: NumberField = {
  type: 'number',
  name: 'name',
  max: 2,
  isInteger: true,
};

const testBoolean: BooleanField = {
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

const test: StringField = {
  type: 'string',
  name: 'test',
  isMultiple: true,
  isLabel: true,
};

if (hasConstraint(test, 'isLabel')) {
  console.info(test.isMultiple);
  console.info(test.defaultValue);
  console.info(test.isLabel);
}

if (hasMinLength(email)) {
  console.info(email.minLength);
  console.info(email.defaultValue);
}

if (isUnique(email)) {
  console.info(email.isUnique);
  console.info(email.defaultValue);
}
