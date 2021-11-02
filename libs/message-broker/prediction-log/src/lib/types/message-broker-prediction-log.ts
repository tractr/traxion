/* eslint-disable camelcase */

export type MessageBrokerPredictionLog = {
  num_frame: string;
  classes: string[];
  probas: number[];
  class: string;
  alert: boolean;
  delay: number;
  t_ingest: number;
  t_prepro: number;
  t_inference: number;
  usage_cpu_inf: number;
  usage_memoire_inf: number;
  t_decision: number;
  id_model_prediction: string;
  id_model_decision: string;
};
