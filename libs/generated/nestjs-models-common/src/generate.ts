import { resolve } from 'path';

import {
  enumField,
  Model,
  primaryField,
  Schema,
  stringField,
} from '@trxn/hapify-core';
import {
  generate,
  GraphqlResolverGeneratorConfig,
} from '@trxn/hapify-generators-nestjs-services';

// TODO: to delete after testing
// /**
//  * Role model
//  */
// const roleModel = new Model('Role')
//   .addField(new NumberBasicField('Id').setPrimary(true).makeNotWritable())
//   .addField(new StringBasicField('name').setMaxLength(50))
//   .addField(new StringBasicField('description').setMaxLength(200));

// /**
//  * User model
//  */
// const userModel = new Model('User')
//   .addField(new NumberBasicField('Id').setPrimary(true).makeNotWritable())
//   .addField(new StringBasicField('FirstName').setMaxLength(50))
//   .addField(new StringBasicField('LastName').setMaxLength(50))
//   .addField(new StringEmailField('Email'))
//   .addField(
//     new StringPasswordField('Password')
//       .setValidationRegex('/([0-9a-z]+)/')
//       .makeNotReadable(),
//   )
//   .addField(
//     new StringTextField('Description')
//       .setNullable(true)
//       .addMetadata('foo', 'bar'),
//   )
//   .addField(new BooleanField('Enabled').setDefaultValue(false))
//   .addField(
//     new NumberIntegerField('Credits')
//       .setDefaultValue(10)
//       .setMax(1000)
//       .setNotes('Amount of credits remaining'),
//   )
//   .addField(new EntityOneToManyField('Role', roleModel));

/**
 * Role model
 */
const roleId = primaryField('id');
const roleModel: Model = {
  name: 'Role',
  fields: [
    roleId,
    stringField('password'),
    stringField('email'),
    enumField('enum'),
  ],
};
const userId = primaryField('id');
const userModel: Model = {
  name: 'User',
  fields: [
    userId,
    // stringField('password', { isPassword: true }),
    stringField('email'),
    // enumField('test', { enum: MonEnum }),
  ],
};

const schema: Schema = {
  models: [userModel, roleModel],
};
const currentDir = resolve(__dirname, '..');
const config: GraphqlResolverGeneratorConfig = {
  outputDirectory: currentDir,
  tsConfigFilePath: 'tsconfig.lib.json',
  generatedDirectory: 'src/ts-morph-generated',
};

generate(schema, config);
