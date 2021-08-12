import { Component, OnInit } from '@angular/core';

import { SelectOptionInterface } from '../interfaces';
import { IdType, SelectBaseComponent } from '../select-base.component';

export interface CheckOptionInterface {
  label: string;
  value: SelectOptionInterface<unknown>;
  checked?: boolean;
}

@Component({
  selector: 'tractr-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.less'],
})
export class CheckboxGroupComponent
  extends SelectBaseComponent
  implements OnInit
{
  checkOptionsState?: CheckOptionInterface[];

  get checkOptions(): CheckOptionInterface[] | undefined {
    return this.checkOptionsState;
  }

  set checkOptions(checkOptions: CheckOptionInterface[] | undefined) {
    this.checkOptionsState = checkOptions;

    this.id = this.extractId(this.getSelectOptionsSelected(this.checkOptions));
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.checkOptions = this.parseOptions(this.options);

    if (this.value) {
      this.updateCheckOptions(this.extractId(this.value));
    }
  }

  updateCheckOptions(id?: IdType | IdType[]): void {
    this.checkOptions = this.checkOptions?.map((opt) => {
      if (Array.isArray(id)) {
        return { ...opt, checked: id.indexOf(opt.value.id) > -1 };
      }

      if (id) {
        return { ...opt, checked: opt.value.id === id };
      }

      return opt;
    });
  }

  parseOptions(
    options: SelectOptionInterface[] | undefined,
  ): CheckOptionInterface[] | undefined {
    if (!options) return undefined;

    return options.map((option) => ({
      label: option.label,
      value: option,
      checked: this.id === option.id,
    }));
  }

  getSelectOptionsSelected(
    checkOptions: CheckOptionInterface[] | undefined,
  ): SelectOptionInterface[] | undefined {
    if (!checkOptions) return undefined;

    const optionsSelected: SelectOptionInterface[] = [];
    checkOptions.forEach((checkOption, index) => {
      if (checkOption.checked) {
        optionsSelected.push(this.options[index]);
      }
    });

    return optionsSelected;
  }
}
