import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { TagService } from '@tractr/generated-angular-rext-client';
import { Tag } from '@tractr/generated-models';

@Component({
  selector: 'stack-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<string>('/api/hello');

  constructor(private http: HttpClient, private tagService: TagService) {}

  public tags!: Observable<Tag[]>;

  ngOnInit(): void {
    this.tags = this.tagService.findMany$();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(a: any) {
    // eslint-disable-next-line no-console
    console.log(a);
  }
}
