import { Component, Input } from '@angular/core';

@Component({
  selector: 'stack-user-infos-ui',
  templateUrl: './user-infos-ui.component.html',
  styleUrls: ['./user-infos-ui.component.less'],
})
export class UserInfosUiComponent {
  @Input() name: string | undefined;
  @Input() email: string | undefined;
  @Input() role: 'admin' | 'user' | 'guest' = 'guest';
  constructor() {
    console.log('UserInfosUiComponent.constructor');
  }
}
