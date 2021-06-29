import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validateFactory<T>(classValidator: ClassConstructor<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (config: Record<string, any>): T => {
    const validatedConfig = plainToClass(classValidator, config, {
      enableImplicitConversion: true,
    });
    // eslint-disable-next-line @typescript-eslint/ban-types
    const errors = validateSync(validatedConfig as unknown as object, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(
        `Fail to parse environment variables:\n\n${errors.join('\n')}`,
      );
    }
    return validatedConfig;
  };
}
