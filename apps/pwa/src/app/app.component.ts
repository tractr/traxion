import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Message } from '@tractr/api-interfaces';

@Component({
  selector: 'stack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');

  constructor(private http: HttpClient) {}
}
