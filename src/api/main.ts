import { client } from '@/api/client';
import type { Award, MainEvent } from '@/types/Main';

// API 함수
export const getMainEvents = () => {
  return client.get<{ data: MainEvent[] }>('/api/v1/events').then((res) => res.data.data);
};

export const getAwards = () => {
  return client.get<{ data: Award[] }>('/api/v1/awards').then((res) => res.data.data);
};
