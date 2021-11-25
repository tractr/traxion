import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { ItemCategory } from '@cali/common-models';

@Component({
  selector: 'cali-feedback-estimations-ui',
  templateUrl: './feedback-estimations-ui.component.html',
  styleUrls: ['./feedback-estimations-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackEstimationsUiComponent {
  @Input() itemsCategory: Pick<ItemCategory, 'id' | 'name'>[] = [];

  @Input() itemCategorySelected: string | null = null;

  @Input() theftValue = 0;

  @Output() itemCategorySelectedChange = new EventEmitter<string>();

  @Output() theftValueChange = new EventEmitter<number>();

  formatterEuro = (value: number): string => `${value} €`;
}
