import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPasswordUiComponent } from './input-password-ui.component';

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

  it('should have a default placeholder', () => {
    expect(component.placeholder).toEqual('Password');
  });

  it('should toggle the visibility of password input', async () => {
    // By default the password is hidden
    expect(component.showPassword).toBeFalsy();
    expect(component.input.nativeElement.type).toBe('password');

    // First click shows the password
    component.toggleShowPassword();
    await runOnPushChangeDetection(fixture);
    expect(component.showPassword).toBeTruthy();
    expect(component.input.nativeElement.type).toBe('text');

    // Second click hides the password
    component.toggleShowPassword();
    await runOnPushChangeDetection(fixture);
    expect(component.showPassword).toBeFalsy();
    expect(component.input.nativeElement.type).toBe('password');
  });

  it('should return a value', async () => {
    const setInputValue = async (value: unknown) => {
      component.input.nativeElement.value = value;
      (component.input.nativeElement as HTMLInputElement).dispatchEvent(
        new Event('input'),
      );
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
