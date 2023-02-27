/* eslint-disable @typescript-eslint/no-unused-vars */

import { enumField, numberField, primaryField, stringField } from './fields';
import { createOneManyRelation, Model } from './models';

const enum MonEnum {
  A = 'A',
  B = 'B',
}

// User model
const userId = primaryField('id');
const UserModel: Model = {
  name: 'User',
  fields: [
    userId,
    stringField('password', { isPassword: true }),
    stringField('email'),
    // enumField('test', { enum: MonEnum }),
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
      isInteger: true,
    }),
    // enumField('test', { enum: MonEnum }),
  ],
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
