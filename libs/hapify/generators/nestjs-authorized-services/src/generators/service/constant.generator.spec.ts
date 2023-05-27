import { Project } from 'ts-morph';

import { generateConstantSourceFile } from './constant.generator';

import { Model, PrimaryField } from '@trxn/hapify-core';

describe('generateConstantSourceFile', () => {
  it('should generate constants file for given model', () => {
    // Arrange
    const project = new Project();
    const id: PrimaryField = {
      name: 'id',
      type: 'primary',
      pluralName: 'ids',
      scalar: 'string',
      relations: [],
    };

    const model: Model = {
      name: 'User',
      pluralName: 'users',
      fields: [id],
      primaryKey: {
        name: 'id',
        fields: [id],
      },
      dbName: null,
    };
    const path = './src/models';
    const expectedContent = `export const USER_AUTHORIZED_SERVICE = 'USER_AUTHORIZED_SERVICE' as const;
`;

    // Act
    generateConstantSourceFile(project, model, path);

    // Assert
    const sourceFile = project.getSourceFile(
      `${path}/constants/user-authorized-service.constants.ts`,
    );
    expect(sourceFile?.getText()).toEqual(expectedContent);
  });
});
