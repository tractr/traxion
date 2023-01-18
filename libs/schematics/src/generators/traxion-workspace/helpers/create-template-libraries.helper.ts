/* eslint-disable no-await-in-loop */
import { Tree } from '@nrwl/devkit';

import { DEFAULT_LIBRARY_TYPE } from '../../../schematics.constants';
import hapifyLibraryGenerator from '../../hapify-library/generator';
import prismaLibraryGenerator from '../../prisma-library/generator';
import { NormalizedOptions } from '../schema';

export async function createTemplateLibraries(
  tree: Tree,
  { librariesToInstall }: NormalizedOptions,
) {
  for (const libraryName of librariesToInstall) {
    if (libraryName === 'prisma') {
      await prismaLibraryGenerator(tree, {
        name: libraryName,
        skipInstall: true,
      });
    } else {
      await hapifyLibraryGenerator(tree, {
        useSecondaryEndpoint: true,
        addSecondaryEndpoint: [],
        hapifyAdditionalTemplates: '',
        hapifyModelsJson: 'hapify-models.json',
        hapifyTemplate: libraryName,
        type: DEFAULT_LIBRARY_TYPE[libraryName],
        hapifyUseImportReplacements: true,
        skipInstall: true,
      });
    }
  }
}
