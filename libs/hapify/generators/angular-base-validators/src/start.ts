import { resolve } from 'path';

import { Project } from 'ts-morph';

import { generate, NestjsServiceGeneratorConfig } from './lib/generate';

import {
  BooleanField,
  EntityOneToManyField,
  Model,
  Project as Models,
  NumberBasicField,
  NumberIntegerField,
  StringBasicField,
  StringEmailField,
  StringPasswordField,
  StringTextField,
} from '@trxn/hapify-core';
// } from '@trxn/hapify-generators-nestjs-services';

/**
 * Role model
 */
const roleModel = new Model('Role')
  .addField(new NumberBasicField('Id').setPrimary(true).makeNotWritable())
  .addField(new StringBasicField('name').setMaxLength(50))
  .addField(new StringBasicField('description').setMaxLength(200));

/**
 * User model
 */
const userModel = new Model('User')
  .addField(new NumberBasicField('Id').setPrimary(true).makeNotWritable())
  .addField(new StringBasicField('FirstName').setMaxLength(50))
  .addField(new StringBasicField('LastName').setMaxLength(50))
  .addField(new StringEmailField('Email'))
  .addField(
    new StringPasswordField('Password')
      .setValidationRegex('/([0-9a-z]+)/')
      .makeNotReadable(),
  )
  .addField(
    new StringTextField('Description')
      .setNullable(true)
      .addMetadata('foo', 'bar'),
  )
  .addField(new BooleanField('Enabled').setDefaultValue(false))
  .addField(
    new NumberIntegerField('Credits')
      .setDefaultValue(10)
      .setMax(1000)
      .setNotes('Amount of credits remaining'),
  )
  .addField(new EntityOneToManyField('Role', roleModel));

const dataModel = new Models('app').addModel(userModel).addModel(roleModel);

const currentDir = resolve(__dirname, '..');
const config: NestjsServiceGeneratorConfig = {
  outputDirectory: currentDir,
  tsConfigFilePath: 'tsconfig.lib.json',
  generatedDirectory: 'src/ts-morph-generated',
};

// Instantiate the ts project
const project = new Project();

generate(project, dataModel, config);
