import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { Tag, User as UserType } from '@prisma/client';
import {
  catchError,
  map,
  mergeMap,
  Observable,
  of,
  OperatorFunction,
  pipe,
  switchMap,
} from 'rxjs';

import { SessionService } from '@tractr/angular-authentication';
import { TagService, UserService } from '@tractr/generated-angular-rext-client';
import { User } from '@tractr/generated-models';

export type ApiResponse<T> = {
  status: number;
  error?: string;
  data?: T;
};

@Component({
  selector: 'tractr-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  constructor(
    public sessionService: SessionService<UserType>,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  public currentUser$: Observable<UserType | null> = this.sessionService.me$;

  public userIdOrNull$: Observable<string | null> =
    this.sessionService.me$.pipe(
      map((user) => {
        if (user) {
          return user.id;
        }
        return null;
      }),
    );

  public users$: Observable<ApiResponse<User[]>> = this.userIdOrNull$.pipe(
    switchMap(() => this.userService.findMany$().pipe(this.toApiResponse())),
  );

  public usersCount$: Observable<ApiResponse<number>> = this.userIdOrNull$.pipe(
    mergeMap(() => this.userService.count$().pipe(this.toApiResponse())),
  );

  public userUnique$: Observable<ApiResponse<User>> = this.userIdOrNull$.pipe(
    switchMap((id) => {
      if (id)
        return this.userService.findUnique$({ id }).pipe(this.toApiResponse());
      return of({ status: 404, error: 'id not found' });
    }),
  );

  public tags$: Observable<ApiResponse<Tag[]>> = this.userIdOrNull$.pipe(
    mergeMap(() => this.tagService.findMany$().pipe(this.toApiResponse())),
  );

  public tagsCount$: Observable<ApiResponse<number>> = this.userIdOrNull$.pipe(
    mergeMap(() => this.tagService.count$().pipe(this.toApiResponse())),
  );

  public toApiResponse<T>(): OperatorFunction<T, ApiResponse<T>> {
    return pipe(
      map((data) => ({ status: 200, data })),
      catchError(({ status, message }) => of({ status, error: message })),
    );
  }
}
