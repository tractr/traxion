import { names, readProjectConfiguration, Tree } from '@nrwl/devkit';
import { Schema } from '@nrwl/workspace/src/generators/library/schema';

export function normalizeOptions(
  tree: Tree,
  schema: Partial<Schema>,
): NormalizedSchema {
  // Create a schema with populated default values
  const options: Schema = {
    name: '', // JSON validation will ensure this is set
    ...schema,
  };
  const name = names(options.name).fileName;
  const projectConfiguration = readProjectConfiguration(tree, name);
  const projectRoot = projectConfiguration.root;

  return {
    ...options,
    name,
    projectRoot,
  };
}

export interface NormalizedSchema extends Schema {
  name: string;
  projectRoot: string;
}
