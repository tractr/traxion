import { Controller, Get } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Public } from '../src/decorators/public.decorator';

@Controller()
export class PrismaExceptionEndpointMockController {
  private readonly ERROR_MESSAGE = 'This is an example error message';

  private readonly ERROR_CLIENT_VERSION = '1.0.0';

  @Public()
  @Get('/known-request-error-not-found')
  knownRequestErrorNotFound(): Prisma.PrismaClientKnownRequestError {
    throw new Prisma.PrismaClientKnownRequestError(this.ERROR_MESSAGE, {
      code: 'P2001',
      clientVersion: this.ERROR_CLIENT_VERSION,
    });
  }

  @Public()
  @Get('/known-request-error-conflict')
  knownRequestErrorConflict(): Prisma.PrismaClientKnownRequestError {
    throw new Prisma.PrismaClientKnownRequestError(this.ERROR_MESSAGE, {
      code: 'P2000',
      clientVersion: this.ERROR_CLIENT_VERSION,
    });
  }

  @Public()
  @Get('/initialization-error-not-found')
  initializationErrorNotFound(): Prisma.PrismaClientInitializationError {
    throw new Prisma.PrismaClientInitializationError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
      'P2001',
    );
  }

  @Public()
  @Get('/client-validation-error')
  clientValidationError(): Prisma.PrismaClientValidationError {
    throw new Prisma.PrismaClientValidationError(this.ERROR_MESSAGE);
  }

  @Public()
  @Get('/initialization-error-conflict')
  initializationErrorConflict(): Prisma.PrismaClientInitializationError {
    throw new Prisma.PrismaClientInitializationError(
      this.ERROR_MESSAGE,
      this.ERROR_CLIENT_VERSION,
      'P2000',
    );
  }

  @Public()
  @Get('/unknown-request-error')
  unknownRequestError(): Prisma.PrismaClientUnknownRequestError {
    throw new Prisma.PrismaClientUnknownRequestError(this.ERROR_MESSAGE, {
      clientVersion: this.ERROR_CLIENT_VERSION,
    });
  }

  @Public()
  @Get('/client-rust-panic-error')
  clientRustPanicError(): Prisma.PrismaClientRustPanicError {
    throw new Prisma.PrismaClientRustPanicError(
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
