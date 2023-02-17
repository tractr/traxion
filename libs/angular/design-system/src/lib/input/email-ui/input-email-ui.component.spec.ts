import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEmailUiComponent } from './input-email-ui.component';

describe('InputEmailUiComponent', () => {
  let component: InputEmailUiComponent;
  let fixture: ComponentFixture<InputEmailUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputEmailUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputEmailUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
