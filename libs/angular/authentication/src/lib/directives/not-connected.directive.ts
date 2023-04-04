import { Directive } from '@angular/core';

import { BaseConnectedDirective } from './base-connected.directive';
import { SessionService } from '../services';

@Directive({
  selector: '[tractrNotConnected]',
  standalone: true,
  providers: [SessionService],
})
export class NotConnectedDirective extends BaseConnectedDirective {
  isLogged(logged: boolean): void {
    this.toggleShow(!logged);
  }
}
