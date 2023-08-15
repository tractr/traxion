import { Controller, Get } from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Controller()
export class PrismaExceptionEndpointMockController {
  private readonly ERROR_MESSAGE = 'This is an example error message';

  private readonly ERROR_CLIENT_VERSION = '1.0.0';

  @Get('/known-request-error-not-found')
  knownRequestErrorNotFound(): PrismaClientKnownRequestError {
    throw new PrismaClientKnownRequestError(this.ERROR_MESSAGE, {
      code: 'P2001',
      clientVersion: this.ERROR_CLIENT_VERSION,
    });
  }

  @Get('/known-request-error-conflict')
  knownRequestErrorConflict(): PrismaClientKnownRequestError {
    throw new PrismaClientKnownRequestError(this.ERROR_MESSAGE, {
      code: 'P2000',
      clientVersion: this.ERROR_CLIENT_VERSION,
    });
  }

  @Get('/initialization-error-not-found')
  initializationErrorNotFound(): PrismaClientInitializationError {
    throw new PrismaClientInitializationError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
      'P2001',
    );
  }

  @Get('/client-validation-error')
  clientValidationError(): PrismaClientValidationError {
    throw new PrismaClientValidationError(this.ERROR_MESSAGE, {
      clientVersion: '5.0.0',
    });
  }

  @Get('/initialization-error-conflict')
  initializationErrorConflict(): PrismaClientInitializationError {
    throw new PrismaClientInitializationError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
      'P2000',
    );
  }

  @Get('/unknown-request-error')
  unknownRequestError(): PrismaClientUnknownRequestError {
    throw new PrismaClientUnknownRequestError(this.ERROR_MESSAGE, {
      clientVersion: this.ERROR_CLIENT_VERSION,
    });
  }

  @Get('/client-rust-panic-error')
  clientRustPanicError(): PrismaClientRustPanicError {
    throw new PrismaClientRustPanicError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
    );
  }

  @Get('/default-error')
  defaultError(): Error {
    throw new Error(this.ERROR_MESSAGE);
  }
}
