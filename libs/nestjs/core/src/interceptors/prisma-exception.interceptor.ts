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
  private ERROR_CODE: string | undefined;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          this.ERROR_CODE = error.code;
        } else if (error instanceof PrismaClientInitializationError) {
          this.ERROR_CODE = error.errorCode;
        }

        if (this.ERROR_CODE && this.ERROR_CODE.substr(0, 2) === 'P2') {
          if (this.ERROR_CODE === 'P2001') {
            throw new NotFoundException(error.message);
          }
          throw new ConflictException(error.message);
        } else if (error instanceof PrismaClientValidationError) {
          throw new ConflictException(error.message);
        } else if (
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
