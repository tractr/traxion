import { Project } from 'ts-morph';

import {
  generateDtoIndexSourceFile,
  generateResolverIndexSourceFile,
} from './index.generator';

import { Model } from '@trxn/hapify-core';

describe('generateResolverIndexSourceFile', () => {
  const project = new Project();
  const models: Model[] = [
    { name: 'User', pluralName: '', fields: [], primaryKey: null },
    {
      name: 'Role',
      pluralName: '',
      fields: [],
      primaryKey: null,
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
