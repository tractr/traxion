/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */

import { extname, join } from 'path';

import { IConfig, IConfigTemplate } from '@hapify/cli/dist/interface/Config';
import debugFactory from 'debug';
import deepmerge from 'deepmerge';
import { copy, pathExists, readFile, readJSON, writeJSON } from 'fs-extra';
import pkgDir from 'pkg-dir';
import yaml from 'yaml';


const debug = debugFactory('hpf-generate-config');

const configFilenamePriorityImportOrder = [
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

async function getHapifyConfigFromDirectory(
  hapifyDirectory: string,
): Promise<HapifyConfig | null> {
  for (const configFilename of configFilenamePriorityImportOrder) {
    const extension = extname(configFilename);
    const configFilePath = join(hapifyDirectory, configFilename);

    if (!(await pathExists(configFilePath))) continue;

    switch (extension) {
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
  hapifyDirectory: string = __dirname,
  ignorePath: string[] = [],
): Promise<HapifyConfig | null> {
  const packageJsonDirectory = await pkgDir(hapifyDirectory);

  if (!packageJsonDirectory)
    throw new Error(`Cannot find package.json for ${hapifyDirectory}`);

  // First we need to get the main configuration file
  let mainConfig = await getHapifyConfigFromDirectory(packageJsonDirectory);

  if (!mainConfig) return null;

  mainConfig = { ...mainConfig };

  if (mainConfig.templates) {
    mainConfig.templates = mainConfig.templates.map((template) => ({
      ...template,
      inputPath: join(packageJsonDirectory, 'hapify', template.path),
      outputPath: template.path,
    }));
  }

  const extendsList = mainConfig.extends;
  if (!extendsList) return mainConfig;

  const promises: Promise<HapifyConfig | null>[] = [];
  const toIgnore = [...ignorePath].concat(hapifyDirectory);
  const toExtendsList = Array.isArray(extendsList)
    ? extendsList
    : [extendsList];

  for (const extendPath of toExtendsList) {
    const resolve = require.resolve(extendPath);
    if (toIgnore && toIgnore.includes(resolve)) continue;

    promises.push(getHapifyConfig(resolve, toIgnore));
  }

  const configs = await Promise.all(promises);

  return configs
    .filter((config) => config !== null)
    .reverse()
    .concat(mainConfig)
    .reduce(
      (acc, config) => mergeHapifyConfigs(acc, config as HapifyConfig),
      null,
    );
}

function formatTemplatePath(templatePath: string, extension: string): string {
  return `${templatePath}.${extension}`.replace(/[{}]/g, '__');
}

async function getHapifyOptions(): Promise<void> {
  debug('Start generate hapify configuration file');
  const packageJsonDirectory = await pkgDir();

  if (!packageJsonDirectory)
    throw new Error(`Cannot find package.json for the folder ${process.cwd()}`);

  const hapifyConfig = await getHapifyConfig(packageJsonDirectory);

  if (!hapifyConfig) return;

  // At this point hapify should take the lead
  // Workaround that let hapify still run
  // First workaround cp all the files into `hapify`
  if (hapifyConfig.templates) {
    const promises: Promise<void>[] = [];
    hapifyConfig.templates.forEach((template) => {
      promises.push(
        copy(
          formatTemplatePath(template.inputPath as string, template.engine),
          formatTemplatePath(
            `${join(packageJsonDirectory || '', 'hapify', template.path)}`,
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

  const writeFile = join(packageJsonDirectory || '', 'hapify.json');
  await writeJSON(writeFile, hapifyConfig, {
    spaces: 2,
  });

  debug(`Generated file: ${writeFile}`);
}

(async () => getHapifyOptions())();
