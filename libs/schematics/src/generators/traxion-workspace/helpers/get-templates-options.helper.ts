import { Tree } from '@nrwl/devkit';

import { NormalizedOptions } from '../schema';

export type TemplateOptions = NormalizedOptions & {
  template: string;
};

export function getTemplatesOptions(
  tree: Tree,
  options: NormalizedOptions,
): TemplateOptions {
  return {
    ...options,
    template: '',
  };
}
