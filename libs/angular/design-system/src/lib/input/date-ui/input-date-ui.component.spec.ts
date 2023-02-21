import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDateUiComponent } from './input-date-ui.component';

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

describe('InputDateUiComponent', () => {
  let component: InputDateUiComponent;
  let fixture: ComponentFixture<InputDateUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputDateUiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputDateUiComponent);
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

    // Set value to 'abc'
    await setInputValue('2010-10-10');
    expect(lastValue).toEqual('2010-10-10');

    // Set value to 'def'
    await setInputValue('2021-01-02');
    expect(lastValue).toEqual('2021-01-02');

    // Set empty value
    await setInputValue('');
    expect(lastValue).toEqual('');
  });
});
