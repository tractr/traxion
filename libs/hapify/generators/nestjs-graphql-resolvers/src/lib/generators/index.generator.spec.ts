import { Project } from 'ts-morph';

import {
  generateDtoIndexSourceFile,
  generateResolverIndexSourceFile,
} from './index.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateResolverIndexSourceFile', () => {
  const project = new Project();
  const userId: PrimaryField = {
    name: 'id',
    type: 'primary',
    pluralName: 'ids',
    scalar: 'string',
    relations: [],
  };
  const roleId: PrimaryField = {
    name: 'id',
    type: 'primary',
    pluralName: 'ids',
    scalar: 'string',
    relations: [],
  };

  const models: Model[] = [
    {
      name: 'User',
      pluralName: 'users',
      fields: [userId],
      primaryKey: {
        name: 'id',
        fields: [userId],
      },
      dbName: null,
    },
    {
      name: 'Role',
      pluralName: 'roles',
      fields: [roleId],
      primaryKey: {
        name: 'id',
        fields: [roleId],
      },
      dbName: null,
    },
  ];
  const path = './src';

  describe('generateResolverIndexSourceFile', () => {
    generateResolverIndexSourceFile(project, models, path);
    it('should generate an index file with the correct exports', () => {
      const expectedSource = `export * from "./user.resolver";
export * from "./role.resolver";
`;

      const sourceFile = project.getSourceFile(`${path}/resolvers/index.ts`);
      expect(sourceFile?.getText()).toEqual(expectedSource);
    });
  });
  describe('generateDtoIndexSourceFile', () => {
    it('should generate an index file with the correct exports', () => {
      generateDtoIndexSourceFile(project, models, path);

      const expectedSource = `export * from "./find-many-user-output.dto";
export * from "./find-many-role-output.dto";
        `;

      const sourceFile = project.getSourceFile(`${path}/dtos/index.ts`);
      expect(sourceFile?.getText().trim()).toEqual(expectedSource.trim());
    });
  });
});
