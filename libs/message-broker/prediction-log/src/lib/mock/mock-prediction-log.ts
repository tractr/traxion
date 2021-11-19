import { AlertType } from '@prisma/client';
import { datatype } from 'faker';

import { MessageBrokerPredictionLog } from '../types/message-broker-prediction-log';

import { mockNumFrame } from '@cali/common-business';

/**
 * Generate a random prediction log
 *
 * @param predictionLog - override the generated prediction log
 * @returns the generated prediction log
 */
export function mockPredictionLog(
  predictionLog: Partial<MessageBrokerPredictionLog> = {},
): MessageBrokerPredictionLog {
  return {
    num_frame: mockNumFrame(),
    classes: [datatype.string()],
    probas: [datatype.number(1)],
    class: AlertType.thief,
    alert: true,
    delay: datatype.number(100),
    t_ingest: datatype.number(100),
    t_prepro: datatype.number(100),
    t_inference: datatype.number(100),
    usage_cpu_inf: datatype.number(100),
    usage_memoire_inf: datatype.number(100),
    t_decision: datatype.number(100),
    id_model_prediction: datatype.string(),
    id_model_decision: datatype.string(),
    ...predictionLog,
  };
}
