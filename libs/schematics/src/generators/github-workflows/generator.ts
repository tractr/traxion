import * as path from 'path';

import { formatFiles, generateFiles, offsetFromRoot, Tree } from '@nrwl/devkit';
import { prompt } from 'enquirer';
import { XOR } from 'ts-essentials';

import { GithubWorkflowGeneratorSchema } from './schema';

export type WorkflowFiles = 'test' | 'semantic' | 'release';
export const WORKFLOW_FILES: WorkflowFiles[] = ['test', 'semantic', 'release'];

type NormalizedSchema = XOR<{ all: true }, { workflows: WorkflowFiles[] }> & {
  projectRoot: string;
};

async function normalizeOptions({
  all = false,
  workflow: workflows = [],
}: GithubWorkflowGeneratorSchema): Promise<NormalizedSchema> {
  let availableWorkflows: WorkflowFiles[] = workflows as WorkflowFiles[];

  if (all && workflows.length > 0)
    throw new Error('Cannot use both --all and --workflows');

  if (!all && workflows.length === 0) {
    availableWorkflows = (
      await prompt<{ workflow: WorkflowFiles[] }>({
        type: 'multiselect',
        name: 'workflow',
        message: 'Select the workflows to generate',
        choices: WORKFLOW_FILES.map((workflow) => ({
          name: workflow,
          message: workflow[0].toUpperCase() + workflow.slice(1),
        })),
      })
    ).workflow;

    if (availableWorkflows.length === 0) {
      throw new Error(`Must use one of --all or --workflow`);
    }
  }

  availableWorkflows.forEach((workflow) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!WORKFLOW_FILES.includes(workflow as any))
      throw new Error(`Use of an unknown workflow: ${workflow}`);
  });

  const options = {
    projectRoot: '.',
  };

  return all
    ? { ...options, all: true }
    : { ...options, workflows: availableWorkflows };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
  };

  const workflows = options.all ? WORKFLOW_FILES : options.workflows;

  workflows.forEach((workflow) => {
    generateFiles(
      tree,
      path.join(__dirname, 'files', workflow),
      path.join(options.projectRoot, '.github'),
      templateOptions,
    );
  });
}

export default async function generateWorkflow(
  tree: Tree,
  options: GithubWorkflowGeneratorSchema,
) {
  const normalizedOptions = await normalizeOptions(options);

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
