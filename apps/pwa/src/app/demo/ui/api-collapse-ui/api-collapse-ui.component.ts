import { Component, Input, OnInit } from '@angular/core';
import { Tag, User } from '@prisma/client';

@Component({
  selector: 'tractr-api-collapse-ui',
  templateUrl: './api-collapse-ui.component.html',
  styleUrls: ['./api-collapse-ui.component.less'],
})
export class ApiCollapseUiComponent implements OnInit {
  @Input() apiMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET';
  @Input() apiStatus = 200;
  @Input() apiUrl = '';
  @Input() apiResponse!:
    | User
    | User[]
    | Tag
    | Tag[]
    | never[]
    | number
    | undefined;

  @Input() apiParams!: string | undefined; // set params to url in panel name
  @Input() apiQueryParams!: string | undefined; // set queryParams to url in panel content
  @Input() apiError?: string;

  panelName = '';

  ngOnInit(): void {
    this.panelName = `${this.apiMethod} ${this.apiUrl}`;
    if (this.apiParams) {
      this.panelName += `/${this.apiParams}`;
    }
  }
}
