import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSubmitUiComponent } from './button-submit-ui.component';

describe('ButtonSubmitUiComponent', () => {
  let component: ButtonSubmitUiComponent;
  let fixture: ComponentFixture<ButtonSubmitUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonSubmitUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonSubmitUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
