import { internet, random } from 'faker';

import {
  EventType,
  MessageBrokerVideoGeneration,
} from '../types/message-broker-video-generation';

import { mockNumFrame } from '@cali/common-business';

/**
 * Generate a random video generation update
 *
 * @param videoGenerate - override the generated video generation update
 * @returns the generated video generation update
 */
export function mockVideoGeneration(
  videoGeneration: Partial<MessageBrokerVideoGeneration> = {},
): MessageBrokerVideoGeneration {
  const eventType: EventType =
    videoGeneration.event_type ||
    random.arrayElement([
      'generation_started',
      'generation_successed',
      'video_available',
      'video_deleted',
    ]);
  const mockedVideoGeneration = {
    event_type: eventType,
    num_frame: mockNumFrame(),
  } as MessageBrokerVideoGeneration;

  if (mockedVideoGeneration.event_type === 'video_available')
    mockedVideoGeneration.video_url = internet.url();

  return Object.assign(mockedVideoGeneration, videoGeneration);
}
