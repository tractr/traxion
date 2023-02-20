import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberUiComponent } from './input-number-ui.component';

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

describe('InputNumberUiComponent', () => {
  let component: InputNumberUiComponent;
  let fixture: ComponentFixture<InputNumberUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNumberUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputNumberUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a default placeholder', () => {
    expect(component.placeholder).toEqual('Number');
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
    let lastValue: number | undefined;
    component.value$.subscribe((value) => {
      lastValue = value;
    });
    expect(lastValue).toEqual(undefined);

    // Set value to 1
    await setInputValue(1);
    expect(lastValue).toEqual(1);

    // Set value to 2
    await setInputValue(2);
    expect(lastValue).toEqual(2);

    // Set value to undefined
    await setInputValue(undefined);
    expect(lastValue).toEqual(undefined);

    // Set empty value
    await setInputValue('');
    expect(lastValue).toEqual(undefined);
  });
});
