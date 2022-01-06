import {
  Catch,
  ConflictException,
  ExceptionFilter,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/index.js';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError): void {
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
