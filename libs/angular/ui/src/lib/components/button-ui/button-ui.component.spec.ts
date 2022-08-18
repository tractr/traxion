import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonUiComponent } from './button-ui.component';

describe('ButtonUiComponent', () => {
  let component: ButtonUiComponent;
  let fixture: ComponentFixture<ButtonUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
