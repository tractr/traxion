import { resolve } from 'path';

import {
  BooleanField,
  Model,
  NumberBasicField,
  NumberIntegerField,
  Root,
  StringBasicField,
  StringEmailField,
  StringPasswordField,
  StringTextField,
} from '@trxn/hapify-core';
import {
  generate,
  GraphqlResolverGeneratorConfig,
} from '@trxn/hapify-generator-graphql-resolvers';

const idField = new NumberBasicField('Id')
  .setPrimary(true)
  .setInternal(true)
  .setOwnership(true);

const dataModels = new Root('app').addModel(
  new Model('User')
    .addField(idField)
    .addField(new StringBasicField('FirstName').setMaxLength(50))
    .addField(new StringBasicField('LastName').setMaxLength(50))
    .addField(new StringEmailField('Email'))
    .addField(
      new StringPasswordField('Password')
        .setValidationRegex('/([0-9a-z]+)/')
        .setInternal(true),
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
    ),
);

const currentDir = resolve(__dirname, '..');
const config: GraphqlResolverGeneratorConfig = {
  outputDirectory: currentDir,
  tsConfigFilePath: 'tsconfig.lib.json',
  generatedDirectory: 'src/ts-morph-generated',
};

generate(dataModels, config);
