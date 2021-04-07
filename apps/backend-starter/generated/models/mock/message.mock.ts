import { 
  Message,
} from '../models';
import {
  random,
  lorem,
  date
} from 'faker';

export function mockMessageIdFactory(): Message['id'] {
  return random.uuid();
}

export function mockMessageTextFactory(): Message['text'] {
  return lorem.words();
}

export function mockMessageHourFactory(): NonNullable<Message['hour']> {
  return date.past();
}

export function mockMessageTagsIdsFactory(): string[] {
  return [...Array(3)].map(() => random.uuid());
}

export function mockMessageQuestionsIdsFactory(): string[] {
  return [...Array(3)].map(() => random.uuid());
}

  
export function mockMessageFactory(override: Partial< Message > = {}): Message {
  return {
    id: mockMessageIdFactory(),
    text: mockMessageTextFactory(),
    hour: mockMessageHourFactory(),
    ...override,
  };
}

