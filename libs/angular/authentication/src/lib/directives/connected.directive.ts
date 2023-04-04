import { Directive } from '@angular/core';

import { BaseConnectedDirective } from './base-connected.directive';
import { SessionService } from '../services';

@Directive({
  selector: '[tractrConnected]',
  standalone: true,
  providers: [SessionService],
})
export class ConnectedDirective extends BaseConnectedDirective {
  isLogged(logged: boolean): void {
    this.toggleShow(logged);
  }
}
