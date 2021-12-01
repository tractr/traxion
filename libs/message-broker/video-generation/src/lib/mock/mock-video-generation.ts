import { random } from 'faker';

import {
  EventType,
  MessageBrokerVideoGeneration,
} from '../types/message-broker-video-generation';

import { mockNumFrame } from '@cali/common-business';

const videoUrls = [
  'https://media4.giphy.com/media/xT9KVtoUlfPzY49hBe/giphy.mp4?cid=790b76113e5010a1eea2bdc9e953b03d47eb468d288a0048&rid=giphy.mp4&ct=g',
  'https://media4.giphy.com/media/5QMOICVmXremPSa0k7/giphy.mp4?cid=ecf05e47j2drtvsmdytehf0d8onjgk9q84dqs4jdyx1u2l0q&rid=giphy.mp4&ct=g',
  'https://media0.giphy.com/media/1rSSq5eoLy4ODgbKAF/giphy.mp4?cid=ecf05e47j2drtvsmdytehf0d8onjgk9q84dqs4jdyx1u2l0q&rid=giphy.mp4&ct=g',
];

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
    mockedVideoGeneration.video_url = random.arrayElement(videoUrls);

  return Object.assign(mockedVideoGeneration, videoGeneration);
}
