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

const testNumber: NumberField = {
  type: 'number',
  name: 'name',
  constraints: {
    max: 2,
    integer: true,
  },
};

const testBoolean: Field = {
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

const stringFields = fields.filter(isString);

if (hasConstraintsKey(testBoolean)) {
  console.info(test.constraints.searchable);
}

if (hasMinLength(testBoolean)) {
  console.info(test.constraints.minLength);
}
