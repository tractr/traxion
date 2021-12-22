import { TerraformEnvironmentVariables } from '../dtos';

import { transformAndValidate } from '@tractr/common';

export const getTerraformConfiguration = (): TerraformEnvironmentVariables => {
  let terraform;

  try {
    terraform = transformAndValidate(TerraformEnvironmentVariables)(
      process.env,
    );
  } catch (e: unknown) {
    if (Array.isArray(e)) {
      console.error('Fail to start terraform, environment variables missing');
      console.error(
        e
          .flatMap((err: { constraints: Record<string, string> }) =>
            Object.keys(err.constraints).map((type) => err.constraints[type]),
          )
          .map((errString: string) => `  - ${errString}`)
          .join('\n'),
      );
    }
    throw e;
  }

  return {
    ...terraform,
  };
};
