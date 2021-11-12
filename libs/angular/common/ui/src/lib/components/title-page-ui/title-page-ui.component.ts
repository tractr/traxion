import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cali-title-page-ui',
  templateUrl: './title-page-ui.component.html',
  styleUrls: ['./title-page-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitlePageUiComponent {
  @Input() title!: string;
}
