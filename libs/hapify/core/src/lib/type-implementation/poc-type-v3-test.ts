/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeepRequired } from 'ts-essentials';

import {
  BaseConstraint,
  BooleanField,
  Field,
  hasConstraint,
  HasConstraints,
  hasMinLength,
  hasSomeConstraints,
  isField,
  isString,
  NotNullConstraint,
  NumberField,
  Searchable,
  SearchableConstraint,
  SortableConstraint,
  StringField,
  stringFieldFactory,
} from './poc-type-v3';

const booleanField: BooleanField = {
  type: 'boolean',
  name: 'test',
};

/**
 * TEST DES TYPES
 */
export const email = stringFieldFactory('email', {
  searchable: true,
});

const password: StringField = stringFieldFactory('password');

const testNumber: NumberField = {
  type: 'number',
  name: 'name',
  constraints: {
    max: 2,
    integer: true,
  },
};

const testBoolean: BooleanField = {
  type: 'boolean',
  name: 'name',
  constraints: {
    defaultValue: true,
  },
};

const fields = [email, password, testBoolean, testNumber];

if (isString(email)) {
  console.info(email.name);
}

if (hasSomeConstraints(testBoolean)) {
  console.info(testBoolean.constraints.searchable);
}
if (hasSomeConstraints(testNumber)) {
  console.info(testNumber.constraints.integer);
}

if (isField(testBoolean)) {
  console.info(testBoolean.name);
}

type EmailType = typeof email;
type test = HasConstraints<StringField, 'minLength'>;
const test: test = {
  ...email,
  constraints: {
    label: true,
  },
};

if (hasMinLength(email)) {
  console.info(email.constraints.minLength);
}
