/* eslint-disable camelcase */
export type EventType =
  | 'generation_started'
  | 'generation_successed'
  | 'video_available'
  | 'video_deleted';

export type GenerationStartedEvent = {
  event_type: 'generation_started';
  num_frame: string;
};
export type GenerationSucceededEvent = {
  event_type: 'generation_successed';
  num_frame: string;
};
export type VideoAvailableEvent = {
  event_type: 'video_available';
  num_frame: string;
  video_url: string;
};
export type VideoDeletedEvent = {
  event_type: 'video_deleted';
  num_frame: string;
};

export type MessageBrokerVideoGeneration =
  | GenerationStartedEvent
  | GenerationSucceededEvent
  | VideoAvailableEvent
  | VideoDeletedEvent;
