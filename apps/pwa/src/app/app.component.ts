import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable, scan, shareReplay } from 'rxjs';

type Alert = { camera: string; type: string; time: string };

type Camera = { id: string; status: string };

/**
 * Graphql request to subscribe to new alerts
 */
const GQL_NEW_ALERT_SUBSCRIPTION = gql`
  subscription {
    newAlert {
      camera
      type
      time
    }
  }
`;

/**
 * Graphql request to subscribe to camera updates
 */
const GQL_CAMERA_UPDATE_SUBSCRIPTION = gql`
  subscription {
    cameraUpdate {
      id
      status
    }
  }
`;
@Component({
  selector: 'cali-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  constructor(private graphql: Apollo, translate: TranslateService) {
    translate.setDefaultLang('fr');
    translate.use('fr');
  }

  /**
   * Observable that emits new Alerts coming from the api
   */
  alerts$!: Observable<Alert[]>;

  /**
   * Observable that emits an up to date camera array
   */
  cameras$!: Observable<Camera[]>;

  ngOnInit() {
    /**
     * Subscribe to alerts
     */
    this.alerts$ = this.graphql
      .subscribe<{ newAlert: Alert }>({
        query: GQL_NEW_ALERT_SUBSCRIPTION,
      })
      .pipe(
        map((result) => result?.data?.newAlert),
        scan(
          (acc: Alert[], alert) => (alert ? [...acc, alert] : acc),
          [] as Alert[],
        ),
        shareReplay(1),
      );

    /**
     * Subscribe to camera status
     */
    this.cameras$ = this.graphql
      .subscribe<{ cameraUpdate: Camera }>({
        query: GQL_CAMERA_UPDATE_SUBSCRIPTION,
      })
      .pipe(
        map((result) => result.data?.cameraUpdate),
        scan(
          (acc: { [key: string]: Camera }, camera) =>
            camera ? { ...acc, [camera.id]: camera } : acc,
          {} as { [key: string]: Camera },
        ),
        map((cameraHash) =>
          Object.values(cameraHash).sort(
            (camera1, camera2) => +camera1.id - +camera2.id,
          ),
        ),
        shareReplay(1),
      );
  }
}
