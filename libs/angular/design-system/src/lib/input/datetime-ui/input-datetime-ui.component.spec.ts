import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatetimeUiComponent } from './input-datetime-ui.component';

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

describe('InputDatetimeUiComponent', () => {
  let component: InputDatetimeUiComponent;
  let fixture: ComponentFixture<InputDatetimeUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDatetimeUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDatetimeUiComponent);
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
    let lastValue: Date | undefined;
    component.value$.subscribe((value) => {
      lastValue = value;
    });
    expect(lastValue).toEqual(undefined);

    // Set value to 'yyyy-MM-ddTHH:mm:ss'
    await setInputValue('2010-10-10T10:10:10');
    expect(lastValue).toEqual(new Date('2010-10-10T10:10:10.000'));

    // Set value to 'yyyy-MM-ddTHH:mm:ss.SSS'
    await setInputValue('2021-01-02T04:05:06.789');
    expect(lastValue).toEqual(new Date('2021-01-02T04:05:06.789'));

    // Set value to 'yyyy-MM-ddTHH:mm'
    await setInputValue('2021-01-02T04:05');
    expect(lastValue).toEqual(new Date('2021-01-02T04:05'));

    // Set empty value
    await setInputValue('');
    expect(lastValue).toEqual(undefined);
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
    let lastValue: Date | undefined;
    component.value$.subscribe((value) => {
      lastValue = value;
    });
    expect(lastValue).toEqual(undefined);

    // Set value to string not well formatted
    await setInputValue('abc');
    expect(lastValue).toEqual(undefined);
  });
});
