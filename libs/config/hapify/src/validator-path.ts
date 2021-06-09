import { normalize, relative } from 'path';

export const getValidatorPath = (currentPath: string) => {
  const validatorAbsolutePath = normalize(`${__dirname}/../validator.js`);
  return relative(currentPath, validatorAbsolutePath);
};
