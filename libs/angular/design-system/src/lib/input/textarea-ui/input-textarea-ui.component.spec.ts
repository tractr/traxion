import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextareaUiComponent } from './input-textarea-ui.component';

/**
 * Changes in components using OnPush strategy are only applied once when calling .detectChanges(),
 * This function solves this issue.
 */
export async function runOnPushChangeDetection(
  fixture: ComponentFixture<unknown>,
): Promise<void> {
  const changeDetectorRef =
    fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  changeDetectorRef.detectChanges();
  return fixture.whenStable();
}

describe('InputTextUiComponent', () => {
  let component: InputTextareaUiComponent;
  let fixture: ComponentFixture<InputTextareaUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextareaUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextareaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default placeholder', () => {
    expect(component.placeholder).toEqual('Textarea');
  });

  it('should return a value', async () => {
    const setInputValue = async (value: string) => {
      component.input.nativeElement.value = value;
      component.input.nativeElement.dispatchEvent(new Event('input'));
      await runOnPushChangeDetection(fixture);
    };

    // Check initial value
    expect(component.input.nativeElement.value).toEqual('');

    // Set by last value of input value stream
    let lastValue: string | undefined;
    component.value$.subscribe((value) => {
      lastValue = value;
    });
    expect(lastValue).toEqual(undefined);

    // Set value to 'abc'
    await setInputValue('abc');
    expect(lastValue).toEqual('abc');

    // Set value to 'def'
    await setInputValue('def');
    expect(lastValue).toEqual('def');

    // Set empty value
    await setInputValue('');
    expect(lastValue).toEqual('');
  });
});
