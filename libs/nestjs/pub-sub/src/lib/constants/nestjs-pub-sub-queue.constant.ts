export const PubSubQueue = {
  alertCreated: 'alertCreated',
  alertUpdated: 'alertUpdated',
  alertFeedbackCreated: 'alertFeedbackCreated',
};

export type PubSubQueue = keyof typeof PubSubQueue;
