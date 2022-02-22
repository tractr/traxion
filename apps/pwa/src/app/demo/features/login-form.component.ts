import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BlogPost } from '@prisma/client';
import { catchError, Observable, of } from 'rxjs';

import {
  BlogPostService,
  ProfilService,
  TagService,
  UserService,
} from '@tractr/generated-angular-rext-client';
import { Profil, Tag, User } from '@tractr/generated-models';

export type ErrorMessage = { status: number; message: string };
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
  public tagUnique$!: Observable<Tag | never[]>;
  public tagUpdate$!: Observable<Tag | never[]>;
  public tagCreate$!: Observable<Tag | never[]>;
  public tagUpsert$!: Observable<Tag | never[]>;
  public tagDelete$!: Observable<Tag | never[]>;
  public tagsError!: ErrorMessage;
  public tagUniqueError!: ErrorMessage;
  public tagUpdateError!: ErrorMessage;
  public tagCreateError!: ErrorMessage;
  public tagUpsertError!: ErrorMessage;
  public tagDeleteError!: ErrorMessage;

  public users$!: Observable<User[]>;
  public userUnique$!: Observable<User | never[]>;
  public userUpdate$!: Observable<User | never[]>;
  public userCreate$!: Observable<User | never[]>;
  public userUpsert$!: Observable<User | never[]>;
  public userDelete$!: Observable<User | never[]>;
  public usersError!: ErrorMessage;
  public userUniqueError!: ErrorMessage;
  public userUpdateError!: ErrorMessage;
  public userCreateError!: ErrorMessage;
  public userUpsertError!: ErrorMessage;
  public userDeleteError!: ErrorMessage;

  public blogPosts$!: Observable<BlogPost[]>;
  public blogPostUnique$!: Observable<BlogPost | never[]>;
  public blogPostUpdate$!: Observable<BlogPost | never[]>;
  public blogPostCreate$!: Observable<BlogPost | never[]>;
  public blogPostUpsert$!: Observable<BlogPost | never[]>;
  public blogPostDelete$!: Observable<BlogPost | never[]>;
  public blogPostsError!: ErrorMessage;
  public blogPostUniqueError!: ErrorMessage;
  public blogPostUpdateError!: ErrorMessage;
  public blogPostCreateError!: ErrorMessage;
  public blogPostUpsertError!: ErrorMessage;
  public blogPostDeleteError!: ErrorMessage;

  public profils$!: Observable<Profil[]>;
  public profilUnique$!: Observable<Profil | never[]>;
  public profilUpdate$!: Observable<Profil | never[]>;
  public profilCreate$!: Observable<Profil | never[]>;
  public profilUpsert$!: Observable<Profil | never[]>;
  public profilDelete$!: Observable<Profil | never[]>;
  public profilsError!: ErrorMessage;
  public profilUniqueError!: ErrorMessage;
  public profilUpdateError!: ErrorMessage;
  public profilCreateError!: ErrorMessage;
  public profilUpsertError!: ErrorMessage;
  public profilDeleteError!: ErrorMessage;

  constructor(
    private userService: UserService,
    private blogPostService: BlogPostService,
    private profilService: ProfilService,
    private tagService: TagService,
  ) {}

  ngOnInit(): void {
    // if (this.sessionService.isLogged()) {
    // id en dur car on ne peut pas utiliser la methode isLogged() car elle est bloquée par l'api
    this.currentUser$ = this.userService.findUnique$({
      id: 'ef4caf08-29c1-4f68-8a72-a71f45babf5f',
    });

    this.blogPostMethods();
    this.profilMethods();
    this.userMethods();
    this.tagMethods();

    // }
  }

  userMethods(): void {
    this.users$ = this.userService.findMany$().pipe(
      catchError((error) => {
        this.usersError = { status: error.status, message: error.message };
        return of([]);
      }),
    );

    this.userUnique$ = this.userService
      .findUnique$({ id: 'ef4caf08-29c1-4f68-8a72-a71f45babf5f' })
      .pipe(
        catchError((error) => {
          this.userUniqueError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.userUpdate$ = this.userService
      .patch$(
        { id: '835aa72e-d582-425a-925b-933f67bf9280' },
        { name: 'guest-demo' },
      )
      .pipe(
        catchError((error) => {
          this.userUpdateError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.userCreate$ = this.userService
      .create$({
        name: `Demo user ${Math.floor(Math.random() * 10)}`,
        email: `demouser-${Math.floor(Math.random() * 1000)}@traxion.com`,
        roles: ['guest'],
      })
      .pipe(
        catchError((error) => {
          this.userCreateError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.userUpsert$ = this.userService
      .upsert$(
        { id: '38e65cc6-b288-4262-8d78-f37d8185049d' },
        {
          name: `Demo user ${Math.floor(Math.random() * 10)}`,
          email: `demouser-${Math.floor(Math.random() * 1000)}@traxion.com`,
          roles: ['guest'],
        },
      )
      .pipe(
        catchError((error) => {
          this.userUpsertError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.userDelete$ = this.userService
      .remove$({
        id: '38e65cc6-b288-4262-8d78-f37d8185049d',
      })
      .pipe(
        catchError((error) => {
          this.userDeleteError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );
  }

  profilMethods(): void {
    this.profils$ = this.profilService.findMany$().pipe(
      catchError((error) => {
        this.profilsError = { status: error.status, message: error.message };
        return of([]);
      }),
    );

    this.profilUnique$ = this.profilService
      .findUnique$({ id: 'ef4caf08-29c1-4f68-8a72-a71f45babf5f' })
      .pipe(
        catchError((error) => {
          this.profilUniqueError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.profilUpdate$ = this.profilService
      .patch$(
        { id: '835aa72e-d582-425a-925b-933f67bf9280' },
        {
          user: '835aa72e-d582-425a-925b-933f67bf9280',
          address: `Demo profil adresse ${Math.floor(Math.random() * 100)}`,
        },
      )
      .pipe(
        catchError((error) => {
          this.profilUpdateError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.profilCreate$ = this.profilService
      .create$({
        user: '835aa72e-d582-425a-925b-933f67bf9280',
        phone: '0612345678',
        address: `Demo profil adresse ${Math.floor(Math.random() * 100)}`,
      })
      .pipe(
        catchError((error) => {
          this.profilCreateError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.profilUpsert$ = this.profilService
      .upsert$(
        { id: '38e65cc6-b288-4262-8d78-f37d8185049d' },
        {
          user: '835aa72e-d582-425a-925b-933f67bf9280',
          phone: '0612344848',
          address: `Demo profil adresse upsert ${Math.floor(
            Math.random() * 100,
          )}`,
        },
      )
      .pipe(
        catchError((error) => {
          this.profilUpsertError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.profilDelete$ = this.profilService
      .remove$({
        id: '38e65cc6-b288-4262-8d78-f37d8185049d',
      })
      .pipe(
        catchError((error) => {
          this.profilDeleteError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );
  }

  blogPostMethods(): void {
    this.blogPosts$ = this.blogPostService.findMany$().pipe(
      catchError((error) => {
        this.blogPostsError = { status: error.status, message: error.message };
        return of([]);
      }),
    );

    this.blogPostUnique$ = this.blogPostService
      .findUnique$({ id: '035884f7-ba6f-4556-b1f1-3f16050cf860' })
      .pipe(
        catchError((error) => {
          this.blogPostUniqueError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.blogPostUpdate$ = this.blogPostService
      .patch$(
        { id: '835aa72e-d582-425a-925b-933f67bf9280' },
        { title: `Demo blogPost updated ${Math.floor(Math.random() * 100)}` },
      )
      .pipe(
        catchError((error) => {
          this.blogPostUpdateError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.blogPostCreate$ = this.blogPostService
      .create$({
        title: `Demo blogPost ${Math.floor(Math.random() * 10)}`,
        content:
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, vel.',
        status: 'draft',
        tags: ['tag 2'],
        author: 'ef4caf08-29c1-4f68-8a72-a71f45babf5f',
      })
      .pipe(
        catchError((error) => {
          this.blogPostCreateError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.blogPostUpsert$ = this.blogPostService
      .upsert$(
        { id: '38e65cc6-b288-4262-8d78-f37d8185049d' },
        {
          title: `Demo blogPost ${Math.floor(Math.random() * 10)}`,
          content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, vel upsert.',
          status: 'draft',
          author: 'ef4caf08-29c1-4f68-8a72-a71f45babf5f',
          tags: ['tag 3'],
        },
      )
      .pipe(
        catchError((error) => {
          this.blogPostUpsertError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.blogPostDelete$ = this.blogPostService
      .remove$({
        id: '38e65cc6-b288-4262-8d78-f37d8185049d',
      })
      .pipe(
        catchError((error) => {
          this.blogPostDeleteError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );
  }

  tagMethods(): void {
    this.tags$ = this.tagService.findMany$().pipe(
      catchError((error) => {
        this.tagsError = { status: error.status, message: error.message };
        return of([]);
      }),
    );

    this.tagUnique$ = this.tagService
      .findUnique$({ id: '17da8268-aac0-49e8-b065-e3d1bb8e2c97' })
      .pipe(
        catchError((error) => {
          this.tagUniqueError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.tagUpdate$ = this.tagService
      .patch$(
        { id: '17da8268-aac0-49e8-b065-e3d1bb8e2c97' },
        { label: 'testasdbajdsajsd' },
      )
      .pipe(
        catchError((error) => {
          this.tagUpdateError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.tagCreate$ = this.tagService
      .create$({ label: `Tag create ${Math.floor(Math.random() * 10)}` })
      .pipe(
        catchError((error) => {
          this.tagCreateError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.tagUpsert$ = this.tagService
      .upsert$(
        { id: '38e65cc6-b288-4262-8d78-f37d8185049d' },
        {
          label: `Demo tag ${Math.floor(Math.random() * 10)}`,
        },
      )
      .pipe(
        catchError((error) => {
          this.tagUpsertError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );

    this.tagDelete$ = this.tagService
      .remove$({
        id: '38e65cc6-b288-4262-8d78-f37d8185049d',
      })
      .pipe(
        catchError((error) => {
          this.tagDeleteError = {
            status: error.status,
            message: error.message,
          };
          return of([]);
        }),
      );
  }
}
