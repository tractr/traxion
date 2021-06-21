#!/usr/bin/node

/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */

import { dirname, extname, join } from 'path';

import { IConfig, IConfigTemplate } from '@hapify/cli/dist/interface/Config';
import debugFactory from 'debug';
import * as deepmerge from 'deepmerge';
import { copy, readFile, readJSON, statSync, writeJSON } from 'fs-extra';
import * as yaml from 'yaml';

const debug = debugFactory('hpf-generate-config');

const configFilenamePriorityImportOrder = [
  '',
  '.hapifyrc.js',
  '.hapifyrc.yaml',
  '.hapifyrc.yml',
  '.hapifyrc.json',
  '.hapifyrc',
  'package.json',
  'hapify.json',
];

export interface HapifyTemplateConfig extends IConfigTemplate {
  inputPath?: string;
  outputPath?: string;
}

export interface HapifyConfig extends IConfig {
  extends?: string | string[];

  templates: HapifyTemplateConfig[];
}

export function isDirectory(path: string) {
  const stats = statSync(path);
  return stats.isDirectory();
}

async function getHapifyConfigFromDirectory(
  path: string,
): Promise<HapifyConfig | null> {
  for (const configFilename of configFilenamePriorityImportOrder) {
    const extension = extname(configFilename);
    const configFilePath = extension === '' ? path : join(path, configFilename);

    debug(`Looking for ${configFilePath}`);

    try {
      if (isDirectory(configFilePath)) continue;
    } catch {
      continue;
    }

    switch (extension) {
      case '':
      case '.js':
      case '.json': {
        const config = await import(configFilePath);
        if (configFilename !== 'package.json') return config.default ?? config;
        if (config.hapify) return config.hapify;
        break;
      }

      case '.yml':
      case '.yaml': {
        const fileContent = await readFile(configFilePath);
        return yaml.parse(fileContent.toString());
      }

      default: {
        return readJSON(configFilePath);
      }
    }
  }

  return null;
}

function mergeHapifyConfigs(
  configX: HapifyConfig | null,
  configY: HapifyConfig,
): HapifyConfig {
  return deepmerge(configX || {}, configY, {
    customMerge: (key) => {
      if (key === 'extends') return (_, toKeep) => toKeep;
      if (key === 'defaultFields') return (_, toKeep) => toKeep;

      return undefined;
    },
  });
}

async function getHapifyConfig(
  hapifyPath: string = process.cwd(),
  ignorePath: string[] = [],
): Promise<HapifyConfig | null> {
  debug(`Get the main configuration from ${hapifyPath}`);
  // First we need to get the main configuration file
  let mainConfig = await getHapifyConfigFromDirectory(hapifyPath);

  if (!mainConfig) return null;

  mainConfig = { ...mainConfig };

  if (mainConfig.templates) {
    mainConfig.templates = mainConfig.templates.map((template) => ({
      ...template,
      inputPath: join(
        isDirectory(hapifyPath) ? hapifyPath : dirname(hapifyPath),
        'hapify',
        template.path,
      ),
      outputPath: template.path,
    }));
  }

  const extendsList = mainConfig.extends;
  if (!extendsList) return mainConfig;

  const promises: Promise<HapifyConfig | null>[] = [];
  const toIgnore = [...ignorePath].concat(hapifyPath);
  const toExtendsList = Array.isArray(extendsList)
    ? extendsList
    : [extendsList];

  for (const extendPath of toExtendsList) {
    const resolve = require.resolve(extendPath, {
      paths: [process.cwd(), hapifyPath],
    });
    if (toIgnore && toIgnore.includes(resolve)) continue;

    promises.push(getHapifyConfig(resolve, toIgnore));
  }

  const configs = await Promise.all(promises);

  return configs
    .filter((config) => config !== null)
    .reverse()
    .concat(mainConfig)
    .reduce(
      (acc, config) => mergeHapifyConfigs(acc, config ?? ({} as never)),
      null,
    );
}

function formatTemplatePath(templatePath: string, extension: string): string {
  return `${templatePath}.${extension}`.replace(/[{}]/g, '__');
}

async function getHapifyOptions(): Promise<void> {
  debug('Start generate hapify configuration file');
  const currentDirectory = process.cwd();

  const hapifyConfig = await getHapifyConfig(currentDirectory);

  if (!hapifyConfig)
    throw new Error(`No hapify config found in ${process.cwd()} folder`);

  // At this point hapify should take the lead
  // Workaround that let hapify still run
  // First workaround cp all the files into `hapify`
  if (hapifyConfig.templates) {
    const promises: Promise<void>[] = [];
    hapifyConfig.templates.forEach((template) => {
      promises.push(
        copy(
          formatTemplatePath(template.inputPath || '', template.engine),
          formatTemplatePath(
            `${join(currentDirectory || '', 'hapify', template.path)}`,
            template.engine,
          ),
        ),
      );
    });
    await Promise.all(promises);
  }
  delete hapifyConfig.extends;
  hapifyConfig.templates = hapifyConfig.templates.map((template) => {
    const toSave = { ...template };
    delete toSave.inputPath;
    delete toSave.outputPath;
    return toSave;
  });

  const writeFile = join(currentDirectory || '', 'hapify.json');
  await writeJSON(writeFile, hapifyConfig, {
    spaces: 2,
  });

  debug(`Generated file: ${writeFile}`);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => getHapifyOptions())();
