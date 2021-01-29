/* eslint-disable no-await-in-loop */
/* eslint-disable no-continue */

import * as pkgDir from 'pkg-dir';
import { join, extname } from 'path';
import { readFile, pathExists, readJSON, writeJSON, copy } from 'fs-extra';
import yaml from 'js-yaml';
import * as deepmerge from 'deepmerge';

import { IConfig, IConfigTemplate } from '@hapify/cli/dist/interface/Config';

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
  extends: string | string[];

  templates: HapifyTemplateConfig[];
}

async function getHapifyConfigFromDirectory(
  hapifyDirectory: string
): Promise<HapifyConfig | null> {
  for (const configFilename of configFilenamePriorityImportOrder) {
    const extension = extname(configFilename);
    const configFilePath = join(hapifyDirectory, configFilename);

    if (!(await pathExists(configFilePath))) continue;

    switch (extension) {
      case '.js':
      case '.json': {
        const config = await import(configFilePath);
        if (configFilename !== 'package.json') return config;
        if (config.hapify) return config.hapify;
        break;
      }

      case '.yml':
      case '.yaml': {
        const fileContent = await readFile(configFilePath);
        return yaml.safeLoad(fileContent);
      }

      default: {
        return readJSON(configFilePath);
      }
    }
  }

  return null;
}

function mergeHapifyConfigs(
  configX: HapifyConfig,
  configY: HapifyConfig
): HapifyConfig {
  return deepmerge(configX, configY, {
    customMerge: (key) => {
      if (key === 'extends') return (_, toKeep) => toKeep;
      return undefined;
    },
  });
}

async function getHapifyConfig(
  hapifyDirectory: string = __dirname,
  ignorePath: string[] = []
): Promise<HapifyConfig | null> {
  const packageJsonDirectory = await pkgDir(hapifyDirectory);

  // First we need to get the main configuration file
  const mainConfig = await getHapifyConfigFromDirectory(packageJsonDirectory);
  let configToExtend;

  if (!mainConfig) return null;

  const extendsList = mainConfig.extends;
  if (extendsList) {
    const promises: Promise<HapifyConfig | null>[] = [];
    const toIgnore = [...ignorePath].concat(hapifyDirectory);
    const toExtendsList = Array.isArray(extendsList)
      ? extendsList
      : [extendsList];

    for (const extendPath of toExtendsList) {
      const resolve = require.resolve(extendPath);
      if (toIgnore.includes(resolve)) continue;

      promises.push(getHapifyConfig(resolve, toIgnore));
    }

    configToExtend = {};
    (await Promise.all(promises))
      .filter((config) => !!config)
      .reverse()
      .forEach((config) => {
        configToExtend = mergeHapifyConfigs(configToExtend, config);
      });
  }

  const { templates } = mainConfig;
  if (templates) {
    mainConfig.templates = templates.map((template) => ({
      ...template,
      inputPath: join(packageJsonDirectory, 'hapify', template.path),
      outputPath: template.path,
    }));
  }

  return mergeHapifyConfigs(configToExtend || {}, mainConfig);
}

// eslint-disable-next-line consistent-return
async function getHapifyOptions(): Promise<void> {
  console.info('Start generate hapify configuration file');
  const packageJsonDirectory = await pkgDir();
  const hapifyConfig = await getHapifyConfig(packageJsonDirectory);

  if (!hapifyConfig) return null;

  console.log(hapifyConfig);
  // At this point hapify should take the lead
  // Workaround that let hapify still run
  // First workaround cp all the files into `hapify`
  if (hapifyConfig.templates) {
    const promises = [];
    hapifyConfig.templates.forEach((template) => {
      promises.push(
        copy(
          `${template.inputPath}.hpf`,
          `${join(packageJsonDirectory, 'hapify', template.path)}.hpf`
        )
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

  const writeFile = join(packageJsonDirectory, 'hapify.json');
  await writeJSON(writeFile, hapifyConfig, {
    spaces: 2,
  });

  console.info(`Generated file: ${writeFile}`);
}

(async () => getHapifyOptions())();
