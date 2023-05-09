/* eslint-disable @typescript-eslint/no-misused-promises */
import { Project } from 'ts-morph';

import { generateCanSourceFile } from './generators/can/can.generator';
import { generateCanIndexSourceFile } from './generators/can/index.generator';
import { generateDefaultOwnershipSelectConstantSourceFile } from './generators/constants/default-ownership-select.generator';
import { generateConstantsIndexSourceFile } from './generators/constants/index.generator';
import { generateUserSelectWithOwnershipIdsSourceFile } from './generators/constants/user-select-with-ownership-ids.generator';
import { generateUserDefaultPermissions } from './generators/default-permissions/default-permissions.generator';
import { generateGetSelectPrismaUserQuerySourceFile } from './generators/helpers/get-select-prisma-user-query.generators';
import { generateHelpersIndexSourceFile } from './generators/helpers/index.generator';
import { generateAppAbilitySourceFile } from './generators/types/app-ability.generator copy';
import { generateDefaultOwnershipSelectSourceFile } from './generators/types/default-ownership-select.generator';
import { generateTypesIndexSourceFile } from './generators/types/index.generator';
import { generateUserOwnershipSourceFile } from './generators/types/user-ownership.generator';

import { ModelWithOwnership, Schema } from '@trxn/hapify-core';

export type NestjsServiceAuthorizedGeneratorConfig = {
  output: string;
  overwrite?: boolean;
};

export function hapifyCaslConfigGenerator(
  project: Project,
  dataModel: Schema,
  userWithOwnershipIds: ModelWithOwnership,
  config: NestjsServiceAuthorizedGeneratorConfig,
) {
  const { output } = config;

  // Generate Can Folder
  dataModel.models.forEach((model) => {
    generateCanSourceFile(project, userWithOwnershipIds, model, output);
  });
  generateCanIndexSourceFile(project, dataModel.models, output);

  // Generate constants
  generateUserSelectWithOwnershipIdsSourceFile(
    project,
    userWithOwnershipIds,
    output,
  );
  generateDefaultOwnershipSelectConstantSourceFile(
    project,
    dataModel.models,
    output,
  );
  generateConstantsIndexSourceFile(project, output);

  // Generate helpers
  generateHelpersIndexSourceFile(project, output);
  generateGetSelectPrismaUserQuerySourceFile(project, output);

  // Generate types
  generateDefaultOwnershipSelectSourceFile(project, dataModel.models, output);
  generateAppAbilitySourceFile(project, dataModel.models, output);
  generateUserOwnershipSourceFile(project, output);
  generateTypesIndexSourceFile(project, output);

  // Generate default permissions
  generateUserDefaultPermissions(
    project,
    userWithOwnershipIds,
    dataModel.models,
    output,
  );
}
