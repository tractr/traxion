import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { UserRoles } from '@prisma/client';

@Component({
  selector: 'tractr-user-infos-ui',
  templateUrl: './user-infos-ui.component.html',
  styleUrls: ['./user-infos-ui.component.less'],
})
export class UserInfosUiComponent {
  @Input() name: string | undefined;
  @Input() email: string | undefined;
  @Input() role: UserRoles = 'guest';

  /**
   * Login emitter
   */
  @Output()
  logoutEvent = new EventEmitter<void>();
}
