import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

/**
 * Extend nestjs ValidationPipe and use other default options
 *
 * Default changes:
 * ```json
 * {
 *   transform: true
 *   transformOptions: {
 *     enableImplicitConversion: false,
 *     exposeDefaultValues: true,
 *   }
 * }
 * ```
 */
export class TraxionValidationPipe extends ValidationPipe {
  constructor(options: ValidationPipeOptions = {}) {
    super({
      transform: true,
      transformOptions: {
        enableImplicitConversion: false,
        exposeDefaultValues: true,
      },
      ...options,
    });
  }
}
