import { Injectable } from '@nestjs/common';
import {
  bufferTime,
  distinctUntilKeyChanged,
  groupBy,
  map,
  mergeMap,
  Subject,
} from 'rxjs';

import { FramePerformance } from '@cali/common';
import {
  CameraStatusChangeNotification,
  MessageBrokerCameraStatusService,
} from '@cali/message-broker-camera-status';
import { MessageBrokerFramePerformanceSubscribe } from '@cali/message-broker-frame-performance';
import { CameraStatus } from '@generated/models';

@Injectable()
export class CameraMonitoringService {
  constructor(
    private messageBrokerCameraStatusService: MessageBrokerCameraStatusService,
  ) {
    this.cameraStatus$.subscribe((cameraStatus) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.publishCameraStatus(cameraStatus);
    });
  }

  /**
   * Subject that emits frame performances logs received from
   * RabbitMQ
   */
  private framePerformance$ = new Subject<FramePerformance>();

  /**
   * Observable that emit each time a camera status changes
   */
  private cameraStatus$ = this.framePerformance$.pipe(
    groupBy((framePerformance) => framePerformance.idcamera),
    mergeMap((group$) =>
      group$.pipe(
        bufferTime(3000),
        map((frames) => ({
          idcamera: group$.key,
          status: frames.length === 3 ? CameraStatus.up : CameraStatus.down,
        })),
        distinctUntilKeyChanged('status'),
      ),
    ),
  );

  /**
   * Handle frame performances received from the message broker
   * @param message - Frame performance log received from the message broker
   */
  @MessageBrokerFramePerformanceSubscribe({
    queue: 'process_frame_performance_to_camera_status',
    routingKey: '',
  })
  public handleFramePerformanceMessages(message: FramePerformance) {
    this.framePerformance$.next(message);
  }

  /**
   * Publish camera status changes to the message broker
   * @param cameraStatus - the new status of a camera
   */
  private publishCameraStatus(cameraStatus: CameraStatusChangeNotification) {
    return this.messageBrokerCameraStatusService.publish({
      routingKey: '',
      message: cameraStatus,
    });
  }
}
