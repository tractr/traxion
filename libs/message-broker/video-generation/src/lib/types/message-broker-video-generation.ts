/* eslint-disable camelcase */
import { AlertVideoStatus } from '@cali/common-models';

export const EventTypeToCamelCase = {
  generation_started: AlertVideoStatus.generationStarted,
  generation_successed: AlertVideoStatus.generationSuccessed,
  video_available: AlertVideoStatus.videoAvailable,
  video_deleted: AlertVideoStatus.videoDeleted,
} as const;

export type EventType = keyof typeof EventTypeToCamelCase;

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

export type AlertVideoUpdatedNoVideo = {
  eventType: 'generationStarted' | 'generationSuccessed' | 'videoDeleted';
  numFrame: string;
};

export type AlertVideoUpdatedWithVideo = {
  eventType: 'videoAvailable';
  numFrame: string;
  videoUrl: string;
};

export type AlertVideoUpdated =
  | AlertVideoUpdatedNoVideo
  | AlertVideoUpdatedWithVideo;
