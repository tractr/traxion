import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordUiComponent } from './input-password-ui.component';

describe('InputPasswordUiComponent', () => {
  let component: InputPasswordUiComponent;
  let fixture: ComponentFixture<InputPasswordUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPasswordUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputPasswordUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle the visibility of password input', () => {
    // first click shows the password
    component.toggleShowPassword();
    expect(component.showPassword).toBeTruthy();

    // second click hides the password
    component.toggleShowPassword();
    expect(component.showPassword).toBeFalsy();
  });
});
