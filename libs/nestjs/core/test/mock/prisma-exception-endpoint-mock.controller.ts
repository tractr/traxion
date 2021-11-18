import { Controller, Get } from '@nestjs/common';
import { Public } from '@tractr/nestjs-core';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

@Controller()
export class PrismaExceptionEndpointMockController {
  private readonly ERROR_MESSAGE = 'This is an example error message';
  private readonly ERROR_CLIENT_VERSION = '1.0.0';

  @Public()
  @Get('/known-request-error-not-found')
  knownRequestErrorNotFound(): PrismaClientKnownRequestError {
    throw new PrismaClientKnownRequestError(
      this.ERROR_MESSAGE,
      'P2001',
      this.ERROR_CLIENT_VERSION,
    );
  }

  @Public()
  @Get('/known-request-error-conflict')
  knownRequestErrorConflict(): PrismaClientKnownRequestError {
    throw new PrismaClientKnownRequestError(
      this.ERROR_MESSAGE,
      'P2000',
      this.ERROR_CLIENT_VERSION,
    );
  }

  @Public()
  @Get('/initialization-error-not-found')
  initializationErrorNotFound(): PrismaClientInitializationError {
    throw new PrismaClientInitializationError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
      'P2001',
    );
  }

  @Public()
  @Get('/client-validation-error')
  clientValidationError(): PrismaClientValidationError {
    throw new PrismaClientValidationError(this.ERROR_MESSAGE);
  }

  @Public()
  @Get('/initialization-error-conflict')
  initializationErrorConflict(): PrismaClientInitializationError {
    throw new PrismaClientInitializationError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
      'P2000',
    );
  }

  @Public()
  @Get('/unknown-request-error')
  unknownRequestError(): PrismaClientUnknownRequestError {
    throw new PrismaClientUnknownRequestError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
    );
  }

  @Public()
  @Get('/client-rust-panic-error')
  clientRustPanicError(): PrismaClientRustPanicError {
    throw new PrismaClientRustPanicError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
    );
  }

  @Public()
  @Get('/default-error')
  defaultError(): Error {
    throw new Error(this.ERROR_MESSAGE);
  }
}
