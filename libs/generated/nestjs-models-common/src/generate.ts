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
  generate,
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
};
const userId = primaryField('id');
const userModel: Model = {
  name: 'User',
  fields: [
    userId,
    stringField('password', { isEncrypted: true }),
    stringField('email'),
    // enumField('test', { enum: MonEnum }),
  ],
};

const schema: Schema = {
  models: [userModel, roleModel],
};
const currentDir = resolve(__dirname, '..');
const config: NestjsServiceGeneratorConfig = {
  outputDirectory: currentDir,
  tsConfigFilePath: 'tsconfig.lib.json',
  generatedDirectory: 'src/ts-morph-generated',
};

// Instantiate the ts project
const project = new Project();

generate(project, schema, config);
