import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextUiComponent } from './input-text-ui.component';

describe('InputTextUiComponent', () => {
  let component: InputTextUiComponent;
  let fixture: ComponentFixture<InputTextUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
