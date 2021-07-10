import { Directive } from '@angular/core';

import { BaseConnectedDirective } from './base-connected.directive';

@Directive({
  selector: '[tractrConnected]',
})
export class ConnectedDirective extends BaseConnectedDirective {
  isLogged(logged: boolean): void {
    this.toggleShow(logged);
  }
}
