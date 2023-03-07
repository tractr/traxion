import { resolve } from 'path';

import { Project } from 'ts-morph';

import {
  enumField,
  Model,
  primaryField,
  Schema,
  stringField,
} from '@trxn/hapify-core';
import {
  hapifyNestjsServicesGenerator,
  NestjsServiceGeneratorConfig,
} from '@trxn/hapify-generators-nestjs-services';

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
  primaryKey: null
};
const userId = primaryField('id');
const userModel: Model = {
  name: 'User',
  fields: [
    userId,
    stringField('password'),
    stringField('email'),
    // enumField('test', { enum: MonEnum }),
  ],
  primaryKey: null
};

const schema: Schema = {
  models: [userModel, roleModel],
  enums: [],
  relations: []
};
const currentDir = resolve(__dirname, '..');
const config: NestjsServiceGeneratorConfig = {
  outputDirectory: currentDir,
  tsConfigFilePath: 'tsconfig.lib.json',
  generatedDirectory: 'src/ts-morph-generate',
};

// Instantiate the ts project
const project = new Project();

hapifyNestjsServicesGenerator(project, schema, config);
