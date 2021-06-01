import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from '@tractr/nx-test-maxim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'angular-pwa';

  constructor(
    private translate: TranslateService,
    private uiService: UiService,
  ) {}

  ngOnInit() {
    this.title = this.uiService.greet();
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }
}
