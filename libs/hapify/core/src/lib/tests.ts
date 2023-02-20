/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  foreignField,
  numberField,
  primaryField,
  stringField,
  virtualField,
} from './type-implementation/field.type';
import {
  createOneManyRelation,
  Model,
  OneManyRelation,
} from './type-implementation/schema.type';

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
      virtualName: 'profile',
    },
    { model: ProfileModel, foreignKey: 'userId', virtualName: 'user' },
  ),
];

const schema = {
  models: [UserModel, ProfileModel],
  relations,
};
