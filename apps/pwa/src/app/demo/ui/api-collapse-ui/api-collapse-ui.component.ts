import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '@prisma/client';

@Component({
  selector: 'stack-api-collapse-ui',
  templateUrl: './api-collapse-ui.component.html',
  styleUrls: ['./api-collapse-ui.component.less'],
})
export class ApiCollapseUiComponent {
  @Input() apiMethod: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET';
  @Input() apiStatus = 200;
  @Input() apiUrl = '';
  @Input() apiResponse!: Tag[] | null;
  @Input() apiParams!: any[] | undefined;
  @Input() apiError!: { status: number; message: string };

  panelName = '';
  constructor() {}

  ngOnInit(): void {
    this.panelName = `${this.apiMethod} ${this.apiUrl}`;
  }
}
