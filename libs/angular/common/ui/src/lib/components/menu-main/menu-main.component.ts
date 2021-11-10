import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ItemMenu {
  target: string[];
  icon?: string;
  key: string;
}

@Component({
  selector: 'cali-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuMainComponent {
  menuMainTop: ItemMenu[] = [
    {
      target: ['/', 'tableau-de-bord'],
      icon: 'home',
      key: 'dashboard',
    },
    {
      target: ['/', 'statistiques'],
      icon: 'bar-chart',
      key: 'statistiques',
    },
    {
      target: ['/', 'alertes'],
      icon: 'video-camera',
      key: 'video-alerts',
    },
    {
      target: ['/', 'utilisateurs'],
      icon: 'team',
      key: 'users',
    },
  ];

  menuMainBottom: ItemMenu[] = [
    {
      target: ['/', 'mon-compte'],
      icon: 'user',
      key: 'my-account',
    },
    {
      target: ['/', 'deconnexion'],
      icon: 'poweroff',
      key: 'logout',
    },
  ];
}
