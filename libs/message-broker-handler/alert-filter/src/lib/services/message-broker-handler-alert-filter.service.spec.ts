/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { mock, MockProxy } from 'jest-mock-extended';

import { MessageBrokerHandlerAlertFilterService } from './message-broker-handler-alert-filter.service';

import { parseNumFrame } from '@cali/common-business';
import { MessageBrokerAlertService } from '@cali/message-broker-alert';
import { mockPredictionLog } from '@cali/message-broker-prediction-log';

describe('MessageBrokerHandlerAlertFilter', () => {
  let mockedMessageBrokerAlertService: MockProxy<MessageBrokerAlertService>;
  let messageBrokerHandlerAlertService: MessageBrokerHandlerAlertFilterService;

  beforeEach(async () => {
    mockedMessageBrokerAlertService = mock<MessageBrokerAlertService>();

    const moduleRef = await Test.createTestingModule({
      providers: [
        MessageBrokerHandlerAlertFilterService,
        {
          provide: MessageBrokerAlertService,
          useValue: mockedMessageBrokerAlertService,
        },
      ],
    }).compile();

    messageBrokerHandlerAlertService =
      moduleRef.get<MessageBrokerHandlerAlertFilterService>(
        MessageBrokerHandlerAlertFilterService,
      );
  });

  describe('filterAlerts', () => {
    it('should publish a message when prediction log is an alert', async () => {
      const alertPredictionLog = mockPredictionLog({ alert: true });
      const { cameraId } = parseNumFrame(alertPredictionLog.num_frame);

      messageBrokerHandlerAlertService.filterAlerts(alertPredictionLog);

      expect(mockedMessageBrokerAlertService.publish).toBeCalledWith({
        routingKey: '',
        message: {
          type: alertPredictionLog.class,
          cameraExternalId: cameraId,
          externalFrameId: alertPredictionLog.num_frame,
          externalModelDecisionId: alertPredictionLog.id_model_decision,
          externalModelPredictionId: alertPredictionLog.id_model_prediction,
        },
      });
    });

    it('should do nothing when prediction log is not an alert', async () => {
      const noAlertPredictionLog = mockPredictionLog({ alert: false });

      messageBrokerHandlerAlertService.filterAlerts(noAlertPredictionLog);

      expect(mockedMessageBrokerAlertService.publish).not.toHaveBeenCalled();
    });
  });

  describe('formatPredictionLogToAlert', () => {
    it('should map a prediction log format to an alert format', async () => {
      const predictionLog = mockPredictionLog();
      const mappedPredictionLog =
        messageBrokerHandlerAlertService.formatPredictionLogToAlert(
          predictionLog,
        );

      expect(mappedPredictionLog).toStrictEqual({
        type: predictionLog.class,
        cameraExternalId: parseNumFrame(predictionLog.num_frame).cameraId,
        externalFrameId: predictionLog.num_frame,
        externalModelDecisionId: predictionLog.id_model_decision,
        externalModelPredictionId: predictionLog.id_model_prediction,
      });
    });
  });

  describe('parseNumFrame', () => {
    it('should extract camera ID and frame ID from numFrame with single digit camera ID', async () => {
      const numFrame = '82021_10_01_09_40_43_11';

      const parsedNumFrame = parseNumFrame(numFrame);

      expect(parsedNumFrame).toStrictEqual({
        cameraId: '8',
        frameNumber: '11',
        date: new Date(Date.UTC(2021, 9, 1, 9, 40, 43)),
      });
    });

    it('should extract camera ID and frame ID from numFrame with multi-digits camera ID', async () => {
      const numFrame = '1342021_10_01_09_40_43_11';

      const parsedNumFrame = parseNumFrame(numFrame);

      expect(parsedNumFrame).toStrictEqual({
        cameraId: '134',
        frameNumber: '11',
        date: new Date(Date.UTC(2021, 9, 1, 9, 40, 43)),
      });
    });
  });
});
