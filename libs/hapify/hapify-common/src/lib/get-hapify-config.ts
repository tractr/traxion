/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */

import { dirname, extname, join } from 'path';

import { IConfig, IConfigTemplate } from '@hapify/cli/dist/interface/Config';
import debugFactory from 'debug';
import * as deepmerge from 'deepmerge';
import { readFile, readJSON, statSync } from 'fs-extra';
import * as yaml from 'yaml';

const debug = debugFactory('hpf-common');

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
  importReplacements?: Record<string, string>;
}

export function isDirectory(path: string) {
  const stats = statSync(path);
  return stats.isDirectory();
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

export async function getHapifyConfig(
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
