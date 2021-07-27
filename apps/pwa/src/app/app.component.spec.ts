import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(
    waitForAsync(async () => {
      await TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [
          {
            provide: APP_BASE_HREF,
            useValue: '/',
          },
        ],
        imports: [RouterModule.forRoot([]), HttpClientModule],
      }).compileComponents();
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
