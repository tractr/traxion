import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { catchError, Observable, of, Subject } from 'rxjs';

import { LoginCredentials } from '../ui/login-form-ui/login-form-ui.component';

import { SessionService } from '@tractr/angular-authentication';
import { ErrorService } from '@tractr/angular-tools';
import { TagService, UserService } from '@tractr/generated-angular-rext-client';
import { Tag, User } from '@tractr/generated-models';

@Component({
  selector: 'stack-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  public isUserLogged = false;

  public currentUser$!: Observable<User>;

  public tags$!: Observable<Tag[]>;
  // public tagsError$ = new Subject();
  public tagsError!: { status: number; message: string };

  constructor(
    private sessionService: SessionService,
    private errorService: ErrorService,
    private userService: UserService,
    private tagService: TagService,
  ) {}

  ngOnInit(): void {
    // if (this.sessionService.isLogged()) {
    // id en dur car on ne peut pas utiliser la methode isLogged() car elle est bloquée par l'api
    this.currentUser$ = this.userService.findUnique$({
      id: 'ef4caf08-29c1-4f68-8a72-a71f45babf5f',
    });

    this.tags$ = this.tagService.findMany$().pipe(
      catchError((error) => {
        // this.tagsError$.next(error);
        this.tagsError = { status: error.status, message: error.message };
        return of([]);
      }),
    );
    // }
  }

  /**
   * Log a user on login event
   * @param credentials Login credentials
   */
  async login({ email, password }: LoginCredentials) {
    try {
      const isLogged = await this.sessionService.login(email, password);
      console.log('okok');

      // console.log(this.sessionService.isLogged());

      if (isLogged) {
        this.isUserLogged = true;
        console.log('isLogged', this.isUserLogged);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      this.errorService.handle(error);
    }
  }
}
