/* eslint-disable @typescript-eslint/no-unused-vars */
// ignore-istanbul

import { enumField, numberField, primaryField, stringField } from './fields';
import { createOneManyRelation } from './models';
import { Schema } from './schema';

const TestEnum = {
  name: 'TestEnum',
  values: {
    A: 'A',
    B: 'B',
  },
};

// User model
const userId = primaryField('id');
const UserModel = {
  name: 'User',
  fields: [
    userId,
    stringField('password', { isEncrypted: true }),
    stringField('email'),
    enumField('test', { enum: TestEnum }),
  ],
};

// Profile model
const profileId = primaryField('id');
const ProfileModel = {
  name: 'Pofile',
  fields: [
    profileId,
    stringField('firstname'),
    stringField('lastname'),
    numberField('age', {
      format: 'integer',
    }),
    enumField('test', { enum: TestEnum }),
  ],
};

createOneManyRelation(
  'userProfile',
  {
    model: UserModel,
    virtual: 'profile',
  },
  { model: ProfileModel, foreign: 'userId', virtual: 'user' },
);

const schema: Schema = {
  models: [UserModel, ProfileModel],
};
