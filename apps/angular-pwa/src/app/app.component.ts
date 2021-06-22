import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'tractr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  title = 'angular-pwa';

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
  }
}
