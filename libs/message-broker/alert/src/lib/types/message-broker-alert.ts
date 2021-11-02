import { Alert } from '@prisma/client';

export type MessageBrokerAlert = Omit<
  Alert,
  'id' | 'createdAt' | 'videoUrl' | 'videoStatus' | 'alertType'
> & { alertType: string };
