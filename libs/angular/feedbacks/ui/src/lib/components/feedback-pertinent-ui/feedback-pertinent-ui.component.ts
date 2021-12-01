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
  @Output() alertFeedbackPertinentChange = new EventEmitter<boolean>();

  @Input() alertFeedbackPertinent!: boolean | null;

  alertFeedbackPertinentOnChange(state: boolean) {
    this.alertFeedbackPertinentChange.emit(!state);
  }
}
