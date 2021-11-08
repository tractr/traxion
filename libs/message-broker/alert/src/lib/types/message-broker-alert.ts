import { Alert } from '@prisma/client';

export type MessageBrokerAlert = Omit<
  Alert,
  'id' | 'createdAt' | 'videoUrl' | 'videoStatus' | 'cameraId'
> & { cameraExternalId: string };
