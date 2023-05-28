import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      catchError((error) => {
        let errorCode: string | undefined;

        if (error instanceof PrismaClientKnownRequestError) {
          errorCode = error.code;
        } else if (error instanceof PrismaClientInitializationError) {
          errorCode = error.errorCode;
        }
        if (errorCode && errorCode.substring(0, 2) === 'P2') {
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
