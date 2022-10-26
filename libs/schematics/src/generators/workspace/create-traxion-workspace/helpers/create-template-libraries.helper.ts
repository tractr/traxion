/* eslint-disable no-await-in-loop */
import { Tree } from '@nrwl/devkit';

import {
  DEFAULT_LIBRARY_TYPE,
  TraxionListPackages,
} from '../../../../schematics.constants';
import hapifyLibraryGenerator from '../../../libs/library/generator';
import prismaLibraryGenerator from '../../../libs/prisma/generator';

export async function createTemplateLibraries(tree: Tree) {
  for (const [libraryName, type] of Object.entries(DEFAULT_LIBRARY_TYPE)) {
    if (libraryName === 'prisma') {
      await prismaLibraryGenerator(tree, {
        name: libraryName,
      });
    } else {
      await hapifyLibraryGenerator(tree, {
        useSecondaryEndpoint: true,
        addSecondaryEndpoint: [],
        hapifyAdditionalTemplates: '',
        hapifyModelsJson: 'hapify-models.json',
        hapifyTemplate: libraryName as TraxionListPackages,
        type,
        hapifyUseImportReplacements: true,
        name: libraryName,
        standalone: true,
      });
    }
  }
}
