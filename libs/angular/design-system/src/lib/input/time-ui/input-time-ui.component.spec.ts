import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTimeUiComponent } from './input-time-ui.component';

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

describe('InputTimeUiComponent', () => {
  let component: InputTimeUiComponent;
  let fixture: ComponentFixture<InputTimeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTimeUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTimeUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

    // Set value to 'HH:mm:ss'
    await setInputValue('10:10:10');
    expect(lastValue).toEqual('10:10:10');

    // Set value to 'HH:mm:ss.SSS'
    await setInputValue('04:05:06.789');
    expect(lastValue).toEqual('04:05:06.789');

    // Set value to 'HH:mm'
    await setInputValue('04:05');
    expect(lastValue).toEqual('04:05');

    // Set empty value
    await setInputValue('');
    expect(lastValue).toEqual('');
  });

  it('should not accept bad format', async () => {
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

    // Set value to string not well formatted
    await setInputValue('abc');
    expect(lastValue).toEqual('');
  });
});
