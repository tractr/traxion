/* eslint-disable @typescript-eslint/no-unused-vars */
import { DeepRequired } from 'ts-essentials';

import {
  BooleanField,
  Field,
  hasConstraint,
  HasConstraints,
  hasConstraintsKey,
  hasMinLength,
  isString,
  NotNullConstraint,
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

type IsBooleanFieldSortable_1 = HasConstraints<
  BooleanField,
  SortableConstraint
>;
type IsBooleanFieldSearchable_0 = HasConstraints<
  BooleanField,
  SearchableConstraint
>;
type IsBooleanFieldSearchableAndSortable_0 = HasConstraints<
  BooleanField,
  SortableConstraint & SearchableConstraint
>;

type IsBooleanAndStringFieldSortable_1 = HasConstraints<
  BooleanField | StringField,
  SortableConstraint
>;

type IsBooleanAndStringFieldSearchable_0 = HasConstraints<
  BooleanField | StringField,
  SearchableConstraint
>;

/**
 * TEST DES TYPES
 */
export const email = stringFieldFactory('email', {
  searchable: true,
});

const password: StringField = stringFieldFactory('password');

const test: Field = {
  type: 'boolean',
  name: 'name',
  constraints: {},
};

const fields = [email, password, test];

if (isString(email)) {
  console.info(email.name);
}

fields.filter(isString).forEach((field) => {
  console.info(field.name);
});

if (hasConstraintsKey(test)) {
  console.info(test.constraints.searchable);
}

if (hasMinLength(stringField)) {
  console.info(stringField.constraints.minLength);
}
