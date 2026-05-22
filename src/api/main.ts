import { client } from '@/api/client';

// 타입 정의

export interface MainEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  imgUrl: string | null;
}

export interface Award {
  tabIdx: number;
  year: number;
  type: [number, number, number, number];
}

export const getMainEvents = () => {
  return client.get<{ data: MainEvent[] }>('/api/v1/events').then((res) => res.data.data);
};

export const getAwards = () => {
  return client.get<{ data: Award[] }>('/api/v1/awards').then((res) => res.data.data);
};
