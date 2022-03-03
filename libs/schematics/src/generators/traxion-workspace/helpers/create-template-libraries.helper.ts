/* eslint-disable no-await-in-loop */
import { Tree } from '@nrwl/devkit';

import { DEFAULT_LIBRARY_TYPE } from '../../../schematics.constants';
import hapifyLibraryGenerator from '../../hapify-library/generator';
import {
  AvailableLibraryType,
  AvailableTractrTemplates,
} from '../../hapify-library/schema';
import prismaLibraryGenerator from '../../prisma-library/generator';
import { NormalizedOptions } from '../schema';

export async function createTemplateLibraries(
  tree: Tree,
  options: NormalizedOptions,
) {
  const { generatedDir } = options;
  for (const [libraryName, type] of Object.entries(DEFAULT_LIBRARY_TYPE)) {
    if (libraryName === 'prisma') {
      await prismaLibraryGenerator(tree, {
        name: libraryName,
        directory: generatedDir,
      });
    } else {
      await hapifyLibraryGenerator(tree, {
        useSecondaryEndpoint: true,
        addSecondaryEndpoint: [],
        hapifyAdditionalTemplates: '',
        hapifyModelsJson: 'hapify-models.json',
        hapifyTemplate: libraryName as AvailableTractrTemplates,
        type: type as AvailableLibraryType,
        hapifyUseImportReplacements: true,
        name: libraryName,
        directory: generatedDir,
      });
    }
  }
}
