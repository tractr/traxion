import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tractr-user-infos-ui',
  templateUrl: './user-infos-ui.component.html',
  styleUrls: ['./user-infos-ui.component.less'],
})
export class UserInfosUiComponent {
  @Input() name: string | undefined;
  @Input() email: string | undefined;
  @Input() role: 'admin' | 'user' | 'guest' = 'guest';

  /**
   * Login emitter
   */
  @Output()
  logoutEvent = new EventEmitter<void>();
}
