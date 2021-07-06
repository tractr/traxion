/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';

import { SelectOptionInterface } from '../interfaces';
import { SelectBaseComponent } from '../select-base.component';

export interface CheckOptionInterface {
  label: string;
  value: any;
  checked?: boolean;
}

@Component({
  selector: 'tractr-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.less'],
})
export class CheckboxGroupComponent
  extends SelectBaseComponent<any>
  implements OnInit
{
  checkOptionsState?: CheckOptionInterface[];

  get checkOptions(): CheckOptionInterface[] | undefined {
    return this.checkOptionsState;
  }

  set checkOptions(checkOptions: CheckOptionInterface[] | undefined) {
    this.checkOptionsState = checkOptions;

    this.id = this.getSelectOptionsSelected(this.checkOptions)?.id;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.checkOptions = this.parseOptions(this.options);
  }

  parseOptions(
    options: SelectOptionInterface<any>[] | undefined,
  ): CheckOptionInterface[] | undefined {
    if (!options) return undefined;

    return options.map((option) => ({
      label: option.label,
      value: option.value,
      checked: this.id === option.id,
    }));
  }

  getSelectOptionsSelected(
    checkOptions: CheckOptionInterface[] | undefined,
  ): SelectOptionInterface<any> | undefined {
    if (!checkOptions) return undefined;

    const optionsSelected: SelectOptionInterface<any>[] = [];

    checkOptions.forEach((checkOption, index) => {
      if (checkOption.checked) {
        optionsSelected.push(this.options[index]);
      }
    });

    return optionsSelected[0];
  }
}
