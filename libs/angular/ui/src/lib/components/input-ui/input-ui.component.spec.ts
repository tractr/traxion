import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputUiComponent } from './input-ui.component';

describe('InputUiComponent', () => {
  let component: InputUiComponent;
  let fixture: ComponentFixture<InputUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
