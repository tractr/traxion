import { Directive } from '@angular/core';

import { BaseConnectedDirective } from './base-connected.directive';

@Directive({
  selector: '[tractrNotConnected]',
})
export class NotConnectedDirective extends BaseConnectedDirective {
  isLogged(logged: boolean): void {
    this.toggleShow(!logged);
  }
}
