import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  draft = 'draft',
  open = 'open',
  inProgress = 'inProgress',
  done = 'done',
}

registerEnumType(TaskStatus, { name: 'TaskStatus', description: undefined });
