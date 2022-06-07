import { ValidatorReturn } from './validators.interface';

/**
 * Merge two or more validator returns.
 * @param validators - array of validators
 * @returns
 */
export function validatorsMergeReturns(
  ...validators: Array<ValidatorReturn>
): ValidatorReturn {
  const errors: string[] = [];
  const warnings: string[] = [];
  validators.forEach((validator) => {
    if (validator.errors) {
      errors.push(...validator.errors);
    }
    if (validator.warnings) {
      warnings.push(...validator.warnings);
    }
  });
  return { errors, warnings };
}
