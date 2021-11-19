import { AlertType } from '@prisma/client';
import { datatype } from 'faker';

import { MessageBrokerAlert } from '../types/message-broker-alert';

import { mockNumFrame, parseNumFrame } from '@cali/common-business';

/**
 * Generate a random prediction alert
 *
 * @param alert - override the generated alert
 * @returns the generated alert
 */
export function mockAlert(
  alert: Partial<MessageBrokerAlert> = {},
): MessageBrokerAlert {
  const mockedNumFrame = mockNumFrame();

  return {
    type: AlertType.thief,
    cameraExternalId: parseNumFrame(mockedNumFrame).cameraId,
    externalFrameId: mockedNumFrame,
    externalModelDecisionId: datatype.string(),
    externalModelPredictionId: datatype.string(),
    ...alert,
  };
}
