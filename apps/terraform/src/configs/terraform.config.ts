import { TerraformEnvironmentVariables } from '../dtos';

import { transformAndValidate } from '@tractr/common';

export const appConfiguration = (): TerraformEnvironmentVariables => {
  let terraform;

  try {
    terraform = transformAndValidate(TerraformEnvironmentVariables)(
      process.env,
    );
  } catch (e) {
    console.error('Fail to start terraform, envrionment variables missing');
    console.error(e);
    throw e;
  }

  return {
    ...terraform,
  };
};
