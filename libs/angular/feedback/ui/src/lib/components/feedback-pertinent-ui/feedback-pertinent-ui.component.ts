import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'cali-feedback-pertinent-ui',
  templateUrl: './feedback-pertinent-ui.component.html',
  styleUrls: ['./feedback-pertinent-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackPertinentUiComponent {
  @Input() alertFeedbackPertinent: boolean | null = false;

  @Output() alertFeedbackPertinentChange = new EventEmitter<boolean>();
}
