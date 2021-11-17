/* eslint-disable @typescript-eslint/unbound-method */
import { Test } from '@nestjs/testing';
import { AlertType } from '@prisma/client';
import { datatype } from 'faker';
import { mock, MockProxy } from 'jest-mock-extended';

import { MessageBrokerHandlerAlertFilterService } from './message-broker-handler-alert-filter.service';

import { MessageBrokerAlertService } from '@cali/message-broker-alert';
import { MessageBrokerPredictionLog } from '@cali/message-broker-prediction-log';

describe('MessageBrokerHandlerAlertFilter', () => {
  let mockedMessageBrokerAlertService: MockProxy<MessageBrokerAlertService>;
  let messageBrokerHandlerAlertService: MessageBrokerHandlerAlertFilterService;
  const basePredictionLog: MessageBrokerPredictionLog = {
    num_frame: datatype.string(),
    classes: [datatype.string()],
    probas: [datatype.number(1)],
    class: AlertType.suspectBehaviour,
    alert: datatype.boolean(),
    delay: datatype.number(100),
    t_ingest: datatype.number(100),
    t_prepro: datatype.number(100),
    t_inference: datatype.number(100),
    usage_cpu_inf: datatype.number(100),
    usage_memoire_inf: datatype.number(100),
    t_decision: datatype.number(100),
    id_model_prediction: datatype.string(),
    id_model_decision: datatype.string(),
  };

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
      const alertPredictionLog = { ...basePredictionLog, alert: true };

      messageBrokerHandlerAlertService.filterAlerts(alertPredictionLog);

      expect(mockedMessageBrokerAlertService.publish).toBeCalledWith({
        routingKey: '',
        message: {
          type: alertPredictionLog.class,
          cameraExternalId: alertPredictionLog.num_frame,
          externalFrameId: alertPredictionLog.num_frame,
          externalModelDecisionId: alertPredictionLog.id_model_decision,
          externalModelPredictionId: alertPredictionLog.id_model_prediction,
        },
      });
    });

    it('should do nothing when prediction log is not an alert', async () => {
      const noAlertPredictionLog = { ...basePredictionLog, alert: false };

      messageBrokerHandlerAlertService.filterAlerts(noAlertPredictionLog);

      expect(mockedMessageBrokerAlertService.publish).not.toHaveBeenCalled();
    });
  });

  describe('formatPredictionLogToAlert', () => {
    it('should map a prediction log format to an alert format', async () => {
      const mappedPredictionLog =
        messageBrokerHandlerAlertService.formatPredictionLogToAlert(
          basePredictionLog,
        );

      expect(mappedPredictionLog).toStrictEqual({
        type: basePredictionLog.class,
        cameraExternalId: basePredictionLog.num_frame,
        externalFrameId: basePredictionLog.num_frame,
        externalModelDecisionId: basePredictionLog.id_model_decision,
        externalModelPredictionId: basePredictionLog.id_model_prediction,
      });
    });
  });
});
