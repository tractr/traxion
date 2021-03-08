import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    switch (exception.code) {
      case 'P2001':
        throw new NotFoundException(exception);
      case 'P2002':
        throw new ConflictException(exception);
      default:
        throw new InternalServerErrorException(exception);
    }
  }
}
