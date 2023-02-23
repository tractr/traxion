/* eslint-disable @typescript-eslint/no-unused-vars */

import { numberField, primaryField, stringField } from './fields';
import { createOneManyRelation, Model, OneManyRelation } from './schema';

// User model
const userId = primaryField('id');
const UserModel = {
  name: 'User',
  fields: [
    userId,
    stringField('password', { isPassword: true }),
    stringField('email'),
  ],
  primary: [userId],
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
      isInteger: true,
    }),
  ],
  primary: [profileId],
};

const relations = [
  createOneManyRelation(
    'userProfile',
    {
      model: UserModel,
      virtual: 'profile',
    },
    { model: ProfileModel, foreign: 'userId', virtual: 'user' },
  ),
];

const schema = {
  models: [UserModel, ProfileModel],
  relations,
};
