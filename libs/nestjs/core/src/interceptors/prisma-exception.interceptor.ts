import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PrismaExceptionInterceptor implements NestInterceptor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @CheckAuth()
  @CheckAuth()
  @CheckAuth()
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        let errorCode: string | undefined;

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          errorCode = error.code;
        } else if (error instanceof Prisma.PrismaClientInitializationError) {
          errorCode = error.errorCode;
        }
        if (errorCode && errorCode.substring(0, 2) === 'P2') {
          if (errorCode === 'P2001') {
            throw new NotFoundException(error.message);
          }
          throw new ConflictException(error.message);
        }

        if (error instanceof Prisma.PrismaClientValidationError) {
          throw new ConflictException(error.message);
        }
        if (
          error instanceof Prisma.PrismaClientUnknownRequestError ||
          error instanceof Prisma.PrismaClientRustPanicError
        ) {
          throw new InternalServerErrorException(error.message);
        }
        throw error;
      }),
    );
  }
}
