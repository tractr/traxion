import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        let errorCode: string | undefined;

        if (error instanceof PrismaClientKnownRequestError) {
          errorCode = error.code;
        } else if (error instanceof PrismaClientInitializationError) {
          errorCode = error.errorCode;
        }

        if (errorCode && errorCode.substr(0, 2) === 'P2') {
          if (errorCode === 'P2001') {
            throw new NotFoundException(error.message);
          }
          throw new ConflictException(error.message);
        }

        if (error instanceof PrismaClientValidationError) {
          throw new ConflictException(error.message);
        }
        if (
          error instanceof PrismaClientUnknownRequestError ||
          error instanceof PrismaClientRustPanicError
        ) {
          throw new InternalServerErrorException(error.message);
        }
        throw error;
      }),
    );
  }
}
