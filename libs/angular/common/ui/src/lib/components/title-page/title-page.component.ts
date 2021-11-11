import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cali-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitlePageComponent {
  @Input() title!: string;
}
